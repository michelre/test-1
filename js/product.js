// On parse l'URL pour en déduire le paramètre id
const url = new URL(window.location.href);

// On appel l'API pour récupérer les informations du produit
fetch('http://localhost:3000/api/products/' + url.searchParams.get('id'))
    .then(function(res){
        return res.json()
    })
    .then(function(product){
        // On appelle la fonction displayProduct avec le produit récupéré depuis l'API
        displayProduct(product)
        initEvent(product)
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

function initEvent(product){
    const button = document.querySelector('#addToCart')
    button.addEventListener('click', function(){
        addToCartEvent(product)
    })
}

function addToCartEvent(product){
    const color = document.querySelector('#colors')
    const quantity = document.querySelector('#quantity')

    if(color.value === ''){
        alert('Veuillez sélectionner une couleur')
        return
    }

    if(quantity.value === '0'){
        alert('Veuillez ajouter une quantité')
        return
    }

    product.quantity = parseInt(quantity.value)
    product.color = color.value

    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    // Je recherche un produit dans le panier qui a déjà le même identifiant et la même couleur
    const productExists = cart.find(function(element){
        return element._id === product._id && element.color === product.color
    })
    /* Si le produit existe déjà, on augmente sa quantité sinon on ajoute le produit au panier */
    if(productExists){
        productExists.quantity += product.quantity
    } else {
        cart.push(product)
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Produit ajouté au panier')
}
