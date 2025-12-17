import { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router";   

export default function Products() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();                 

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://ecommerce-backend-zpvu.onrender.com/products");
      const data = await res.json();
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-10 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto">
      {products.map((prod) => (
        <Card
          key={prod.id}
          id={prod.id}
          image={prod.image}
          title={prod.name}
          description={prod.description || ""}
          price={prod.price}
          onAdd={async () => {
            await addToCart(prod._id);

            navigate("/cart");               
          }}
        />
      ))}
    </div>
  );
}
