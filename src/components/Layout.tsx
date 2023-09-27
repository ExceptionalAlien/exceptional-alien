import localFont from "next/font/local";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const neueHaasGrotesk = localFont({
  src: [
    {
      path: "../fonts/NHaasGroteskDSStd 55Rg.woff2",
      weight: "400",
    },
    {
      path: "../fonts/NHaasGroteskDSStd 65Md.woff2",
      weight: "700",
    },
  ],
  variable: "--font-neue-haas-grotesk",
});

const helveticaMonospaced = localFont({
  src: [
    {
      path: "../fonts/Helvetica Monospaced W06 Rg.woff2",
      weight: "400",
    },
  ],
  variable: "--font-helvetica-monospaced",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${helveticaMonospaced.variable} font-mono, ${neueHaasGrotesk.variable} font-sans h-full`}>
      <div className="bg-white min-h-full [&>main]:min-h-full [&>main]:pt-12 [&>main]:md:pt-20 [&>main]:pb-12 [&>main]:md:pb-20 [&>main]:m-auto [&>main>section]:mt-8 [&>main>section]:md:mt-16">
        {children}
      </div>

      <Footer />
      <Header />
    </div>
  );
}
