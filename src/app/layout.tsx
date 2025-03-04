import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
// import SermonProvider from "@/providers/SermonProvider";

const ubuntu = Ubuntu({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amazing Grace Heirs",
  description:
    "Devoted puritans committed to studying God's word, walking in total submission to Jesus Christ, and raising disciples whose sole desire is to glorify God.",
  icons: {
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <head>
        <script src="https://js.pusher.com/beams/1.0/push-notifications-cdn.js"></script>
      </head> */}
      <body className={ubuntu.className}>
        {/* <SermonProvider /> */}
        {children}
      </body>
    </html>
  );
}
