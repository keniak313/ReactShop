import styled from "styled-components";
import { useImmer } from "use-immer";
import { useContext, useEffect, useRef } from "react";

import { FadeIn } from "../styles/GlobalStyles";

import ShopItem from "../components/ShopItem";
import {
  useLoaderData,
  useNavigate,
  useLocation,
  generatePath,
  useOutletContext,
} from "react-router-dom";
import { GlobalContext } from "../components/GlobalContext";

const Wrapper = styled.section`
  ${FadeIn}
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-template-rows: repeat(auto-fit, 350px);
  justify-content: center;
  gap: 2rem;
  width: inherit;
  max-width: inherit;
`;

export default function Shop() {
  const { products } = useOutletContext();
  const {navigateToItem} = useContext(GlobalContext);

  return (
    <Wrapper>
      {products.length ? (
        products.map((prod) => {
          return (
            <ShopItem
              name={prod.title}
              desc={prod.description}
              img={prod.image}
              price={prod.price}
              category={prod.category}
              key={prod.id}
              id={prod.id}
              onClick={() => navigateToItem(prod.id)}
            />
          );
        })
      ) : (
        <p>No products...</p>
      )}
    </Wrapper>
  );
}
