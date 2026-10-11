
import { useEffect, useState } from "react";
import MovieCarousel from "../components/MovieCarousel";
import {
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  discoverMovies,
} from "../services/tmdb";
import { homeCarousels } from "../data/homeCarousels";
import { getPersonalizedRecommendations } from "../services/recommendations";

function Home() {
  const [carouselMovies, setCarouselMovies] = useState({});
  const [loading, setLoading] = useState(true);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function loadCarousels() {
      const results = await Promise.allSettled(
        homeCarousels.map(async (carousel) => {
          let movies = [];

          switch (carousel.type) {
            case "popular":
              movies = await getPopularMovies();
              break;

            case "topRated":
              movies = await getTopRatedMovies();
              break;

            case "trending":
              movies = await getTrendingMovies();
              break;

            case "discover":
              movies = await discoverMovies(carousel.params);
              break;

            default:
              break;
          }

          return {
            id: carousel.id,
            movies,
          };
        })
      );

      if (cancelled) return;

      const movieData = {};

      results.forEach((result) => {
        if (result.status === "fulfilled") {
          movieData[result.value.id] = result.value.movies;
        } else {
          console.error(
            "Erro ao carregar carrossel:",
            result.reason
          );
        }
      });

      setCarouselMovies(movieData);
      setLoading(false);
    }

    loadCarousels();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadRecommendations() {
        try {
        const data = await getPersonalizedRecommendations();

        if (!cancelled) {
            setRecommendedMovies(data);
        }
        } catch (error) {
        console.error(
            "Erro ao carregar recomendações:",
            error
        );
        }
    }

    loadRecommendations();

    return () => {
        cancelled = true;
    };
    }, []);

  return (
    <main>
      <h2>Descubra seu próximo filme</h2>

      <p>
        Explore filmes, avalie seus favoritos e crie
        suas próprias listas.
      </p>

      {loading && <p>Carregando filmes...</p>}

      {recommendedMovies.length > 0 && (
            <section>
                <h3>Recomendados para Você</h3>

                <MovieCarousel movies={recommendedMovies} />
            </section>
        )}

      {!loading &&
        homeCarousels.map((carousel) => {
          const movies = carouselMovies[carousel.id] || [];

          if (movies.length === 0) {
            return null;
          }

          return (
            <section key={carousel.id}>
              <h3>{carousel.title}</h3>

              <MovieCarousel movies={movies} />
            </section>
          );
        })}
    </main>
  );
}

export default Home;
