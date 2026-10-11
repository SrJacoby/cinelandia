import Navbar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import SearchResults from "./pages/SearchResults";
import Watchlist from "./pages/Watchlist";
import WatchedMovies from "./pages/WatchedMovies";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home />}/>

        <Route path="/filme/:id" element={<MovieDetails />}/>
        <Route path="/lista" element={<Watchlist />}/>
        <Route path="/assistidos" element={<WatchedMovies />}/>
        <Route path="/perfil" element={<Profile />}/>
        <Route path="/busca" element={<SearchResults />}/>
      </Routes>
    </>
  );
}

export default App;
