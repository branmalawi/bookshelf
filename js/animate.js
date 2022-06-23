const nama = document.querySelector(".ganti-nama");
const cari = document.querySelector(".cari");
const tambah = document.querySelector(".tambah");
const formName = document.getElementById("change-name");
const formSearch = document.getElementById("search");
const formAdd = document.getElementById("add");

console.log(nama.children);
nama.addEventListener("click", function () {
  nama.classList.toggle('animasi');
  if (nama.classList == "ganti-nama animasi") {
    nama.children[0].setAttribute("src", "asset/icon/cancel.svg");
    checkActive();
    formName.style.display = "flex";
  } else {
    nama.children[0].setAttribute("src", "asset/icon/change.svg");
    formName.style.display = "none";
  }
});

cari.addEventListener("click", function () {
  cari.classList.toggle('animasi');
  if (cari.classList == "cari animasi") {
    cari.children[0].setAttribute("src", "asset/icon/cancel.svg");
    checkActive();
    formSearch.style.display = "flex";
  } else {
    cari.children[0].setAttribute("src", "asset/icon/search.svg");
    formSearch.style.display = "none";
  }
});

tambah.addEventListener("click", function () {
  tambah.classList.toggle('animasi');
  if (tambah.classList == "tambah animasi") {
    tambah.children[0].setAttribute("src", "asset/icon/cancel.svg");
    checkActive();
    formAdd.style.display = "flex";
  } else {
    tambah.children[0].setAttribute("src", "asset/icon/add.svg");
    formAdd.style.display = "none";
  }
});

const checkActive = function () {
  if (formName.style.display == "flex") {
    nama.click();
  }
  if (formSearch.style.display == "flex") {
    cari.click();
  }
  if (formAdd.style.display == "flex") {
    tambah.click();
  }
};

const search = document.querySelector("#srch");
const btnClearSearch = document.querySelector(".delete");
search.addEventListener("focus", function () {
  this.parentElement.style.boxShadow = "0 0 5px 0 rgba(62,62,62,.6)";
});
search.addEventListener("blur", function () {
  this.parentElement.style.boxShadow = "0 0 3px 0 rgba(62,62,62,.3)";
});

search.addEventListener("input", function () {
  if (search.value != "") {
    btnClearSearch.style.display = "block";
  } else {
    btnClearSearch.style.display = "none";
  }
});

btnClearSearch.addEventListener("click", function () {
  search.value = "";
  document.dispatchEvent(new Event(renderPage));
  this.style.display = "none";
});