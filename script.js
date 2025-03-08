//const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency";
  let apiKey = `f41c09b7112f1e2d3ab9a5d9`;
  const dropdowns = document.querySelectorAll(".dropdown select");
  const btn = document.querySelector(" form button");
  let fromCurr = document.querySelector(".from select");
  let toCurr = document.querySelector(".to select");
  const msg = document.querySelector(".msg");

  for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
  }

  const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
      amtVal = 0;
      amount.value = "0";
    }
    msg.innerText = "Getting your exchange rate....";
    if(amtVal<1){
        msg.innerText = "Please! enter a valid amount.";
    }else{
  let URL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurr.value}`;
  fetch(URL).then(response => response.json()).then(result => {
    let exchangerate = result.conversion_rates[toCurr.value];
    let totalExchangeRate = (amtVal*exchangerate).toFixed(2);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${totalExchangeRate} ${toCurr.value}`;
  });
};}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

window.addEventListener("load", (evt) => {
    updateExchangeRate();
});

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});