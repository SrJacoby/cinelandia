import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FavoriteMovies from "../components/FavoriteMovies";

function Profile() {
  const [stats, setStats] = useState({
    watched: 0,
    rated: 0,
    averageRating: 0,
  });

  useEffect(() => {
    let watched = 0;
    const ratings = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (!key) continue;

      if (
        key.startsWith("cinelandia-watched-") &&
        localStorage.getItem(key) === "true"
      ) {
        watched++;
      }

      if (key.startsWith("cinelandia-rating-")) {
        const rating = Number(localStorage.getItem(key));

        if (!Number.isNaN(rating) && rating > 0) {
          ratings.push(rating);
        }
      }
    }

    const averageRating =
      ratings.length > 0
        ? ratings.reduce((total, rating) => total + rating, 0) /
          ratings.length
        : 0;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStats({
      watched,
      rated: ratings.length,
      averageRating,
    });
  }, []);

  return (
    <main className="profile-page">
      <h2>Meu Perfil</h2>

      <p>Seu histórico no Cinelândia.</p>

      <div className="profile-stats">
        <div className="profile-stat-card">
          <strong>{stats.watched}</strong>
          <span>Filmes assistidos</span>
        </div>

        <div className="profile-stat-card">
          <strong>{stats.rated}</strong>
          <span>Filmes avaliados</span>
        </div>

        <div className="profile-stat-card">
          <strong>
            {stats.rated > 0
              ? stats.averageRating.toFixed(1)
              : "—"}
          </strong>

          <span>Nota média</span>
        </div>
      </div>

      <FavoriteMovies />

      <div className="profile-actions">
        <Link to="/assistidos">
          Ver filmes assistidos
        </Link>

        <Link to="/lista">
          Minha lista
        </Link>
      </div>
    </main>
  );
}

export default Profile;