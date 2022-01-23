class AngelegteEvents {

  kuenstler: string;
  preis: string;
  

  constructor(k: string, p: string) {

      this.kuenstler = k;
      this.preis = p;
  
let eventInput: HTMLInputElement = <HTMLInputElement>document.getElementById("inputEvent");
let preisInput: HTMLInputElement = <HTMLInputElement>document.getElementById("inputPrice");

let neuesEvent: AngelegteEvents[] = [];
let addB: HTMLElement = document.getElementById("hinzufuegenButton");
let abspeichern: Event[] = [];
initEvents();
addB.addEventListener("click", addEvent);

function addEvent(): void {
  if (eventInput.value == "" || preisInput.value == "") {
      alert("Bitte alle Slots ausfüllen");
      return;
  }
  let entry: AngelegteEvents = new AngelegteEvents(eventInput.value, preisInput.value);
  neuesEvent.push(entry);
  saveEvent(entry);
  addTableEntry(entry);
}

function addgespeichertesEvent(interpret: string, price: string): void {
  if (interpret == "" || price == "") {
      alert("Bitte alle Felder ausfüllen!");
      return;
  }
  let entry: AngelegteEvents = new AngelegteEvents(eventInput.value, preisInput.value);
  neuesEvent.push(entry);

  addTableEntry(entry);
}



function addTableEntry(eventitem: AngelegteEvents): void {

  let entry: HTMLTableRowElement = document.createElement("tr");
  let kuenstler: HTMLTableCellElement = document.createElement("td");
  let preis: HTMLTableCellElement = document.createElement("td");

  kuenstler.innerHTML = eventitem.kuenstler;
  preis.innerHTML = eventitem.preis;



  entry.appendChild(kuenstler);
  entry.appendChild(preis);

  document.getElementById("tabelleEvents")!.appendChild(entry);
}


function saveEvent(e: AngelegteEvents): void {
  fetch("http://127.0.0.1:3000/concertEvent", {
      method: "POST",
      body: JSON.stringify(e)  
  });
}

async function initEvents(): Promise<void> {
  let response: Response = await fetch("http://127.0.0.1:3000/concertEvent");
  neuesEvent = await response.json();
  neuesEvent.forEach(e => addTableEntry(e));
}
  }
}
