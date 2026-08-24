import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Consultoría IA FMC | Transformación & IA",
  description:
    "Consultoría de transformación e inteligencia artificial para empresas e instituciones educativas.",
  openGraph: {
    title: "Consultoría IA FMC",
    description:
      "Estrategia, personas, procesos y tecnología para integrar IA con sentido organizacional.",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#063c35"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR">
      <body>{children}</body>
    </html>
  );
}
