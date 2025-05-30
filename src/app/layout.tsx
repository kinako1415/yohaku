import "./globals.css";
import { Footer } from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body>
        <main>
          <Header />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
