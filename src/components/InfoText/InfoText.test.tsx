import { render, screen } from "@testing-library/react";

import InfoText from "./InfoText";

const childrenText = "test children";

describe("InfoText component", () => {
  const children = <span>{childrenText}</span>;
  const testLabel = "test label";
  it("should correctly print out children node", async () => {
    render(<InfoText>{children}</InfoText>);

    expect(await screen.findByTestId("infoTextParagraph")).toBeInTheDocument();
  });
  it("should correctly add label", async () => {
    render(<InfoText label={testLabel}>{children}</InfoText>);

    expect(await screen.findByTestId("infoTextSpan")).toBeInTheDocument();
  });

  it("should correctly proper className", async () => {
    const className = "testClassName";
    const labelClassName = "testClassNameLabel";
    render(
      <InfoText label={testLabel} className={className} labelClassName={labelClassName}>
        {children}
      </InfoText>
    );

    expect(await screen.findByTestId("infoTextParagraph")).toHaveClass(className);
    expect(await screen.findByTestId("infoTextSpan")).toHaveClass(labelClassName);
  });
});
