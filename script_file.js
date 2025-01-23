// let iconCart =document.querySelector('.Main_Navbar_div');
// let closeBtn =document.querySelector('.cartTab .close');
// let body =document.querySelector('body');

//     iconCart.addEventListener('click', ()=>{
//         body.classList.toggle('.activeTabCart');

//     });
//     closeBtn.addEventListener('click', ()=>{
//         body.classList.toggle('.activeTabCart');
        
//     });

// const shop=document.querySelector('#shop')

// let genrateCard =()=>{
//     shop.innerHTML = product.map((x)=>{
//         console.log(x.name);
//     })

// }
// genrateCard()

// 
let basket=JSON.parse(localStorage.getItem('data')) || []

async function fet_data(){
    let res = await fetch("http://localhost:3000/product")
    let data = await res.json();
    
    console.log(data)
    let final_data=data.map((t)=>`
          
         <div class="flower_item" id=product-id-${t.id}>  
         <img src= "${t.imageurl}" alt=""/>
         <div class="Product_info" >
         <h5>${t.Name}</h5>
         <p><span>₹: </span>${t.Price}</p>
         <p>${t.Update}<span id="stauts">Today</span></p>
         <button onclick= "add_to_cart('${t.id}','${t.imageurl}','${t.Name}','${t.Price}')"> Add to Cart </button>
         </div>
         </div>
    `).join("")

    document.querySelector('#shop').innerHTML=final_data
}
    let add_to_cart=(id,imageurl,Name,Price) =>{
        basket.push({
            id:id,
            item:1,
            Name:Name,
            Price:Price,
            imageurl:imageurl
})
    localStorage.setItem('data',JSON.stringify(basket))
    calculate()
}
let calculate =()=>{
    let cart_icon=document.getElementById('add_card')
    let cart_amount =basket.length

    cart_icon.innerHTML=cart_amount
}
fet_data()