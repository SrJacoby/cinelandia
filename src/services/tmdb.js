import axios from "axios"

const tmdb = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        "Content-Type": "application/json",
    }
})

export async function getPopularMovies() {
    const response = await tmdb.get("/movie/popular", {
        params:{
            language: "pt-BR",
        },
    })

    return response.data.results
}

export async function getTopRatedMovies(){
    const response = await tmdb.get("/movie/top_rated", {
        params:{
            language: "pt-BR",
        },
    })

    return response.data.results
}

export async function getMovieDetails(id){
    const response = await tmdb.get(`/movie/${id}`, {
        params:{
            language: "pt-BR",
        },
    })

    return response.data
}

export async function searchMovies(query){
    const response = await tmdb.get("/search/movie", {
        params: {
            query,
            language: "pt-BR",
        },
    })

    return response.data.results
}

export async function discoverMovies(params = {}) {
  const response = await tmdb.get("/discover/movie", {
    params: {
      language: "pt-BR",
      sort_by: "popularity.desc",
      include_adult: false,
      ...params,
    },
  });

  return response.data.results;
}

export async function getTrendingMovies() {
  const response = await tmdb.get("/trending/movie/week", {
    params: {
      language: "pt-BR",
    },
  });

  return response.data.results;
}

export async function getMovieRecommendations(id) {
  const response = await tmdb.get(
    `/movie/${id}/recommendations`,
    {
      params: {
        language: "pt-BR",
      },
    }
  );

  return response.data.results;
}

export default tmdb