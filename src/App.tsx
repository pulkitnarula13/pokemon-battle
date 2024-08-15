import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [pokemon1, setPokemon1] = useState<any>(null);
  const [pokemon2, setPokemon2] = useState<any>(null);
  const [battleLog, setBattleLog] = useState<string>('');

  const getUniqueNumber = (history: number[], max: number): number => {
    const ranNum = Math.floor(Math.random() * max);
    if (!history.includes(ranNum)) {
      history.push(ranNum);
      return ranNum;
    } else {
      return getUniqueNumber(history, max);
    }
  };

  const makeApiCall = async (id: number) => {
    return await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  };

  const makeMovesApiCall = async (url: string) => {
    return await axios.get(url);
  };

  // get random pokemom
  const getRandomPokemon = async () => {

    // Clear previous Pokémon data
    setPokemon1(null);
    setPokemon2(null);
    setBattleLog('');

    const pokeHistory: number[] = [];
    const randomId1 = getUniqueNumber(pokeHistory, 800) + 1;
    const randomId2 = getUniqueNumber(pokeHistory, 800) + 1;

    const [poke1, poke2] = await Promise.all([
      makeApiCall(randomId1),
      makeApiCall(randomId2)
    ]);

    const selectedMove1Index = getUniqueNumber([], poke1.data.moves.length);
    const selectedMove2Index = getUniqueNumber([], poke2.data.moves.length);

    const selectedMove1 = poke1.data.moves[selectedMove1Index].move;
    const selectedMove2 = poke2.data.moves[selectedMove2Index].move;

    const [move1Details, move2Details] = await Promise.all([
      makeMovesApiCall(selectedMove1.url),
      makeMovesApiCall(selectedMove2.url)
    ]);

    setPokemon1({
      name: poke1.data.name,
      sprite: poke1.data.sprites.front_default,
      hp: poke1.data.stats[5].base_stat,
      move: {
        name: selectedMove1.name,
        power: move1Details.data.power || 0,
      }
    });

    setPokemon2({
      name: poke2.data.name,
      sprite: poke2.data.sprites.front_default,
      hp: poke2.data.stats[5].base_stat,
      move: {
        name: selectedMove2.name,
        power: move2Details.data.power || 0,
      }
    });
  };

  const startBattle = () => {
    if (pokemon1 && pokemon2) {
      const power1 = pokemon1.move.power;
      const power2 = pokemon2.move.power;

      if (power1 > power2) {
        setBattleLog(`${pokemon1.name} lands a decisive blow with ${pokemon1.move.name}, knocking out ${pokemon2.name}!`);
      } else if (power1 < power2) {
        setBattleLog(`${pokemon2.name} lands a decisive blow with ${pokemon2.move.name}, knocking out ${pokemon1.name}!`);
      } else {
        setBattleLog(`It's a draw! Both ${pokemon1.name} and ${pokemon2.name} used equally powerful moves.`);
      }
    }
  };

  return (
    <div>
      <h1>Pokémon Battle</h1>
      <button onClick={getRandomPokemon}>Get Random Pokémon</button>

      {pokemon1 && pokemon2 && (
        <div>
          <div>
            <h2>{pokemon1.name}</h2>
            <img src={pokemon1.sprite} alt={pokemon1.name} />
            <p>HP: {pokemon1.hp}</p>
            <p>Move: {pokemon1.move.name} (Power: {pokemon1.move.power})</p>
          </div>
          <div>
            <h2>{pokemon2.name}</h2>
            <img src={pokemon2.sprite} alt={pokemon2.name} />
            <p>HP: {pokemon2.hp}</p>
            <p>Move: {pokemon2.move.name} (Power: {pokemon2.move.power})</p>
          </div>
          <button onClick={startBattle}>Start Battle</button>
          {battleLog && <p>{battleLog}</p>}
        </div>
      )}
    </div>
  );
}

export default App;