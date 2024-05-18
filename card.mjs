import * as Card from "./functions.mjs";

// card-search form
const cardForm = document.getElementById("card-search");

console.log("HI PROJECT STARTING!!!");

// Initial load of datalist
Card.initialLoad();

// Submit Button Listener for click to display card
cardForm.addEventListener("submit", Card.displayCardInfo);

export async function clear(){
    const info = document.getElementById('card-display');
    while (info.firstChild){
        info.removeChild(info.firstChild);
    }
}