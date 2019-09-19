document.addEventListener("DOMContentLoaded", sidenVises);

//først defineres de generelle konstanter
let planter = [];
let filter = "alle";
let filterKnapper = document.querySelectorAll("#sidebar button");
const skabelon = document.querySelector("template").content;
const liste = document.querySelector("#liste");

function sidenVises() {
    console.log("sidenVises");

    //klik på menuknappen fører videre til funktionen toggleMenu();
    document.querySelector("#menuknap").addEventListener("click", toggleMenu);

    //hvis #plantermain er til stede (dvs. kun på siden med planteoversigten) kaldes funktionen start();
    if (document.querySelector("#plantermain")) {
        start();
    }

}

function toggleMenu() { //denne funktionen får burgermenuen til at virke
    console.log("toggleMenu");
    document.querySelector("#menu").classList.toggle("hidden"); //menuen skjules hvis den er vist og vises hvis den er skujt ved klik

    let erSkjult = document.querySelector("#menu").classList.contains("hidden"); //kontantes erSkjult defineres som værende når menuen er skjult med klassen hidden

    if (erSkjult == true) { // hvis erSkjult er sandt skal menuknappen vise ikon med tre vandrette striber komme frem og alle klasser fjernes fra #burgermenu
        document.querySelector("#menuknap").textContent = "☰";
        document.querySelector("#burgermenu").classList = "";
    } else { // hvis erSkjult ikke er sandt skal menuknappen være et x og burgermenuen skjules med klassen hidden
        document.querySelector("#menuknap").textContent = "✘";
        document.querySelector("#burgermenu").classList = "hidden";
    }
}

function start() {
    hentData(); //aktiverer funktionen hentData();
    filterKnapper.forEach(knap =>
        knap.addEventListener("click", filtrer)); //der tilføjes et event til alle filterknappen som gør at når man klikker på dem hver især føres man vidre til funktionen filtrer();
}

function filtrer() { //funktionen filtrerer data fra json
    console.log("filtrer");
    document.querySelector(".valgt").classList.remove("valgt"); //den filterknap der i forvejen har klassen valgt findes i documentet og får fjernet klassen
    this.classList.add("valgt"); //den filterknap der trykkes på får tilføjet klassen valgt som gør det muligt at se hvilken knap der er valgt
    filter = this.dataset.kategori; //det filter der trykkes på aktivieres og filtrerer ud fra kategorien i datasettet
    visData(); //funktionen visData kaldes
}

async function hentData() { //denne funktion henter json data ind fra google sheet, denne data filtreres i funktion filtrer();
    let jsonData = await fetch("https://spreadsheets.google.com/feeds/list/1LdzNZvZu6UgvTfVuaW74ztqf7M_hN8RFGloykM7d-Es/od6/public/values?alt=json"); //data hentes fra dette link til google sheet
    oversigt = await jsonData.json(); //oversigten "venter på at dataen er hentet
    visData(); //herefter kaldes funktionen visData();
}

function visData() { // den hentede data vises
    liste.textContent = ""; //listen nulstiles

    oversigt.feed.entry.forEach(plante => { //oversigten udfyldes med data for hver plante
        if (plante.gsx$kategori.$t == filter || filter == "alle") {
            const klon = skabelon.cloneNode(true);

            klon.querySelector("img").src = `imgs/small/${plante.gsx$billede.$t}.jpg`;
            klon.querySelector("img").alt = plante.gsx$navn.$t;

            klon.querySelector("h2").textContent = plante.gsx$navn.$t;

            liste.appendChild(klon);

            liste.lastElementChild.addEventListener("click", () => { //når der klikkes på en bestemt plante i oversigten føres man videre til detalje.html med indhold fra den specifikke plante (detalje.html har sin egen javaScript);
                location.href = `detalje.html?id=${plante.gsx$id.$t}`;
            })
        }
    })
}
