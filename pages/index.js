import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";


function HomePage(props) {
  return(
  <Fragment>
    <Head>
      <title>React Meetups</title>
      <meta
        name="description"
        content="Browse a huge list of highly active React meetups!"
      />
    </Head>
    <MeetupList meetups={props.meetups} />
  </Fragment>
)}

//ayto einai gia local
// export async function getStaticProps() {
//   const client = await MongoClient.connect(
//     "mongodb+srv://bagelishbdb:xpTjF0gAIVHYhKxm@cluster0.peclj6k.mongodb.net/meetups?appName=Cluster0"
//   );
//   const db = client.db();
//   const meetupsCollection = db.collection("meetups");
//   const meetups = await meetupsCollection.find().toArray();
//   client.close();

//   return {
//     props: {
//       meetups: meetups.map((meetup) => ({
//         title: meetup.title,
//         address: meetup.address,
//         image: meetup.image,
//         id: meetup._id.toString(),
//       })),
//     },
//     revalidate: 1,
//   };
// }
//gia na to kanoyme host :

export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);

  const db = client.db("meetups");
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meestup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
