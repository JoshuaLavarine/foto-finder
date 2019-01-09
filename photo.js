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
    console.log(index);
    imagesArr.splice(index, 1);
    this.saveToStorage(imagesArr);
  }
  updatePhoto() {
    if (event.target.classList.contains("favorite")) {
      this.favorite = !this.favorite;
      this.saveToStorage(imagesArr);
  }
}
}