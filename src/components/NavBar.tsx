import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from 'next/image';

export function NavBar() {
  const user = useUser();

  return (
    <nav className="border-gray-200 bg-gray-400 dark:border-gray-700 dark:bg-gray-800">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link href="/" className="flex items-center">
          <Image src="/assets/logo.svg" alt="Logo" height={30} width={30}/>
          <span className="ml-4 self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            OfferGenie
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-solid-bg"
          type="button"
          className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="navbar-solid-bg"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
          <ul className="mt-4 flex flex-col rounded-lg bg-gray-50 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent md:dark:bg-transparent">
            <li>
              <Link
                href="/"
                className="green-700 dark:green-600 block rounded py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 md:text-green-400 md:dark:bg-transparent md:dark:text-green-400"
                aria-current="page"
              >
                Browse
              </Link>
            </li>
            {user.isSignedIn && (
              <>
                <li>
                  <Link
                    href="/offers"
                    className="green-700 dark:green-600 block rounded py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 md:text-green-400 md:dark:bg-transparent md:dark:text-green-400"
                    aria-current="page"
                  >
                    Offers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sell-an-item"
                    className="green-700 dark:green-600 block rounded py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 md:text-green-400 md:dark:bg-transparent md:dark:text-green-400"
                    aria-current="page"
                  >
                    Sell an Item
                  </Link>
                </li>
              </>
            )}
            {!user.isSignedIn && (
              <li>
                <SignInButton>
                  <span className="hover:tegreen-500 cursor-pointer text-white">
                    Sign In
                  </span>
                </SignInButton>
              </li>
            )}
            <li>
              <UserButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
