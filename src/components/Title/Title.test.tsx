import { render, screen } from "@testing-library/react";

import Title from "./Title";

describe("Title component", () => {
  it("should print the passed prop 'label'", () => {
    const testLabel = "testLabel";
    render(<Title label={testLabel} />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(testLabel);
  });
});
