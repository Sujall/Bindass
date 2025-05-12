import Image from "next/image";

const Grid = () => {
  const giveaways = [
    {
      id: 1,

      seats: { current: 742, total: 1500 },
      entryFee: "₹19",
      image: "/images/iphone(1).png",
    },
    {
      id: 2,

      seats: { current: 325, total: 1000 },
      entryFee: "₹29",
      image: "/images/iphone.png",
    },
    {
      id: 3,

      seats: { current: 325, total: 1000 },
      entryFee: "₹29",
      image: "/images/iphone.png",
    },
    {
      id: 4,

      seats: { current: 325, total: 1000 },
      entryFee: "₹29",
      image: "/images/iphone.png",
    },
    {
      id: 5,

      seats: { current: 325, total: 1000 },
      entryFee: "₹29",
      image: "/images/iphone.png",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 uppercase">
        Latest Giveaways
      </h2>
      <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
        {giveaways.map((item) => (
          <div
            key={item.id}
            className="border-2 border-gray-200 rounded-lg overflow-hidden shadow-sm"
          >
            {/* Image Section (Top) */}
            <div className="relative h-48 w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content Section (Bottom) */}
            <div className="p-6">
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="text-sm uppercase tracking-widest text-purple-600 mt-1">
                {item.subtitle}
              </p>
              <p className="text-gray-600 mt-2">{item.description}</p>
              <p className="text-2xl font-bold text-purple-600 mt-2">
                {item.highlight}
              </p>

              <div className="my-4">
                <h4 className="text-xl font-semibold mb-3">
                  {item.title} Giveaway: Black, Bold & Yours to Win!
                </h4>

                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <span className="text-yellow-500 mr-2">🟡</span>
                    <span>Win the brand-new {item.title} (Black, 128 GB)!</span>
                  </li>
                  {/* Add more list items as needed */}
                </ul>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Seats:</p>
                    <p className="font-medium">
                      {item.seats.current}/{item.seats.total}
                    </p>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Available
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                <p className="text-gray-600">
                  Entry fee: <span className="font-bold">{item.entryFee}</span>
                </p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full">
                  Join Giveaway
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
