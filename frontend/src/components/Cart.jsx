import React from "react";

const Cart = ({
    cart,
    isCartOpen,
    toggleCart,
    decrementFromCart,
    addToCart,
    cancelPayment,
    checkout,
    yen,
    assets,
}) => {
    const totalAmount = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className={`backdrop-blur-2xl bg-white/50 pt-10 overflow-y-scroll absolute right-0 h-full w-1/2 lg:w-1/3 p-3 text-primary rounded-l-lg ${isCartOpen ? 'block' : 'hidden'}`}>
            <button onClick={toggleCart} className="cursor-pointer h-5 w-5 absolute top-3 right-3">
                <img src={assets.close} alt="close" />
            </button>
            {cart.length > 0 ? (
                <>
                    {cart.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center border-b border-gray-400 py-2"
                        >
                            <div>
                                <p>{item.product_name}</p>
                                <p>
                                    {item.quantity} × {yen}
                                    {item.price}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => decrementFromCart(item.product_id)}
                                    className="bg-yellow-600 text-white px-2 py-1 rounded text-xs cursor-pointer"
                                >
                                    -
                                </button>
                                <button
                                    onClick={() => addToCart(item)}
                                    className="bg-gray-200 text-primary px-2 py-1 rounded text-xs cursor-pointer"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                    {/* Total & Payment Buttons */}
                    <div className="mt-4">
                        <p className="text-lg font-semibold text-center mb-3">
                            Total: {yen}{totalAmount}
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={cancelPayment}
                                className="w-1/2 bg-primary text-white py-2 rounded cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={checkout}
                                className="w-1/2 bg-green-700 text-white py-2 rounded cursor-pointer"
                            >
                                Complete
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <p className="italic text-gray-600 flex justify-center items-center h-120">Cart is empty</p>
            )}
        </div>
    );
};

export default Cart;