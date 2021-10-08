import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";

import Header from "./Header";

describe("Header component", () => {
  it("should match snapshot", () => {
    const tree = renderer.create(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
