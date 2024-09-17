import type { NextApiRequest, NextApiResponse } from 'next'
// @ts-ignore
import mailchimp from "@mailchimp/mailchimp_marketing";

export default async function handler(req: NextApiRequest, resp: NextApiResponse) {
  if (req.method !== 'POST') {
    resp.setHeader('Allow', ['POST']);
    return resp.status(405).json({
      error: 'method not allowed'
    });
  }

  const { email } = req.body;
  console.log('Intercepted API : ' + email)

  if (!email) {
    return resp.status(400).json({ error: "Email is required" });
  }

  // TODO: audience ID same.. TAG based on PLAYBOOK ID !

  mailchimp.setConfig({
      apiKey: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY,
      server: process.env.NEXT_PUBLIC_MAILCHIMP_API_SERVER,
  });

  try {
    await mailchimp.lists.addListMember(process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: "subscribed",
      tags: [ "Concierge: Pier One" ],
    });

  } catch (error: any) {
    console.error(error.message)
    //return resp.status(500).json({ error: error.message || error.toString() });
  }

  return resp.status(200).json({
    message: 'subscribed'
  });
}