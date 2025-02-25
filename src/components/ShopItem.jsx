import styled from "styled-components";
import AddToCartBase from "./AddToCart";

const Wrapper = styled.div`
  width: 200px;
  height: 350px;
  position: relative;
  justify-content: center;
  align-items: center;
  text-align: end;
`;

const Content = styled.button`
  display: grid;
  width: 100%;
  grid-template-rows: 1fr 200px 1fr 1fr;
  background-color: white;
  border-style: none;
  overflow: hidden;
  border-radius: 0.3rem;
  padding: 0.5rem;
  transition: 0.5s allow-discrete;
  outline-width: 2px;
  outline-style: solid;
  outline-color: transparent;
  cursor: pointer;
  &:hover {
    outline-color: #e7e7e7;

    Img {
      opacity: 0.6;
    }
  }
`;

const AddToCart = styled(AddToCartBase)`
  position: absolute;
  bottom: 7.5%;
  right: 6%;
  height: 40px;
  width: 40px;
`;

const Category = styled.p`
  grid-row: 1 / 2;
  text-transform: capitalize;
  align-items: start;
  text-align: start;
  place-self: start;
`;

const Img = styled.img`
  transition: 0.5s allow-discrete;
  grid-row: 2 / 3;
  place-self: center;
  align-self: center;
  justify-self: center;
  height: 100%;
  width: inherit;
  object-fit: contain;
  padding: 1rem;
`;

const Name = styled.p`
  grid-row: 3 / 4;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  align-items: start;
  text-align: start;
  place-self: start;
`;

const Price = styled.p`
  grid-row: 4 / 5;
  place-self: start;
  font-size: ${(props) => props.theme.fontSizes.large};
`;

export default function ShopItem({
  name,
  desc,
  img,
  price,
  category,
  onClick,
  id,
}) {
  return (
    <Wrapper id={id}>
      <Content onClick={onClick}>
        <Category>{category}</Category>
        <Img src={img}></Img>
        <Name>{name}</Name>
        <Price>{price}$</Price>
      </Content>
      <AddToCart id={id} isSmall={true} />
    </Wrapper>
  );
}
