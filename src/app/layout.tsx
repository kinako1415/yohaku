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
        <main>
          <ConditionalHeader />
          {children}
        </main>
        <ConditionalFooter />
      </body>
    </html>
  );
}
