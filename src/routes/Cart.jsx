import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { ImportantButton } from "../styles/GlobalStyles";
import { useContext, useEffect, useState } from "react";
import QuantityBase from "../components/Quantity";
import { StyledLink, FadeIn, Separator } from "../styles/GlobalStyles";
import { GlobalContext } from "../components/GlobalContext";
import PropTypes from "prop-types";

const EmptyCart = styled.div`
  ${FadeIn}
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: inherit;
  max-width: inherit;
`;

const CartSection = styled.div`
  ${FadeIn}
  display: grid;
  align-items: start;
  justify-content: start;
  width: inherit;
  max-width: inherit;
  height: 100%;
  grid-template-columns: 1fr 200px;
  gap: 1rem;
  flex: 1;
`;

const Items = styled.div`
  grid-column: 1 / 2;
  display: grid;
  grid-template-rows: repeat(auto-fit, 150px);
  gap: 1rem;
  border-radius: 0.3rem;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  height: 50px;
  grid-column: 2 / 3;
  position: sticky;
  align-self: start;
  top: 5rem;
  width: 100%;

  .summary {
    font-size: 2rem;
    font-weight: 500;
    padding-bottom: 1.5rem;
  }

  .total {
    font-size: 1.6rem;
    font-weight: 500;
    padding-bottom: 0.5rem;
  }
`;

export default function Cart() {
  const { cart } = useOutletContext();
  let [sum, setSum] = useState(0);
  useEffect(() => {
    setSum(0);
    cart.forEach((c) => {
      return setSum((sum) => sum + c.product.price * c.quantity);
    });
  }, [cart]);

  return (
    <>
      {cart.length > 0 ? (
        <CartSection>
          <Items>
            {cart.map((item) => {
              return <CartItem item={item} key={item.product.id} />;
            })}
          </Items>
          <Info>
            <div className="summary">Summary</div>
            <div>Sum: {Number(sum.toFixed(2))}$</div>
            <div>Shipping: 15$</div>
            <Separator />
            <div className="total">Total: {Number((sum + 15).toFixed(2))}$</div>
            <ImportantButton>Buy</ImportantButton>
          </Info>
        </CartSection>
      ) : (
        <EmptyCart>
          <div>Your Cart is empty...</div>
          <StyledLink to={`/shop`}>Go to Shop</StyledLink>
        </EmptyCart>
      )}
    </>
  );
}

const StyledCartItem = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  width: 100%;
  height: 100%;
  transition: 1s allow-discrete;
  .inner {
    overflow: hidden;
    height: 100%;
    width: 100%;
    background-color: white;
    border-style: none;
    overflow: hidden;
    border-radius: 0;
    padding: 0.5rem;
    transition: 0.5s allow-discrete;
    outline-style: solid;
    outline-color: transparent;
    box-shadow: inset #eeeeee 0px -2px;
    display: grid;
    grid-template-columns: 90px 1fr 130px 40px;
    grid-template-rows: 1fr 40px;
    /* grid-template-rows: 0; */
    justify-content: center;
    align-items: center;
    text-align: center;
    place-items: center;
  }

  &.close {
    grid-template-rows: 0fr;
  }
`;

const Img = styled.img`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  transition: 0.5s allow-discrete;
  height: 100px;
  width: 100%;
  object-fit: contain;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

const Title = styled.p`
  grid-column: 2 / 5;
  grid-row: 1 / 2;
  place-self: start;
  align-self: center;
  padding-left: 1rem;
`;
const Quantity = styled(QuantityBase)`
  grid-column: 3 / 4;
  grid-row: 2 / 3;
  transform: scale(0.7);
  place-self: end;
`;

const Price = styled.p`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  font-size: 2rem;
  place-self: end;
`;

const Remove = styled.button`
  grid-column: 4 / 5;
  grid-row: 2 / 3;
  width: 35px;
  height: 35px;
  align-items: center;
  place-self: end;
  background-color: white;
  border-style: none;
  outline-style: none;
  opacity: 0.5;

  i {
    opacity: inherit;
  }

  &:hover {
    border-style: none;
    outline-style: none;
    opacity: 1;
  }
`;

function CartItem({ item }) {
  const [amount, setAmount] = useState(item.quantity);
  const { cart, setCart } = useOutletContext();
  const [close, setClose] = useState(false);
  const { navigateToItem } = useContext(GlobalContext);

  useEffect(() => {
    const index = cart.findIndex((prod) => prod.product.id === item.product.id);
    setCart((draft) => {
      draft[index].quantity = amount;
    });
    console.log("Cart Effect");
  }, [amount]);

  function removeFromCart() {
    setClose(!close);
    const index = cart.findIndex((prod) => prod.product.id === item.product.id);
    setCart((draft) => {
      draft.splice(index, 1);
    });
  }

  return (
    <StyledCartItem className={close && "close"}>
      <div className="inner">
        <Img
          src={item.product.image}
          onClick={() => navigateToItem(item.product.id)}
        ></Img>
        <Title>{item.product.title}</Title>
        <Price>
          {Number((item.product.price * item.quantity).toFixed(2))}$
        </Price>
        <Quantity amount={amount} setAmount={setAmount} />
        <Remove
          onClick={() => {
            removeFromCart();
          }}
        >
          <i className="bx bx-trash"></i>
        </Remove>
      </div>
    </StyledCartItem>
  );
}

CartItem.propTypes = {
  item: PropTypes.object,
};
