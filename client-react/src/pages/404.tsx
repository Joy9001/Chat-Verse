import { Link } from "@tanstack/react-router";

export default function NotFoundPage() {
  return (
    <div className="font-dm min-h-screen bg-white">
      <div className="container mx-auto min-h-screen px-6 py-12 lg:flex lg:items-center lg:gap-12">
        <div className="w-full lg:w-1/2">
          <p className="text-sm font-medium text-black">404 error</p>
          <span className="text-sm font-medium text-black">Page Not Found</span>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
            Looks like you've found the doorway to the great nothing
          </h1>
          <p className="mt-4 text-gray-600">
            Sorry about that! Please visit our homepage to get where you need to
            go.
          </p>

          <div className="mt-6 flex items-center gap-x-3">
            <Link
              to="/chat"
              className="btn bg-primary w-1/2 shrink-0 rounded-lg px-5 py-2 text-sm tracking-wide text-white hover:bg-opacity-90 sm:w-auto"
            >
              Take me there
            </Link>
          </div>
        </div>

        <div className="relative mt-8 w-full lg:mt-0 lg:w-1/2">
          <img
            className="h-80 w-full rounded-lg object-cover md:h-96"
            src="https://i.ibb.co/ck1SGFJ/Group.png"
            alt="404"
          />
        </div>
      </div>
    </div>
  );
}
