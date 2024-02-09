import { createClient } from "@/prismicio";

export async function GET(request: Request, { params }: { params: { destination: string } }) {
  const { searchParams } = new URL(request.url);
  console.log(searchParams.get("max"));

  const client = createClient();

  const destination = await client.getSingle("playbooks", {
    fetchLinks: "playbook.title,playbook.image,playbook.creator,creator.first_name,creator.last_name,creator.title",
  });

  return Response.json(destination.data.featured);
}
