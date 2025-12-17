import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router";

export default function CartPage() {
  const {
    cartItems,
    loading,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
    refresh
  } = useContext(CartContext);

  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    country: "India"
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const total = cartItems.reduce(
    (sum, item) => sum + item.productId.price * item.qty,
    0
  );

  if (loading) return <div className="p-8">Loading cart…</div>;

  return (
    <div className="bg-white w-3/4 mx-auto p-6 rounded-lg mb-10">
      <h1 className="text-center font-bold text-xl mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          {/* CART ITEMS */}
          <div className="space-y-4">
            {cartItems.map(item => (
              <div
                key={item.productId._id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.productId.image}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-semibold">
                      {item.productId.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      ₹{item.productId.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => decreaseQty(item.productId._id)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(item.productId._id)}>+</button>
                </div>

                <p className="font-semibold">
                  ₹{item.productId.price * item.qty}
                </p>
              </div>
            ))}
          </div>

          {/* CHECKOUT */}
          <div className="mt-8 grid grid-cols-2 gap-6">
            {/* ADDRESS */}
            <div>
              <h3 className="font-semibold mb-3">Delivery Address</h3>
              {Object.keys(address).map(key => (
                <input
                  key={key}
                  placeholder={key}
                  value={address[key]}
                  onChange={e =>
                    setAddress({ ...address, [key]: e.target.value })
                  }
                  className="w-full border p-2 mb-2 rounded"
                />
              ))}
            </div>

            {/* SUMMARY */}
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Order Summary</h3>

              <p>Subtotal: ₹{total}</p>
              <p className="font-semibold mt-2">Total: ₹{total}</p>

              <div className="mt-4">
                <p className="font-medium mb-1">Payment Method</p>
                <select
                  value={paymentMethod}
                  onChange={e => setPaymentMethod(e.target.value)}
                  className="border p-2 rounded w-full"
                >
                  <option value="COD">Cash on Delivery</option>
                  <option value="Online">Online Payment</option>
                </select>
              </div>

              <button
                onClick={async () => {
                  const token = localStorage.getItem("token");

                  await fetch("http://localhost:3000/orders", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: token
                    },
                    body: JSON.stringify({
                      shippingAddress: address,
                      paymentMethod
                    })
                  });

                  await refresh();
                  navigate("/orders");
                }}
                className="mt-4 w-full bg-amber-900 text-white py-2 rounded"
              >
                Place Order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
