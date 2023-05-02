/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";

const ListingView: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<{ message: string }>();

  const listing = api.listings.get.useQuery(
    {
      listingId: router.query.id as string,
    },
    {
      enabled: !!router.query.id,
    }
  );

  const user = useUser();
  const sendMessage = api.listings.sendMessage.useMutation();

  const listingItem = listing.data;
  if (!listingItem) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Offer Genie</title>
        <meta name="description" content="online-marketplace app" />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col gap-12 bg-gray-500">
        <div className="container mx-auto flex flex-col gap-12">
          <h1 className="mt-12 text-4xl">{listingItem.name}</h1>
          <p>{listingItem.description}</p>
          <p>$ {listingItem.price}</p>

          {user.isSignedIn && (
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit((formData) => {
                sendMessage
                  .mutateAsync({
                    message: formData.message,
                    listingId: listingItem.id,
                    fromUserName: user.user?.firstName ?? "unknown",
                  })
                  .then(() => {
                    reset();
                  });
              })}
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Message
                </label>
                <textarea
                  id="name"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                  {...register("message", { required: true })}
                />
              </div>
              <button className="inline-flex items-center rounded-lg bg-green-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Send Message
              </button>
            </form>
          )}
        </div>
      </main>
    </>
  );
};

export default ListingView;
