import styled from "styled-components";
import keyframes from "styled-components";
import { Link, useParams } from "react-router-dom";
import Form from "./comps/Form";
import { useRef, useState } from "react";
import { useImmer } from "use-immer";

const Main = styled.section`
  color: white;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function App() {
  const [profileData, SetProfileData] = useImmer({
    id: "personalInfo",
    value: "Personal Info",
    firstName: "John",
    lastName: "Doe",
  });

  const [expData, SetExpData] = useImmer({
    id: "experiance",
    value: "Professional Experiance",
    items: [
      {
        id: 0,
        subItems: [
          { label: "Company", id: "company", value: "Super Miners CO" },
          { label: "Job Title", id: "jobTitle", value: "Extra Miner" },
        ],
      },
      {
        id: 1,
        subItems: [
          { label: "Company", id: "company", value: "Super Miners CO" },
          { label: "Job Title", id: "jobTitle", value: "Extra Miner" },
        ],
      },
    ],
  });

  const profileRef = useRef(null)
  const expRef = useRef(null)

  const refs = [profileRef, expRef]

  return (
    <Main>
      <Form data={profileData} setData={SetProfileData} ref={profileRef}>
        <Form.InputField
          id={"firstName"}
          label="First Name"
          value={profileData.firstName}
        />
      </Form>

      <Form data={expData} setData={SetExpData} isDynamic={true} ref={expRef}>
        {expData.items.map((item, index) => {
          console.log(refs)
          return (
            <Form.Section title={item.subItems[0].value} key={item.id}>
              {expData.items[index].subItems.map((subItem) => {
                return (
                  <Form.InputField
                    id={subItem.id}
                    lable={subItem.label}
                    value={subItem.value}
                    key={subItem.id}
                  />
                );
              })}
            </Form.Section>
          );
        })}
      </Form>
      <p>{profileData.firstName + " " + profileData.lastName}</p>
    </Main>
  );
}

export default App;
