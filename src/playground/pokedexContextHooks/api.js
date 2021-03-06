async function apiClient({ path = "/", method = "GET", body }) {
  const response = await fetch(`${process.env.REACT_APP_PLAYGROUND_POKEDEX_API}${path}`, {
    method: method,
    ...(body ? { body: JSON.stringify(body) } : {}),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) throw response;
  const json = response.json();
  return json;
}

async function allPokemons() {
  const response = await apiClient({ path: "?limit=151" });
  return response.results;
}

async function pokemon(id) {
  const response = await apiClient({ path: `/${id}` });
  return response;
}

export default { allPokemons, pokemon };
