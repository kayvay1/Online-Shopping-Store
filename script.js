
var cartindexvalue = 0
var cartvalue = 0;


async function fetchData() {
    let api_url = 'https://script.google.com/macros/s/AKfycbwwjqURFoRdd3CNNmOLVHIclvfCS9H4MmzRdagDQSLIlJX_F1A6JxUsgVE4UoAv8tD0CQ/exec';
    try {
        const response = await fetch(api_url);
        globalData = await response.json();
        let finalarray = globalData.data;
        console.log(finalarray);

        // Clear previous cards
        cards.innerHTML = '';

     
        for(let i = 1; i<globalData.data.length; i++){
              
               
            createCard(finalarray[i]);
                      
        
        
        }

    } catch (error) {
        console.error('Error fetching:', error);
    }
}
const cards = document.getElementById('cards')
function createCard(item){
    
    

    const card = document.createElement('div')
    card.className = 'card'

    const cardup = document.createElement('div')
    cardup.className = 'cardup'

    const cardimg = document.createElement('img')
    cardimg.src = item.item_img || 'https://placehold.co/600x400'

    const cardbtm = document.createElement('div')
    cardbtm.className = 'cardbtm'
    const cardheadingh2 = document.createElement('h2')
    cardheadingh2.textContent = item.item_name || 'No Title'
    const cardpara = document.createElement('p')
    cardpara.textContent = item.item_description || 'No description available.'

    const cardbuydata = document.createElement('div')
    cardbuydata.className = 'cardbuydata'
    const cardselection = document.createElement('cardselection')
    cardselection.className = 'cardselection'
   
    const review = document.createElement('p')
    review.textContent = item.reviews + ' ' || '4.1'
    if(review.textContent < '2'){
        review.style.backgroundColor = 'rgb(4, 182, 4)'
    }else if(review.textContent <= '4'){
        review.style.backgroundColor = 'rgb(5, 140, 5)'
    }else{
        review.style.backgroundColor = 'rgb(1, 123, 1)'
    }

    const cardoption = document.createElement('select')
    cardoption.id = 'cardoption'
    cardoption.name = 'cardoption'

    const freesize = document.createElement('option')
    const ssize = document.createElement('option')
    const msize = document.createElement('option')
    const xlsize = document.createElement('option')
    const xxlsize = document.createElement('option')
    freesize.value = 'FREESIZE'   
    ssize.value = 'S'
    msize.value = 'M'
    xlsize.value = 'XL'
    xxlsize.value = 'XXL'
    freesize.textContent = 'FREE SIZE'
    ssize.textContent = 'S'
    msize.textContent = 'M'
    xlsize.textContent = 'XL'
    xxlsize.textContent = 'XXL'

    const carbuy = document.createElement('div')
    carbuy.className = 'carbuy'

    const price = document.createElement('h4')
    price.textContent = item.item_finalprice +'/-' || '$29.99'
    const buybutton = document.createElement('button')
    buybutton.textContent = 'Buy Now'

    let cartindex = document.getElementById('cartindex')
    let carttotalvalue = document.getElementById('carttotalvalue')
    var index = 0
    
    
    buybutton.onclick = function(){  
        index++
        cartindexvalue++      
        cartvalue += parseFloat(item.item_finalprice)
        carttotalvalue.textContent = `₹ ${cartvalue}`
        cartindex.textContent = cartindexvalue
        let selectedoption = cardoption.value
        buybutton.textContent = index + ' Added +'
        
        // alert('clicked on: ' + item.item_name + ' and size is: ' + selectedoption + ' Please Go to Checkout')
        updateCart(item)      
    }

    cards.appendChild(card)

    card.appendChild(cardup)
    card.appendChild(cardbtm)

    cardup.appendChild(cardimg)
    cardbtm.appendChild(cardheadingh2)
    cardbtm.appendChild(cardpara)
    cardbtm.appendChild(cardbuydata)
    
    cardbuydata.appendChild(cardselection)
    cardbuydata.appendChild(carbuy)

    cardselection.appendChild(review)
    cardselection.appendChild(cardoption)
    cardoption.appendChild(freesize)
    cardoption.appendChild(ssize)
    cardoption.appendChild(msize)
    cardoption.appendChild(xlsize)
    cardoption.appendChild(xxlsize)

    carbuy.appendChild(price)
    carbuy.appendChild(buybutton)

}




fetchData();




document.getElementById('cart').addEventListener('click', function(){
    let sidecartsection = document.getElementById('sidecartsection')
    let sidecart = document.getElementById('sidecart')

    sidecartsection.style.display = 'flex'
    sidecart.style.marginRight = '0px'

 document.getElementById('sidecheckout').style.display = 'none'

    // history.pushState(null, '', 'index.html/cart');
    // window.location.href = 'index.html/cart';
    // history.pushState(null, '', 'index.html/cart?param1=value1&param2=value2');


})

document.getElementById('cartclose').addEventListener('click', function(){
    let sidecartsection = document.getElementById('sidecartsection')

    document.getElementById('sidecheckout').style.display = 'none'
    sidecartsection.style.display = 'none'
   
})

// document.getElementById('sidecartsection').addEventListener('click', function(){
//     sidecartsection.style.display = 'none'
// })


let cartitem = document.getElementById('cartitem')
let sidecardleftupheading = document.getElementById('sidecardleftupheading')
let sidecardleftup = document.getElementById('sidecardleftup')
let sidecarddatarightsubtotal = document.getElementById('sidecarddatarightsubtotal')
let sidecarddatarightgst = document.getElementById('sidecarddatarightgst')
let sidecarddatarightwithgst = document.getElementById('sidecarddatarightwithgst')
let cartsumtotal = 0;

function updateCart(price){
    let cartdiv = document.createElement('div')
    cartdiv.className = 'cartdiv'

    let cartimg = document.createElement('img')
    cartimg.style.width = 10+'%'
    let cartitemname = document.createElement('h3')
    let cartprice = document.createElement('h3')

    cartitemname.style.textAlign = 'start'
    cartprice.style.textAlign = 'end'

    cartitemname.textContent = price.item_name || 'Empty';
    cartprice.textContent = price.item_finalprice
    cartimg.src = price.item_img

    cartsumtotal += parseFloat(price.item_finalprice)
    let gst = cartsumtotal/100*5;
    
    document.getElementById('gstamt').textContent = `GST @ 5% : ${ gst}`

    let Sumwithgst = cartsumtotal + gst 

    document.getElementById('cartsubtotal').textContent = `₹ ${Sumwithgst}`

    
    cartitem.appendChild(cartdiv)

    cartdiv.appendChild(cartitemname)
    cartdiv.appendChild(cartprice)    
    cartdiv.appendChild(cartimg)    


    let sidecardleftuppara = document.createElement('span')
    sidecardleftuppara.classList = 'sidecardleftuppara'
    sidecardleftuppara.textContent = price.item_name + ' -1 '
    
    // if(price.item_name === price.item_name){
    //     sidecardleftuppara.textContent = " "
    // }

    sidecardleftup.appendChild(sidecardleftuppara)


    sidecardleftupheading.textContent = `Total : ${cartindexvalue} Procuct Added`
    sidecarddatarightsubtotal.textContent = `₹${cartsumtotal} /-`
    sidecarddatarightgst.textContent = `5% : ₹${gst}/-`
    sidecarddatarightwithgst.textContent = ` ₹${Sumwithgst}/-`
    sidecarddatarightwithgst.style.color = 'red'
   
    
    updateCheckoutform(price)
}


let viewcartbtn = document.getElementById('viewcartbtn')
viewcartbtn.addEventListener('click', function(){
    document.getElementById('sidecart').style.marginRight = 90 + '%'
    document.getElementById('sidecheckout').style.display = 'block'
})

let viewcartcheckout = document.getElementById('viewcartcheckout')
let viewcheckout = document.getElementById('viewcheckout')
let aftercheckout = document.getElementById('aftercheckout')


viewcartcheckout.addEventListener('click', function checkOut(){
    document.querySelector('.card-section').style.display = 'none'
    sidecartsection.style.display = 'none'
    aftercheckout.style.display = 'flex'
    checkRadion()
})
viewcheckout.addEventListener('click', function checkOut(){
    document.querySelector('.card-section').style.display = 'none'
    sidecartsection.style.display = 'none'
    aftercheckout.style.display = 'flex'
    checkRadion()
})


function updateCheckoutform(item){

    let checkoutformdata = document.getElementById('checkoutformdata')
    let userdatatextarea = document.createElement('textarea')
    let userdatatextarealable = document.createElement('label')
    userdatatextarealable.setAttribute('for', 'userdatatextarealable')
    userdatatextarea.readOnly = 'true'
    userdatatextarea.name = 'userdatatextarea'
    userdatatextarea.style.display = 'none'
    // formtextarea.width = 100+'%'
    userdatatextarea.value = ' '

    checkoutformdata.appendChild(userdatatextarea)
    checkoutformdata.appendChild(userdatatextarealable)

   
    let checkoutproductdata = document.getElementById('checkoutproductdata')

    let checkoutdataperents = document.createElement('div')
    checkoutdataperents.className = 'checkoutdataperents'
    

    let checkoutproductdataleft = document.createElement('div')
    let checkoutproductdataright = document.createElement('div')
    let checkoutimage = document.createElement('div')
    let checkoutimagetag = document.createElement('img')
    let checkoutproductdeatiles = document.createElement('div')
    let checkoutproductname = document.createElement('h4')
    checkoutproductname.textContent = item.item_name
    let checkoutproductquentaty = document.createElement('h4')
    // checkoutproductquentaty.textContent = item.index
    checkoutproductquentaty.textContent = `Product List:  ${ cartindexvalue}`
    document.getElementById('checkoutgross').textContent = `₹ ${cartvalue}`
    document.getElementById('checkoutgstamt').textContent = `₹ ${cartvalue*5/100}`
    document.getElementById('cehckoutfinalprice').textContent = `₹ ${cartvalue*5/100 + cartvalue}`
    // document.getElementById('formtextarea').value = `Hello sir, My order Amt is ₹ ${cartvalue*5/100 + cartvalue}`
    let brekk = document.createElement('br')
    userdatatextarea.value = `My ${cartindexvalue} No. Order is ${item.item_name}, & My order Amt is ₹ ${item.item_finalprice} ! \n\n`
    let checkoutproductprice = document.createElement('h4')
    checkoutproductprice.textContent = item.item_finalprice
    // let checkouthr = document.createElement('hr')
    checkoutproductdeatiles.className = 'checkoutproductdeatiles'
    checkoutimagetag.src = item.item_img
    checkoutimage.classList = 'checkoutimage'
    checkoutproductdataleft.className = 'checkoutproductdataleft'
    checkoutproductdataright.className = 'checkoutproductdataright'
    


    checkoutproductdata.appendChild(checkoutdataperents)
    checkoutdataperents.appendChild(checkoutproductdataleft)
    checkoutdataperents.appendChild(checkoutproductdataright)
    
    checkoutproductdataleft.appendChild(checkoutimage)
    checkoutproductdataleft.appendChild(checkoutproductdeatiles)
    checkoutimage.appendChild(checkoutimagetag)
    checkoutproductdeatiles.appendChild(checkoutproductname)
    checkoutproductdeatiles.appendChild(checkoutproductquentaty)

    checkoutproductdataright.appendChild(checkoutproductprice)
    // checkoutproductdata.appendChild(checkouthr)
   

       
}

function checkRadion(){
    let radios = document.querySelectorAll('input[name="payment"]')
    radios.forEach(radio =>{
        if(radio.checked){
            console.log(radio.id)
        }
    })
}


// document.getElementById('cashondelevery').addEventListener('click',  checkRadion())
// document.getElementById('onlinepayment').addEventListener('click',  checkRadion())

// if(document.getElementById('cashondelevery').checked){
//     console.log('ok cash')
// }else if(document.getElementById('onlinepayment').checked){
//     console.log('ok upi')
// }


// order place le liye function 

let submitButton = document.getElementById('submitButton')

submitButton.addEventListener('click', function(){
    let valid = true
    let fristname = document.getElementById('fristname')
    let streetadrs = document.getElementById('streetadrs')
    let city = document.getElementById('city')
    let state = document.getElementById('state')
    let pincode = document.getElementById('pincode')
    let phonenumber = document.getElementById('phonenumber')
    let emial = document.getElementById('emial')   

    if(fristname.value === ''){
        valid= false
    } else if(streetadrs.value.trim() === ''){
        valid= false
    }else if(city.value.trim() === ''){
        valid = false
    }else if(state.value.trim()=== ''){
        valid = false
    }else if(pincode.value.trim()=== ''){
        valid = false
    }else if(phonenumber.value.trim() === ''){
        valid = false
    }else if(emial.value.trim() === ''){
        valid = false
    }



    if(valid){
        alert(' ✅ Order Place Sucessfully, 🤩 Thank You. ')
    } else{
        alert(' ⚠️ Please fill out of All Required fields 🤷 ')
    }

})








let navcenter = document.getElementById('navcenter');
let navbtm = document.getElementById('navbtm');
navbtm.style.backgroundColor = 'white'
navbtm.style.width = '100%'


function navBarscrolling(){
    let lastscrolltop = 280;
    let navbtm = document.getElementById('navbtm');
    let cart = document.getElementById('cart')
    // let cartindex = document.getElementById('cartindex')
    let menu = document.getElementById('menu')

    window.addEventListener('scroll', function(){
        let currentscroll = window.pageYOffset || document.documentElement.scrollTop;

        if(currentscroll > lastscrolltop){
            navbtm.classList.add('navbtm-fixed')
            cart.classList.add('cart-fixed')
            // cart.style.position = 'fixed'
            // cart.style.top = '11px'
            // cart.style.right = '0px'
            // menu.style.minHeight = '50px'
            // menu.style.alignItems = 'center'
            // menu.style.paddingTop = '10px'
            // cart.style.fontSize = '10px'
            // cartindex.style.borderRadius = '10px'            
        }else{
            navbtm.classList.remove('navbtm-fixed')
            // cart.classList.remove('cart-fixed')
            // cart.style.position = 'relative'
            // cart.style.fontSize = '1em'
            // menu.style.minHeight = 'auto'
        }
      
        
        // console.log(currentscroll)
    })
}
document.addEventListener('DOMContentLoaded', navBarscrolling())







