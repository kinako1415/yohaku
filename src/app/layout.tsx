import "./globals.css";
import ConditionalHeader from "./ConditionalHeader";
import ConditionalFooter from "./ConditionalFooter";

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
        <ConditionalFooter />
      </body>
    </html>
  );
}
