import { useNavigate } from "react-router-dom";

export default function openItem({id}) {
  let navigate = useNavigate();

  function handleClick(id) {
    navigate(`/shop/${id}`);
    // scrollToTop();
  }

  handleClick(id);
}
