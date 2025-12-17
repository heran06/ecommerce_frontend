import Header from "./components/Header";
import Card from "./components/Card";
import Footer from "./components/Footer";

function App() {
  const products = [
    {
      id: 1,
      image:
        "https://plumgoodness.com/cdn/shop/files/001_9013bf85-0761-4afd-80a3-878cf4665ce5.jpg",
      title: "Hydra Glow Serum",
      description: "Boosts radiance & hydration",
      price: 899,
    },
    {
      id: 2,
      image: "https://www.vilvahstore.com/cdn/shop/files/1_25.jpg",
      title: "Gentle Foam Cleanser",
      description: "For sensitive skin",
      price: 499,
    },
    {
      id: 3,
      image: "https://cdn.shopify.com/s/files/1/0609/6096/4855/files/SLIDE1_3949c556-b56a-460b-80dc-c8d8a75167ec.jpg",
      title: "Hydrating Facial Toner",
      description: "Refreshes & soothes",
      price: 549,
    },
  ];

  return (
    <>

      <div className="max-w-6xl mx-auto p-8">
        <section className="mb-12">
          <h1 className="text-3xl font-semibold mb-6">Top picks</h1>
          <div className="p-4 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {products.slice(0, 3).map((prod) => (
              <Card
                key={prod.id}
                id={prod.id}
                image={prod.image}
                title={prod.title}
                description={prod.description}
                price={`${prod.price}`}
              />
            ))}
          </div>
        </section>
        
      </div>
    </>
  );
}

export default App;
