let stars = document.querySelectorAll(".ratings span");
let products = document.querySelectorAll(".ratings");
let ratings = JSON.parse(localStorage.getItem("rating")) || [];

stars.forEach((star) => {
  star.addEventListener("mouseover", function () {
    let rating = this.dataset.rating;
    highlightStars(rating);
  });

  star.addEventListener("click", function () {
    let rating = this.dataset.rating;
    updateStars(rating);
  });

  star.addEventListener("mouseout", function () {
    resetStarsColor();
  });
});

function highlightStars(rating) {
  stars.forEach((star) => {
    if (star.dataset.rating <= rating) {
      star.style.color = "orange";
    } else {
      star.style.color = "grey";
    }
  });
}

function resetStarsColor() {
  stars.forEach((star) => {
    star.style.color = "grey";
  });

  let productID = document.querySelector(".ratings").dataset.productid;
  let foundRating = ratings.find((item) => item["product-id"] === productID);

  if (foundRating) {
    highlightStars(foundRating.rating);
  }
}

function updateStars(clickedRating) {
  let productID = document.querySelector(".ratings").dataset.productid;
  let found = false;

  for (let i = 0; i < ratings.length; i++) {
    if (ratings[i]["product-id"] === productID) {
      if (ratings[i].rating === clickedRating) {
        ratings.splice(i, 1); // Remove the rating if clicked again
        localStorage.setItem("rating", JSON.stringify(ratings));
        resetStarsColor();
        return;
      }
      ratings[i].rating = clickedRating;
      found = true;
      break;
    }
  }

  if (!found) {
    ratings.push({ "product-id": productID, rating: clickedRating });
  }

  localStorage.setItem("rating", JSON.stringify(ratings));
  highlightStars(clickedRating);
}

// Highlight stars based on existing ratings on page load
if (ratings.length > 0) {
  let productID = document.querySelector(".ratings").dataset.productid;
  let foundRating = ratings.find((item) => item["product-id"] === productID);

  if (foundRating) {
    highlightStars(foundRating.rating);
  }
}

let btlCons = document.querySelectorAll(".btlCon");
let wtrSpan = document.querySelector(".wtr");

btlCons.forEach((btlCon) => {
  btlCon.addEventListener("click", function () {
    let newText = this.querySelector("span").textContent;
    wtrSpan.textContent = newText;

    // Save the selected text to local storage
    localStorage.setItem("selectedText", newText);
  });
});

// Check if there's a previously selected text in local storage
let savedText = localStorage.getItem("selectedText");

// If there is, update the wtrSpan with the saved text
if (savedText) {
  wtrSpan.textContent = savedText;
}

let dropdown = document.querySelector(".dropdown");

let isDropdownOpen = false;

btlCons.forEach((btlCon) => {
  btlCon.addEventListener("click", function () {
    let newText = this.querySelector("span").textContent;
    wtrSpan.textContent = newText;

    localStorage.setItem("selectedText", newText);

    if (isDropdownOpen) {
      dropdown.style.transform = "translateY(-1em)";
      dropdown.style.opacity = "0";
      dropdown.style.visibility = "hidden";
      isDropdownOpen = false;
    }
  });
});

// Event listeners for button hover
let btnWrapper = document.querySelector(".btn-wrapper");

btnWrapper.addEventListener("mouseenter", function () {
  dropdown.style.transform = "translateY(0)";
  dropdown.style.opacity = "1";
  dropdown.style.visibility = "visible";
  isDropdownOpen = true;
});

btnWrapper.addEventListener("mouseleave", function () {
  dropdown.style.transform = "translateY(-1em)";
  dropdown.style.opacity = "0";
  dropdown.style.visibility = "hidden";
  isDropdownOpen = false;
});
