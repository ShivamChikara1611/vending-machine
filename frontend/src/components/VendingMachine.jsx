import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Cart from "./Cart";
import { assets } from "../assets/assets.js";

const VendingMachine = () => {
    const { id } = useParams();
    const [vendingMachineData, setVendingMachineData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    const backendUrl = 'http://localhost:5000';
    const yen = import.meta.env.VITE_CURRENCY || "¥";

    // Fetch vending machine info
    const fetchVendingMachineInfo = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/admin/vending-machines/${id}`);
            setVendingMachineData(response.data);
        } catch (error) {
            console.error("Error fetching vending machine data:", error);
            toast.error("Failed to fetch vending machine data, Please scan again");
            setVendingMachineData(null);
        }
    };

    useEffect(() => {
        if (id) fetchVendingMachineInfo();
    }, [id]);

    // Add product to cart and update stock live
    const addToCart = (product) => {
        if (product.stock <= 0) {
            toast.error("No more stock available for this product!");
            return;
        }
        setVendingMachineData((prev) => ({
            ...prev,
            products: prev.products.map((p) =>
                p.product_id === product.product_id
                    ? { ...p, stock: p.stock - 1 }
                    : p
            ),
        }));
        setCart((prev) => {
            const existing = prev.find((p) => p.product_id === product.product_id);
            if (existing) {
                return prev.map((p) =>
                    p.product_id === product.product_id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    // Restore stock when removing from cart
    const decrementFromCart = (productId) => {
        const cartItem = cart.find((p) => p.product_id === productId);
        if (!cartItem) return;
        if (cartItem.quantity === 1) {
            setCart((prev) => prev.filter((p) => p.product_id !== productId));
        } else {
            setCart((prev) =>
                prev.map((p) =>
                    p.product_id === productId
                        ? { ...p, quantity: p.quantity - 1 }
                        : p
                )
            );
        }
        setVendingMachineData((prev) => ({
            ...prev,
            products: prev.products.map((p) =>
                p.product_id === productId ? { ...p, stock: p.stock + 1 } : p
            ),
        }));
    };

    // Restore stock and clear cart
    const cancelPayment = () => {
        setVendingMachineData((prev) => ({
            ...prev,
            products: prev.products.map((p) => {
                const cartItem = cart.find((c) => c.product_id === p.product_id);
                if (cartItem) {
                    return { ...p, stock: p.stock + cartItem.quantity };
                }
                return p;
            }),
        }));
        setCart([]);
        toast.info("Payment canceled, cart cleared.");
    };

    // Checkout
    const checkout = async () => {
        try {
            const totalAmount = cart.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );
            const payload = {
                machine_id: id,
                location: vendingMachineData.location,
                products: cart.map((p) => ({
                    product_id: p.product_id,
                    product_name: p.product_name,
                    price: p.price,
                    quantity: p.quantity,
                })),
                total_amount: totalAmount,
                payment_status: "completed",
            };
            await axios.post(`${backendUrl}/api/admin/transactions`, payload);
            toast.success("Payment Successful!");
            setCart([]);
            fetchVendingMachineInfo();
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error("Payment failed!");
        }
    };

    const toggleCart = () => setIsCartOpen((prev) => !prev);

    const filteredProducts =
        vendingMachineData?.products?.filter((product) =>
            product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
        ) || [];

    if (!vendingMachineData) {
        return (
            <div className="h-[88.5vh] flex flex-col justify-center items-center">
                <p className="text-primary text-4xl italic">Loading machine data...</p>
            </div>
        );
    }

    return (
        <div className="flex justify-between relative mt-8">
            {/* Product List */}
            <div className="flex flex-col justify-center items-center text-gray-200 w-full">
                <h1 className="text-5xl font-bold text-primary">Welcome!</h1>
                <div className="mt-5 flex flex-col justify-center items-center">
                    <h3 className="text-2xl font-semibold text-gray-200 mb-1">
                        {vendingMachineData.location}'s Vending Machine
                    </h3>
                    <p className="text-gray-300 text-lg italic">
                        Please choose your item below.
                    </p>
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-primary bg-primary bg-opacity-20 rounded px-2 py-1.5 text-gray-300 my-5 w-full md:w-80"
                    />
                    <div className="max-h-[85vh] overflow-y-scroll">
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 bg-white/50 p-5 rounded-md backdrop-blur-lg scrollbar-hide">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-primary rounded-sm hover:-translate-y-1 transition-all duration-300 max-w-60 p-3 group"
                                    >
                                        <p className="text-gray-200 text-lg font-medium">
                                            {item.product_name}
                                        </p>
                                        <p className="text-gray-300 text-sm">
                                            {yen}
                                            {item.price}
                                        </p>
                                        <p className="text-gray-200 text-sm">
                                            Only {item.stock} left
                                        </p>
                                        <button
                                            onClick={() => addToCart(item)}
                                            className="mt-2 bg-gray-200 text-primary rounded px-5 py-1 text-sm cursor-pointer"
                                        >
                                            Add
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 italic">No products found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* cart show/hide button */}
            <div className="absolute top-5 right-0">
                <button onClick={toggleCart} className="bg-primary py-1 px-5 rounded-l-lg text-gray-200 text-lg italic cursor-pointer">Cart</button>
            </div>
            {/* Cart */}
            <Cart
                cart={cart}
                isCartOpen={isCartOpen}
                toggleCart={toggleCart}
                decrementFromCart={decrementFromCart}
                addToCart={addToCart}
                cancelPayment={cancelPayment}
                checkout={checkout}
                yen={yen}
                assets={assets}
            />
        </div>
    );
};

export default VendingMachine;