import * as React from "react";

const linkStyle = {
  color: "rgb(255, 69, 0)",
  textDecoration: "none",
};

const headerContainerStyle = {
  marginTop: 16,
  marginBottom: 8,
  padding: 0,
};

const Header = () => (
  <h1 style={headerContainerStyle}>
    <a href="/" style={linkStyle}>
      OpenRed
    </a>
  </h1>
);

export default Header;
