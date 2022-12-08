import { useState } from 'react';
import './App.css';

function App() {
    const [repositorios, setRepositorios] = useState([])
    const [busca, setBusca] = useState('')
    const reposFiltrados = busca.length > 0
    ? repositorios.filter(repo => repo.name.toUpperCase().includes(busca.toUpperCase())) : []

        
        fetch('https://api.github.com/users/brunopp00/repos').then(async res => {
            if(!res.ok){
                throw new Error(res.status)
            }

            setRepositorios(await res.json())

        })
        
        return (
    <div className="App">
      <nav className='navbar navbar-expand-md navbar-dark bg-dark mb-4'>
            <a className='navbar-brand' href='https://github.com/brunopp00' target='_blank' rel="noreferrer">Bruno Frohlich</a>
      </nav>
      <main className='container'>
        <div className='jumbutron'>
            <input className='form-control mb-4' placeholder='Busca' value={busca} onChange={e => setBusca(e.target.value)}/>
            <h1>Veja meus repositórios</h1>
            <p className='lead'>
                Programas criados por mim:
            </p>
            { busca.length > 0 ? (
                reposFiltrados.map(repositorio => 
                    <div className='card col-md-12'>
                            <div className='card-body'>
                                <h1>{repositorio.name}</h1>
                                <a target='_blank' href={repositorio.html_url} rel="noreferrer">{repositorio.html_url}</a>
                            </div>
                        </div>
                        )
            ) : (
                repositorios.map(repositorio => 
                <div className='card col-md-12'>
                        <div className='card-body'>
                            <h1>{repositorio.name}</h1>
                            <a target='_blank' href={repositorio.html_url} rel="noreferrer">{repositorio.html_url}</a>
                        </div>
                    </div>
                    )
            )}
        </div>
      </main>
    </div>
  );
}

export default App;
