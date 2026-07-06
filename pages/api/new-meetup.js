

//ayto einai gia local 
// import { MongoClient } from "mongodb";
// async function handler(req, res) {
//   if (req.method === "POST") {
//     const data = req.body;
//     const client = await MongoClient.connect(
//       "mongodb+srv://bagelishbdb:xpTjF0gAIVHYhKxm@cluster0.peclj6k.mongodb.net/meetups?appName=Cluster0"
//     );

//     const db = client.db();
//     const meetupsCollection = db.collection("meetups");

//     const result = await meetupsCollection.insertOne(data);
//     console.log(result);
//     client.close();

//     res.status(201).json({ message: "Meetup added successfully!" });
//   }
// }
// export default handler;

//gia host se server(p.x. vercel)
import { MongoClient } from "mongodb";

let clientPromise;

function getClient() {
  if (!process.env.MONGODB_URI) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  if (!clientPromise) {
    const client = new MongoClient(process.env.MONGODB_URI);
    clientPromise = client.connect();
  }

  return clientPromise;
}

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const data = req.body;

    const client = await getClient();

    const db = client.db("meetups");
    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    return res.status(201).json({
      message: "Meetup added successfully!",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong while connecting to MongoDB",
    });
  }
}

export default handler;