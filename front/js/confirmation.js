//recuperation id produit dans l'url
let paramsLink = new URL(document.location).searchParams;
let orderId = paramsLink.get("orderId");

let displayOrder = document.getElementById("orderId");
displayOrder.innerText = orderId;
