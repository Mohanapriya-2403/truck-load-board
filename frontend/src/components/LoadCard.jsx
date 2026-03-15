export default function LoadCard({ load }) {
  return (
    <div className="bg-white border-4 border-redMain rounded-lg p-5 shadow-lg">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-800">{load.origin} ➔ {load.destination}</h3>
        <span className="text-2xl font-black text-green-600">${load.price}</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm font-bold text-redMain uppercase">
        <p>⚖️ {load.weight} kg</p>
        <p>📦 {load.pallets} Pallets</p>
      </div>
      <button className="mt-4 w-full bg-yellowMain py-2 font-black rounded hover:bg-yellow-500 transition">
        BOOK THIS LOAD
      </button>
    </div>
  );
}