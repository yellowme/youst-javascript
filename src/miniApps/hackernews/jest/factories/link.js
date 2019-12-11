import faker from "faker";

import createUser from "./users";
import createVote from "./votes";

export default function createLink(replacements) {
  return {
    id: faker.random.uuid(),
    url: faker.internet.url(),
    description: faker.lorem.words(),
    createdAt: new Date(),
    postedBy: createUser(),
    votes: [createVote()],
    ...replacements
  };
}
