async function allPokemons() {
  const response = await fetch("http://pokeapi.co/api/v2/pokemon?limit=151");
  const json = await response.json();
  return json.results;
}

async function pokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const json = await response.json();
  return json;
}

export default { allPokemons, pokemon };
