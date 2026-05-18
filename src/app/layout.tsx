import "./globals.css";

export const metadata = {
  title: "AlignX",
  description: "Enterprise Goal Management Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
