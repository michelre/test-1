// On récupère le panier du localStorage
let cart = JSON.parse(localStorage.getItem('cart') || '[]')
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
    cartItems.appendChild(createProductItem(article))
}


function calculateTotal(){
    const cartTotals = cart
        .map(function(article){
            return article.price * article.quantity
        })
        .reduce(function(total, current){
            return total + current
        }, 0)

    const cartTotals = cart
        .reduce(function(total, current){
            return total + (current.price * current.quantity)
        }, 0)
    

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
       <p>${article.price} €</p>`
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
//formulaire
/*const validationText = document.querySelectorall('.cart__order__form__question');

const firstName = document.querySelector('#firstName');
document.getElementById("#firstNameErrorMsg").innerHTML = (firstName.querySelector("").innerHTML);
firstName.addEventListener("blur",userValidation)
firstName.addEventListener("imput",userValidation)

function userValidation(){
  if(firstName.value.length)
}



const lastName = document.querySelector('#lastName');
document.getElementById("#lastNameErrorMsg").innerHTML = (lastName.querySelector("").innerHTML);
lastName.addEventListener("blur",userValidation)
lastName.addEventListener("imput",userValidation)

function userValidation(){
  if(lastName.value.)
}


const address = document.querySelector('#address');
document.getElementById("#addressErrorMsg").innerHTML = (address.querySelector("").innerHTML);
address.addEventListener("blur",userValidation)
address.addEventListener("imput",userValidation)

function userValidation(){
  if(address.value.)
}

const city = document.querySelector('#city');
document.getElementById("#cityErrorMsg").innerHTML = (city.querySelector("").innerHTML);
city.addEventListener("blur",userValidation)
city.addEventListener("imput",userValidation)

function userValidation(){
  if(city.value.)
}

const city = document.querySelector('#email');
document.getElementById("#emailErrorMsg").innerHTML = (email.querySelector("").innerHTML);
email.addEventListener("blur",userValidation)
email.addEventListener("imput",userValidation)
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/



function userValidation(mail) 
{
 if (regexEmail.test(email.value))
  {
    return (true)
  }
    alert("votre addresse est invalide!")
    return (false)
}
const imputValidity = document.querySelector('.cart__order__form__submit');

const order = document.querySelector('#order');
order.addEventListener("change", function(){
  let type = new Email();

  if (type.isValid(this.value)){
      this.parentElemnent.querySelector("message").
      innertexte = "champs manquant";
  }
  else{

  }
});*/
document.getElementById('order').addEventListener("submit", function(e) {
const imputs = this.getElementsByTagName ("imput");
for (const i = 0; i < imputs.lenght ;i++){
  if (!imputs.[i].value){
    erreur = "veuillez remplir ce champ"
  }
}

// const firstName = document.getElementById('firstName');
// const lastName = document.getElementById('lastName');
// const address = document.getElementById('address');
// const city = document.getElementById('city');
// const email = document.getElementById('email');

/**if (!firstname.value) {
  erreur = "veuillez renseigner votre prenom"
 }
 if (erreur) {
  document . getElementById ("firstnameErrorMsg"). innerHTML = erreur;
  return false;
 } else{
  alerte ('formulaire envoyé!');
 }


 if (!lastname.value) {
  erreur = "veuillez renseigner votre nom"
 }
 if (erreur) {
  document . getElementById ("lastnameErrorMsg"). innerHTML =erreur;
  return false;
 } else{
  alerte ('formulaire envoyé!');
 }


 if (!address.value) {
  erreur = "veuillez renseigner votre adresse"
 }
 if (erreur) {
  document . getElementById ("adressErrorMsg"). innerHTML = erreur;
  return false;
 } else{
  alerte ('formulaire envoyé!');
 }


 if (!city.value) {
  erreur = "veuillez renseigner votre ville"
 }
 if (erreur) {
  document . getElementById ("cityErrorMsg").innerHTML = erreur;
  return false;
 } else{
  alerte ('formulaire envoyé!');
 }*/


 if (!email.value) {
  erreur = "veuillez renseigner votre email"
 }
 if (erreur) {
  e.preventDefault();
  document . getElementById ("emailErrorMsg").innerHTML = erreur;
  return false;
 } else{
  alerte ('formulaire envoyé!');
 }


  

});


calculateTotal()