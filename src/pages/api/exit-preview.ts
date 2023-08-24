import { NextApiRequest, NextApiResponse } from "next";
import * as prismicNext from "@prismicio/next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  prismicNext.exitPreview({ req, res });
}
