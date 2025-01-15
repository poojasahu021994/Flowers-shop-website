async function fet_data(){
    let res = await fetch("http://localhost:3000/product")
    let data = await res.json();
    console.log(data)
    let final_data=data.map((t)=>`      
      <tr>
         <td> ${t.id} </td>
         <td><img width ="60px" height="50px" src="${t.imageurl}" alt=""></td>
         <td> ${t.Price} </td>
         <td> ${t.Update} </td>
         <td><button onclick="myedit('${t.id}')" style="background-color: #7380ec; border-style: none; hight:60px; width:50px;  font-size: 15px; color: white;">Edit </button></td>
         <td><button onclick="mydelete('${t.id}')" style="background-color:rgb(223, 111, 121); border-style: none; hight:60px; width:70px; font-size: 15px; color: white; broder:none;" >Delete </button></td>
      </tr>
    `).join("")

    document.querySelector('#showdata').innerHTML=final_data
}


fet_data()

// Delete 
function mydelete(id){





    fetch(`http://localhost:3000/product/${id}`,{
     method:'DELETE'
    })
    .then(re=>alert("deleted successfully....!!"))
 }
//  Insert
 
 function insertdata(){
    let data = {
       imageurl:document.querySelector('#img').value,
       
       Name:document.querySelector('#name').value,
       Price:document.querySelector('#Price').value,
       Update:document.querySelector('#Status').value
    }
 
    fetch("http://localhost:3000/product",{
       method:'POST',
       headers:{
          'content-type':'application/JSON'
       },
       body:JSON.stringify(data)
    })
    .then(res=>alert("Insreted...!!!"))
 }

//  Edit

async function myedit(id){
    let myupdatedata = await fetch(`http://localhost:3000/product/${id}`)
    let redata =await myupdatedata.json()
    let senddata =`
    <div style="background-color: #dce1eb; hight:50px; width:100px; font-size: 15px; margin:50px;">
     <input type="text" value="${redata.imageurl}" id="img1"> <br>
     <input type="text" value="${redata.Price}" id="Price1"> <br>
     <input type="text" value="${redata.Update}" id="update1"> <br>
     <button id="btn_save" onclick="finalupdate('${redata.id}')">Submit</button>
   
     </div>
    `
    document.querySelector('#edittable').innerHTML = senddata
 }
 function finalupdate(id){
    let fdata={    
        imageurl :document.querySelector('#img1').value,
        Price:document.querySelector('#Price1').value,
        Update:document.querySelector('#update1').value,
    }
    fetch(`http://localhost:3000/product/${id}`,{
        method:'PUT',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(fdata)
    })
    .then(r=>alert("update....!!!"))
}

// ========Add to cart start================
let label = document.querySelector('#label')
let shoppingCart = document.querySelector('#shoping_cart')
let basket = JSON.parse(localStorage.getItem('data')) || []

let calculate =()=>{
   let cart_icon=document.getElementById('add_card')
   let cart_amount =basket.length
   cart_icon.innerHTML=cart_amount

}
calculate();

let genrate_Cart_item=()=>{
   if(basket.length!==0){
    return(shoppingCart.innerHTML=basket.map((x)=>{
      let {id,Name,Price,imageurl,item,Update}= x;
      return `
      <div class="cart_item">
      <div class="pera"><p>${Name}</p></div>
      <div class ="cart_item_img">
      <img src="${imageurl}" alt=""/>
      </div>
       <p>${Price}</p>
       <button onclick="remove_from_cart${id}">Remove</button>

      </div>
      `
    }).join("")
   )
   }
}
genrate_Cart_item();

let remove_from_cart = (id) =>{
   basket =basket.filter((x)=> x.id !=id)
   localStorage.setItem('data',JSON.stringify(basket))
   calculate()
   genrate_Cart_item()
}

//totel function



