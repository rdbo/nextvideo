import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextVideo",
  description: "Open-source video upload platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-950`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen">
            <header className="sticky top-0 bg-slate-950 border-b border-slate-800 z-50">
              <NavBar />
            </header>
            <main>{children}</main>
          </div>
          <footer className="h-40 flex items-center justify-center border-t border-slate-800 text-slate-200">
            <p>Copyright (C) Rdbo - 2024</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
