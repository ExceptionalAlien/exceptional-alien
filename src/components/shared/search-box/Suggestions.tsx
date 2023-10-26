import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import Destination from "../Destination";

export default function Suggestions() {
  const [destinations, setDestinations] = useState<Content.DestinationsDocumentDataTrendingItem[]>([]);

  const loadData = async () => {
    var data = await getData("destinations");
    setDestinations((data as Content.DestinationsDocument).data.trending);
    data = await getData("creators");
    //console.log(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="mt-2 md:mt-4 pl-4 md:pl-6 pr-4 md:pr-6 md:text-center min-h-[76px] md:min-h-[46px]">
      {destinations.slice(0, 6).map((item, i) => (
        <Link
          href={`/destinations/${(item.destination as unknown as Content.DestinationDocument).uid}`}
          key={i}
          className="inline-block mt-2 ml-1 mr-1"
        >
          <Destination
            name={(item.destination as unknown as Content.DestinationDocument).data.title as string}
            classes="!static border font-normal border-ex-blue !text-ex-blue bg-white !p-[6px] md:!p-2 !pl-2 md:!pl-3 !pr-3 md:!pr-4 text-xs md:text-sm !h-4 md:!h-5 [&>svg]:align-[-4px] [&>svg]:md:align-[-5px]"
          />
        </Link>
      ))}
    </div>
  );
}

const getData = async (type: any) => {
  const client = createClient();

  const data = await client.getSingle(type, {
    fetchLinks: "destination.title,creator.first_name,creator.last_name",
  });

  return data;
};
