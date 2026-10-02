import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getMovieDetails } from "../services/tmdb";

function WatchedMovies(){
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadWatchedMovies() {
            try{
                const movieIds = []

                for(let i = 0; i < localStorage.length; i++){
                    const key = localStorage.key(i)

                    if(
                        key?.startsWith("cinelandia-watched-") &&
                        localStorage.getItem(key) === "true"
                    ) {
                        const id = key.replace("cinelandia-watched-", "")

                        movieIds.push(id)
                    }
                }

                const moviePromises = movieIds.map((id) => 
                    getMovieDetails(id)
                )

                const movieData = await Promise.all(moviePromises)

                setMovies(movieData)
            } catch(error){
                console.error("Erro ao carregar filmes assistidos", error)
            } finally {
                setLoading(false)
            }
        }

        loadWatchedMovies()
    }, [])

    if(loading){
        return(
            <main>
                <p>Carregando filmes assistidos...</p>
            </main>
        )
    }

    return (
        <main>
            <h2>Filmes Assistidos</h2>

            <p>Rodos os filmes que você já marcou como assistidos.</p>

            {movies.length === 0 ? (
                <p className="empty-list">
                    Você ainda não marcou nenhum filme como assistido.
                </p>
            ) : (
                <div className="watchlist-grid">
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

export default WatchedMovies