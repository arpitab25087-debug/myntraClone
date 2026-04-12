let products = [];
let fav = JSON.parse(localStorage.getItem("fav")) || [];

async function getData() {
  try {
    let res = await fetch("https://dummyjson.com/products");
    let data = await res.json();

    products = data.products;
    display(products);
  } catch (err) {
    console.log(err);
  }
}

getData();

function display(arr) {
  let container = document.getElementById("products");
  container.innerHTML = "";

  arr.forEach(function(item) {
    let div = document.createElement("div");
    div.className = "card";

    let img = document.createElement("img");
    img.src = item.thumbnail;

    let title = document.createElement("p");
    title.innerText = item.title;

    let price = document.createElement("h4");
    price.innerText = "₹ " + item.price;
    price.className = "price";

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
  let value = this.value;

  if (value === "all") {
    display(products);
  } else {
    let result = products.filter(function(item) {
      return item.category.toLowerCase().includes(value);
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