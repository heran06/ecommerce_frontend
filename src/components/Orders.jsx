import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  const fetchOrders = () => {
    fetch("https://ecommerce-backend-zpvu.onrender.com/orders", {
      headers: { Authorization: token }
    })
      .then(res => res.json())
      .then(data => setOrders(data));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancelOrder = async (orderId) => {
    await fetch(`https://ecommerce-backend-zpvu.onrender.com/orders/cancel/${orderId}`, {
      method: "PUT",
      headers: {
        Authorization: token
      }
    });

    fetchOrders(); // refresh after cancel
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map(order => (
          <div
            key={order._id}
            className="border p-6 mb-6 rounded-lg"
          >
            {/* Header */}
            <div className="flex justify-between mb-2">
              <p className="font-semibold">
                Total: ₹{order.totalAmount}
              </p>
              <p className="text-sm text-gray-500">
                Status: {order.status}
              </p>
            </div>

            {/* Products */}
            {order.items.map(item => (
              <div
                key={item._id}
                className="flex gap-4 border-b pb-3 mb-3"
              >
                <img
                  src={item.productId.image}
                  alt={item.productId.name}
                  className="w-16 h-16 rounded"
                />
                <div className="flex-1">
                  <p>{item.productId.name}</p>
                  <p className="text-sm text-gray-500">
                    ₹{item.productId.price} × {item.qty}
                  </p>
                </div>
                <p className="font-semibold">
                  ₹{item.productId.price * item.qty}
                </p>
              </div>
            ))}

            {/* Delivery Address */}
            <div className="mt-4 bg-gray-50 p-4 rounded">
              <h3 className="font-semibold mb-1">
                Delivery Address
              </h3>
              <p>{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.phone}</p>
              <p>{order.shippingAddress.addressLine}</p>
              <p>
                {order.shippingAddress.city},{" "}
                {order.shippingAddress.state} –{" "}
                {order.shippingAddress.pincode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>

            {/* ✅ CANCEL ORDER BUTTON */}
            {order.status !== "Delivered" &&
              order.status !== "Cancelled" && (
                <button
                  onClick={() => cancelOrder(order._id)}
                  className="mt-4 text-red-600 border border-red-600 px-4 py-2 rounded hover:bg-red-50"
                >
                  Cancel Order
                </button>
              )}
          </div>
        ))
      )}
    </div>
  );
}
