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
    <div className="mt-2 md:mt-3 pl-4 md:pl-6 pr-4 md:pr-6 text-center">
      {destinations.map((item, i) => (
        <Link
          href={`/destinations/${(item.destination as unknown as Content.DestinationDocument).uid}`}
          key={i}
          className="inline-block mt-2 md:mt-[10px] ml-1 md:ml-[6px] mr-1 md:mr-[6px]"
        >
          <Destination
            name={(item.destination as unknown as Content.DestinationDocument).data.title as string}
            classes="!static border-[1.5px] font-normal border-ex-blue !text-ex-blue bg-white !p-[6px] !pl-[10px] !pr-[10px]"
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
