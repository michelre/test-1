// Appel ajax (avec fetch) sur le serveur pour récupérer les produits
fetch('http://localhost:3000/api/products')
    .then(function(response){
        return response.json()
    })
    .then(function(products){
        displayProducts(products)
    })

function displayProducts(products){
    // Récupère un élément du DOM (document HTML)
    const items = document.querySelector('#items')
    for(let i = 0; i < products.length; i++){
        const product = products[i] // Récupération du produit à l'indice i (0..7)
        items.innerHTML += `
                <a href="./product.html?id=${product._id}">
                    <article>
                      <img src="${product.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
                      <h3 class="productName">${product.name}</h3>
                      <p class="productDescription">${product.description}</p>
                    </article>
                </a>
            `
    }
}
