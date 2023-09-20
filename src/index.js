//cada item ja tem seu arr separado

const cart = document.getElementById("cart")
const closeBtn = document.getElementById("close")
let validation = false
const cartList = document.getElementById("box-list")
const addBtn = document.querySelectorAll(".add")
const removeBtn = document.querySelectorAll(".remove")

function showCart(validation) {
    if (validation === true) {
        cartList.style.display = "flex"
    } else {
        cartList.style.display = "none"
    }

}

function open() {
    validation = true
    showCart(validation)
}

function close() {
    validation = false
    showCart(validation)
}

let cartArr = []
function addToCart(ev) {
    const button = ev.target
    const item = button.parentElement.parentElement.parentElement
    const productText = item.getElementsByClassName("product-text")[0].innerText
    const productPrice = parseFloat(item.querySelector(".product-price").innerText.replace("R$", "").trim());
    
    let found = false;

    for (let i = 0; i < cartArr.length; i++) {
        if (cartArr[i].product === productText) {
            cartArr[i].quantity++;
            cartArr[i].totalPrice += productPrice;
            found = true;
            break; // Se encontrou, não precisa continuar procurando
        }
    }

    if (!found) {
        const newProduct = {
            product: productText,
            quantity: 1,
            totalPrice: productPrice,
        };
        cartArr.push(newProduct);
    }


    updateCart()
    
    console.log(cartArr);
}

function updateCart() {
    const cartList = document.getElementById("cart-list")
    cartList.innerHTML = "";

    cartArr.forEach((item, index)=>{
    const li = document.createElement("li")
    li.className = "cart-product-title"
    li.innerText = `${item.product} - Quantidade: ${item.quantity} - Total: ${item.totalPrice.toFixed(2)}`
    cartList.appendChild(li)
    })
}

function removeToCart(productText, productPrice) {
    

    for (let i = 0; i < cartArr.length; i++) {
        if (cartArr[i].product === productText) {
            if (cartArr[i].quantity > 1) {
                cartArr[i].quantity--;
                cartArr[i].totalPrice -= productPrice;
            } else {
                cartArr.splice(i, 1);
            }
            break; // Saia do loop depois de encontrar o produto
        }
    }

    updateCart()
}


cart.addEventListener("click", open)
closeBtn.addEventListener("click", close)
addBtn.forEach((btn)=>{
    btn.addEventListener("click", addToCart)
})
removeBtn.forEach((btn)=>{

    btn.addEventListener("click", function (ev) {
        const button = ev.target
        const item = button.parentElement.parentElement.parentElement
    
        const productText = item.querySelector(".product-text").innerText
        const productPrice = parseFloat(item.querySelector(".product-price").innerText.replace("R$", "").trim());
        removeToCart(productText, productPrice)
    })
})



