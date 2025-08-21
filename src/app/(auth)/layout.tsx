import BackgroundFX from "@/components/BackgroundFX";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full bg-grid-pattern flex items-center justify-center p-4">
      <BackgroundFX />
      <main className="z-10">{children}</main>
    </div>
  );
}
