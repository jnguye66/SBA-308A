// Datalist
const cardSearch = document.getElementById("card-list");
// Get each card object from API
const res = await axios("https://api.tcgdex.net/v2/en/cards");
const cards = await res.data;


// Function to initially load the API into datalist
export async function initialLoad() {
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
    // User input textbox
    let input = document.getElementById("searchbar");
    // Image Display div
    let display = document.getElementById("card-display");
    // Image for Pokemon Card
    let img = document.createElement("img");

    let cardName = input.value;

    let pokeInfoList = document.createElement('ul');


    // Search for card's image source
    for (let i = 0; i < cardSearch.options.length; i++) {
        if (cardName === cardSearch.options[i].value) {
            let cardID = cardSearch.options[i].id;
            cards.forEach((card) => {
                if (cardID === card.id) {
                    // img source 
                    img.src = `${card.image}/high.png`;
                    // Getting card data
                    axios
                        .get(`https://api.tcgdex.net/v2/en/cards/${card.id}`)
                        .then(function (response) {
                            // Card link to extract data from
                            let pokeData = response.data;
                            console.log(response.data);

                            let name = document.createElement('li');
                            let rarity = document.createElement('li');
                            let setName = document.createElement('li');
                            let hp = document.createElement('li');
                            let type = document.createElement('li');
                            let illustrator = document.createElement('li');

                            name = pokeData.name;
                            rarity = pokeData.rarity;
                            setName = pokeData.set.name;
                            hp = pokeData.hp;
                            type = pokeData.type;
                            illustrator = pokeData.illustrator;

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
    display.appendChild(pokeInfoList);
    display.appendChild(img);
}

// async function getSpecs() {
//     // Card specifications
//     let pokemon = '';
//     let rarity = '';
//     let setName = '';
//     let hp = '';
//     let type = '';
//     let illustrator = '';

//     axios.get(`https://api.tcgdex.net/v2/en/cards/${card.id}`)
// }