
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getFavorites } from "../services/favorites";
import { getMovieDetails } from "../services/tmdb";

function FavoriteMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadFavorites() {
      try {
        const favoriteIds = getFavorites();

        const results = await Promise.allSettled(
          favoriteIds.map((id) => getMovieDetails(id))
        );

        if (cancelled) return;

        const favoriteMovies = results
          .filter((result) => result.status === "fulfilled")
          .map((result) => result.value);

        setMovies(favoriteMovies);
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadFavorites();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="favorite-movies-section">
      <div className="favorite-movies-header">
        <h3>Meus filmes favoritos</h3>
        <span>{movies.length} / 4</span>
      </div>

      {loading ? (
        <p>Carregando favoritos...</p>
      ) : (
        <div className="favorite-movies-grid">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/filme/${movie.id}`}
              className="favorite-movie"
              title={movie.title}
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={`Pôster de ${movie.title}`}
                />
              ) : (
                <div className="favorite-movie-placeholder">
                  Sem pôster
                </div>
              )}
            </Link>
          ))}

          {Array.from({
            length: Math.max(0, 4 - movies.length),
          }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="favorite-movie-empty"
              title="Espaço disponível para um filme favorito"
            >
              <span>+</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default FavoriteMovies;
