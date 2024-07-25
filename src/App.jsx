import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import { Typewriter } from "react-simple-typewriter";

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
  const [championsPerPage] = useState(3);
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
      <div className="testBg w-full h-screen z-[-1] absolute bg-cover translate-x-[50%] left-[-50%] md:block hidden"></div>
      <div className="bg-blur md:block hidden"></div>
      {/* <div className="bg-[#29ffca] w-[600px] h-[600px]  rounded-full absolute top-[550px] left-[-550px] blur-[250px] opacity-55 "></div>{" "} */}
      {/* <div className="bg-[#f1ff29] w-[600px] h-[600px]  rounded-full absolute top-[250px] right-[-550px] blur-[150px] opacity-55 "></div>{" "} */}
      <header className="flex md:flex-row flex-col justify-between items-center py-8 gap-4 md:gap-0">
        <h1 className="font-GeistSans text-2xl font-bold tracking-tighter hover:text-[#abe7ff] cursor-pointer transition-all">
          GetBuilds.gg
        </h1>
        <div className="flex gap-[48px]">
          <a className="font-GeistSans tracking-tighter font-semibold hover:border-[#abe7ff] border-b-2 border-[transparent] transition-all cursor-pointer">
            Início
          </a>
          <a className="font-GeistSans tracking-tighter font-semibold hover:border-[#abe7ff] border-b-2 border-[transparent] transition-all cursor-pointer">
            Champions
          </a>
          <a className="font-GeistSans tracking-tighter font-semibold hover:border-[#abe7ff] border-b-2 border-[transparent] transition-all cursor-pointer">
            Pros
          </a>
        </div>
      </header>
      <section>
        <h1 className="text-[#ffffff] font-GeistSans text-4xl hover:tracking-wide hover:text-[#abe7ff] transition-all cursor-pointer md:text-7xl text-center tracking-tighter mt-24 font-bold">
          GetBuilds.gg
        </h1>
        <p className="font-GeistSans text-lg md:text-xl text-center md:mt-8 md:mb-4 p-4 md:p-0 md:w-1/2 mx-auto text-[#ffffff]">
          Bem vindo ao GetBuilds, aqui você poderá ver a melhor itenização para
          cada campeão! Consiga vencer e aproveitar melhor suas partidas
          utilizando a combinação de itens adequeadas para cada campeão.
        </p>
        <div className="w-[60%] mx-auto my-0">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Procurar campeão..."
            className="text-[#9E9E9E] py-4 px-8 rounded mt-8 focus:outline-[#9E9E9E] border-2 border-[#0D1420] bg-[#060A11] w-full font-GeistSans font-semibold text-sm"
          />
        </div>
        <ul className="flex gap-3 md:flex-row flex-col md:flex-wrap items-center justify-center mt-8 md:w-[60%] mx-auto">
          {currentChampions.map((champion) => {
            const sanitizedChampionName = sanitizeName(champion.name);
            let imageAurelion;
            if (champion.name === "Aurelion Sol") {
              imageAurelion = `https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/AurelionSol.png`;
            }
            let imageUrl;
            if (champion.name === "Aurelion Sol") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/AurelionSol.png`;
            } else if (champion.name === "Dr. Mundo") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/DrMundo.png`;
            } else if (champion.name === "Jarvan IV") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/JarvanIV.png`;
            } else if (champion.name === "Kog'Maw") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/KogMaw.png`;
            } else if (champion.name === "K'Sante") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/KSante.png`;
            } else if (champion.name === "Lee Sin") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/LeeSin.png`;
            } else if (champion.name === "Master Yi") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/MasterYi.png`;
            } else if (champion.name === "Wukong") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/MonkeyKing.png`;
            } else if (champion.name === "Miss Fortune") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/MissFortune.png`;
            } else if (champion.name === "Nunu & Willump") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/Nunu.png`;
            } else if (champion.name === "Renata Glasc") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/Renata.png`;
            } else if (champion.name === "Rek'Sai") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/RekSai.png`;
            } else if (champion.name === "Tahm Kench") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/TahmKench.png`;
            } else if (champion.name === "Twisted Fate") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/TwistedFate.png`;
            } else if (champion.name === "Xin Zhao") {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/.png
XinZhao.png`;
            } else {
              imageUrl = `https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/${sanitizedChampionName}.png`;
            }

            console.log("Nome original:", champion.name);
            console.log("Nome sanitizado:", sanitizedChampionName);
            console.log("URL da imagem:", imageUrl);
            console.log("URL da imagem Aurelion:", imageAurelion);

            return (
              <div className="flex items-center w-full" key={champion.id}>
                <div className="bg-[#090E16] border-[1px] border-[#0D1420] h-20 w-[100%] rounded flex  items-center justify-around">
                  <div className="flex items-center gap-8 py-4 w-[70%]">
                    <img
                      src={imageUrl}
                      alt={champion.name}
                      className=" bg-gray-500 h-16 border-[2px] border-[#0D1420] self-start"
                    />
                    <h2 className=" font-GeistSans font-semibold tracking-tighter text-xl">
                      {champion.name}
                    </h2>
                  </div>
                  <button className=" w-[20%] bg-gradient-to-r from-[#abe7ff] to-[#1d99ff] hover:to-[#1d99ff] hover:text-white duration-300 hover:from-[#1d99ff] transition-all text-black rounded self-center py-3 px-2 font-GeistSans font-semibold">
                    Ver Build
                  </button>
                </div>
              </div>
            );
          })}
        </ul>
        <div className="flex items-center justify-center mt-8 mb-8 gap-2 flex-col">
          <div className=" flex gap-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-[#abe7ff] border-2 border-[#abe7ff] text-[#000000] hover:bg-[#1d99ff] hover:rounded hover:border-transparent transition-all hover:text- cursor-pointer  rounded py-4 px-8 font-GeistSans font-semibold"
            >
              Anterior
            </button>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-[#abe7ff] border-2 border-[#abe7ff] text-[#000000] hover:bg-[#1d99ff] hover:rounded hover:border-transparent transition-all hover:text-white cursor-pointer  rounded py-4 px-8 font-GeistSans font-semibold"
            >
              Próximo
            </button>
          </div>
          <span className="px-4 py-2 mt-4 text-center font-GeistSans tracking-tighter font-semibold">
            Página {currentPage} de {totalPages}
          </span>
        </div>
      </section>
    </div>
  );
}

export default App;
