const nameStorage = 'USER_NAME';
const bookStorage = 'STORAGE_BOOK';
const renderPage = 'render-page';

const popUp = document.querySelector(".pop-up");
const close = document.querySelector(".close");
const formEdit = document.querySelector(".edit-data-book");

const inputs = document.querySelectorAll("input");
const user = document.getElementById("name");

const showAll = document.querySelector(".show-all")

function isStorageAble() {
  if (typeof (Storage) !== undefined) {
    return true;
  }
  alert('Browser kamu tidak mendukung local storage');
  return false;
}

function isSearch() {
  const searchValue = search.value;
  if (searchValue == "") {
    return false;
  }
  return true;
}

search.addEventListener("input", function() {
  document.dispatchEvent(new Event(renderPage));
});



document.addEventListener('DOMContentLoaded', function () {
  checkName();
  getDataStorageBook();
  formAdd.addEventListener('submit', function (event) {
    event.preventDefault();
    newBook();
  });
  formEdit.addEventListener('submit', function (event) {
    event.preventDefault();
    popUp.classList.toggle("show");
    newName(this.id);
  });
  formName.addEventListener('submit', function (event) {
    event.preventDefault();
    const newName = formName.children[0].value;
    newUserName(newName);
  });
});

function checkName() {
  if (isStorageAble()) {
    if (localStorage.getItem(nameStorage) == undefined) {
      const getName = prompt("masukkan nama kamu");
      if (getName !== null) {
        localStorage.setItem(nameStorage, getName);
      }
    }
    user.innerText = localStorage.getItem(nameStorage);
  } else {
    user.innerText = "user";
  }
}

function newUserName(name) {
  localStorage.setItem(nameStorage, name);
  user.innerText = localStorage.getItem(nameStorage);
  inputs.forEach(input => input.value = "");
  document.dispatchEvent(new Event(renderPage));
}

function newBook() {
  const title = document.getElementById("title").value.toLowerCase();
  const author = document.getElementById("author").value.toLowerCase();
  const datePublish = document.getElementById("publish").value.toLowerCase();
  const makeID = makeId();

  const dataBuku = buatDataBuku(makeID, title, author, datePublish, false);
  book.push(dataBuku);
  inputs.forEach(input => input.value = "");
  document.dispatchEvent(new Event(renderPage));
}

function makeId() {
  return +new Date();
}

function buatDataBuku(id, title, author, publish, isComplate) {
  return {
    id,
    title,
    author,
    publish,
    isComplate
  };
}

const book = [];
document.addEventListener(renderPage, function () {
  const unreadBookList = document.getElementById('belum');
  unreadBookList.innerHTML = '';

  const readBookList = document.getElementById('sudah');
  readBookList.innerHTML = '';

  const numOfBook = document.querySelector(".control>p");
  numOfBook.innerText = book.length;

  if (isSearch()) {
    const searchValue = search.value.toLowerCase();
    for (const bookSearch of book) {
      if (bookSearch.title.startsWith(searchValue)) {
        const bookElementSearch = makeListBook(bookSearch);
        if (!bookSearch.isComplate) {
          unreadBookList.append(bookElementSearch);
        } else {
          readBookList.append(bookElementSearch);
        }
      }
    }
    showAll.classList.add("show");
    saveDataBook();
    return;
  }
  showAll.classList.remove("show");
  for (const bookItem of book) {
    const bookElement = makeListBook(bookItem);
    if (!bookItem.isComplate) {
      unreadBookList.append(bookElement);
    } else {
      readBookList.append(bookElement);
    }
  }
  saveDataBook();
});

function makeListBook(dataBuku) {
  const judul = document.createElement('h3');
  judul.classList.add("title");
  judul.innerText = dataBuku.title;

  const penulis = document.createElement('p');
  penulis.classList.add("author");
  penulis.innerText = dataBuku.author;

  const terbit = document.createElement("p");
  terbit.classList.add("tgl");
  terbit.innerText = dataBuku.publish;

  const aboutList = document.createElement("div");
  aboutList.classList.add("about");
  aboutList.append(judul,
    penulis,
    terbit);

  const imgBook = document.createElement("div");
  imgBook.classList.add("img-book");

  const bookList = document.createElement("div");
  bookList.classList.add("book");
  bookList.append(imgBook,
    aboutList);

  const btnListCheck = document.createElement("div");
  btnListCheck.classList.add("check");
  const btnListEdit = document.createElement("div");
  btnListEdit.classList.add("edit");
  const btnListRemove = document.createElement("div");
  btnListRemove.classList.add("remove");

  const btnList = document.createElement("div");
  btnList.classList.add("btn-list");
  btnList.append(btnListCheck,
    btnListEdit,
    btnListRemove);

  const list = document.createElement("div");
  list.classList.add("list");
  list.append(bookList,
    btnList);
  list.setAttribute("id",
    dataBuku.id);


  btnListCheck.addEventListener("click",
    function () {
      moveShelves(dataBuku.id);
    });

  btnListEdit.addEventListener("click",
    function () {
      popUp.classList.toggle("show");
      formEdit.setAttribute("id", dataBuku.id)
    });

  btnListRemove.addEventListener("click",
    function () {
      const check = confirm("kamu yakin mau di hapus bukunya?")
      if (check) {
        removeListBook(dataBuku.id);
      } else {
        return
      }
    });
  return list;
}

close.addEventListener("click", function () {
  popUp.classList.toggle("show");
})

showAll.addEventListener("click", function() {
  showAll.classList.remove("show");
  search.value = "";
  document.dispatchEvent(new Event(renderPage));
});

function moveShelves(bookID) {
  const bookProperty = findBook(bookID);
  if (!bookProperty.isComplate) {
    bookProperty.isComplate = true;
  } else {
    bookProperty.isComplate = false;
  }
  document.dispatchEvent(new Event(renderPage));
}

function newName(bookID) {
  const bookProperty = findBook(bookID);
  const titleEdit = document.getElementById("title-edit").value.toLowerCase();
  const authorEdit = document.getElementById("author-edit").value.toLowerCase();
  const datePublishEdit = document.getElementById("publish-edit").value.toLowerCase();

  bookProperty.title = titleEdit;
  bookProperty.author = authorEdit;
  bookProperty.publish = datePublishEdit;

  inputs.forEach(input => input.value = "");
  document.dispatchEvent(new Event(renderPage));
}

function removeListBook(bookID) {
  const bookProperty = findIndexBook(bookID);
  book.splice(bookProperty, 1);
  document.dispatchEvent(new Event(renderPage));
}

function findBook(bookID) {
  for (const bookItem of book) {
    if (bookItem.id == bookID) {
      return bookItem;
    }
  }
}

function findIndexBook(bookID) {
  for (const indexBook in book) {
    if (book[indexBook].id == bookID) {
      return indexBook;
    }
  }
}

function saveDataBook() {
  localStorage.setItem(bookStorage,
    JSON.stringify(book))
}

function getDataStorageBook() {
  const getDataStorage = JSON.parse(localStorage.getItem(bookStorage));
  if (getDataStorage !== null) {
    for (const dataBook of getDataStorage) {
      book.push(dataBook)
    }
  }
  document.dispatchEvent(new Event(renderPage));
}