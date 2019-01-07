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

// --------------------FUNCTIONS---------------------------
//Persist
function appendPhotos(array) {
  //if this isn't here, I get extra imagesArr array items 
  imagesArr = [];
  array.forEach(function (card) {
    var newPhoto = new Photo(card.id, card.title, card.caption, card.file, card.favorite);
    // console.log(newPhoto);
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
  e.preventDefault();
  var newPhoto = new Photo(Date.now(), titleInput.value, captionInput.value, e.target.result, false);
  imagesArr.push(newPhoto);
  newPhoto.saveToStorage();
  displayPhotoCard(newPhoto);
}

function displayPhotoCard(object) {
  photoGallery.innerHTML += 
  `
    <article class="card" data-id=${object.id}>
        <h2 class="card-title">
            ${object.title}
        </h2>
        <section class="card-photo-container">
           <img id="card-img" src=${object.file} />
        </section>
        <section class="card-caption">
          <h2>
            ${object.caption}
          </h2>
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
  // console.log(parsedId);
  var index = imagesArr.findIndex(function(photo) {
    return photo.id === parsedId;
  })
  if (event.target.classList.contains("delete")) {
    console.log(event.target);
    deletePhotoCard();
}}


// function deletePhotoCard(id) {
//   var uniqueId = parseInt(event.target.parentElement.parentElement.parentElement.dataset.id);
//   console.log(uniqueId)
//   console.log(id);
//   var newPhoto = new Photo(uniqueId.id, uniqueId.title, uniqueId.caption, uniqueId.file, uniqueId.favorite);
//   // var parsedId = JSON.parse(localStorage.getItem(uniqueId));
//   // console.log(parsedId, 'should be here');
//   // var selectedId = document.querySelector("")
//   newPhoto.remove();
//   var index = imagesArr.findIndex(function(image) {
//     return image === id.id;
//   });
//   index.deleteFromStorage(imagesArr, index.id);
// }

  // if (event.target.classList.contains("favorite")) {
  //   editCard();
//   })
// }

// function deletePhotoCard(e) {
//   e.preventDefault();
//   var deleteButton = document.querySelector("#delete-btn");
//   deleteButton.addEventListener("click", deletePhotoCard);
//   var uniqueId = event.target.closest.dataset.id;
//   var index = imagesArr.findIndex(function(photo) {
//     return photo.id === parseInt(uniqueId);
//   });
//   imagesArr[index].deleteFromStorage();
//   imagesArr.splice(index, 1);
//   event.target.closest(dataset.id).remove();
// }


// //Duy help
// function deletePhotoCard() {
//   var uniqueId = event.target.parentElement.parentElement.parentElement.dataset.id;
//   var parsedId = parseInt(uniqueId);
//   console.log(typeof parsedId);
//   // parsedId.remove();
//   var index = imagesArr.findIndex(function(photo) {
//     return photo.id === parseInt(parsedId);
//   });
//   imagesArr[index].deleteFromStorage();
// }

function deletePhotoCard() {
  var uniqueId = event.target.parentElement.parentElement.parentElement.dataset.id;
  var parsedId = parseInt(uniqueId);
  console.log(typeof parsedId);
  // parsedId.remove();
  var index = imagesArr.findIndex(function(photo) {
    return photo.id === parseInt(parsedId);
  });
  imagesArr[index].deleteFromStorage();
  reloadPhotoCards();
}

function reloadPhotoCards() {
 Object.keys(localStorage).forEach(function(key) {
  var thisCard = JSON.parse(localStorage.getItem(key))
  appendPhotos(thisCard);
  var newIdea = new Idea(thisCard.id, thisCard.title, thisCard.body, thisCard.quality);
  imagesArr.push(newIdea);
 })
}
// --------------------
