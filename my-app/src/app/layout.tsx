import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EcoVance",
  description: "EcoVance: Energia Sustentável, Futuro Responsável.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
