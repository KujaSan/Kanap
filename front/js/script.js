let host = "http://localhost:3000/api/products/";
fetch(host)
    .then(reponse => reponse.json())
    .then(data =>{
        console.table(data);
        for (var i = 0; i < data.length ; i++){
            const sectionItems = document.querySelector("#items");
            
            //creation des liens
            const productLink = document.createElement("a");
                productLink.href = "./product.html?id="+ data[i]._id;
                sectionItems.appendChild(productLink);
            //creation des articles
            const product = document.createElement("article");
                productLink.appendChild(product);
            //generation images
            const imageElement = document.createElement("img");
                imageElement.src = data[i].imageUrl;
                imageElement.alt = data[i].altTxt;
                product.appendChild(imageElement);
            //generation noms produits
            const nameElement = document.createElement("h3");
                nameElement.classList.add("productName")
                nameElement.innerText = data[i].name;
                product.appendChild(nameElement);
            //generation des descriptions
            const descriptionElement = document.createElement("p");
                descriptionElement.classList.add("productDescription")
                descriptionElement.innerText = data[i].description;
                product.appendChild(descriptionElement);
        }
    })