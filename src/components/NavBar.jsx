import { useState } from "react"
import { useNavigate } from "react-router-dom"

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
                <a href="/">Início</a>
                <a href="/">Filmes</a>
                <a href="/">Listas</a>
                <a href="/">Perfil</a>
                
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