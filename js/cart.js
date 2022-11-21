// On récupère le panier du localStorage
let cart = JSON.parse(localStorage.getItem('cart') || '[]')
//On récupère la section du DOM dans laquelle on va inclure les articles du panier
const cartItems = document.querySelector('#cart__items')
//On fait une boucle sur tous les articles du panier
for(let i = 0; i < cart.length; i++){
    // Pour chaque article, on l'ajoute à la section cartItems
    const article = cart[i]
    cartItems.appendChild(createProductItem(article))
}

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