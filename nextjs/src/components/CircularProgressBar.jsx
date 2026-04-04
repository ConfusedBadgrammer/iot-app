function CircularProgressBar({
  value,
  min = 0,
  max = 100,
  size = 160,
  strokeWidth = 12,
  label,
  unit = "",
  diff = null,
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.min(Math.max((value - min) / (max - min), 0), 1);
  const offset = circumference - percent * circumference;

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#060E20"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-row items-center justify-center gap-1">
          <span className="text-3xl">
            {value != null ? value.toFixed(1) : "—"}
          </span>
          <div className="flex flex-col-reverse">
            {unit && <span className="text-sm text-[#94A3B9]">{unit}</span>}
            {diff != null && (
              <span
                className={`text-xs ${diff < 0 ? "text-(--color-accent)" : "text-red-400"}`}
              >
                {diff.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
      {label && (
        <span className="text-[11px] font-label font-semibold text-[#94A3B9] tracking-tight">
          {label}
        </span>
      )}
    </div>
  );
}

export default CircularProgressBar;
