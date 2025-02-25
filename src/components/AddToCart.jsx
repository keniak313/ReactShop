import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { ImportantButton } from "../styles/GlobalStyles";

export default function AddToCart({ id, isSmall = false, amount = 1, ...props }) {
  const { products, cart, setCart, openPopup } = useOutletContext();
  function addItem() {
    const index = products.findIndex((prod) => prod.id === id);
    const product = products[index];
    openPopup(id)
    console.log("----addItem---");
    console.log(`Item: ${product.title}`);
    console.log("Adding item");
    console.log("PRODUCTS in ADD");
    console.log(products);
    console.log(`INDEX: ${index}`);
    setCart((draft) => {
      draft.push({ quantity: amount, product });
    });
    console.log("Product added to cart");
  }

  function updateItem() {
    const index = cart.findIndex((prod) => prod.product.id === id);
    const product = products[index];
    openPopup(id)
    console.log("----updateItem---");
    console.log(`Item: ${cart[index].product.title}`);
    console.log("Updating item quantity");
    console.log(cart);
    console.log(`INDEX: ${index}`);
    setCart((draft) => {
      draft[index].quantity += amount;
    });
  }

  function cartHandler(e) {
    e.preventDefault();
    
    console.log("----cartHandler---");
    console.log("Handling Cart");
    console.log("Current Cart");
    console.log(cart);
    console.log(`Looking for ID: ${id}`);
    const filter = cart.filter((prod) => prod.product.id === id);
    console.log(filter.length);

    if (cart.length > 0) {
      if (filter.length > 0) {
        //Update quantity
        console.log("Exist - incresing amount");
        console.log(filter);
        console.log(`Found itemID: ${filter[0].product.id}`);
        updateItem();
      } else {
        //Add product
        console.log("Does not exist - adding");
        addItem();
      }
    } else {
      //Add product
      console.log("Cart is empty");
      addItem();
    }
  }
  return (
    <ImportantButton {...props} onClick={(e) => cartHandler(e)}>
      <i class="bx bx-cart-download"></i>
      {isSmall ? `` : `Add to cart`}
    </ImportantButton>
  );
}
