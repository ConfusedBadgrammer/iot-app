function Card({ className = '', children }) {
  return <div className={`p-2 rounded-xl bg-[#222B3C] ${className}`}>{children}</div>
}

function CardTitle({ children }) {
  return <h2 className="font-bold text-lg font-headline">{children}</h2>
}

export { CardTitle }
export default Card
