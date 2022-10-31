/**
 * 1. A partir du panier en localStorage, créer visuellement le panier (Nom, photo, quantité, prix total)
 * 2. Supprimer des produits du panier (recalcul du total)
 * 3. Modifier les quantités des produits du panier (recalcul du total)
 * 4. Supprimer tous les éléments du panier
 * 5. Valider le formulaire de commande
 * 6. Envoyer le formulaire de commande (création d'un identifiant de commande)
 * 7. Rediriger vers la page de confirmation de commande
 */


// On récupère le panier du localStorage
const cart = JSON.parse(localStorage.getItem('cart') || '[]')
//On récupère la section du DOM dans laquelle on va inclure les articles du panier
const cartItems = document.querySelector('#cart__items')
//On fait une boucle sur tous les articles du panier
for(let i = 0; i < cart.length; i++){
    // Pour chaque article, on l'ajoute à la section cartItems
    const article = cart[i]
    cartItems.innerHTML += createProductItem(article)
    // TODO: Ajout des évènements
    /*const articleDOM = document.querySelector(`[data-id="${article._id}"][data-color="${article.color}"]`)
    const deleteButton = articleDOM.querySelector('.deleteItem')
    deleteButton.addEventListener('click', function(){
        console.log('click')
    })*/
}


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
        total += article.price * article.quantity
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
    return `<article class="cart__item" data-id="${article._id}" data-color="${article.color}">
                <div class="cart__item__img">
                  <img src="${article.imageUrl}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${article.name}</h2>
                    <p>${article.color}</p>
                    <p>${article.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${article.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`
}

calculateTotal()
