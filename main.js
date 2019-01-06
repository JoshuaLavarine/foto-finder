// --------------------GLOBAL VARIABLES--------------------
var addToAlbum = document.querySelector(".add-img-btn");
var photoInput = document.querySelector(".choose-file-btn")
var titleInput = document.querySelector(".title-input");
var captionInput = document.querySelector(".caption-input");
var photoGallery = document.querySelector(".album-field");
var imagesArr = JSON.parse(localStorage.getItem("imagesArr")) || [];
var reader = new FileReader();


// --------------------EVENT LISTENERS---------------------

window.addEventListener('load', appendPhotos);
addToAlbum.addEventListener("click", createElement);

// --------------------FUNCTIONS---------------------------


function appendPhotos() {
  imagesArr.forEach(function (photo) {
    displayPhotoCard(photo.title, photo.file, photo.caption)
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
  displayPhotoCard(newPhoto.value, newPhoto.file, newPhoto.caption);
  imagesArr.push(newPhoto);
  newPhoto.saveToStorage(imagesArr);
}

function displayPhotoCard(titleVal, imgSrc, captionVal) {
  photoGallery.innerHTML += 
  `
    <article class="card">
        <h2 class="card-title">
            ${titleVal}
        </h2>
        <section class="card-photo-container">
           <img id="card-img" src=${imgSrc} />
        </section>
        <section class="card-caption">
          <h2>
            ${captionVal}
          </h2>
        </section>
        <section class="card-buttons">
          <img class="delete icon" src="assets/delete.svg" />
          <img class="favorite icon" src="assets/favorite.svg" />
        </section>
      </article>
    `;
}