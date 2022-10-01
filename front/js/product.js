let host = "http://localhost:3000/api/products/";
//recuperation id produit dans l'url
let paramsLink = new URL(document.location).searchParams;
let idProduct = paramsLink.get("id");


//recuperation produit et appel dans l'api
fetch(host + idProduct)
    .then (reponse => reponse.json())
    .then (data =>{
        //generation image
        const itemImg = document.querySelector(".item__img");
        const imageElement = document.createElement("img");
            imageElement.src = data.imageUrl;
            imageElement.alt = data.altTxt;
            itemImg.appendChild(imageElement);
        //generation titre
            const itemTitle = document.getElementById("title");
            itemTitle.innerText = data.name;
        //generation prix
            const itemPrice = document.getElementById("price");
            itemPrice.innerText = data.price;
        //generation description
            const itemDescription = document.getElementById("description");
            itemDescription.innerText = data.description;
        //generation boutons couleurs
            const optionColor = document.getElementById("colors");
            data.colors.forEach((color) => {
                let productColor = document.createElement("option");
                productColor.setAttribute("value",color);
                productColor.textContent = color;
                optionColor.appendChild(productColor);
            });
            
    })
//action bouton
let addingButton = document.getElementById("addToCart");
addingButton.addEventListener("click", () =>{
    let color = document.querySelector("#colors").value;
    let dataQuantity = document.getElementById("quantity").value;
    //conversion string en nb
    let quantity = parseInt(dataQuantity);
    //creation tableau produit
    let product = {
        "id":idProduct,
        "itemColor":color,
        "itemQuantity":quantity
    };
    addCart(product);
})
//mecanique ajout produit
function addCart(product){
    let cart = loadCart();
    //ajout produit si deja present a l'aide de comparaison de parametre via couleur et id
    let testProduct = cart.find(p=> p.idProduct==product.idProduct && p.itemColor==product.itemColor);
    if (testProduct != undefined){
        testProduct.itemQuantity += product.itemQuantity;
    }
    else{
        product.itemQuantity;
        cart.push(product);
    }
    saveCart(cart);
}

//sauvegarde dans le LS
function saveCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
}
//chargement a partir du LS
function loadCart(){
    let cart = localStorage.getItem("cart");
    if(cart == null){
        return [];
    }else{
        return JSON.parse(cart);
    }
}
