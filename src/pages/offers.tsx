import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const messages = api.listings.getMessage.useQuery();
  // console.log(listings);

  return (
    <>
      <Head>
        <title>Offer Genie</title>
        <meta name="description" content="online-marketplace app" />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col gap-12 bg-gray-500">
        <div className="container mx-auto ">
          <h1 className="mt-12 pl-4 text-4xl">Your Offers</h1>

          <div className="relative overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    From
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Message
                  </th>
                </tr>
              </thead>
              <tbody>
                {messages?.data?.map((message) => (
                  <tr
                    key={message.id}
                    className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <td className="px-6 py-4">{message.fromUserName}</td>
                    <td className="px-6 py-4">{message.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
