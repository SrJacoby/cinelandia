import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard"
import {getMovieDetails} from "../services/tmdb"

function Watchlist(){
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadWatchlist(){
            try{
                const movieIds = []

                for(let i =0; i < localStorage.length; i++){
                    const key = localStorage.key(i)

                    if(
                        key?.startsWith("cinelandia-watchlist-")&&
                        localStorage.getItem(key) === "true"
                    ) {
                        const id = key.replace("cinelandia-watchlist-", "")

                        movieIds.push(id)
                    }
                }

                const moviePromises = movieIds.map((id) => 
                    getMovieDetails(id)
                )

                const movieData = await Promise.all(moviePromises)

                setMovies(movieData)
            } catch(error) {
                console.error("Erro ao carregar sua lista:", error)
            } finally {
                setLoading(false)
            }
        }

        loadWatchlist()
    }, [])

    if(loading){
        return(
            <main>
                <p>Carregando sua lista...</p>
            </main>
        )
    }

    return (
        <main>
            <h2>Minha Lista</h2>

            <p>Filmes que você quer assistir.</p>

            {movies.length === 0 ? (
                <p className="empty-list">
                    Você ainda não adicionou nenhum filme à sua lista.
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

export default Watchlist