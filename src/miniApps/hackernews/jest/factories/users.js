import faker from "faker";

export default function createUser(replacements) {
  return {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    ...replacements
  };
}
