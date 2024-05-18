import { createCard } from "./functions.mjs";

const createSubmit = document.getElementById("card-create")

createSubmit.addEventListener("submit", createCard);
