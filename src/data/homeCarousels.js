
export const homeCarousels = [
  {
    id: "popular",
    title: "Filmes Populares",
    type: "popular",
  },
  {
    id: "top-rated",
    title: "Melhores Avaliados",
    type: "topRated",
  },
  {
    id: "trending",
    title: "Em Alta Nesta Semana",
    type: "trending",
  },
  {
    id: "releases",
    title: "Lançamentos Recentes",
    type: "discover",
    params: {
      sort_by: "primary_release_date.desc",
      "vote_count.gte": 20,
      "primary_release_date.lte": new Date()
        .toISOString()
        .slice(0, 10),
    },
  },
  {
    id: "horror",
    title: "Terror",
    type: "discover",
    params: { with_genres: 27 },
  },
  {
    id: "thriller",
    title: "Suspense",
    type: "discover",
    params: { with_genres: 53 },
  },
  {
    id: "scifi",
    title: "Ficção Científica",
    type: "discover",
    params: { with_genres: 878 },
  },
  {
    id: "fantasy",
    title: "Fantasia",
    type: "discover",
    params: { with_genres: 14 },
  },
  {
    id: "adventure",
    title: "Aventura",
    type: "discover",
    params: { with_genres: 12 },
  },
  {
    id: "action",
    title: "Ação",
    type: "discover",
    params: { with_genres: 28 },
  },
  {
    id: "comedy",
    title: "Comédia",
    type: "discover",
    params: { with_genres: 35 },
  },
  {
    id: "animation",
    title: "Animação",
    type: "discover",
    params: { with_genres: 16 },
  },
  {
    id: "romance",
    title: "Romance",
    type: "discover",
    params: { with_genres: 10749 },
  },
  {
    id: "1970s",
    title: "Clássicos dos Anos 70",
    type: "discover",
    params: {
      "primary_release_date.gte": "1970-01-01",
      "primary_release_date.lte": "1979-12-31",
      sort_by: "vote_average.desc",
      "vote_count.gte": 500,
    },
  },
  {
    id: "1980s",
    title: "Cinema dos Anos 80",
    type: "discover",
    params: {
      "primary_release_date.gte": "1980-01-01",
      "primary_release_date.lte": "1989-12-31",
      sort_by: "popularity.desc",
    },
  },
  {
    id: "1990s",
    title: "Nostalgia dos Anos 90",
    type: "discover",
    params: {
      "primary_release_date.gte": "1990-01-01",
      "primary_release_date.lte": "1999-12-31",
      sort_by: "popularity.desc",
    },
  },
  {
    id: "2000s",
    title: "Sucessos dos Anos 2000",
    type: "discover",
    params: {
      "primary_release_date.gte": "2000-01-01",
      "primary_release_date.lte": "2009-12-31",
      sort_by: "popularity.desc",
    },
  },
];
