
const FAVORITES_KEY = "cinelandia-favorites";

export function getFavorites() {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY);

    const favorites = saved ? JSON.parse(saved) : [];

    return Array.isArray(favorites) ? favorites : [];
  } catch (error) {
    console.error("Erro ao carregar favoritos:", error);
    return [];
  }
}

export function isFavorite(movieId) {
  const favorites = getFavorites();

  return favorites.includes(Number(movieId));
}

export function toggleFavorite(movieId) {
  const favorites = getFavorites();

  const id = Number(movieId);

  if (favorites.includes(id)) {
    const updated = favorites.filter(
      (favoriteId) => favoriteId !== id
    );

    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(updated)
    );

    return {
      success: true,
      isFavorite: false,
    };
  }

  if (favorites.length >= 4) {
    return {
      success: false,
      message: "Você só pode ter 4 filmes favoritos.",
    };
  }

  const updated = [...favorites, id];

  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(updated)
  );

  return {
    success: true,
    isFavorite: true,
  };
}
