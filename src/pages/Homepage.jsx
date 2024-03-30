import HomeHeader from "../components/HomeHeader";

function Homepage() {
  return (
    <div className="h-dvh bg-slate-950 text-slate-100">
      <div className="grid grid-rows-[auto_1fr_auto]">
        <header className="grid grid-rows-[auto_1fr] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-600 via-violet-950 to-slate-950">
          <div className="mx-auto w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
            <HomeHeader />
          </div>
          <div className="mt-8 rounded-3xl">
            <div className="mt-24 flex flex-col items-center justify-center gap-4">
              <h1 className="text-center text-6xl font-semibold">
                Welcome to SwiftChat
              </h1>
              <p className="text-center text-xl">
                A simple chat application for all your needs
              </p>
              <div className="my-16">
                <a
                  href="/signup"
                  className="rounded-lg bg-purple-600 px-8 py-4 text-xl font-semibold uppercase tracking-wide text-slate-100 transition-colors duration-300 hover:bg-purple-700"
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
        </header>
        <main></main>
        <footer></footer>
      </div>
    </div>
  );
}

export default Homepage;
