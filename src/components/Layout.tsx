import { useState } from "react";
import localFont from "next/font/local";
import { Content } from "@prismicio/client";
import { CreatorsContext } from "@/context/CreatorsContext";
import { PlaybooksContext } from "@/context/PlaybooksContext";
import { GemsContext, Gems } from "@/context/GemsContext";
import { StoriesContext } from "@/context/StoriesContext";
import { SearchContext, Search } from "@/context/SearchContext";
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
  const [creators, setCreators] = useState<Content.CreatorDocument<string>[]>([]);
  const [playbooks, setPlaybooks] = useState<Content.PlaybookDocument<string>[]>([]);
  const [stories, setStories] = useState<Content.StoryDocument<string>[]>([]);
  const [gems, setGems] = useState<Gems>({});
  const [search, setSearch] = useState<Search>({ stories: [], destinations: [], playbooks: [], gems: [], creators: [] });

  return (
    <CreatorsContext.Provider value={{ creators, setCreators }}>
      <PlaybooksContext.Provider value={{ playbooks, setPlaybooks }}>
        <StoriesContext.Provider value={{ stories, setStories }}>
          <GemsContext.Provider value={{ gems, setGems }}>
            <SearchContext.Provider value={{ search, setSearch }}>
              <div className={`${helveticaMonospaced.variable} font-mono, ${neueHaasGrotesk.variable} font-sans`}>
                <div className="p-safe bg-white [&>main>section]:mt-8 [&>main>section]:pl-4 [&>main>section]:pr-4 [&>main>section]:md:mt-16 [&>main>section]:md:pl-6 [&>main>section]:md:pr-6 [&>main]:m-auto [&>main]:pb-12 [&>main]:pt-12 [&>main]:md:pb-20 [&>main]:md:pt-20">
                  {children}
                </div>

                <Footer />
                <Header />
              </div>
            </SearchContext.Provider>
          </GemsContext.Provider>
        </StoriesContext.Provider>
      </PlaybooksContext.Provider>
    </CreatorsContext.Provider>
  );
}
