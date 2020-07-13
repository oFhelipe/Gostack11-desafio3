import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api'

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{

    const componentDidMount = async () => {

      const response = await api.get('/repositories');
      setRepositories(response.data);

    }

    componentDidMount();

  },[]);

  async function handleAddRepository() {
    
    const repo = {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    };

    const newRepo = await api.post('/repositories', repo);

    setRepositories([...repositories, newRepo.data]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const repos = repositories;

    const repoIndex = repos.findIndex((repo) => {return repo.id === id});

    repos.splice(repoIndex, 1);
    setRepositories([...repos]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo)=>{
          return (
            <li key={repo.id}>
              {repo.title}

              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
