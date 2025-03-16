import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Install Lucide icons if needed
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300; // Adjust scrolling distance
      current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative p-6">
      <h1 className="text-3xl py-6 text-white">{title}</h1>

      {/* Left Arrow */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
        onClick={() => scroll("left")}
      >
        <ChevronLeft size={30} />
      </button>

      {/* Movie List */}
      <div className="flex overflow-x-scroll scrollbar-hide scroll-smooth" ref={scrollRef}>
        <div className="flex gap-4">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
        onClick={() => scroll("right")}
      >
        <ChevronRight size={30} />
      </button>
    </div>
  );
};

export default MovieList;
