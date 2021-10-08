import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";

import PageSpinner from "./PageSpinner";

describe("PageSpinner component", () => {
  it("should match snapshot", () => {
    const tree = renderer.create(
      <MemoryRouter>
        <PageSpinner />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
