import { funcaoTal, rainPng } from "./rain.js";

const wrapper = document.querySelector('.wrapper');
const inputField = document.querySelector('input');
const weatherImg = wrapper.querySelector('.first-part img');
const energyText = wrapper.querySelector('.energy-text');
const energyGenerated = wrapper.querySelector('.energy-generated');

const traducaoClima = {
    "Clear": "Céu limpo",
    "clear sky": "Céu limpo",
    "Thunderstorm": "Tempestade",
    "Clouds": "Nublado",
    "Rain": "Chuva"
};

function traduzirLocalmente(descricao) {
    return traducaoClima[descricao] || descricao;
}

document.querySelector('.header-logo').addEventListener('click', function (event) {
    event.preventDefault();
    location.reload();
});

inputField.addEventListener('keyup', (e) => {
    if (e.key == 'Enter' && inputField.value != "") {
        requestApi(inputField.value);
        inputField.value = "";
    }
});

function requestApi(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=27cd174a3b303dec7b59e42eadf52e77`;
    fetch(api).then(res => res.json()).then(result => {
        weatherDetails(result);
        calculateEnergy(result);
    });
}

function weatherDetails(info) {
    console.log(info);
    const city = info.name;
    const country = info.sys.country;
    const { description, id, main } = info.weather[0];
    const { feels_like, humidity, temp } = info.main;

    const descricaoTraduzida = traduzirLocalmente(main); // traduzindo o clima principal

    wrapper.querySelector('.temp .numb').innerText = Math.floor(temp);
    wrapper.querySelector('.temp .weather').innerText = descricaoTraduzida;
    wrapper.querySelector('.location span').innerText = `${city} ${country}`;

    if (info.rain) {
        wrapper.querySelector('.column-1 .details span').innerText = `${humidity}mm`;
    } else {
        wrapper.querySelector('.column-1 .details span').innerText = '0mm';
    }

    if (id == 800) {
        weatherImg.src = 'Icons/clear.png';
    } else if (id >= 200 && id <= 232) {
        weatherImg.src = 'Icons/strom.png';
    } else if (id >= 600 && id <= 622) {
        weatherImg.src = 'Icons/snow.png';
    } else if (id >= 701 && id <= 781) {
        weatherImg.src = 'Icons/haze.png';
    } else if (id >= 801 && id <= 804) {
        weatherImg.src = 'Icons/cloud.png';
    } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
        weatherImg.src = 'Icons/rain.png';
    }
    
    funcaoTal(id);
    funcaoTal(weatherImg);
}

function calculateEnergy(info) {
    if (info.rain && info.rain['1h'] > 0) {
        const rainVolume = info.rain['1h'];
        const windSpeed = info.wind.speed;

        const efficiency = 0.3;
        const turbineBladeRadius = 0.5;
        const generatorEfficiency = 0.87;

        const energy = 0.5 * Math.PI * Math.pow(turbineBladeRadius, 2) * rainVolume * efficiency + 
                       0.5 * Math.PI * Math.pow(windSpeed, 3) * generatorEfficiency / 10;

        let energi = 96 * energy;
        
        if (energy > 0) {
            energyGenerated.innerText = `${energy.toFixed(2)} kWh`;
        } else {
            energyGenerated.innerText = '';
        }
        
        rainPng(energi);
    } else {
        energyGenerated.innerText = '0 kWh';
    }
}
