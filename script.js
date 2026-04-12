let products = [];
let fav = JSON.parse(localStorage.getItem("fav")) || [];

// fetch data
async function getData() {
  let res = await fetch("https://fakestoreapi.com/products");
  let data = await res.json();

  products = data;
  display(products);
}

getData();

// display function
function display(arr) {
  let container = document.getElementById("products");
  container.innerHTML = "";

  arr.forEach(function(item) {
    let div = document.createElement("div");
    div.className = "card";

    let img = document.createElement("img");
    img.src = item.image;

    let title = document.createElement("p");
    title.innerText = item.title;

    let price = document.createElement("h4");
    price.innerText = "₹ " + item.price;

    let btn = document.createElement("button");
    btn.innerText = "♡";

    btn.addEventListener("click", function() {
      fav.push(item);
      localStorage.setItem("fav", JSON.stringify(fav));
      alert("Added to Favorites");
    });

    div.append(img, title, price, btn);
    container.append(div);
  });
}

// search
document.getElementById("search").addEventListener("input", function() {
  let value = this.value.toLowerCase();

  let result = products.filter(function(item) {
    return item.title.toLowerCase().includes(value);
  });

  display(result);
});

// filter
document.getElementById("filter").addEventListener("change", function() {
  let category = this.value;

  if (category === "all") {
    display(products);
  } else {
    let result = products.filter(function(item) {
      return item.category === category;
    });

    display(result);
  }
});

// sort
document.getElementById("sort").addEventListener("change", function() {
  let value = this.value;
  let sorted = [...products];

  if (value === "low") {
    sorted.sort(function(a, b) {
      return a.price - b.price;
    });
  } else if (value === "high") {
    sorted.sort(function(a, b) {
      return b.price - a.price;
    });
  }

  display(sorted);
});

// show favorites
document.getElementById("showFav").addEventListener("click", function() {

  if (fav.length === 0) {
    alert("No favorites added");
  } else {
    display(fav);
  }

});