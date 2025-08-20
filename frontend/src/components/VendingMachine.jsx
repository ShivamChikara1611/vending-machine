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

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
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
        <div className="relative h-[88.5vh] py-8">

            {/* Product List */}
            <div className="flex flex-col justify-center items-center w-full h-full">

                {/* vending machine name heading */}
                <h1 className="text-3xl tracking-wider font-thin text-center">
                    Welcome to <span className="text-primary font-normal">{vendingMachineData.location}'s</span> Vending Machine
                </h1>

                {/* search button */}
                <input
                    type="text"
                    placeholder="Search by product name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-200 mt-4 w-full max-w-[300px] p-2 rounded"
                />

                {/* grid container */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 p-5 bg-zinc-700 overflow-y-scroll mt-4 mx-1">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-sm max-w-60 p-2 group relative"
                            >
                                <p className="text-primary tracking-wider">
                                    {item.product_name}
                                </p>
                                <div className="flex gap-2 items-center mt-0.5">
                                    <p className="text-gray-500 text-sm tracking-wider">
                                        {yen}
                                        {item.price}
                                    </p>
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="bg-primary text-gray-200 text-xs cursor-pointer rounded-full px-2 py-0.5 font-thin"
                                    >
                                        Add
                                    </button>

                                </div>


                                <div className="absolute w-[30px] h-[30px] bottom-0 right-0 bg-primary rounded-t-full rounded-l-full p-1 flex justify-center items-center">
                                    <p className="text-gray-200 text-sm">
                                        {item.stock}
                                    </p>
                                </div>

                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 italic">No products found.</p>
                    )}
                </div>
            </div>

            {/* cart show/hide button */}
            <div className="absolute top-3 right-3 bg-zinc-600 rounded-full flex justify-center items-center p-2 z-40 cursor-pointer">
                <button onClick={toggleCart} className="cursor-pointer w-6 rounded-full">{isCartOpen ? <img src={assets.close} alt="close" /> : <img className="invert" src={assets.cart} alt="cart" />}
                    {cart.length > 0 && !isCartOpen && (
                        <sup className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">{cart.length}</sup>)}
                </button>
            </div>

            {/* Cart */}
            <div className="absolute bottom-0 right-0 h-full z-[30] w-full md:w-1/2 lg:w-1/4">
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
        </div>
    );
};

export default VendingMachine;