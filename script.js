window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("sidenVises");
    document.querySelector("#menuknap").addEventListener("click", toggleMenu);
    document.querySelector("#mere").addEventListener("click", readMore);

}

function toggleMenu() {
    console.log("toggleMenu");
    document.querySelector("#menubaggrund").classList.toggle("hidden");

    let erSkjult = document.querySelector("#menubaggrund").classList.contains("hidden");

    if (erSkjult == true) {
        document.querySelector("#menuknap").textContent = "☰";
        document.querySelector("section").classList = "";
    } else {
        document.querySelector("#menuknap").textContent = "X";
        document.querySelector("section").classList = "hidden";
    }
}
