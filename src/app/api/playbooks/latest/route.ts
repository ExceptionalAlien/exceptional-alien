import { createClient } from "@/prismicio";

export async function GET(request: Request, { params }: { params: { destination: string } }) {
  const { searchParams } = new URL(request.url);
  const client = createClient();

  const playbooks = await client.getSingle("playbooks", {
    fetchOptions: {
      cache: "no-store",
    },
    fetchLinks:
      "playbook.sub_title,playbook.image,playbook.locked,playbook.creator,creator.first_name,creator.last_name,creator.title,playbook.destination,destination.title",
  });

  return Response.json(
    playbooks.data.featured.slice(
      0,
      searchParams.get("max") ? (searchParams.get("max") as unknown as number) : playbooks.data.featured.length
    )
  );
}
