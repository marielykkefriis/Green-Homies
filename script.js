window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("sidenVises");
    document.querySelector("#menu").addEventListener("click", toggleMenu);
    document.querySelector("#mere").addEventListener("click", readMore);

}

function toggleMenu() {
    console.log("toggleMenu");
    document.querySelector("#menu").classList.toggle("hidden");

    let erSkjult = document.querySelector("#menu").classList.contains("hidden");

    if (erSkjult == true) {
        document.querySelector("#menu").textContent = "☰";
        document.querySelector("section").classList = "";
    } else {
        document.querySelector("#menu").textContent = "X";
        document.querySelector("section").classList = "hidden";
    }
}
