// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { serverPusher } from "../../pusher";
import redis from "../../redis";
import { Message } from "../../typings";

type Data = {
  message: Message;
};

type ErrorData = {
  body: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== "POST") {
    res.status(405).json({ body: "Method Not Allowed" });
    return;
  }

  const { message } = req.body;

  const newMessage = {
    ...message,
    // Replace the timstamp of the user to the timestamp of the server
    created_at: Date.now(),
  };

  // push to upstash redis db

  // Hash (hset)
  // await redis.hset("messages", message.id, JSON.stringify(newMessage));

  await redis.hset("messages", message.id, JSON.stringify(newMessage));

  // Pusher push to pusher.com API to synchronize all clientside messages are same
  serverPusher.trigger("messages", "new-message", newMessage);

  res.status(200).json({ message: newMessage });
}
