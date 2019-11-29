import React from "react";
import renderer from "react-test-renderer";
import faker from "faker";

import Link from "../Link";
import Text from "../../../../core/components/Text";

test("renders without crashing", () => {
  const description = faker.lorem.words();
  const url = faker.internet.url();

  const component = renderer.create(
    <Link description={description} url={url} />
  );

  const root = component.root;
  const text = root.findByType(Text);

  expect(text.children[0].children.join("")).toContain(
    `${description} (${url})`
  );
});
