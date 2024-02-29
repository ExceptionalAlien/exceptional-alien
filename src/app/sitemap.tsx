import { createClient } from "@/prismicio";

export const fetchCache = "force-no-store";

export default async function sitemap() {
  const client = createClient({
    fetchOptions: {
      cache: "no-store",
    },
  });

  const destinationsData = await client.getAllByType("destination");
  const playbooksData = await client.getAllByType("playbook");
  const creatorsData = await client.getAllByType("creator");
  const gemsData = await client.getAllByType("gem");

  const destinations = destinationsData.map((item) => ({
    url: `https://www.exceptionalalien.com/destinations/${item.uid}`,
    lastModified: new Date(item.last_publication_date).toISOString(),
  }));

  const playbooks = playbooksData.map((item) => ({
    url: `https://www.exceptionalalien.com/travel-playbooks/${item.uid}`,
    lastModified: new Date(item.last_publication_date).toISOString(),
  }));

  const creators = creatorsData.map((item) => ({
    url: `https://www.exceptionalalien.com/contributors/${item.uid}`,
    lastModified: new Date(item.last_publication_date).toISOString(),
  }));

  const gems = gemsData.map((item) => ({
    url: `https://www.exceptionalalien.com/gems/${item.uid}`,
    lastModified: new Date(item.last_publication_date).toISOString(),
  }));

  return [
    {
      url: "https://www.exceptionalalien.com",
      lastModified: new Date(),
    },
    {
      url: "https://www.exceptionalalien.com/about",
      lastModified: new Date(),
    },
    {
      url: "https://www.exceptionalalien.com/contact",
      lastModified: new Date(),
    },
    {
      url: "https://www.exceptionalalien.com/terms-and-privacy",
      lastModified: new Date(),
    },
    {
      url: "https://www.exceptionalalien.com/destinations",
      lastModified: new Date(),
    },
    ...destinations,
    {
      url: "https://www.exceptionalalien.com/travel-playbooks",
      lastModified: new Date(),
    },
    ...playbooks,
    {
      url: "https://www.exceptionalalien.com/contributors",
      lastModified: new Date(),
    },
    ...creators,
    ...gems,
  ];
}
