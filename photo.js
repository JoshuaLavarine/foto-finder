class Photo {
  constructor(id, title, caption, file, favorite) {
    this.id = id;
    this.title = title;
    this.caption = caption;
    this.file = file;
    this.favorite = favorite;
  }
  saveToStorage() {
    localStorage.setItem("imagesArr", JSON.stringify(imagesArr));
  }
  deleteFromStorage(index) {
    imagesArr.splice(index, 1);
    this.saveToStorage(imagesArr);
  }
  updatePhoto() {
   // var stringIdea = JSON.stringify(this);
   //  localStorage.setItem(this.id, stringIdea);
  console.log("Connected");
  }
}