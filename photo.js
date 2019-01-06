class Photo {
  constructor(id, title, caption, file) {
    this.id = id;
    this.title = title;
    this.caption = caption;
    this.file = file;
    this.favorite = false;
  }
  saveToStorage() {
    localStorage.setItem("imagesArr", JSON.stringify(imagesArr));
  }
  deleteFromStorage() {

  }
  updatePhoto() {

  }
}