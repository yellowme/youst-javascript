import React from "react";
import renderer from "react-test-renderer";

import Link from "../Link";

test("renders without crashing", () => {
  const description = "Prisma turns your database into a GraphQL API 😎";
  const url = "https://www.prismagraphql.com";

  const component = renderer.create(
    <Link description={description} url={url} />
  );

  const tree = component.toJSON();
  expect(tree.children.join("")).toBe(`${description} (${url})`);
});
