import faker from "faker";

import createUser from "./users";

export default function createVote(replacements) {
  return {
    id: faker.random.uuid(),
    user: createUser(),
    ...replacements
  };
}
