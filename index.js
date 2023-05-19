let bucket = []
window.onload = function() {
    const search = document.getElementsByClassName("navbar")[0].querySelector("input")
    const btn = document.getElementsByClassName("btn")[0]
    search.addEventListener("change",handleInput)
    btn.addEventListener("click", addToCart)
}

async function handleInput(e) {
    let id = e.target.value;
    const product = await getProduct(id);
    renderProduct(product)
}

async function getProduct(id) {
    const response =  await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await response.json();
    console.log(product);
    return product;
}

function renderProduct(product) {
    const selectedProduct = document.getElementsByClassName("selected-product")[0];
    const variations = document.getElementsByClassName("product-variations")[0];
    const title = document.getElementsByClassName("title")[0];
    const description = document.getElementsByClassName("description")[0];
    const price = document.getElementsByClassName("price")[0];
    const productId = document.getElementById("product-id");
    // let bc = document.getElementsByClassName("bread-crumbs")[0].querySelector("ul");
   
    selectedProduct.style.backgroundImage = `url(${product.image})`;
    for(let i =0; i < variations.children.length; i++) {
        let img = variations.children[i];
        img.style.backgroundImage = `url(${product.image})`;
    }
    productId.value = product.id;
    title.innerHTML = product.title;
    price.innerHTML = `$${product.price}`;
    description.innerHTML = product.description;

    // let category = product.category.toUpperCase();
    // let a = `<a href="#">${category}</a>`;
    // let li  = document.createElement("li");
    // li.innerHTML = a;
    // bc.appendChild(li);
}

function addToCart() {
    let quantity = document.getElementsByClassName("product-quantity")[0];
    let count = parseInt(document.getElementsByClassName("product-quantity")[0].innerHTML);
    const productId = parseInt(document.getElementById("product-id").value);
    quantity.innerHTML = count +1;

    let find = bucket.find((item) => item.id === productId)

    if(find === undefined) {
        bucket.push({
            id : productId,
            quantity : 1
        })
    }else{
        find.quantity += 1;
    }
   console.log(bucket);
}