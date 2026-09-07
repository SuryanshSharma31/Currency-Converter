const BASE_URL =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");


for (let select of dropdowns) {

    for (let currcode in countryList) {

        let newoption = document.createElement("option");

        newoption.innerText = currcode;
        newoption.value = currcode;

        if (select.name === "from" && currcode === "USD") {
            newoption.selected = true;
        }

        if (select.name === "to" && currcode === "INR") {
            newoption.selected = true;
        }

        select.append(newoption);
    }

    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    });
}


const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amountval = amount.value;

    if (amountval === "" || amountval < 1) {
        amountval = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();

    console.log(data); // check API response

    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];

    let finalAmount = amountval * rate;

    msg.innerText = `${amountval} ${fromcurr.value} = ${finalAmount.toFixed(2)} ${tocurr.value}`;
};

const updateflag = (element) => {

    let currcode = element.value;

    let countrycode = countryList[currcode];

    let newsrc =
        `https://countryflagsapi.netlify.app/flag/${countrycode}.svg`;

    let img = element.parentElement.querySelector("img");

    img.src = newsrc;
};


btn.addEventListener("click", async (evt) => {

    evt.preventDefault();

    await updateExchangeRate();

});


window.addEventListener("load", () => {

    updateExchangeRate();

});