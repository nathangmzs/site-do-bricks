const wrapper = document.querySelector('.wrapper');
const inputField = document.querySelector('input');
const weatherImg = wrapper.querySelector('.first-part img')
const energyText = wrapper.querySelector('.energy-text');
const energyGenerated = wrapper.querySelector('.energy-generated');

inputField.addEventListener('keyup', (e) => {
    //se o usuário pressionou digitou btn e o valor de entrada não está vazio
    if(e.key == 'Enter' && inputField.value != ""){
        requestApi(inputField.value);
        inputField.value = "";
    }
});

function requestApi(city){
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=27cd174a3b303dec7b59e42eadf52e77`;
    fetch(api).then(res => res.json()).then(result => {
        weatherDetails(result);
        calculateEnergy(result);
    });
}

function weatherDetails(info){
    console.log(info);
    //obter o valor das propriedades necessárias do objeto info
    const city = info.name;
    const country = info.sys.country;
    const {description, id} = info.weather[0];
    const {feels_like, humidity, temp} = info.main;

    //repasse dos valores para o html
    wrapper.querySelector('.temp .numb').innerText = Math.floor(temp);
    wrapper.querySelector('.temp .weather').innerText = description;
    wrapper.querySelector('.location span').innerText = `${city} ${country}`;
    
    if(info.rain){
        wrapper.querySelector('.column-1 .details span').innerText = `${humidity}mm`;
    } else {
        wrapper.querySelector('.column-1 .details span').innerText = '0mm';
    }

    //mudar o ícone de acordo com o clima da api la
    if(id == 800){
        weatherImg.src = 'Icons/clear.png';
    }else if(id >= 200 && id <= 232){
        weatherImg.src = 'Icons/strom.png';
    }else if(id >= 600 && id <= 622){
        weatherImg.src = 'Icons/snow.png';
    }else if(id >= 701 && id <= 781){
        weatherImg.src = 'Icons/haze.png';
    }else if(id >= 801 && id <= 804){
        weatherImg.src = 'Icons/cloud.png';
    }else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
        weatherImg.src = 'Icons/rain.png';
    }
}

function calculateEnergy(info) {
    //verificar se a chave 'rain' existe e se a quantidade de chuva é maior que zero
    if (info.rain && info.rain['1h'] > 0) {
        const rainVolume = info.rain['1h'];
        const windSpeed = info.wind.speed;

        //calcular a energia gerada usando fórmula e constantes
        const efficiency = 0.3; //eficiência da turbina
        const turbineBladeRadius = 0.5; //raio da pá da turbina (m)
        const generatorEfficiency = 0.87; //eficiencia do gerador

        const energy = 0.5 * Math.PI * Math.pow(turbineBladeRadius, 2) * rainVolume * efficiency + 0.5 * Math.PI *  Math.pow(windSpeed, 3) * generatorEfficiency /10;

        //display energia gerada
        if (energy > 0) {
            energyGenerated.innerText = `${energy.toFixed(2)} kWh`;
        } else {
            energyGenerated.innerText = '';
        }
    } else {
        //se não estiver chovendo
        energyGenerated.innerText = '0 kWh';
    }
}