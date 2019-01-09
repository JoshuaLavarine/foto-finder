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
window.addEventListener("load", appendPhotos(imagesArr));
addToAlbum.addEventListener("click", stringPhotos);
cardSection.addEventListener("click", manipulateCard);
// cardSection.addEventListener("keydown", editCard);
window.addEventListener("input", enableAddPhotoButton);
cardSection.addEventListener("keydown", enterCheck);
cardSection.addEventListener("focusout", contentGrab);

// --------------------FUNCTIONS---------------------------
function enterCheck(e) {
  if (e.keyCode === 13) {
    contentGrab(e);
    console.log("entercheck");
  }
}

function contentGrab(e) {
  e.preventDefault();
  var parsedId = parseInt(e.target.parentElement.dataset.id);
  var index = imagesArr.findIndex(function (image) {
    return image.id === parsedId;
  });
  var targetClass = e.target.className;
  var targetText = e.target.innerText;
  contentChange(index, targetClass, targetText);
}

function contentChange(index, className, text) {
  if (className === "card-title") {
  imagesArr[index].updatePhoto("title", text);
  } 
  if (className === "card-caption") {
  imagesArr[index].updatePhoto("caption", text);
  } 
}

function getFavNum() {
  var favoriteArr = imagesArr.filter(function(image) {
    return image.favorite === true;
  })
  updateFavBtn(favoriteArr.length);
    console.log(favoriteArr.length)
}

function updateFavBtn(num) {
  viewFavorites.innerText = `View ${num} Favorites`
  console.log(num);
}
//Persist
function appendPhotos(array) {
  imagesArr = [];
  array.forEach(function (card) {
    var newPhoto = new Photo(card.id, card.title, card.caption, card.file, card.favorite);
    imagesArr.push(newPhoto);
    displayPhotoCard(newPhoto);
    getFavNum()
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
         <img id="card-img" src=${object.file}>
      </section>
      <section class="card-caption" contenteditable="true">
        <p class="card-caption-copy">
          ${object.caption}
        </p>
      </section>
      <section class="card-buttons">
          <button id="delete-btn">
            <img class="delete icon" src="assets/delete.svg">
          </button>
          <button>
            <img class="favorite icon" src=${object.favorite ? "assets/favorite-active.svg" : "assets/favorite.svg"}>
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
  var index = imagesArr.findIndex(function(photo) {
    return photo.id === parsedId;
  })
  if (event.target.classList.contains("delete")) {
    deletePhotoCard();
  }
  if (event.target.classList.contains("favorite")) {
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
    getFavNum();

}

function favoriteCard() {
  var clickedCard = event.target.closest("article");
  var parsedCard = parseInt(clickedCard.dataset.id);
  var foundCard = imagesArr.find(function(photo) {
    return photo.id === parsedCard;
  })
  if (foundCard.favorite === true) {
    event.target.src = "assets/favorite.svg";
  } else {
    event.target.src = "assets/favorite-active.svg"
  }
  foundCard.updatePhoto();
  foundCard.saveToStorage();
  getFavNum();
}

function enableAddPhotoButton(e) {
  e.preventDefault();
  if (titleInput.value && captionInput.value && photoInput.files[0]) {
    console.log("Inside button");
    addToAlbum.disabled = false;
  } else {
    addToAlbum.disabled = true; 
  }
}