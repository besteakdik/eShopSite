let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () =>{
    search.classList.toggle('active');
}

let carts = document.querySelectorAll('.add-cart');
let products = [
    {
        name: 'Kakashi Hatake',
        tag: 'kakashi',
        price: 18,
        inCart: 0
    },
    {
        name: 'Izuki Midoriya',
        tag: 'midoriya',
        price: 20,
        inCart: 0
    },
    {
        name: 'Naruto Uzumaki',
        tag: 'naruto',
        price: 21,
        inCart: 0
    },
    {
        name: 'Ryuk',
        tag: 'ryuk',
        price: 25,
        inCart: 0
    },
    {
        name: 'Sasuke Uchiha',
        tag: 'sasuke',
        price: 19,
        inCart: 0
    },
    {
        name: 'Satoru Gojo',
        tag: 'satoru',
        price: 26,
        inCart: 0
    },
    {
        name: 'Naruto',
        tag: 'narutoShip',
        price: 17,
        inCart: 0
    },
    {
        name: 'Yuji Itadori',
        tag: 'itadori',
        price: 18,
        inCart: 0
    }
];

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNum(products[i]);
        totalCost(products[i]);
    })
}

function loadCartNum() {
    let productNum = localStorage.getItem('cartNum');

    if(productNum) {
        document.querySelector('.header-icon span').textContent = productNum;
    }
}

function cartNum(product) {

    let productNum = localStorage.getItem('cartNum');
    productNum = parseInt(productNum);

    if(productNum) {
        localStorage.setItem('cartNum', productNum + 1);
        document.querySelector('.header-icon span').textContent = productNum + 1;
    }else{
        localStorage.setItem('cartNum', 1);
        document.querySelector('.header-icon span').textContent = 1;
    }

    setItems(product);

}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart +=1;
    }else{
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
    }
}
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    //console.log("total is", product.price);
    let cartCost = localStorage.getItem('totalCost');
    //console.log("cartCost is", cartCost);

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }else{
        localStorage.setItem('totalCost', product.price);
    } 
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".cartproducts");
    let cartCost = localStorage.getItem('totalCost');
    //console.log(cartItems);
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <i class='bx bx-window-close'></i>
                <img src="img/${item.tag}.jpg">
                <span>${item.name}</span>&emsp;
                <div>x${item.inCart}</div>&emsp;&emsp;&emsp;
                <div class="price">$${item.price},00</div>&emsp;&ensp;&emsp;&emsp;&emsp;
            <div class="total">
                $${item.inCart * item.price},00
            </div>
            </div>
            `;
        });

        productContainer.innerHTML += `
            <div class = "basketTotalContainer>
                <h4 class = "basketTotalTitle">
                Basket Total
                </h4>
                <h4 class = "basketTotal">
                    $${cartCost},00
                </h4>
            </div>
        `;
    }
}

loadCartNum();
displayCart();

function obj(name,desc,link) {
    this.name = name;
    this.desc = desc;
    this.link = link;

}

function add() {
    let name = document.getElementById("name").value;
    let desc = document.getElementById("info").value;
    let link = document.getElementById("price").value;

    let obj = new obj(name,info,price);
    console.log(obj);
    alert(name+" "+info+" "+price);

}

let header = document.querySelector('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});