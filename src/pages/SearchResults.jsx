import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../services/tmdb";

function SearchResults(){
    const [searchParams] = useSearchParams()

    const query = searchParams.get("q")

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadMovies() {
            if(!query){
                setMovies([])
                setLoading(false)
                return
            }

            try{
                setLoading(true)
                
                const data = await searchMovies(query)

                setMovies(data)
            } catch(error){
                console.error("Erro ao buscar filmes:", error)
            } finally{
                setLoading(false)
            }
        }
        loadMovies()
    }, [query])

    if(loading){
        return <p>Buscando filmes...</p>
    }

    return (
        <main>
            <h2>Resultados para "{query}"</h2>

            {movies.length === 0 ? (
                <p>Nenhum filme encontrado.</p>
            ) : (
                <div className="search-results">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>
            )}
        </main>
    )
}

export default SearchResults