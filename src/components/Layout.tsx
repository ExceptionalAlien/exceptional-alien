import { useState, useEffect } from "react";
import localFont from "next/font/local";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { Content } from "@prismicio/client";
import { CreatorsContext } from "@/context/CreatorsContext";
import { PlaybooksContext } from "@/context/PlaybooksContext";
import { GemsContext, Gems } from "@/context/GemsContext";
import { SearchContext, SearchResults } from "@/context/SearchContext";
import { SearchBoxContext } from "@/context/SearchBoxContext";
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [creators, setCreators] = useState<Content.CreatorDocument<string>[]>([]);
  const [playbooks, setPlaybooks] = useState<Content.PlaybookDocument<string>[]>([]);
  const [gems, setGems] = useState<Gems>({});

  const [searchResults, setSearchResults] = useState<SearchResults>({
    destinations: [],
    playbooks: [],
    creators: [],
    gems: [],
    query: "",
  });

  const [showingSearchBox, setShowingSearchBox] = useState(false);

  const css = `
  .gem-icon, .selected-gem .gem-icon-bg, .gem-text p {
    color: #${searchParams?.get("c") ? searchParams.get("c") : "2220c1"} !important;
  }
`;

  useEffect(() => {
    // Hack! - https://github.com/vercel/next.js/issues/37141
    var timeout: undefined | ReturnType<typeof setTimeout>;

    if (window.navigator.userAgent.match(/iPhone/i) && window.scrollY === 0) {
      window.scrollTo(0, 1);

      timeout = setTimeout(() => {
        window.scrollTo(0, 1);
      }, 25);
    }

    return () => clearTimeout(timeout);
  }, [router.asPath]);

  return (
    <CreatorsContext.Provider value={{ creators, setCreators }}>
      <PlaybooksContext.Provider value={{ playbooks, setPlaybooks }}>
        <GemsContext.Provider value={{ gems, setGems }}>
          <SearchContext.Provider value={{ searchResults, setSearchResults }}>
            <SearchBoxContext.Provider value={{ showingSearchBox, setShowingSearchBox }}>
              <style>{css}</style>

              <div className={`${helveticaMonospaced.variable} font-mono, ${neueHaasGrotesk.variable} font-sans`}>
                <div className="bg-white">
                  <div className="p-safe [&>main>section]:mt-8 [&>main>section]:pl-4 [&>main>section]:pr-4 [&>main>section]:md:mt-12 [&>main>section]:md:pl-6 [&>main>section]:md:pr-6 [&>main]:m-auto [&>main]:mt-12 [&>main]:min-h-[calc(100vh-336px)] [&>main]:pb-16 [&>main]:md:mt-20 [&>main]:md:min-h-[calc(100vh-368px)] [&>main]:md:pb-24">
                    {children}
                  </div>
                </div>

                <Footer />
                <Header />
              </div>
            </SearchBoxContext.Provider>
          </SearchContext.Provider>
        </GemsContext.Provider>
      </PlaybooksContext.Provider>
    </CreatorsContext.Provider>
  );
}
