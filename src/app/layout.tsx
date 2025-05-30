import "./globals.css";
import { Footer } from "@/components/layouts/Footer";
import ConditionalHeader from "./ConditionalHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body>
        <ConditionalHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
