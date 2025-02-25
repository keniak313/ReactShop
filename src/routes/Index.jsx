import styled from "styled-components";
import { FadeIn } from "../styles/GlobalStyles";

const Wrapper = styled.section`
  ${FadeIn}
`;

export default function Index() {
  return (
    <Wrapper>
      <p>Welcome!</p>
    </Wrapper>
  );
}
