import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

import FourOhFour from "./FourOhFour";

describe("FourOhFour component", () => {
  it("should match snapshot", () => {
    const tree = renderer.create(
      <MemoryRouter>
        <FourOhFour />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
