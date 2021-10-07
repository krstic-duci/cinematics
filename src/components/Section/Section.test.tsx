import { render, screen } from "@testing-library/react";

import Section from "./Section";

describe("Section component", () => {
  it("should have printed corrected passed children prop", async () => {
    const childrenText = "test children";
    const children = <div>{childrenText}</div>;
    render(<Section>{children}</Section>);

    expect(await screen.findByText(childrenText)).toBeInTheDocument();
  });
});
