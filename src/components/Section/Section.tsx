import React, { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
}

const Section: React.VFC<SectionProps> = ({ children, ...rest }) => (
  <section className="my-4" {...rest}>
    {children}
  </section>
);

export default Section;
