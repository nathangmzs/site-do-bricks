
let elementExist = (elementIdentific) => {
    return document.querySelector(`${elementIdentific}`)
}

function rainPng(numberRain = 0){
    // alert("RAIN")
    const main = document.createElement("main");
    main.setAttribute("id", "mainRain");
    main.style.width = "100dvw";
    main.style.height = "100dvh";
    main.style.zIndex = "-1";
    main.style.position = "absolute";

    document.body.appendChild(main)
    const container = document.createElement("div");
    container.classList.add("rain-container");
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.display = "flex";
    container.style.justifyContent = "space-around";
    main.appendChild(container)
    let getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    for(let i = 0; i < numberRain; i++){
        const rain = document.createElement("div");
        rain.classList.add("rain");

        rain.style = `--rain-delay: ${getRandomNumber(0, 1000)}ms`
        container.appendChild(rain);
    }
};

let rainRemove = () => {
    if (elementExist("#mainRain")){
        document.body.removeChild(document.querySelector("#mainRain"))
    }
};

let cloudRemove = () => {
    if (elementExist("#mainCloud")){
        document.body.removeChild(document.querySelector("#mainCloud"))
    }
};


function funcaoTal(img){
    let weatherSource = `${img.src}`;
    let icon = weatherSource.split("/")[4]
    let state = "";

    if (icon == "rain.png" || "strom.png"){
        cloudRemove()
        state = "Rain";
    } else if (icon == "clear.png"){
        rainRemove()
        // cloudRemove()
        state = "Normal";
    } else if (icon == "cloud.png"){
        rainRemove()
        state = "Cloud";
    } else{
        state = "Undefined";
    }

    console.log(`State: ${state}`);
}

export { rainPng, funcaoTal};