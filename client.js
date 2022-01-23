class AngelegteEvents {
    kuenstler;
    preis;
    constructor(k, p) {
        this.kuenstler = k;
        this.preis = p;
        
    }
}
let eventInput = document.getElementById("inputEvent");
let preisInput = document.getElementById("inputPrice");
let neuesEvent = [];
let addB = document.getElementById("input-Enter");
let abspeichern = [];
initEvents();
addB.addEventListener("click", addEvent);
function addEvent() {
    if (eventInput.value == "" || preisInput.value == "") {
        alert("Bitte alle Felder ausfüllen!");
        return;
    }
    let entry = new AngelegteEvents(eventInput.value, preisInput.value);
    neuesEvent.push(entry);
    saveEvent(entry);
    addTableEntry(entry);
}
function addsavedEvent(interpret, price) {
    if (interpret == "" || price == "") {
        alert("Bitte alle Felder ausfüllen!");
        return;
    }
    let entry = new AngelegteEvents(eventInput.value, preisInput.value);
    neuesEvent.push(entry);
    addTableEntry(entry);
}
function addTableEntry(eventitem) {
    let entry = document.createElement("tr");
    let kuenstler = document.createElement("td");
    let preis = document.createElement("td");
    kuenstler.innerHTML = eventitem.kuenstler;
    preis.innerHTML = eventitem.preis;
    entry.appendChild(kuenstler);
    entry.appendChild(preis);
    document.getElementById("tabelleEvents").appendChild(entry);
}
function saveEvent(e) {
    fetch("http://127.0.0.1:3000/concertEvent", {
        method: "POST",
        body: JSON.stringify(e)
    });
}
async function initEvents() {
    let response = await fetch("http://127.0.0.1:3000/concertEvent");
    neuesEvent = await response.json();
    neuesEvent.forEach(e => addTableEntry(e));
}