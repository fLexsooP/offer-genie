import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { Card } from "../components/Card";

const Home: NextPage = () => {
  const listings = api.listings.list.useQuery();
  // console.log(listings);

  return (
    <>
      <Head>
        <title>Offer Genie</title>
        <meta name="description" content="online-marketplace app" />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col gap-12 bg-gray-500">
          <h1 className="mt-12 ml-28 pl-4 text-4xl">Items For Sale</h1>
          <div className="container grid grid-cols-4 items-center justify-center gap-6 px-4 py-16 ml-28">
            {listings?.data?.map((listing) => (
              <Card key={listing.id} listing={listing} />
            ))}
        </div>
      </main>
    </>
  );
};

export default Home;
