document.addEventListener('DOMContentLoaded', ()=> {
    

    const products = [
        {id:1,name:"product 1",price:23},
        {id:2,name:"product 2",price:29},
        {id:3,name:"product 3",price:100}
    ]
    const cart = []

    const productList =document.getElementById("product-list")
    const cartItems = document.getElementById("cart-items")
    const emptyCartMessage = document.getElementById("empty-cart")
    const cartTotalMessage = document.getElementById("cart-total")
    const totalPriceDisplay = document.getElementById("total-price")
    const checkOutBtn = document.getElementById("checkout-btn")

    products.forEach(product => {
        const productDiv = document.createElement("div")
        productDiv.classList.add("product")
        productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to cart</button>
        `;
        productList.appendChild(productDiv);
    });

    productList.addEventListener('click',(e)=> {
        if(e.target.tagName === 'BUTTON') {
            const productId = parseInt(e.target.getAttribute("data-id"));
           const product =  products.find(p => p.id === productId)
            addToCart(product);
        }
        
    })

   function  addToCart (product){
    cart.push(product)
    renderCart();
    
    }

    function renderCart(){
        cartItems.innerText="";
        let totalPrice = 0;
        if(cart.length){
            emptyCartMessage.classList.add("hidden");
            cartTotalMessage.classList.remove("hidden")
            cart.forEach()
        }else {
            emptyCartMessage.classList.remove("hidden");
 
        }
    }
});
