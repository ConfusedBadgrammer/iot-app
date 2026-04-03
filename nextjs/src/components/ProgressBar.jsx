function ProgressBar({ value, max, color, marker, className = "" }) {
  const percent = Math.min((value / max) * 100, 100);
  const markerPercent = marker != null ? Math.min((marker / max) * 100, 100) : null;
  const fill = color ? { backgroundColor: color } : undefined;
  return (
    <div className="relative">
      <div className="w-full h-2 rounded overflow-hidden bg-[#060E20]">
        <div
          className={`h-full w-full ${!color ? "bg-linear-to-r from-[#00DBF2] to-[#FF240D]" : ""} ${className}`}
          style={{ clipPath: `inset(0 ${100 - percent}% 0 0)`, ...fill }}
        />
      </div>
      {markerPercent != null && (
        <div
          className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-white rounded"
          style={{ left: `${markerPercent}%` }}
        >
          <span
            className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-[#94A3B9] whitespace-nowrap"
          >
            {marker}°
          </span>
        </div>
      )}
    </div>
  );
}

export default ProgressBar;
