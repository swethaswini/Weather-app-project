const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click',  getWeather );
container.addEventListener('keypress',  function (e) {
    if (e.key === 'Enter') {
      getWeather();
    }
} )


function getWeather() {
    const APIKey = '6e04847819a6f14e6cd0ebd509380e26';
    const city = document.getElementById('search-btn').value;

    if (city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod == '404') {
                container.style.height = '450px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            container.style.height = '560px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            let backgroundImage;

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear-new.png';
                    backgroundImage = 'images/clear_dyn.jpg';
                    break;
                case 'Rain':
                    image.src = 'images/rain-new.png';
                    backgroundImage = 'images/rain_dyn.jpg';
                    break;
                case 'Snow':
                    image.src = 'images/snow-new.png';
                    backgroundImage = 'images/snow_dyn.jpg';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud-new.png';
                    backgroundImage = 'images/cloud_dyn.jpg';
                    break;
                case 'Mist':
                    image.src = 'images/mist-new.png';
                    backgroundImage = 'images/mist_dyn.jpg';
                    break;
                case 'Haze':
                    image.src = 'images/mist-new.png';
                    backgroundImage = 'images/mist_dyn.jpg';
                    break;
                default:
                    image.src = 'images/clear-new.png';
                    backgroundImage = 'images/default-background.jpg';
            }

            document.body.style.backgroundImage = `url('${backgroundImage}')`;

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
        });
}