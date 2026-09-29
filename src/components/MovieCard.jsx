import { Link } from "react-router-dom"

function MovieCard({movie}){
    const year = movie.release_date
        ? movie.release_date.slice(0, 4)
        : "Ano desconhecido"

    const rating = movie.vote_average
        ? movie.vote_average.toFixed(1)
        : "N/A"

    const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null

    return(
        <Link to={`/filme/${movie.id}`} className="movie-card-link">
            <article className="movie-card">
                <div className="movie-poster">
                    {poster ? (
                        <img src={poster} alt={`Poster de ${movie.title}`}/>
                    ) : (
                        <div className="movie-card-no-poster">
                            Sem pôster
                        </div>
                    )}
                </div>
                <div className="movie-info"> 
                    <h3>{movie.title}</h3>

                    <div className="movie-details">
                        <p>{year}</p>
                        <span>★ {rating}</span>
                    </div>
                </div>
                
            </article>
        </Link>
    )
}

export default MovieCard