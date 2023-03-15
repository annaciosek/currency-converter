const form = document.querySelector("form");
const resultDiv = document.querySelector("#result");
const loaderDiv = document.querySelector("#loader");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const currency = document.querySelector("#currency").value;
  const amount = document.querySelector("#amount").value;

  loaderDiv.style.display = "block";

  fetch(
    `https://api.nbp.pl/api/exchangerates/rates/a/${currency}/today/?format=json`
  )
    .then((response) => response.json())
    .then((data) => {
      const rate = data.rates[0].mid;
      const result = amount * rate;

      resultDiv.innerHTML = `${amount} ${currency} = ${result.toFixed(2)} PLN`;
      loaderDiv.style.display = "none";
    })
    .catch((error) => {
      console.error(error);
      resultDiv.innerHTML =
        "There was an error fetching data. Please refresh and try again.";
      loaderDiv.style.display = "none";
    });
});
