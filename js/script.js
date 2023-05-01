import { productsData } from "./products.js";
const nav__toggler = document.querySelector(".nav__toggler");
const navbar = document.querySelector(".navbar");
const navbar__nav = document.querySelector(".navbar-nav");
const statisticsSection = document.getElementById("Statistics");
const skillsSEction = document.getElementById("skills");

nav__toggler.addEventListener("click", (e) => {
  navbar.classList.toggle("nav_expanded");
  if (navbar__nav.classList.contains("navbar-nav-hidden")) {
    navbar__nav.classList.remove("navbar-nav-hidden");
    navbar__nav.classList.add("navbar-nav-show");
  } else {
    navbar__nav.classList.add("navbar-nav-hidden");
    navbar__nav.classList.remove("navbar-nav-show");
  }
});

//Statistics
class Statistics {
  showStatistics() {
    let timerOne = setInterval(upNumberOne, 80);
    let timerTwo = setInterval(upNumberTwo, 30);
    let timerThree = setInterval(upNumberThree, 18);
    let timerFour = setInterval(upNumberFour, 15);
    const myNumbers = [...document.querySelectorAll(".numbers")];
    let myNums = [0, 0, 0, 0];

    function upNumberOne() {
      let i = 0;
      if (myNums[i] < 20) {
        myNums[i]++;
      }
      myNumbers[i].innerHTML = myNums[i];
    }

    function upNumberTwo() {
      let i = 1;
      if (myNums[i] < 53) {
        myNums[i]++;
      }
      myNumbers[i].innerHTML = myNums[i];
    }
    function upNumberThree() {
      let i = 2;
      if (myNums[i] < 83) {
        myNums[i]++;
      }
      myNumbers[i].innerHTML = myNums[i];
    }
    function upNumberFour() {
      let i = 3;
      if (myNums[i] < 103) {
        myNums[i]++;
      }
      myNumbers[i].innerHTML = myNums[i];
    }
  }
}

// ----- progresbar -------
class Progresbar {
  showProgressBar() {
    const progresbars = [...document.querySelectorAll(".progress-bar")];
    let i = 0;
    const percentage = ["100%", "85%", "70%", "50%"];
    progresbars.forEach((p) => {
      p.style.width = percentage[i];
      i++;
    });
  }
}

// ----- portfolio -------
const portfolioBtns = [...document.querySelectorAll("#portfolio .btn")];
const portfolioCards = document.querySelector(".portfolio-cards");

class Portfolio {
  getProducts() {
    return productsData;
  }

  showProducts(productsData) {
    let cards = "";
    productsData.forEach((product) => {
      cards += `<div class="col-6 col-md-4 mb-5">
      <div class="card shadow-sm">
        <img
          src=${product.imageUrl}
          class="card-img-top"
          alt=${product.type}
        />
        <div class="card-body py-2 py-md-4">
          <h5 class="card-title">${product.text}</h5>
          <p class="card-text text-muted">${product.type}</p>
        </div>
      </div>
    </div>`;
    });
    portfolioCards.innerHTML = cards;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  //------statistics
  const statistics = new Statistics();
  let i = 0;
  document.addEventListener("scroll", () => {
    if (
      i == 0 &&
      window.scrollY < statisticsSection.offsetTop &&
      statisticsSection.offsetTop < window.innerHeight + window.scrollY
    ) {
      statistics.showStatistics();
      i++;
    }
  });

  //------progresbar
  const progresbar = new Progresbar();

  let j = 0;
  if (
    window.scrollY < skillsSEction.offsetTop &&
    skillsSEction.offsetTop < window.innerHeight + window.scrollY
  ) {
    progresbar.showProgressBar();
  }
  document.addEventListener("scroll", () => {
    if (
      j == 0 &&
      window.scrollY < skillsSEction.offsetTop &&
      skillsSEction.offsetTop < window.innerHeight + window.scrollY
    ) {
      progresbar.showProgressBar();
      j++;
    }
  });
  //-----portfolio
  const portfolio = new Portfolio();
  //get array of products
  const productsData = portfolio.getProducts();
  // show products in page
  portfolio.showProducts(productsData);
  // click on btns for selecting group of products
  portfolioBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      //change color btn clicked
      portfolioBtns.forEach((btn) => {
        btn.classList.remove("bg-success", "text-white");
      });
      btn.classList.add("bg-success");
      btn.classList.add("text-white");

      const selectBtn = e.target.innerHTML;
      if (selectBtn.trim() == "All") {
        let cards = "";
        portfolio.showProducts(productsData);
      } else {
        const filterProducts = productsData.filter((product) => {
          return product.type.toLowerCase() == selectBtn.toLowerCase();
        });
        let cards = "";
        portfolio.showProducts(filterProducts);
      }
    });
  });
});
