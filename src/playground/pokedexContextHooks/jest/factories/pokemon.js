import faker from "faker";

export default function createPokemon(overrides) {
  return {
    name: faker.random.uuid(),
    url: faker.internet.url(),
    sprites: {
      sprinte_1: faker.internet.url()
    },
    ...overrides
  };
}
