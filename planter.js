document.addEventListener("DOMContentLoaded", start);

let planter = [];
let filter = "alle";
let filterKnapper = document.querySelectorAll("#sidebar button");
const skabelon = document.querySelector("template").content;
const liste = document.querySelector("#liste");

function start() {
    hentData();
    filterKnapper.forEach(knap =>
        knap.addEventListener("click", filtrer));
}

function filtrer() {
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

            klon.querySelector("img").src = `imgs/${plante.gsx$billede.$t}.jpg`;
            klon.querySelector("img").alt = plante.gsx$navn.$t;

            klon.querySelector("h2").textContent = plante.gsx$navn.$t;

            liste.appendChild(klon);

            liste.lastElementChild.addEventListener("click", () => {
                location.href = `detalje.html?id=${plante.gsx$id.$t}`;
            })
        }
    })
}
