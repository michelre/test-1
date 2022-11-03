const url = new URL(window.location.href);

// On appel l'API pour récupérer les informations du produit
fetch('http://localhost:3000/api/products/' + url.searchParams.get('id'))
    .then(function(res){
        return res.json()
    })
    .then(function(product){
        // On appelle la fonction displayProduct avec le produit récupéré depuis l'API
        displayProduct(product)
    })

function displayProduct(product){
    // On récupère les éléments du DOM
    const title = document.querySelector('#title')
    const price = document.querySelector('#price')
    const description = document.querySelector('#description')
    const image = document.querySelector('.item__img')
    const colors = document.querySelector('#colors')

    // On complète les informations titre, prix, description et image à partir des informations du produit
    title.textContent = product.name
    price.textContent = product.price
    description.textContent = product.description
    //image.innerHTML = '<img src="' + product.imageUrl + '" alt="' + product.altTxt + '"/>'
    image.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"/>`

    // On complète les options du select avec les couleurs du produit
    for(let i = 0; i < product.colors.length; i++){
        const option = document.createElement('option')
        option.textContent = product.colors[i]
        option.setAttribute('value', product.colors[i])
        colors.appendChild(option)
    }
}