import { printProducts, pushProducts } from "./ui.js";

const baseURL = "https://academlo-api-production.up.railway.app/api";

function getProducts() {
  axios
    .get(`${baseURL}/products`)
    .then(function (response) {
      const products = response.data;
      printProducts(products);
    })
    .catch(function (error) {
      console.log(error);
    });
}

let productStorage = JSON.parse(localStorage.getItem("products")) || [];

function addProduct(id) {
  axios
    .get(`${baseURL}/products/${id}`)
    .then(function (response) {
      const product = response.data;
      productStorage.push(product);
      localStorage.setItem("products", JSON.stringify(productStorage));
      location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function deleteTask(id) {
  let productsDelate = JSON.parse(localStorage.getItem("products"));
  let products = productsDelate.filter((element) => element.id !== id);
  localStorage.clear();
  localStorage.setItem("products", JSON.stringify(products));
  location.reload();
}

pushProducts(productStorage);

export { getProducts, addProduct, deleteTask };
