import axios from "axios";
import Noty from "noty";
import { initAdmin } from "./admin";

let addToCart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.querySelector("#cartCounter");

const updateCart = (pizza) => {
  //   console.log(pizza);
  axios
    .post("/update-cart", pizza)
    .then((res) => {
      cartCounter.innerText = res.data.totalQty;
      new Noty({
        type: "success",
        timeout: 1000,
        text: "Item added to cart",
        progressBar: false,
      }).show();
    })
    .catch((error) => {
      new Noty({
        type: "error",
        timeout: 1000,
        text: "Something went wrong",
        progressBar: false,
      }).show();
    });
};

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
  });
});

//remove alerts after x seconds
const alertMsg = document.querySelector("#success-alert");
if (alertMsg) {
  setTimeout(() => {
    alertMsg.remove();
  }, 2000);
}

initAdmin();
