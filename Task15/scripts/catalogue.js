let catalogue = [] // a list to hold catalogue items
const cart = [] // a list to hold cart items

// prototype function to create a item object
function itemDiscription (name, type, numberOfColours, price, image) {
  this.name = name
  this.type = type
  this.numberOfColours = numberOfColours
  this.price = price
  this.image = image
}

// a function to add items to the catalogue list
function loadCatalogue () {
  catalogue.push(new itemDiscription('One Piece', 'Lunar Launch Shoe', '3 Colours', '2 299.95', './images/shirt3.jpg'))
  catalogue.push(new itemDiscription('Anime and Chill', 'T-shirt', '1 Colours', '1 999.95', './images/shirt7.jpg'))
  catalogue.push(new itemDiscription('Naruto Shippuden', 'T-shirt', '2 Colours', '2 299.95', './images/shirt9.jpg'))
  catalogue.push(new itemDiscription('Natura', 'T-shirt', '1 Colours', '2 499.95', './images/t-shirt6.jpg'))
  catalogue.push(new itemDiscription('Nike', ' Nike Air', '2 Colours', '1 599.95', './images/shoe2.jpg'))
  catalogue.push(new itemDiscription('Nike', ' Nike Air 50', '2 Colours', '1 099.95', './images/shoe5.jpg'))
  catalogue.push(new itemDiscription('Adidas', ' Adidas grey', '1 Colours', '949.95', './images/shoe6.jpg'))
  catalogue.push(new itemDiscription('Puma', 'Puma Black', '1 Colours', '899.95', './images/shoe8.jpg'))
}

// a function to store the selected item in the session storage for the item page
function selectItem (event) {
  sessionStorage.setItem('selectedItemIndex', JSON.stringify(event.target.id))
}

// a function to display the catalogue items
function displayItems () {
  // load the catalogue from the storage
  catalogue = JSON.parse(sessionStorage.getItem('catalogue'))
  // get the itemList div
  var itemList = document.getElementById('itemList')

  // id counter for each element
  let itemID = 0
  // go through the catalogue
  for (var item of catalogue) {
    // creat a card container div
    const cardcontainer = document.createElement('div')
    cardcontainer.setAttribute('class', 'col-sm-6 col-md-3')
    cardcontainer.style.paddingBottom = '2rem'
    // create a div element
    const card = document.createElement('div')
    card.setAttribute('class', 'card small shadow')
    card.style.marginLeft = 'auto'
    card.style.marginRight = 'auto'

    // create a link element
    const aLink = document.createElement('a')
    aLink.setAttribute('href', './item.html') // set the link to go to the item page
    aLink.setAttribute('onclick', 'selectItem(event)') // call the selectItem(event) function on-click

    // create an image element
    const img = document.createElement('img')
    img.setAttribute('src', item.image) // give it the path of the image
    img.setAttribute('class', 'card-img-top img-fluid')
    img.setAttribute('alt', item.name)
    img.setAttribute('id', String(itemID)) // give it the item id

    // add the image to the link as a child
    aLink.appendChild(img)

    // create a div element for the card-body
    const cardBody = document.createElement('div')
    cardBody.setAttribute('class', 'card-body')

    // create a h4 element for the card-title = item name
    const cardTitle = document.createElement('h4')
    cardTitle.setAttribute('class', 'card-title')
    cardTitle.innerHTML = item.name

    // create a p element for the item price
    const itemPrice = document.createElement('p')
    itemPrice.setAttribute('class', 'card-title')
    itemPrice.innerHTML = 'R ' + item.price

    // create a button element for adding the item to cart
    const button = document.createElement('button')
    button.setAttribute('class', 'btn btn-outline-secondary')
    button.setAttribute('onclick', 'addToCart(event)')
    button.setAttribute('id', String(itemID))

    // create an i element for the add to cart icon
    const cartIcon = document.createElement('i')
    cartIcon.setAttribute('class', 'fas fa-shopping-cart')
    cartIcon.setAttribute('id', String(itemID))
    cartIcon.innerHTML = 'ADD TO CART'

    // append them items to the card body
    button.appendChild(cartIcon)
    cardBody.appendChild(cardTitle)
    cardBody.appendChild(itemPrice)
    cardBody.appendChild(button)

    // append the link(image) and card body to the card
    card.appendChild(aLink)
    card.appendChild(cardBody)

    // add the card to the cardContainer then the item list
    cardcontainer.appendChild(card)
    itemList.appendChild(cardcontainer)

    // increment the itemID
    itemID++
  }
}

$(document).ready(function () {
  // load the catalogue list
  loadCatalogue()
  if (sessionStorage.getItem('hasCodeRanBefore') === null) {
    // store session variables if the code has not ran before
    sessionStorage.setItem('catalogue', JSON.stringify(catalogue))
    sessionStorage.setItem('cart', JSON.stringify(cart))
    sessionStorage.setItem('hasCodeRanBefore', true)
    sessionStorage.setItem('selectedItemIndex', JSON.stringify(0))
  }

  // display cart items
  displayItems()
  $('.card').mouseenter(function () {
    $(this).animate({
      opacity: '0.8'
    }).css('transform', 'scale(1.05)')
  }).mouseleave(function () {
    $(this).animate({
      opacity: '1'
    }).css('transform', 'scale(1)')
  })
})
