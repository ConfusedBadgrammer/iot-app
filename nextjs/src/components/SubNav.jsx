"use client";

function SubNav({ devices, selected, onSelect }) {
  return (
    <div className="bg-[#121B2F] w-fit h-fit p-2 rounded-lg ">
      <nav className="flex gap-2">
        {devices.map(({ mac, label }) => (
          <button
            key={mac}
            onClick={() => onSelect(mac)}
            className={` cursor-pointer px-4 py-2 rounded transition-colors duration-300 ${
              selected === mac
                ? "bg-[#2D3449] text-cyan-300"
                : "text-[#95A2B9] hover:bg-[#2D3449] hover:text-cyan-300"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default SubNav;
