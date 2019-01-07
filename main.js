// --------------------GLOBAL VARIABLES--------------------
var addToAlbum = document.querySelector(".add-img-btn");
var photoInput = document.querySelector(".choose-file-btn")
var titleInput = document.querySelector(".title-input");
var captionInput = document.querySelector(".caption-input");
var photoGallery = document.querySelector(".album-field");
var deleteButton = document.querySelector("#delete-btn");;
var cardSection = document.querySelector(".album-field");
var viewFavorites = document.querySelector(".view-fav-btn");
var imagesArr = JSON.parse(localStorage.getItem("imagesArr")) || [];
var reader = new FileReader();


// --------------------EVENT LISTENERS---------------------

window.addEventListener('load', appendPhotos(imagesArr));
addToAlbum.addEventListener("click", createElement);
cardSection.addEventListener("click", manipulateCard);

// --------------------FUNCTIONS---------------------------
//Persist
function appendPhotos(array) {
  imagesArr = [];
  array.forEach(function (card) {
    displayPhotoCard(card);
    const newPhoto = new Photo(card.id, card.title, card.caption, card.file, card.favorite);
    imagesArr.push(newPhoto);
  })
}

//Don't mess with this one (photo magic happening)
function createElement(e) {
  // console.log(input.files[0])
  e.preventDefault();
  if (photoInput.files[0]) {
    reader.readAsDataURL(photoInput.files[0]); 
    reader.onload = addPhoto
  }
}

function addPhoto(e) {
  // console.log(e.target.result);
  var newPhoto = new Photo(Date.now(), titleInput.value, captionInput.value, e.target.result);
  displayPhotoCard(newPhoto);
  imagesArr.push(newPhoto);
  newPhoto.saveToStorage();
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
    `;
}


function manipulateCard(e) {
  e.preventDefault();
  var uniqueID = event.target.parentElement.parentElement.parentElement.dataset.id;
  console.log(uniqueID);
  var index = imagesArr.findIndex(function(photo) {
    return photo.id === uniqueID;
  })
  if (event.target.classList.contains("delete")) {
    deletePhotoCard();
}}


function deletePhotoCard() {
  var uniqueID = event.target.parentElement.parentElement.parentElement.dataset.id;
  console.log(uniqueID);
  var index = imagesArr.findIndex(function(photo) {
    return photo.id === parseInt(uniqueID);
  });
  imagesArr[index].deleteFromStorage();
  event.target.closest(dataset.id).remove();
}

  // if (event.target.classList.contains("favorite")) {
  //   editCard();
//   })
// }


// function deletePhotoCard(e) {
//   e.preventDefault();
//   var deleteButton = document.querySelector("#delete-btn");
//   deleteButton.addEventListener("click", deletePhotoCard);
//   var uniqueID = event.target.closest.dataset.id;
//   var index = imagesArr.findIndex(function(photo) {
//     return photo.id === parseInt(uniqueID);
//   });
//   imagesArr[index].deleteFromStorage();
//   imagesArr.splice(index, 1);
//   event.target.closest(dataset.id).remove();
// }