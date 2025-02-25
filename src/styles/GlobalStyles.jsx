import styled, {
  ThemeProvider,
  createGlobalStyle,
  css,
} from "styled-components";

import { Link as LinkBase } from "react-router-dom";
import { NavLink as BaseNavLink } from "react-router-dom";

export const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Smooch Sans", 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  #root{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-height: 100vh;
    max-width: 100vw;
    font-size: ${(props) => props.theme.fontSizes.medium};
  }

  i{
    font-size: 1.7rem;
  }

  button{
    border-style: none;
  padding: 0.3rem;
  border-radius: 0.2rem;
  z-index: 200;
  justify-content: center;
  display: flex;
  align-items: end;
  transition: .2s allow-discrete;
  outline-style: solid;
  outline-color: transparent;
  cursor: pointer;
  &:hover {
    outline-style: solid;
    outline-color: black;
    outline-width: 2px;
  }
  &:active{
    transform: scale(0.95);
  }
  }
  
  input{
    border-style: none;
    padding: 0.3rem;
    font-size: 1.6rem;
    font-weight: 500;
  }
  
`;

export const ImportantButton = styled.button`
  display: flex;
  background-color: black;
  color: white;
  width: 100%;
  height: 40px;
  justify-content: center;
  align-items: center;
  padding: 0;
  font-weight: 600;
  font-size: 1.3rem;
  cursor: pointer;

  i {
    position: relative;
    bottom: 2px;
  }

  &:hover {
    border-style: none;
    outline-style: none;
    opacity: 0.6;
  }
`;

export const StyledLink = styled(LinkBase)`
  color: black;
  font-weight: 500;
`;

export const FadeIn = css`
  transition: 1s allow-discrete;
  @starting-style {
    opacity: 0;
  }
`;

export const Shadow = css`
  box-shadow: hsla(0, 0%, 0%, 0.1) 0px 0px 30px;
`;

export const StyledNavLink = styled(BaseNavLink)`
  color: #202020;
  text-decoration: none;
  transition: 0.2s allow-discrete;
  &.active {
    color: #000000;
    font-weight: 700;
    text-decoration: underline;
  }

  &.pending {
    color: pink;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

export const Separator = styled.div`
  margin: 0.5rem 0rem;
  border: 1px solid black;
`;

const theme = {
  colors: {
    header: `#ffffff`,
    footer: `#181818`,
    bg: `rgba(0,0,0,1)`,
    whiteText: "#ffffff",
    blackText: "rgba(0,0,0,1)",
  },
  fontSizes: {
    small: `0.8em`,
    medium: `1.2em`,
    large: `1.8em`,
  },
};

const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
