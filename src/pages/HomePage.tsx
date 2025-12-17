import React from "react";

const HomePage: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-start w-screen min-h-screen text-center bg-linear-to-r from-cyan-300 to-pink-400 m-0 p-0 overflow-hidden relative -mt-10 md:-mt-16">
        <img
          src="/logo.png"
          alt="logo"
          className="h-150 w-auto drop-shadow-lg animate-[rollIn_3.5s_ease-out]"
        />
        <h1 className="text-4xl font-bold text-white mb-2 animate-[slidein_1.5s_ease-out]">
          Welcome to{" "}
          <strong className="bg-linear-to-r from-cyan-800 to-pink-800 bg-clip-text text-transparent">
            Magic Travel
          </strong>
        </h1>
        <h1 className="text-2xl text-white/90 animate-[slidein_1.5s_ease-out]">
          With us, every journey is{" "}
          <strong className="bg-linear-to-r from-cyan-800 to-pink-800 bg-clip-text text-transparent">
            MAGIC{" "}
          </strong>
          ✨
        </h1>

        <div className="absolute top-1/2 left-0 right-0 flex flex-col md:flex-row justify-between w-full px-10 -translate-y-1/2 gap-4 opacity-0 animate-[fadeInUp_1s_ease-out_2.5s_forwards]">
          <p className="w-1/3  rounded-lg p-4 shadow-2xl hover:shadow-xl transition-transform hover:scale-105 cursor-pointer text-cyan-600 text-xl bg-white/20 backdrop-blur-md">
            <strong className="bg-linear-to-r from-cyan-800 to-pink-800 bg-clip-text text-transparent">
              Explore Places
            </strong>{" "}
            lets you browse countries and world regions, add them to your
            favourites, and view detailed info. You can also search and filter
            by name, capital, continent, currency, language, and more.
          </p>
          <p className="w-1/3  rounded-lg p-4 shadow-2xl hover:shadow-xl transition-transform hover:scale-105 cursor-pointer text-cyan-600 text-xl bg-white/20 backdrop-blur-md">
            On the{" "}
            <strong className="bg-linear-to-r from-cyan-800 to-pink-800 bg-clip-text text-transparent">
              Favourites
            </strong>{" "}
            page, you can view, filter and delete the countries you’ve added.
            Click a country to see more details.{" "}
            <strong className="text-red-400">Note:</strong> "type"
            (Mainland/Island) is assigned automatically, so minor inaccuracies
            may occur.
          </p>
        </div>

        <div className="mt-12 flex justify-center px-10 opacity-0 animate-[fadeInUp_1s_ease-out_3.5s_forwards]">
          <p className="w-full max-w-2xl rounded-lg p-4 shadow-2xl hover:shadow-xl transition-transform hover:scale-105 cursor-pointer text-cyan-600 text-xl bg-white/20 backdrop-blur-md">
            Click{" "}
            <strong className="bg-linear-to-r from-cyan-800 to-pink-800 bg-clip-text text-transparent">
              Plan a Trip
            </strong>{" "}
            to drag and drop countries into your trip. If you’ve saved trips,
            the{" "}
            <strong className="bg-linear-to-r from-cyan-800 to-pink-800 bg-clip-text text-transparent">
              Saved Trips
            </strong>{" "}
            button in the navigation or{" "}
            <strong className="bg-linear-to-r from-cyan-800 to-pink-800 bg-clip-text text-transparent">
              Sidebar
            </strong>{" "}
            lets you view, explore, and delete them.
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
