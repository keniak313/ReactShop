import styled from "styled-components";
import {
  createContext,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useImmer } from "use-immer";
import { v4 as uuid } from "uuid";
import { Shadow } from "../styles/GlobalStyles";

const Wrapper = styled.div`
  position: fixed;
  flex-direction: column;
  right: 0px;
  top: 80px;
  z-index: 300;
  pointer-events: none;
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  /* transform: translateX(200px); */
  /* opacity: 0; */
`;

const StyledPopup = styled.div`
  ${Shadow}
  background-color: #ffffff;
  width: 260px;
  height: 130px;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  background: linear-gradient(black 5px, white 0);
  transform: translateX(200px);
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem;
  gap: 1rem;

  &.open {
    animation: open 5s;
    @keyframes open {
      20% {
        transform: translateX(0px);
        opacity: 1;
      }
      80% {
        transform: translateX(0px);
        opacity: 1;
      }
      100% {
        transform: translateX(200px);
        opacity: 0;
      }
    }

    &.closed {
      display: none;
    }
  }

  img {
    height: 60px;
  }
  p {
    width: 100%;
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

const PopupContext = createContext(null);

export default function Popup({ ref }) {
  const [popups, setPopups] = useImmer([]);

  useImperativeHandle(ref, () => {
    return {
      add(item) {
        addPopup(item);
      },
    };
  });

  function addPopup(item) {
    setPopups((draft) => {
      draft.push({ id: uuid(), item: item });
    });
  }

  return (
    <PopupContext.Provider value={{ popups, setPopups }}>
      <Wrapper>
        {popups.map((p) => {
          return (
            <PopupItem key={p.id} name={p.item.title} img={p.item.image} />
          );
        })}
      </Wrapper>
    </PopupContext.Provider>
  );
}

function PopupItem({ name, img }) {
  const [isOpen, setIsOpen] = useState(true);
  const { popups, setPopups } = useContext(PopupContext);

  function close(e) {
    setIsOpen(false);
    setPopups((draft) => {
      draft.splice(0, 1);
    });
  }

  return (
    <StyledPopup
      className={isOpen ? "open" : "closed"}
      onAnimationEnd={() => close()}
    >
      <p>
        New item added to cart.<i className="bx bx-cart-download"></i>
      </p>
      <img src={img}></img>
    </StyledPopup>
  );
}
