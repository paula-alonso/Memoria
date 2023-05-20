const ButtonElement = document.getElementById("jugar");
let tablero = document.getElementById("tablero")
console.log(hola)

function addcards(tablero){
    for(let i=1; i<=18; i++){
        tablero.appendChild(`<div class="card" id="card${i}">
        <div class="front">
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/1e/Unimet_logo.png" id="cover">
        </div>
        <div class="back">
            <h1>B</h1>
        </div>
        </div>`);
    };
};
console.log(addcards(tablero))

ButtonElement.addEventListener("click", console.log("hola"))