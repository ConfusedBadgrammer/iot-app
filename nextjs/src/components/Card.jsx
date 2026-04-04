import { cn } from "@/lib/utils";

function Card({ className, children }) {
  return (
    <div
      className={cn("flex flex-col p-6 pt-4 rounded bg-[#222B3C]", className)}
    >
      {children}
    </div>
  );
}

function CardTitle({ className, children, label, icon }) {
  return (
    <div className="flex justify-between">
      <div>
        {label && (
          <label className="text-[#94A3B9] font-label font-semibold text-[11px] tracking-tight">
            {label}
          </label>
        )}
        <div className={cn("text-[20px] font-headline", className)}>
          {children}
        </div>
      </div>
      {icon && <div className="flex items-center">{icon}</div>}
    </div>
  );
}

function CardBody({ className, children }) {
  return <div className={cn("font-body", className)}>{children}</div>;
}

export { Card, CardTitle, CardBody };
