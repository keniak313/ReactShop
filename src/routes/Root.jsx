import { createContext, useContext, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useImmer } from "use-immer";
import { Outlet, useLoaderData, Link, useNavigate } from "react-router-dom";
import Popup from "../components/Popup";
import CartNav from "../components/CartNav";
import { StyledNavLink } from "../styles/GlobalStyles";
import { GlobalContext } from "../components/GlobalContext";

const baseHeaderFooterStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem;
  width: 100%;
`;

const Header = styled.header`
  ${baseHeaderFooterStyles}
  background-color: ${(props) => props.theme.colors.header};
  font-size: ${(props) => props.theme.fontSizes.medium};
  box-shadow: #ececec 0px 1px;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-rows: 1fr;
  justify-content: space-between;
  position: sticky;
  top: 0px;
  z-index: 1000;
  box-shadow: rgba(109, 109, 109, 0.1) 0px 1px 10px;
`;

const Footer = styled.footer`
  ${baseHeaderFooterStyles}
  background-color: ${(props) => props.theme.colors.footer};
  color: ${(props) => props.theme.colors.whiteText};
  min-height: 200px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  grid-column: 2 / 3;
  place-self: center;
`;

const Logo = styled(Link)`
  grid-column: 1 / 2;
  place-self: start;
  font-weight: 800;
  font-size: 2rem;
  text-decoration: none;
  color: black;
`;

const Top = styled.div`
  position: absolute;
  opacity: 0;
`;

const MainSection = styled.main`
  display: flex;
  flex: 1;
  width: 100%;
  max-width: 1200px;
  opacity: 1;
  padding: 2rem 2rem;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  transition: 1s allow-discrete;
  @starting-style {
    opacity: 0;
  }
`;

const Loader = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,0.5);
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: black;
  z-index: 3000;
  opacity: 0;
  pointer-events: none;
  transition: .5s allow-discrete;
  &.showLoader {
    pointer-events: all;
    opacity: 1;
  }
`;

let showLoader = true;

async function fetchData() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");

    if (response.ok) {
      const json = await response.json();
      return json;
    }
  } catch (error) {
    return error;
  }
}

export async function loader() {
  console.log("Start Loading");
  showLoader = true;
  const products = await fetchData();
  console.log("End Loading");
  showLoader = false;
  return { products };
}

export default function Root() {
  const { products } = useLoaderData();
  const [cart, setCart] = useImmer([]);

  function openPopup(id) {
    console.log(popupRef);
    const index = products.findIndex((prod) => prod.id === id);
    const item = products[index];
    popupRef.current.add(item);
  }

  const popupRef = useRef(null);

  const topRef = useRef(null);

  function scrollToTop() {
    topRef.current.scrollIntoView();
  }

  let navigate = useNavigate();

  function navigateToItem(id) {
    navigate(`/shop/${id}`);
    scrollToTop();
  }

  return (
    <>
      <GlobalContext.Provider value={{ scrollToTop, navigateToItem }}>
        <Popup ref={popupRef} />
        <Top ref={topRef}></Top>
        <Loader className={showLoader && "showLoader"}>Loading data...</Loader>
        <Header>
          <Logo>SHOPPY</Logo>
          <Nav>
            {/* <NavLink to={`/`} onClick={() => scrollToTop()}>
            Main
          </NavLink> */}
            <StyledNavLink to={`shop`} onClick={() => scrollToTop()}>
              Shop
            </StyledNavLink>
          </Nav>
          <CartNav cart={cart} onClick={() => scrollToTop()} />
        </Header>
        <MainSection>
          <Outlet context={{ products, cart, setCart, openPopup }} />
        </MainSection>
        <Footer>
          <p>Copyright Paweł Miklaszewski 2025</p>
        </Footer>
      </GlobalContext.Provider>
    </>
  );
}
