import {
  createContext,
  useContext,
  useImperativeHandle,
  useState,
} from "react";
import { styled, css } from "styled-components";

const FormContext = createContext();

const Content = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0.5rem;
  min-width: 300px;
  background-color: blue;
  gap: 1rem;

  ${(props) =>
    props.type === "sub" &&
    css`
      background-color: red;
    `}

  ${(props) =>
    props.state === "closed" &&
    css`
      display: none;
    `}
`;

const Button = styled.button`
  border-style: none;
  outline-style: none;
  padding: 1rem;
  border-radius: 0.2rem;
  width: 100%;
  &:hover {
    background-color: #d8d8d8;
  }
`;

const Input = styled.input`
  outline-style: none;
  border-style: none;
  padding: 0.4rem;
  border-radius: 0.4rem;
  width: 100%;
`;

export default function Form({
  children,
  data,
  setData,
  isDynamic = false,
  ref,
}) {
  return (
    <FormContext.Provider value={{ data, setData, isDynamic }}>
      <section key={data.id}>
        <Section title={data.value} ref={ref}>
          {children}
        </Section>
      </section>
    </FormContext.Provider>
  );
}

function Section({ children, title, ref }) {
  const [open, setOpen] = useState(true);
  const { data } = useContext(FormContext);

  useImperativeHandle(ref, () => {
    return {
      close() {
        setOpen(false);
      },
    };
  });

  return (
    <div>
      <Button onClick={() => setOpen(!open)} ref={ref}>
        {title}
      </Button>
      <Content state={!open ? "closed" : ""}>{children}</Content>
    </div>
  );
}

function InputField({ id, label, value, index }) {
  const { setData, isDynamic } = useContext(FormContext);

  function updateData(e, index, id) {
    setData((draft) => {
      isDynamic
        ? (draft.items[index].value = e.target.value)
        : (draft[id] = e.target.value);
    });
  }

  return (
    <label htmlFor={id}>
      <p>{label}</p>
      <Input
        name={id}
        title={id}
        value={value}
        onChange={(e) => updateData(e, index, id)}
      />
    </label>
  );
}

Form.InputField = InputField;
Form.Section = Section;
