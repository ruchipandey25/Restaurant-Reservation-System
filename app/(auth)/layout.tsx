import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center h-full items-center">
      <Image
        priority
        className="absolute top-0 -z-10 blur-sm object-cover"
        src={"/assets/auth.jpg"}
        alt="background"
        fill
      />
      {children}
    </div>
  );
}