import { createClient } from "@/prismicio";

export async function GET(request: Request, { params }: { params: { destination: string } }) {
  const client = createClient();
  const { searchParams } = new URL(request.url);

  const destination = await client.getByUID("destination", params.destination, {
    fetchOptions: {
      cache: "no-store",
    },
    fetchLinks:
      "playbook.slices,playbook.sub_title,playbook.app_title,playbook.image,playbook.locked,playbook.creator,creator.first_name,creator.last_name,creator.title,playbook.destination,destination.title",
  });

  return Response.json(
    destination.data.featured.slice(
      0,
      searchParams.get("max") ? (searchParams.get("max") as unknown as number) : destination.data.featured.length
    )
  );
}
