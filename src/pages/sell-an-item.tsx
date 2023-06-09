/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";

type SellItemForm = {
  name: string;
  description: string;
  price: string;
};

const SellAnItem: NextPage = () => {
  const createListing = api.listings.create.useMutation();
  const router = useRouter()

  const { register, handleSubmit } = useForm<SellItemForm>();
  const onSubmit = (formData: SellItemForm) => {

    createListing.mutateAsync({
      ...formData,
      price: parseFloat(formData.price),
    }).then(() => {
      router.push("/")
    })
  };
  return (
    <>
      <Head>
        <title>Offer Genie</title>
        <meta name="description" content="online-marketplace app" />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-500">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1>Sell an Item</h1>
          <form
            className="flex flex-col gap-4 md:w-6/12 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Item Name
              </label>
              <input
                id="name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                placeholder="What is your item?"
                {...register("name", { required: true })}
              />
            </div>
            <div>
              <label
                htmlFor="descrpition"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="descrpition"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                rows={4}
                placeholder="How's your item."
                {...register("description", { required: true })}
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                {...register("price", { required: true })}
              />
            </div>
            <button
              type="submit"
              className="mb-2 mr-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Create
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default SellAnItem;
