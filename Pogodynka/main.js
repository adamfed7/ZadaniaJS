const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".weather .cities");
const cities = JSON.parse(localStorage.getItem("cities") || "[]");
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
            const info = {
                name,
                sys,
                main,
                icon,
                weather
            };
            if(cities.length <10){
                cities.push(info)
            }
            localStorage.setItem("cities", JSON.stringify(cities));
            console.log(cities);
            showCities();
        })

    msg.textContent = "";
    form.reset();
    input.focus();
});

showCities();

function showCities() {
    document.querySelectorAll(".city").forEach(li => li.remove());

    cities.forEach((x, id) => {
        const li = document.createElement("li");
        li.classList.add("city");

        const markup = `
        <h2 class="city-name" data-name="${x.name},${x.sys.country}">
          <span>${x.name}</span>
          <sup>${x.sys.country}</sup>
        </h2>
        </br>
        <h3>Temperatura:</h3>
        <div class="city-temp">${Math.round(x.main.temp)}<sup>°C</sup>
        <figure>
          <img class="city-icon" src="${x.icon}" alt="${x.weather[0]["description"]}">
        </figure>
        </div>
        
        <h3>Wilgotność: </h3>
        <div class="city-hum">${x.main.humidity}<sup>%</sup></div>
        <button onclick='deleteCity(${id})'>Usuń</button>`;
        li.innerHTML = markup;
        list.appendChild(li);
    });
}

function deleteCity(id){
  cities.splice(id, 1);
  localStorage.setItem("cities", JSON.stringify(cities));
  showCities();
}


