import { Link, Outlet, useParams } from "react-router-dom";
import Popeye from "./Popeye";
import Spinach from "./Spinach";

export default function Profile() {
    const { name } = useParams();
  return (
    <div>
      <h1>Hello World!</h1>
      <p>Cos... cos...</p>
      <Link to="/profile/popeye">Popeye</Link>
      <br/>
      <Link to="/profile/spinach">Spinach</Link>
      <hr />
      {name === "popeye" ? (
        <Popeye />
      ) : name === "spinach" ? (
        <Spinach />
      ) : (
        <DefaultProfile />
      )}
    </div>
  );
}

const DefaultProfile = () => {
    return <p>Oh, nothing to see here!</p>;
  };
  
  
