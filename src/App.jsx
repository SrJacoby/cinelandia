import Navbar from "./components/NavBar"
import {Routes, Route} from "react-router-dom"
import { useEffect, useState } from "react";
import { getPopularMovies, getTopRatedMovies } from "./services/tmdb";
getPopularMovies
import MovieCarousel from "./components/MovieCarousel";
import MovieDetails from "./pages/MovieDetails";
import SearchResults from "./pages/SearchResults";
import Watchlist from "./pages/Watchlist";

function App() {
  const [movies, setMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])

  useEffect(() => {
    async function loadMovies(){
      try{
        const data = await getPopularMovies()
        setMovies(data)

        const topRatedData = await getTopRatedMovies()
        setTopRatedMovies(topRatedData)
      } catch(error){
        console.error("Erro ao buscar filmes:", error)
      }
    }

    loadMovies()
  }, [])

  return (
    <Routes>
      <Route path="/" element={
        <>
          <Navbar/>

          <main>
            <h2>Descubra seu próximo filme</h2>
            <p>Explore filmes, avalie seus favoritos e crie suas próprias listas.</p>

            <section>
              <h3>Filmes em Destaque</h3>
              <MovieCarousel movies={movies} />
            </section>

            <section>
              <h3>Melhores Avaliados</h3>
              <MovieCarousel movies={topRatedMovies} />
            </section>
          </main>
        </>
      } />

      <Route path="/filme/:id" element={<MovieDetails />}></Route>
      <Route path="/lista" element={<Watchlist />}></Route>

      <Route path="/busca" element={<SearchResults />}></Route>
    </Routes>
  );
}

export default App;