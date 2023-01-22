const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".weather .cities");

const apiKey = "5935862069e9fbfb26646d363d2ef7bd";

form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const {
        main,
        name,
        sys,
        weather
      } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
        weather[0]["icon"]
      }.svg`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        </br>
        <h3>Temperatura:</h3>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup>
        <figure>
          <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
        </figure>
        </div>
        
        <h3>Wilgotność: </h3>
        <div class="city-hum">${main.humidity}<sup>%</sup></div>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Podaj właściwą nazwę";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
});