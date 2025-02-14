import type { Metadata } from "next";
import { Libre_Baskerville } from "next/font/google";
import "./globals.css";

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amazing Grace Covenant Prayer Assembly",
  description:
    "Devoted puritans committed to studying God's word, walking in total submission to Jesus Christ, and raising disciples whose sole desire is to glorify God.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={libreBaskerville.className}>{children}</body>
    </html>
  );
}
