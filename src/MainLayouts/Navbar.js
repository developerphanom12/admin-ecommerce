import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styled from "styled-components";
import logoimg from "../Assets/logo.png";

function NavBarr() {
  return (
    <Root>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/home">
            <img
              src={logoimg}
              alt="Logo Of Site"
              style={{ width: "70px", height: "auto", cursor: "pointer" }}
            />
          </Navbar.Brand>

          <Nav>
            <Nav.Link href="/" className="a">
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </Root>
  );
}

export default NavBarr;

const Root = styled.section`
  width: 100%;
  height: 100%;
  .navbar-brand {
    margin: 0 13px;
  }
 
  .nabspacing {
    justify-content: space-between;
    padding: 0px 12px;
    border-left: 1px solid #e6eff5;
  }

  .a {
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    color: #2ca5d6;
    padding: 5px 10px;
    text-decoration: none;
    border-radius: 10px;
    border: 2px solid #2ca5d6;
    &:hover {
      background-color: #2ca5d6;
      border: 2px solid #ffffff;
      color: #ffffff;
      cursor: pointer;
    }
  }
`;
