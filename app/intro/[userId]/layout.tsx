import "./../../globals.css";


export default function IntroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-black text-white">
      {children}
    </div>
  );
}
