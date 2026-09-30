import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Navbar(){
    const [query, setQuery] = useState("")

    const navigate = useNavigate()

    function handleSearch(event){
        event.preventDefault()

        const search = query.trim()

        if(!search){
            return
        }

        navigate(`/busca?q=${encodeURIComponent(search)}`)
    }

    return (
        <nav>
            <h1>Cinelândia</h1>

            <div>
                <Link to="/">Início</Link>
                <Link to="/">Filmes</Link>
                <Link to="/lista">Listas</Link>
                <Link to="/">Perfil</Link>
                
                <form onSubmit={handleSearch}>
                    <input 
                        type="text" 
                        placeholder="Pesquisar filmes..."
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                    />

                    <button type="submit">
                        Pesquisar
                    </button>
                </form>
            </div>
        </nav>
    )
}

export default Navbar