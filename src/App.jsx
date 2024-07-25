import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [champions, setChampions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredChampions, setFilteredChampions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [championsPerPage] = useState(14);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/champions");
        setChampions(response.data);
        setFilteredChampions(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchChampions();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredChampions(champions);
    } else {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = champions.filter((champion) =>
        champion.name.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredChampions(filtered);
    }
  }, [searchTerm, champions]);

  const indexOfLastChampion = currentPage * championsPerPage;
  const indexOfFirstChampion = indexOfLastChampion - championsPerPage;
  const currentChampions = filteredChampions.slice(
    indexOfFirstChampion,
    indexOfLastChampion
  );

  const totalPages = Math.ceil(filteredChampions.length / championsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="md:w-[1440px] my-0 mx-auto">
      <header className="flex justify-between items-center py-8">
        <h1 className="font-KTProj text-2xl font-bold tracking-tighter hover:text-[#37A470] cursor-pointer transition-all">
          GetBuilds.gg
        </h1>
        <div className="flex gap-4">
          <a className="font-GeistSans tracking-tighter font-semibold hover:border-[#A1A1A1] border-b-2 border-[transparent] transition-all cursor-pointer">
            Início
          </a>
          <a className="font-GeistSans tracking-tighter font-semibold hover:border-[#A1A1A1] border-b-2 border-[transparent] transition-all cursor-pointer">
            Champions
          </a>
          <a className="font-GeistSans tracking-tighter font-semibold hover:border-[#A1A1A1] border-b-2 border-[transparent] transition-all cursor-pointer">
            Pros
          </a>
        </div>
      </header>
      <section>
        <h1 className="text-[#37A470] font-GeistSans text-5xl md:text-8xl text-center mt-24 font-bold tracking-tighter">
          GetBuilds.gg
        </h1>
        <p className="font-GeistSans text-2xl text-center mt-8 tracking-tighter p-8 md:p-0 md:w-1/3 mx-auto text-[#A1A1A1]">
          Bem vindo ao GetBuilds, aqui você irá poder ver a melhor itenização
          para cada campeão!
        </p>
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Procurar campeão..."
            className="text-[#9E9E9E] py-4 px-8 rounded mt-8 focus:outline-[#9E9E9E] bg-[#FFF3F3] w-full"
          />
        </div>
        <ul className="flex gap-8 flex-wrap items-center justify-center mt-8">
          {currentChampions.map((champion) => {
            return (
              <div key={champion.id}>
                <div className="bg-[#FFF3F3] h-52 w-30 rounded gap-2 py-4 flex flex-col items-center">
                  <div className="w-[80%] bg-gray-500 h-24 mx-auto rounded text-center"></div>
                  <h2 className="mt-6 font-GeistSans font-semibold tracking-tighter text-xl">
                    {champion.name}
                  </h2>
                </div>
                <button className="mt-2 bg-[#37A470] text-white rounded py-4 px-8 font-GeistSans font-semibold">
                  Checar Build
                </button>
              </div>
            );
          })}
        </ul>
        <div className="flex items-center justify-center mt-8">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-[#37A470] text-white rounded py-4 px-8"
          >
            Anterior
          </button>
          <span className="px-4 py-2">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-[#37A470] text-white rounded py-4 px-8"
          >
            Próximo
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
