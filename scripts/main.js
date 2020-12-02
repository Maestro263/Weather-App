const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icons = document.querySelector(".icon img");

const updateUI = (data) => {
  /*   console.log(data);
    const cityDetails = data.cityDetails;
    const weather = data.weather; */

  console.log(data);
  //Destructure properties
  const { cityDetails, weather } = data;

  details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
    `;

  const iconSource = `img/icons/${weather.WeatherIcon}.svg`;
  icons.setAttribute("src", iconSource);

//Ternary operator == If statement
//let timeSource = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
  let timeSource = null;
  if (weather.IsDayTime) {
    timeSource = "img/day.svg";
  } else {
    timeSource = "img/night.svg";
  }
  time.setAttribute("src", timeSource);

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return {
    cityDetails,
    weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

    localStorage.setItem('location', city);
});

if(localStorage.getItem('location')){
  updateCity(localStorage.getItem('location'))
  .then(data => updateUI(data))
  .catch(err => console.log(err));
};

