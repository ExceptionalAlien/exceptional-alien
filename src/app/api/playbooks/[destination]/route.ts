import { createClient } from "@/prismicio";

export async function GET(request: Request, { params }: { params: { destination: string } }) {
  const client = createClient();
  const destination = await client.getByUID("destination", params.destination, {
    fetchLinks:
      "playbook.title,playbook.image,playbook.creator,creator.first_name,creator.last_name,creator.profile_image",
  });
  return Response.json(destination.data.featured);
}
