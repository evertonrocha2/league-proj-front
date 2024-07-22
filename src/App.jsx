import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [champions, setChampions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/champions");
        console.log(response.data);
        setChampions(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchChampions();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Champions</h1>
      <ul className="flex gap-8 flex-wrap items-center justify-center">
        {champions.map((champion) => {
          const info = JSON.parse(champion.info);
          return (
            <li
              className="flex flex-col items-center justify-center gap-6 bg-gray-800 text-white rounded-lg p-4 w-64 h-96"
              key={champion.id}
            >
              <h2>{champion.name}</h2>
              <p>{champion.title}</p>
              <p>{champion.info}</p>
              {info.magic >= 7 && (
                <div>
                  <p className="text-green-500">Magic: {info.magic}</p>
                  <p>
                    Itens recomendados: Capuz da Morte de Rabadon e Sapatos do
                    Feiticeiro
                  </p>
                </div>
              )}
              {info.attack >= 7 && (
                <div>
                  <p className="text-red-500">Attack: {info.attack}</p>
                  <p>
                    Itens recomendados: Gume do Infinito e Sedenta por Sangue
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
