// --------------------GLOBAL VARIABLES--------------------
var addToAlbum = document.querySelector(".add-img-btn");
var photoInput = document.querySelector(".choose-file-btn");
var titleInput = document.querySelector("#title");
var captionInput = document.querySelector("#caption");
var photoGallery = document.querySelector(".album-field");
var deleteButton = document.querySelector("#delete-btn");
var cardSection = document.querySelector(".album-field");
var viewFavorites = document.querySelector(".view-fav-btn");
var imagesArr = JSON.parse(localStorage.getItem("imagesArr")) || [];
var reader = new FileReader();


// --------------------EVENT LISTENERS---------------------
window.addEventListener('load', appendPhotos(imagesArr));
addToAlbum.addEventListener("click", stringPhotos);
cardSection.addEventListener("click", manipulateCard);
// cardSection.addEventListener("keydown", editCard);

// --------------------FUNCTIONS---------------------------
//Persist
function appendPhotos(array) {
  imagesArr = [];
  array.forEach(function (card) {
    var newPhoto = new Photo(card.id, card.title, card.caption, card.file, card.favorite);
    imagesArr.push(newPhoto);
    displayPhotoCard(card);
  })
}

//Don't mess with this one (photo magic happening)
function stringPhotos() {
  if (photoInput.files[0]) {
    reader.readAsDataURL(photoInput.files[0]); 
    reader.onload = addPhoto
  }
}

function addPhoto(e) {
  var newPhoto = new Photo(Date.now(), titleInput.value, captionInput.value, e.target.result, false);
  imagesArr.push(newPhoto);
  newPhoto.saveToStorage();
  displayPhotoCard(newPhoto);
}

function displayPhotoCard(object) {
  photoGallery.innerHTML += 
  `
    <article class="card" data-id=${object.id}>
        <h2 class="card-title" contenteditable="true">
            ${object.title}
        </h2>
        <section class="card-photo-container">
           <img id="card-img" src=${object.file} />
        </section>
        <section class="card-caption" contenteditable="true">
          <p class="card-caption-copy">
            ${object.caption}
          </p>
        </section>
        <section class="card-buttons">
            <button id="delete-btn">
              <img class="delete icon" src="assets/delete.svg" />
            </button>
            <button>
              <img class="favorite icon" src="assets/favorite.svg" />
            </button>
        </section>
      </article>
    `
}
//keep functions under 10 lines

function manipulateCard(e) {
  e.preventDefault();
  var uniqueId = event.target.parentElement.parentElement.parentElement.dataset.id;
  var parsedId = parseInt(uniqueId);
  console.log(uniqueId);
  var index = imagesArr.findIndex(function(photo) {
    return photo.id === parsedId;
  })
  if (event.target.classList.contains("delete")) {
    console.log(event.target);
    deletePhotoCard();
  }
  if (event.target.classList.contains("favorite")) {
    console.log(event.target);
    favoriteCard();
}}

function deletePhotoCard() {
  var uniqueId = event.target.parentElement.parentElement.parentElement.dataset.id;
  var parsedId = parseInt(uniqueId);
  console.log(typeof parsedId);
  console.log(typeof parsedId);

  // parsedId.remove();
  var index = imagesArr.findIndex(function(photo) {
    return photo.id === parseInt(parsedId);
  });
  console.log(index);
  imagesArr[index].deleteFromStorage(index);
  event.target.parentElement.parentElement.parentElement.remove();
}

function favoriteCard() {
  var clickedCard = event.target.closest("article");
  (console.log(clickedCard + " clicked card html"));
  var parsedCard = parseInt(clickedCard.dataset.id);
  var foundCard = imagesArr.find(function(photo) {
    return photo.id === parsedCard;
  })
  foundCard.updatePhoto();
}

// function editCard(event) {
//   if(!event){
//     return
//   }
//   var uniqueID = event.target.parentElement.dataset.id;
//   console.log(uniqueID + " card unique ID");
//   var foundPhotoCard = imagesArr.find(function(photo) {
//     console.log(foundPhotoCard + " foundPhotoCard")
//     return photo.id === parseInt(uniqueID);
//     })
//   if (event.target.id === 'card-title') {
//     var editTitle = event.target.innerText;
//     foundPhotoCard.title = editTitle;
//     foundPhotoCard.saveToStorage();
//   }
//    if (event.target.id === 'card-caption') {
//     var editCaption = event.target.innerText;
//     foundPhotoCard.body = editCaption;
//     foundPhotoCard.saveToStorage();
//   }
//   if (event.keyCode === 13) {
//     event.target.toggleAttribute('contenteditable');
//   }

//   if (event.keyCode === 13) {
//     event.target.toggleAttribute('contenteditable');
//   }
