/**
 * Validation du formulaire: Au click sur le bouton Commander, vérifier (avec des regex)
 * que les champs sont valides. Si ce n'est pas valide, afficher un message d'erreur
 */


// On récupère le panier du localStorage
let cart = JSON.parse(localStorage.getItem('cart') || '[]')
//On récupère la section du DOM dans laquelle on va inclure les articles du panier
const cartItems = document.querySelector('#cart__items')
// On crée un dictionnaire de prix pour chaque produit
const prices = {}

//On fait une boucle sur tous les articles du panier
const promises = []
for(let i = 0; i < cart.length; i++){
    // Pour chaque article, on l'ajoute à la section cartItems
    const article = cart[i]
    const promise = fetch('http://localhost:3000/api/products/' + article._id)
        .then(res => res.json())
        .then(product => {
            prices[product._id] = product.price // On renseigne le prix de chaque produit
            cartItems.appendChild(createProductItem(article))
        })
    promises.push(promise)
}

/**
 * On attend que toutes les promesses soient résolues pour calculer le total du panier
 * */
Promise.all(promises).then(() => {
    calculateTotal()
})

const form = document.querySelector('.cart__order__form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contact: {
                firstName: e.target.firstName.value,
                lastName: e.target.lastName.value,
                address: e.target.address.value,
                city: e.target.city.value,
                email: e.target.email.value,
            },
            products: cart.map((product) => product._id)
        })
    }).then(res => res.json())
        .then(res => {
            window.location.href = `/html/confirmation.html?orderId=${res.orderId}`
        })
})

function calculateTotal(){
    /*const cartTotals = cart
        .map(function(article){
            return article.price * article.quantity
        })
        .reduce(function(total, current){
            return total + current
        }, 0)*/

    /*const cartTotals = cart
        .reduce(function(total, current){
            return total + (current.price * current.quantity)
        }, 0)
    */

    let total = 0;
    for(let i = 0; i < cart.length; i++){
        const article = cart[i]
        total += prices[article._id] * article.quantity
    }
    const totalQuantity = document.querySelector('#totalQuantity')
    const totalPrice = document.querySelector('#totalPrice')
    totalQuantity.innerHTML = cart.length
    totalPrice.innerHTML = total
}

/**
 * Fonction qui renvoie un article du DOM
 * @param article
 * @returns {string}
 */
function createProductItem(article){
    const articleElement = document.createElement('article')
    articleElement.classList.add('cart__item')
    articleElement.setAttribute('data-id', article._id)
    articleElement.setAttribute('data-color', article.color)

    const cartItemImg = document.createElement('div')
    cartItemImg.classList.add('cart__item__img')
    cartItemImg.innerHTML = `<img src="${article.imageUrl}" alt="Photographie d'un canapé">`

    const cartItemContent = document.createElement('div')
    cartItemContent.classList.add('cart__item__content')
    const cartItemContentDescription = document.createElement('div')
    cartItemContentDescription.classList.add('cart__item__content__description')
    cartItemContentDescription.innerHTML = `
       <h2>${article.name}</h2>
       <p>${article.color}</p>
       <p>${prices[article._id]} €</p>`
    cartItemContent.appendChild(cartItemContentDescription)

    const cartItemContentSettings = document.createElement('div')
    cartItemContentSettings.classList.add('cart__item__content__settings')
    const cartItemContentSettingsInput = document.createElement('input')
    const cartItemContentSettingsP = document.createElement('p')
    cartItemContentSettingsP.innerText = 'Qté :'
    cartItemContentSettingsInput.setAttribute('type', 'number')
    cartItemContentSettingsInput.setAttribute('name', 'itemQuantity')
    cartItemContentSettingsInput.setAttribute('min', '1')
    cartItemContentSettingsInput.setAttribute('max', '100')
    cartItemContentSettingsInput.value = article.quantity
    cartItemContentSettingsInput.classList.add('itemQuantity')

    const deleteItem = document.createElement('p')
    deleteItem.classList.add('deleteItem')
    deleteItem.innerText = 'Supprimer'

    const cartItemContentSettingsQuantity = document.createElement('div')
    cartItemContentSettingsQuantity.classList.add('cart__item__content__settings__quantity')
    const cartItemContentSettingsDelete = document.createElement('div')
    cartItemContentSettingsDelete.classList.add('cart__item__content__settings__delete')

    cartItemContentSettingsQuantity.appendChild(cartItemContentSettingsP)
    cartItemContentSettingsQuantity.appendChild(cartItemContentSettingsInput)
    cartItemContentSettingsDelete.appendChild(deleteItem)

    cartItemContent.appendChild(cartItemContentSettingsQuantity)
    cartItemContent.appendChild(cartItemContentSettingsDelete)

    articleElement.appendChild(cartItemImg)
    articleElement.appendChild(cartItemContent)


    deleteItem.addEventListener('click', () => {
        // Supprimer l'élément du localStorage
        cart = cart.filter((articleCart) => !(articleCart._id === article._id && articleCart.color === article.color))
        //Supprimer l'élément du DOM
        articleElement.remove()
        // ON recalcule le total en appelant la fonction
        calculateTotal()
        // On sauvegarde le panier dans le localStorage
        localStorage.setItem('cart', JSON.stringify(cart))
    })

    cartItemContentSettingsInput.addEventListener('change', (e) => {
        const articleCart = cart.find((a) => a._id === article._id && a.color === article.color)
        articleCart.quantity = parseInt(e.target.value)
        calculateTotal()
        // On sauvegarde le panier dans le localStorage
        localStorage.setItem('cart', JSON.stringify(cart))
    })

    return articleElement;
}

