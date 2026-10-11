import { getMovieRecommendations } from "./tmdb";

export async function getPersonalizedRecommendations() {
  const favoriteMovies = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (!key?.startsWith("cinelandia-rating-")) {
      continue;
    }

    const rating = Number(localStorage.getItem(key));

    if (rating >= 8 && rating <= 10) {
      const id = key.replace("cinelandia-rating-", "");

      favoriteMovies.push({
        id,
        rating,
      });
    }
  }

  // Prioriza os filmes com as maiores notas.
  favoriteMovies.sort((a, b) => b.rating - a.rating);

  // Consulta até 5 filmes bem avaliados.
  const selectedMovies = favoriteMovies.slice(0, 5);

  if (selectedMovies.length === 0) {
    return [];
  }

  const results = await Promise.allSettled(
    selectedMovies.map((movie) =>
      getMovieRecommendations(movie.id)
    )
  );

  const recommendations = results
    .filter((result) => result.status === "fulfilled")
    .flatMap((result) => result.value);

  // Remove filmes repetidos e aqueles já avaliados.
  const ratedIds = new Set(
    favoriteMovies.map((movie) => Number(movie.id))
  );

  const uniqueMovies = new Map();

  recommendations.forEach((movie) => {
    if (
      !ratedIds.has(movie.id) &&
      !uniqueMovies.has(movie.id)
    ) {
      uniqueMovies.set(movie.id, movie);
    }
  });

  return Array.from(uniqueMovies.values()).slice(0, 20);
}