import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const sanitizeName = (name) => {
  // Remove caracteres especiais (', .) e mantém espaços
  const sanitized = name.replace(/['.]/g, "").toLowerCase();

  // Mantém espaços e aplica capitalização apenas na primeira le  tra
  return sanitized.charAt(0).toUpperCase() + sanitized.slice(1);
};

function App() {
  const [champions, setChampions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredChampions, setFilteredChampions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [championsPerPage] = useState(6);
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
          Bem vindo ao GetBuilds, aqui você poderá ver a melhor itenização para
          cada campeão!
        </p>
        <div className="w-[60%] mx-auto my-0">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Procurar campeão..."
            className="text-[#9E9E9E] py-4 px-8 rounded mt-8 focus:outline-[#9E9E9E] bg-[#FFF3F3] w-full font-GeistSans font-semibold text-sm"
          />
        </div>
        <ul className="flex gap-8 flex-wrap items-center justify-center mt-8 w-[60%] mx-auto">
          {currentChampions.map((champion) => {
            const sanitizedChampionName = sanitizeName(champion.name);
            let imageAurelion;
            if (champion.name === "Aurelion Sol") {
              imageAurelion = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/AurelionSol_0.jpg`;
            }
            let imageUrl;
            if (champion.name === "Aurelion Sol") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/AurelionSol_0.jpg`;
            } else if (champion.name === "Dr. Mundo") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/DrMundo_0.jpg`;
            } else if (champion.name === "Jarvan IV") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/JarvanIV_0.jpg`;
            } else if (champion.name === "Kog'Maw") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/KogMaw_0.jpg`;
            } else if (champion.name === "K'Sante") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/KSante_0.jpg`;
            } else if (champion.name === "Lee Sin") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/LeeSin_0.jpg`;
            } else if (champion.name === "Master Yi") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/MasterYi_0.jpg`;
            } else if (champion.name === "Wukong") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/MonkeyKing_0.jpg`;
            } else if (champion.name === "Miss Fortune") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/MissFortune_0.jpg`;
            } else if (champion.name === "Nunu & Willump") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Nunu_0.jpg`;
            } else if (champion.name === "Renata Glasc") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Renata_0.jpg`;
            } else if (champion.name === "Rek'Sai") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/RekSai_0.jpg`;
            } else if (champion.name === "Tahm Kench") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/TahmKench_0.jpg`;
            } else if (champion.name === "Twisted Fate") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/TwistedFate_0.jpg`;
            } else if (champion.name === "Xin Zhao") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/XinZhao_0.jpg`;
            } else {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${sanitizedChampionName}_0.jpg`;
            }

            console.log("Nome original:", champion.name);
            console.log("Nome sanitizado:", sanitizedChampionName);
            console.log("URL da imagem:", imageUrl);
            console.log("URL da imagem Aurelion:", imageAurelion);

            return (
              <div className="flex flex-col items-center" key={champion.id}>
                <div className="bg-[#FFF3F3] h-52 w-30 rounded gap-2 py-4 flex flex-col items-center ">
                  <img
                    src={imageUrl}
                    alt={champion.name}
                    className="w-[80%] bg-gray-500 h-36 mx-auto rounded text-center block"
                  />
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
        <div className="flex items-center justify-center mt-8 mb-8 gap-2 flex-col">
          <div className=" flex gap-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-[transparent] border-2 border-[#A1A1A1]] text-[#A1A1A1] hover:bg-[#37A470] hover:rounded hover:border-transparent transition-all hover:text-white cursor-pointer  rounded py-4 px-8 font-GeistSans font-semibold"
            >
              Anterior
            </button>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-[transparent] border-2 border-[#A1A1A1]] text-[#A1A1A1] hover:bg-[#37A470] hover:rounded hover:border-transparent transition-all hover:text-white cursor-pointer  rounded py-4 px-8 font-GeistSans font-semibold"
            >
              Próximo
            </button>
          </div>
          <span className="px-4 py-2 text-center font-GeistSans tracking-tighter font-semibold">
            Página {currentPage} de {totalPages}
          </span>
        </div>
      </section>
    </div>
  );
}

export default App;
