import { clear } from "./card.mjs";

// Datalist
const cardSearch = document.getElementById("card-list");

// Function to initially load the API into datalist
export async function initialLoad() {
    // Get each card object from API
    const res = await axios("https://api.tcgdex.net/v2/en/cards");
    const cards = await res.data;


    console.log(cards);
    let count = 0;

    // Append every card to the datalist
    cards.forEach((card) => {
        let opt = document.createElement("option");
        count++;
        if (card.image !== undefined) {
            opt.id = card.id;
            opt.value = `${count}: ${card.name} - ${card.id.toUpperCase()}`;
            opt.textContent = opt.value;
        }

        // console.log(opt);
        cardSearch.appendChild(opt);
    })
    // console.log(cardSearch);
}

// Function for submitBtn 
export async function displayCardInfo(evt) {
    evt.preventDefault();
    // Get each card object from API
    const res = await axios("https://api.tcgdex.net/v2/en/cards");
    const cards = await res.data;
    // User input textbox
    let input = document.getElementById("searchbar");
    // Image Display div
    let display = document.getElementById("card-display");
    // Clear form
    clear();
    // Image for Pokemon Card
    let img = document.createElement("img");

    let cardName = input.value;

    let pokeInfoList = document.createElement('ul');
    pokeInfoList.style.paddingBottom = "5px";


    // Search for card's image source
    for (let i = 0; i < cardSearch.options.length; i++) {
        if (cardName === cardSearch.options[i].value) {
            let cardID = cardSearch.options[i].id;
            cards.forEach((card) => {
                if (cardID === card.id) {
                    // img source 
                    img.src = `${card.image}/high.png`;
                    img.style.width = "40%";
                    img.style.paddingTop = "10px";
                    // Getting card data
                    axios
                        .get(`https://api.tcgdex.net/v2/en/cards/${card.id}`)
                        .then(async function (response) {
                            // Card link to extract data from
                            let pokeData = await response.data;
                            console.log(response.data);

                            let name = document.createElement('li');
                            let rarity = document.createElement('li');
                            let setName = document.createElement('li');
                            let hp = document.createElement('li');
                            let type = document.createElement('li');
                            let illustrator = document.createElement('li');

                            name.textContent = `Name: ${pokeData.name}`;
                            rarity.textContent = `Rarity: ${pokeData.rarity}`;
                            setName.textContent = `Set: ${pokeData.set.name}`;
                            hp.textContent = `HP: ${pokeData.hp}`;
                            type.textContent = `Type: ${pokeData.type}`;
                            illustrator.textContent = `Illustrator: ${pokeData.illustrator}`;

                            pokeInfoList.appendChild(name);
                            pokeInfoList.appendChild(rarity);
                            pokeInfoList.appendChild(setName);
                            pokeInfoList.appendChild(hp);
                            pokeInfoList.appendChild(type);
                            pokeInfoList.appendChild(illustrator);
                        })
                }
            })
        }
    }
    display.appendChild(img);
    display.appendChild(pokeInfoList);
}

// export async function createCard(evt) {
//     evt.preventDefault();
//     // Grabbed list of Pokemon names from different API
//     const res = await axios("https://pokeapi.co/api/v2/pokedex/1/");
//     const data = await res.data;
    
//     const pokedex = data.pokemon_entries;
//     console.log(pokedex[0].pokemon_species.name);

//     let inputName = document.getElementById("name");
//     let inputRarity = document.getElementById("rarity");
//     let inputSet = document.getElementById("set");
//     let inputHP = document.getElementById("hp");
//     let inputType = document.getElementById("type");

//     pokedex.forEach((pokemon) => {
//         let name = pokemon.pokemon_species.name;

//         if (inputName.value !== name) {
//             console.log(inputName.value);
//             alert("Please enter a valid Pokemon.");
//         }
//     })
// }

// Alert Message Function
function alert(msg) {
    const errorEl = document.getElementById("errorDisplay");
    errorEl.style.display = "block";
    errorEl.textContent = msg;

    setTimeout(() => {
        errorEl.style.display = "none";
    }, 3000);
}