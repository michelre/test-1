// On parse l'URL pour en déduire le paramètre orderId
const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId')

document.querySelector('#orderId').textContent = orderId