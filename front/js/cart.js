let host = "http://localhost:3000/api/products/";

function loadCart(){
    let cart = localStorage.getItem("cart");
    if(cart == null){
        return [];
    }else{
        return JSON.parse(cart);
    }
}
function saveCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
}
let cart = loadCart();
// affichage données
    //total quantité
const totalQuantity = document.getElementById("totalQuantity");
function resultQuantity(){
    let sumQuantity = cart.map(item => item.quantity).reduce((previous, current) => previous + current, 0);
    totalQuantity.innerText = sumQuantity;
}
    //total prix

let lotPrice = [];
const totalPrice = document.getElementById("totalPrice");
function resultPrice(){
    let sumPrice = lotPrice.map(item => item.itemTotal).reduce((previous, current) => previous + current, 0);
    totalPrice.innerText = sumPrice;
}

function injectPrice(index,cartItem, itemTotal){
    lotPrice.splice([index], 1,{
    itemTotal: itemTotal,
    id : cartItem.id,
    color: cartItem.itemColor
    });
    resultPrice();
}

function deletePrice(index, cartItem){
    lotPrice.splice([index],1);
    resultPrice();
    return cartItem.quantity;
}

console.log("debut");


const GetCartItem = async function(){
    // lancement des itérations
    await cart.forEach((cartItem, index) =>{
        fetch(host+cartItem.id)
        .then (reponse => reponse.json())
        .then (data =>{
    //generation article
            const cart__items = document.getElementById("cart__items");
                const cart__item = document.createElement("article");
                cart__item.classList.add("cart__item");
                cart__item.dataset.id = cartItem.id;
                cart__item.dataset.color = cartItem.itemColor;
                cart__items.appendChild(cart__item);
                
    //div cart__item__img
                    const cart__item__img = document.createElement("div");
                    cart__item__img.classList.add("cart__item__img");
                    cart__item.appendChild(cart__item__img);
                        const item__img = document.createElement("img");
                        item__img.src = data.imageUrl;
                        item__img.alt = data.altTxt;
                        cart__item__img.appendChild(item__img);
    // div cart__item__content
                    const cart__item__content = document.createElement("div");
                    cart__item__content.classList.add("cart__item__content");
                    cart__item.appendChild(cart__item__content);
    // div cart__item__content__description
                        const cart__item__content__description = document.createElement("div");
                        cart__item__content__description.classList.add("cart__item__content__description");
                        cart__item__content.appendChild(cart__item__content__description);
    // contenu div cart__item__content__description
                            const itemName = document.createElement("h2");
                            itemName.innerText = data.name;
                            cart__item__content__description.appendChild(itemName);
                            const itemColor = document.createElement("p");
                            itemColor.innerText = cartItem.itemColor;
                            cart__item__content__description.appendChild(itemColor);
                            const itemPrice = document.createElement("p");
                            itemPrice.innerText = data.price + "€";
                            cart__item__content__description.appendChild(itemPrice);
                            lotPrice.push({
                                itemTotal: data.price * cart[index].quantity,
                                id : cartItem.id,
                                color: cartItem.itemColor
                            });
                            console.log(lotPrice.itemTotal);
                            console.table(lotPrice);
    //div cart__item__content__settings
                        const cart__item__content__settings = document.createElement("div");
                        cart__item__content__settings.classList.add("cart__item__content__settings");
                        cart__item__content.appendChild(cart__item__content__settings);
    //div cart__item__content__settings__quantity
                            const cart__item__content__settings__quantity = document.createElement("div");
                            cart__item__content__settings__quantity.classList.add("cart__item__content__quantity");
                            cart__item__content__settings.appendChild(cart__item__content__settings__quantity);
    //contenu div cart__item__content__settings__quantity
                                const quantityText = document.createElement("p");
                                quantityText.innerText = "Qté :";
                                cart__item__content__settings__quantity.appendChild(quantityText);
                                const itemQuantity = document.createElement("input");
                                itemQuantity.setAttribute("type","number");
                                itemQuantity.setAttribute("name","itemQuantity");
                                itemQuantity.setAttribute("min","1")
                                itemQuantity.setAttribute("max", "100")
                                itemQuantity.setAttribute("value", cart[index].quantity);
                                itemQuantity.addEventListener('change',() =>{
                                    let cart = loadCart();
                                    let newQuantity = parseInt(itemQuantity.value);
                                    article = itemQuantity.closest("article");
                                    const index = cart.findIndex(element => {
                                        if (element.id === article.dataset.id && element.itemColor === article.dataset.color){
                                            return true
                                        }
                                        return false;
                                    });
                                    cart[index].quantity = newQuantity;
                                    cartItem.quantity = newQuantity;
                                    saveCart(cart);
                                    //maj quantité totale
                                    resultQuantity();
                                    //maj prix total
                                    let itemTotal = data.price * cart[index].quantity;
                                    injectPrice(index,cartItem, itemTotal);
                                })
                                cart__item__content__settings__quantity.appendChild(itemQuantity);
    //div cart__item__content__settings__delete
                            const cart__item__content__settings__delete = document.createElement("div");
                            cart__item__content__settings__delete.classList.add("cart__item__content__delete");
                            cart__item__content.appendChild(cart__item__content__settings__delete);
    // contenu div cart__item__content__settings__delete
                                const deleteItem = document.createElement("p");
                                deleteItem.classList.add("deleteItem");
                                deleteItem.innerText = "Supprimer";
                                deleteItem.addEventListener("click", ()=>{
                                        loadCart();
                                        console.table(cart);
                                        const newCart = cart.filter(item => item != cartItem);
                                        cart = newCart;
                                        saveCart(cart);
                                        //maj quantité totale
                                        resultQuantity();
                                        //maj prix total
                                        deletePrice(index, cartItem);
                                        
                                        cart__items.removeChild(cart__item);
                                        console.table(cart);
                                })
                                cart__item__content__settings__delete.appendChild(deleteItem);
                                //affichage natal quantitées
                                resultQuantity();
                                //affichage natal Prix total
                                resultPrice();
                                console.log(index);
        })
    })
}
GetCartItem();

console.log("fin");
//Moissonnage des données
const form = document.querySelector(".cart__order__form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
const order = document.getElementById("order");


const emailErrorMsg = document.getElementById("emailErrorMsg");
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
const cityErrorMsg = document.getElementById("cityErrorMsg");
const addressErrorMsg = document.getElementById("addressErrorMsg");

let validFirstName, validLastName, validAddress, validCity,validEmail;

const regexName = (value)=>{
    return /^[a-zéèôçà]{2,50}(-| )?([a-zéèôçà]{2,50})?$/gmi.test(value);
}

firstName.addEventListener("change", function(){
    validFirstName = regexName(firstName.value);
    if (regexName(firstName.value)){
        firstNameErrorMsg.innerText = null;
        return true;
    }else{
        return false;
    }
});

lastName.addEventListener("input", () =>{
    validLastName = regexName(lastName.value);
    if (validLastName){
        lastNameErrorMsg.innerText = null;
        return true;
    }else{
        return false;
    }
});

const regexCity = (value)=>{
    return /^[a-zéèôçà]{2,50}(-| )?([a-zéèôçà]{2,50})?(-| )?([a-zéèôçà]{2,50})?$/gmi.test(value);
}

city.addEventListener("input", () =>{
    validCity = regexCity(city.value);
    if (validCity){
        cityErrorMsg.innerText = null;
        return true;
    }else{
        return false;
    }
});

const regexAddress = (value)=>{
    return /^[a-zA-Z0-9\s,'-]{2,50}?$/gmi.test(value);
}

address.addEventListener("input", () =>{
    validAddress = regexAddress(address.value);
    if (validAddress){
        addressErrorMsg.innerText = null;
        return true;
    }else{
        return false;
    }
});

const regexMail = (value)=>{
    return /^((\w[^\W]+)[\.\-]?){1,}\@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gmi.test(value);
}

email.addEventListener("input", () =>{
    validEmail = regexMail(email.value);
    if (validEmail){
        emailErrorMsg.innerText = null;
        return true;
        
    }else{
        return false;
    }
});

form.onsubmit = () =>{
    return false;
};



let products = [];
order.addEventListener("click", ()=>{
    if(validFirstName && validLastName && validAddress && validCity && validEmail){
        contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value
        };
        cart.forEach((cartItem) =>{
            products.push(cartItem.id);
        });
        postOrder = {
            contact,
            products
        };
        submit(postOrder);
    }
    if(validFirstName == false){
        firstNameErrorMsg.innerText = "Veuillez entrer un prénom valide";
    }
    if(validLastName == false){
        lastNameErrorMsg.innerText = "Veuillez entrer un nom valide";
    }
    if(validAddress == false){
        addressErrorMsg.innerText = "veuillez entrer une adresse valide";
    }
    if(validCity == false){
        cityErrorMsg.innerText = "veuillez entrer une ville valide";
    }
    if(validEmail == false){
        emailErrorMsg.innerText = "veuillez entrer une adresse email valide";
    }
})

async function submit(postOrder){
    try{
        const response = await fetch(host+"order", {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(postOrder)
            });
            const result = await response.json();
            localStorage.removeItem('cart');
            window.location.href = `confirmation.html?orderId=${result.orderId}`;
    }
    catch(error){
        console.log(error);
    }
}






