import { Outlet } from "@remix-run/react";
import { Link } from "@remix-run/react";

export default function TrainsPage() {
  return (
    <>
      <nav className="fixed bottom-0 flex w-full justify-between rounded-t border border-gray-400 bg-white p-3">
        <div className="absolute top-1 left-1/2 h-1 w-1/3 -translate-x-1/2 rounded bg-gray-500 "></div>
        <div className="flex gap-6">
          <Link
            to="/trains/rode"
            className="flex flex-col justify-center text-xl"
          >
            <span className="icon-[ic--outline-train] h-6 w-6 text-slate-600 transition-transform active:scale-75"></span>
          </Link>
          <Link
            to="/trains/interested"
            className="flex flex-col justify-center text-xl"
          >
            <span className="icon-[ic--round-bookmark-add] h-6 w-6 text-slate-600 transition-transform active:scale-75"></span>
          </Link>
        </div>
        <div>
          <button
            className="btn inline-block flex items-center rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
            type="button"
            id="button-addon2"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="search"
              className="w-4"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
              ></path>
            </svg>
          </button>
        </div>
      </nav>
      <div className="mx-2 h-full py-2">
        <Outlet />
      </div>
    </>
  );
}
