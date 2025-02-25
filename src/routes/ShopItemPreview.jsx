import { useState } from "react";
import {
  useNavigate,
  useLocation,
  useOutletContext,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import QuantityBase from "../components/Quantity";
import AddToCartBase from "../components/AddToCart";

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 2rem;
  justify-content: start;
  transition: 1s allow-discrete;
  width: inherit;
  max-width: inherit;

  @starting-style{
    opacity: 0;
  }
`;

const RightWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

const Img = styled.img`
  max-width: 400px;
  grid-column: 1 / 2;
  grid-row: 1 / 5;
`;

const Name = styled.p`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  width: 100%;
  font-weight: 400;
  font-size: 1.5rem;
`;

const Price = styled.p`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  width: 100%;
  font-weight: 600;
  font-size: 2rem;
`;

const Quantity = styled(QuantityBase)`
  grid-column: 2 / 3;
  grid-row: 3 / 4;
`;

const AddToCart = styled(AddToCartBase)`
  grid-column: 2 / 3;
  grid-row: 4 / 5;
  /* padding-bottom: .9rem; */
  /* height: 60px; */
  width: 100%;
`;

export default function ShopItemPreview() {
  const { itemId } = useParams();
  const { products, cart, setCart } = useOutletContext();
  const [amount, setAmount] = useState(1);

  const location = useLocation();
  console.log("LOcation");
  console.log(location);

  const product = products.filter((item) => item.id === Number(itemId))[0];

  return (
    <Wrapper>
      <Img src={product.image}></Img>
      <RightWrapper>
        {" "}
        <Name>{product.title}</Name>
        <Price>{product.price}$</Price>
        <Quantity amount={amount} setAmount={setAmount} />
        <AddToCart id={product.id} amount={Number(amount)}></AddToCart>
      </RightWrapper>
    </Wrapper>
  );
}
