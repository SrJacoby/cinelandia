import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getMovieDetails} from "../services/tmdb"

function MovieDetails(){
    const {id} = useParams()

    const [movie, setMovie] = useState(null)
    const [userRating, setUserRating] = useState(0)
    const [watched, setWatched] = useState(false)
    const [inWatchlist, setInWatchlist] = useState(false)

    useEffect(() => {
        async function loadMovie(){
            try{
                const data = await getMovieDetails(id)

                setMovie(data)

                const savedRating = localStorage.getItem(
                    `cinelandia-rating-${id}`
                )

                if(savedRating){
                    setUserRating(Number(savedRating))
                } else{
                    setUserRating(0)
                }

                const savedWatched = localStorage.getItem(
                    `cinelandia-watched-${id}`
                )

                setWatched(savedWatched === "true")

                const savedWatchlist = localStorage.getItem(
                    `cinelandia-watchlist-${id}`
                )

                setInWatchlist(savedWatchlist === "true")

            } catch (error){
                console.error("Erro ao buscar detalhes do filme:", error)
            }
        }

        loadMovie()
    }, [id])

    if(!movie){
        return <p>Carregando...</p>
    }

    const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null

    const year = movie.release_date
        ? movie.release_date.slice(0, 4)
        : "Ano desconhecido"

    const runtime = movie.runtime
        ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min`
        : "Duração desconhecida"

    function handleRating(rating){
        setUserRating(rating)

        localStorage.setItem(
            `cinelandia-rating-${id}`,
            rating.toString()
        )
    }

    function handleWatched(){
        const newWatched = !watched

        setWatched(newWatched)

        localStorage.setItem(
            `cinelandia-watched-${id}`,
            newWatched.toString()
        )
    }

    function handleWatchlist(){
        const newValue = !inWatchlist

        setInWatchlist(newValue)

        localStorage.setItem(
            `cinelandia-watchlist-${id}`,
            newValue.toString()
        )
    }
    
    return (
        <main className="movie-details-page">
            <div className="movie-details-container">
                <div className="movie-details-poster">
                    {poster ? (
                        <img src={poster} alt={`Poster de ${movie.title}`} />
                    ) : (
                        <div className="movie-card-no-poster">
                            Sem pôster
                        </div>
                    )}
                </div>
                
                <div className="movie-details-info">
                        <h2>{movie.title}</h2>
                    

                    <div className="movie-meta">
                        <span>{year}</span>
                        <span>{runtime}</span>
                        <span>★ {movie.vote_average.toFixed(1)}</span>
                    </div>

                    {movie.genres && movie.genres.length > 0 && (
                        <div>
                            {movie.genres.map((genre) => (
                                <span key={genre.id}>{genre.name}</span>
                            ))}
                        </div>
                    )}

                    <h3>Sinopse</h3>

                    <p className="movie-overview">{movie.overview || "Sinopse não disponível."}</p>

                    <div className="movie-rating">
                        <h3>Sua avaliação</h3>

                        <div className="rating-stars">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                            <button
                                key={rating}
                                type="button"
                                className={`rating-star ${
                                userRating >= rating ? "active" : ""
                                }`}
                                onClick={() => handleRating(rating)}
                                aria-label={`Avaliar com nota ${rating}`}
                            >
                                ★
                            </button>
                            ))}
                        </div>

                        <p className="user-rating-value">
                            {userRating > 0
                            ? `${userRating} / 10`
                            : "Selecione uma nota"}
                        </p>
                    </div>

                    <div className="movie-user-action">
                        <button
                            type="button"
                            className={`watched-button ${watched ? "active" : ""}`}
                            onClick={handleWatched}
                        >
                            {watched ? "✓ Assistido" : "Marcar como assistido"}
                        </button>
                        <button
                            type="button"
                            className={`watchlist-button ${inWatchlist ? "active" : ""}`}
                            onClick={handleWatchlist}
                        >
                            {inWatchlist ? "✓ Na minha lista" : "+ Quero assistir"}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default MovieDetails