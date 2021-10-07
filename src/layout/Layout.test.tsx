import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

import Layout from "./Layout";

describe("Layout component", () => {
  it("should match snapshot", () => {
    const tree = renderer.create(
      <MemoryRouter>
        <Layout>test layout</Layout>
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
