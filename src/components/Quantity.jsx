import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-style: solid;
  border-width: 1px;
  border-color: #b4b4b4;
`;
const Button = styled.button`
  background-color: #ffffff;

  &:disabled {
    opacity: 0.5;
    outline: none;
  }
`;
const Number = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  min-width: 3rem;
  font-size: 1.8rem;
`;

export default function Quantity({ amount, setAmount, ...props }) {
  return (
    <Wrapper {...props}>
      <Button
        onClick={() => amount > 1 && setAmount((amount) => amount - 1)}
        disabled={amount === 1 ? true : false}
      >
        <i className="bx bx-minus"></i>
      </Button>
      <Number>{amount}</Number>
      <Button onClick={() => setAmount((amount) => amount + 1)}>
        <i className="bx bx-plus"></i>
      </Button>
    </Wrapper>
  );
}

Quantity.propTypes = {
  amount: PropTypes.string,
  setAmount: PropTypes.func,
};
