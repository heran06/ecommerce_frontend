const Card = ({ id, image, title, description, price, onAdd }) => {
  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden flex flex-col">
      <div className="w-full h-52">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">{description}</p>

        <span className="text-lg font-semibold">₹{price}</span>

        {onAdd ? (
          <div className="mt-auto flex justify-center pt-4">
            <button
              onClick={onAdd}
              className="px-6 py-2 bg-amber-900 text-white text-sm rounded-full hover:bg-amber-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ) : (
          <div className="mt-auto pt-4" />
        )}
      </div>
    </div>
  );
};

export default Card;
