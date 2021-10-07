import React, { ReactNode } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Header from "components/Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.VFC<LayoutProps> = ({ children }) => (
  <main>
    <Container>
      <Row>
        <Header />
        {children}
      </Row>
    </Container>
  </main>
);

export default Layout;
