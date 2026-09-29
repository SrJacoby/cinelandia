import { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";

function MovieCarousel({ movies }) {
  const carouselRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  function updateCarouselButtons() {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(
      scrollLeft + clientWidth < scrollWidth - 1
    );
  }

  function scrollCarousel(direction) {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: direction * 400,
        behavior: "smooth",
      });
    }
  }

  useEffect(() => {
    updateCarouselButtons();
  }, [movies]);

  return (
    <div className="movie-carousel-container">
      <button
        className="carousel-button carousel-button-left"
        onClick={() => scrollCarousel(-1)}
        disabled={!canScrollLeft}
      >
        ‹
      </button>

      <div
        className="movie-carousel"
        ref={carouselRef}
        onScroll={updateCarouselButtons}
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>

      <button
        className="carousel-button carousel-button-right"
        onClick={() => scrollCarousel(1)}
        disabled={!canScrollRight}
      >
        ›
      </button>
    </div>
  );
}

export default MovieCarousel;