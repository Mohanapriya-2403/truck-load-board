export default function Navbar() {
  return (
    <nav className="bg-redMain p-4 shadow-xl border-b-4 border-yellowMain">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-black italic tracking-tighter">
          🚛 TRUCK LOAD BOARD
        </h1>
        <div className="bg-yellowMain text-redMain px-4 py-1 rounded-full font-bold">
          LTL Marketplace
        </div>
      </div>
    </nav>
  );
}
