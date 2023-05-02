import { type Listing } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export function Card({ listing }: { listing: Listing; }) {
  return (
    <div className="h-100 max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="relative h-48 w-full">
        <Image
          className="object-cover brightness-50 hover:brightness-100"
          src="/assets/sample.png"
          alt="item-image"
          fill
        />
      </div>
      <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {listing.name}
          </h5>
          <p>${listing.price}</p>
        <p className="mb-3 h-28 font-normal text-gray-700 dark:text-gray-400">
          {listing.description}
        </p>
        <Link
          href={`/listings/${listing.id}`}
          className="inline-flex items-center rounded-lg bg-green-400 px-3 py-2 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Read more
          <svg
            aria-hidden="true"
            className="-mr-1 ml-2 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}
