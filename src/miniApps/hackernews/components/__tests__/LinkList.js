import React from "react";
import renderer from "react-test-renderer";

import LinkList from "../LinkList";
import Link from "../Link";

test("renders without crashing", () => {
  const description = "Prisma turns your database into a GraphQL API 😎";
  const url = "https://www.prismagraphql.com";

  const component = renderer.create(
    <LinkList>
      <Link description={description} url={url} />
      <Link description={description} url={url} />
    </LinkList>
  );

  const tree = component.toJSON();

  expect(tree.children.length).toBe(2);
});
