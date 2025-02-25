import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { StyledNavLink, Separator, Shadow } from "../styles/GlobalStyles";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";

const CartBtn = styled.div`
  display: flex;
  border-radius: 10rem;
  position: absolute;
  right: 5px;

  p {
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    text-align: center;
    top: 10px;
    left: -20px;
    font-weight: 500;
    color: white;
    background-color: black;
    width: 25px;
    height: 25px;
    border-radius: 30px;
    padding: 5px;
    transition: 0.3s allow-discrete;
  }

  .active {
    color: white;
    background-color: black;
    padding: 10px;
    border-radius: 0.4rem;
    pointer-events: none;
    i {
      font-size: 2rem;
    }

    p {
      top: 35px;
      left: -10px;
    }
  }
`;

const Arrow = styled.div`
  position: absolute;
  display: flex;
  font-size: 2rem;
  padding: 0;
  width: 100%;
  align-items: end;
  justify-content: end;
  top: 25px;
  right: 0;
  i {
    color: black;
  }
`;

export default function CartNav({ onClick, cart, scroll }) {
  const [openPrev, setOpenPrev] = useState(false);
  const loc = useLocation();
  function cartSizeHandler() {
    let cartSize = 0;
    cart.forEach((item) => {
      cartSize += item.quantity;
    });
    return cartSize;
  }

  function openCart() {
    console.log("Enter");
    console.log(loc.pathname);
    if (cart.length > 0 && loc.pathname != "/cart") {
      setOpenPrev(true);
    }
  }

  return (
    <CartBtn
      onMouseEnter={() => {
        openCart();
      }}
      onMouseLeave={() => {
        console.log("Exit");
        setOpenPrev(false);
      }}
    >
      <StyledNavLink
        to={`cart`}
        onClick={() => {
          onClick;
          setOpenPrev(false);
        }}
      >
        <i className="bx bx-cart"></i> <p>{cartSizeHandler()}</p>
      </StyledNavLink>
      <CartPreview cart={cart} isOpen={openPrev}>
        {cart.map((i) => {
          return (
            <CartPrevItem
              name={i.product.title}
              img={i.product.image}
              price={i.product.price}
              quantity={i.quantity}
              id={i.product.id}
              key={i.product.id}
            />
          );
        })}
      </CartPreview>
    </CartBtn>
  );
}

const CartPreviewWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 2rem;
  padding-right: 0;
  transform-origin: top;
  overflow: hidden;
  pointer-events: none;
  background-color: transparent;
  /* background-color: rgba(0, 0, 0, 0.5); */
  width: 300px;

  /* ${CartBtn}:hover & {
    .inner {
      opacity: 1;
      pointer-events: all;
    }
  } */
`;

const CartPrevInner = styled.div`
  ${Shadow}
  display: flex;
  max-height: 90vh;
  flex-direction: column;
  transition: 0.3s allow-discrete;
  opacity: 0;
  padding: 1rem;
  background-color: white;
  pointer-events: none;
  margin-top: 0.5rem;
  /* overflow: auto; */

  .scroll {
    display: grid;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    padding: 0.5rem;
  }

  &.openPrev {
    opacity: 1;
    pointer-events: all;
  }
`;

const Total = styled.div`
  display: flex;
  font-size: 1.6rem;
  font-weight: 500;
  justify-content: end;
`;

function CartPreview({ children, cart, isOpen }) {
  let [sum, setSum] = useState(0);

  useEffect(() => {
    setSum(0);
    console.log("Cart Preview");
    console.log(typeof cart);
    if (cart.length > 0) {
      cart.forEach((c) => {
        return setSum((sum) => sum + c.product.price * c.quantity);
      });
    }
  }, [cart]);

  return (
    <CartPreviewWrapper>
      <CartPrevInner className={isOpen && "openPrev"}>
        <Arrow>
          <i className="bx bxs-up-arrow"></i>
        </Arrow>
        <div>My Cart</div>
        <Separator />
        <div className="scroll">{children}</div>
        <Separator />
        <Total>Total: {Number(sum.toFixed(2))}$</Total>
      </CartPrevInner>
    </CartPreviewWrapper>
  );
}

const StyledCartPrevItem = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  height: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
  gap: 0.5rem;
  transition: 0.5s allow-discrete;
  outline-style: solid;
  outline-color: transparent;
  outline-width: 2px;
  border-radius: 0.3rem;
  cursor: pointer;
  &:hover {
    outline-color: #e7e7e7;
    Img {
      opacity: 0.6;
    }
  }
`;

const Img = styled.img`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  width: 50px;
  height: 100%;
  object-fit: contain;
`;

const Name = styled.div`
  grid-column: 2 / 4;
  grid-row: 1 / 3;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Quantity = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
`;

const Price = styled.div`
  grid-column: 3 / 4;
  grid-row: 2 / 3;
`;

function CartPrevItem({ name, img, price, quantity, id }) {
  const { navigateToItem } = useContext(GlobalContext);
  return (
    <StyledCartPrevItem
      onClick={() => {
        navigateToItem(id);
      }}
    >
      <Img src={img}></Img>
      <Name>{name}</Name>
      <Price>{price}$</Price>
      <Quantity>{quantity}</Quantity>
    </StyledCartPrevItem>
  );
}
