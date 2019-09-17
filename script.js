document.addEventListener("DOMContentLoaded", sidenVises);

let planter = [];
let filter = "alle";
let filterKnapper = document.querySelectorAll("#sidebar button");
const skabelon = document.querySelector("template").content;
const liste = document.querySelector("#liste");

function sidenVises() {
    console.log("sidenVises");

    if (document.querySelector("#menuknap")) {
        document.querySelector("#menuknap").addEventListener("click", toggleMenu);
    }


    if (document.querySelector("#planternav")) {
        start();
    }

}

function toggleMenu() {
    console.log("toggleMenu");
    document.querySelector("#menu").classList.toggle("hidden");

    let erSkjult = document.querySelector("#menu").classList.contains("hidden");

    if (erSkjult == true) {
        document.querySelector("#menuknap").textContent = "☰";
        document.querySelector("#burgermenu").classList = "";
    } else {
        document.querySelector("#menuknap").textContent = "X";
        document.querySelector("#burgermenu").classList = "hidden";
    }
}

function start() {
    hentData();
    filterKnapper.forEach(knap =>
        knap.addEventListener("click", filtrer));
}

function filtrer() {
    console.log("filtrer");
    document.querySelector(".valgt").classList.remove("valgt");
    this.classList.add("valgt");
    filter = this.dataset.kategori;
    visData();
}

async function hentData() {
    let jsonData = await fetch("https://spreadsheets.google.com/feeds/list/1LdzNZvZu6UgvTfVuaW74ztqf7M_hN8RFGloykM7d-Es/od6/public/values?alt=json");
    menu = await jsonData.json();
    visData();
}

function visData() {
    liste.textContent = "";

    menu.feed.entry.forEach(plante => {
        if (plante.gsx$kategori.$t == filter || filter == "alle") {
            const klon = skabelon.cloneNode(true);

            klon.querySelector("img").src = `imgs/small/${plante.gsx$billede.$t}.jpg`;
            klon.querySelector("img").alt = plante.gsx$navn.$t;

            klon.querySelector("h2").textContent = plante.gsx$navn.$t;

            liste.appendChild(klon);

            liste.lastElementChild.addEventListener("click", () => {
                location.href = `detalje.html?id=${plante.gsx$id.$t}`;
            })
        }
    })
}
