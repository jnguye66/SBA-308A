const cardSearch = document.getElementById("card-list");

// Initially Loads the API

export async function initialLoad() {
    // API for every singular card
    const res = await axios("https://api.tcgdex.net/v2/en/cards");
    const cards = await res.data;

    console.log(cards);
    let count = 0;
    // Append every card to the datalist
    cards.forEach((card) => {
        let opt = document.createElement("option");
        count++;
        opt.value = `${count}: ${card.name} - ${card.id.toUpperCase()}`;
        // console.log(opt);
        cardSearch.appendChild(opt);
    })
}