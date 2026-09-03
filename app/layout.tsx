import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "./_components/theme-provider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Payslip Invoicing",
  description: "Modern admin, login, and backend foundation for payslip invoicing.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var key="payslip-theme";var stored=localStorage.getItem(key);var theme=stored==="light"||stored==="dark"?stored:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;}catch(e){document.documentElement.dataset.theme="dark";document.documentElement.style.colorScheme="dark";}})();`,
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
