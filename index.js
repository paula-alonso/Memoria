
document.getElementById("fin-juego").style.visibility = "hidden";
const ButtomElement= document.getElementById("botonJ");
const buttomPlayAgain= document.getElementById("jugar");
let tab = document.getElementById("tablero");
let contFlipped = 0;
let timeValue = document.getElementById("timer")
let sel = []
let interval;

let seconds = 0,
  minutes = 0;


const timeGenerator = () => {
    if(seconds==0 && minutes == 0){
        finjuego()
    }else{
        if(seconds>0){
            seconds -= 1;}

        if (seconds <= 0 && minutes>0) {
            minutes -= 1;
            seconds = 59;
        }

        let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
        let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
        timeValue.innerHTML = `Tiempo: ${minutesValue}:${secondsValue}`;}

};

ButtomElement.addEventListener("click", ()=>{
    seconds = 0;
    minutes = 3;
    interval = setInterval(timeGenerator, 1000);
    const ims = [`https://www.unimet.edu.ve/wp-content/uploads/2020/10/IMG_6210-741x1030.jpg`,
            `https://pbs.twimg.com/media/EzIDzIOWQAEU0Tq.jpg:large`,
            `https://pbs.twimg.com/media/DgI8uGgX4AA4XkR.jpg`,
            `https://photos.wikimapia.org/p/00/02/08/21/90_big.jpg`,
            `https://pbs.twimg.com/media/Ea513L8WkAI6PAp.jpg`,
            `https://www2022.unimet.edu.ve/wp-content/uploads/conocenos-main.jpg`,
            `https://4.bp.blogspot.com/-gFoWLdF8utk/WgWo9rPMN8I/AAAAAAAATC0/XdWfuwR9UXwoVDY9Wpkg2FBfaoCixkVMACLcBGAs/s1600/20140927_160423.jpg`,
            `https://fastly.4sqi.net/img/general/600x600/PlFG4UCZ11hgJbYkzNrfLffjt8-OAuI4nUPcMqivT2E.jpg`]
    let InputElement = document.getElementById("username").value
    contFlipped = 0;
    if(InputElement != ""){
    let cards = []
    for(let i = 0; i<16; i++){
        cards.push(`<div class="card-area" onclick="seleccionartarjeta(${i})">
        <div class="card" id="card${i}">
            <div class="face front">
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/1e/Unimet_logo.png" id="cover">
            </div>
            <div class="face back" id="back${i}">
            <img src="${ims[0]}" id="back-cover">
            </div>
            </div>
    </div>  
        `);
        if (i%2==1){
            ims.splice(0,1);
        }
        document.getElementById("user-info").style.visibility = "hidden";
    };
    document.getElementById("tablero").style= "visible";
    console.log(cards)
    cards.sort(()=>Math.random()-0.5)
    tab.innerHTML = cards.join(" ")
    console.log(tab.innerHTML = cards.join(" "))


}
});


function seleccionartarjeta(i){
    let card = document.getElementById("card"+i);
    if(card.style.transform != "rotateY(180deg)"){
        card.style.transform = "rotateY(180deg)";
        sel.push(i)
    }
    if(sel.length ==2){
        deselec(sel)
        sel =[];
    }
}

function deselec(selec){
    setTimeout(()=>{

        let back1 = document.getElementById("back"+selec[0]);
        let back2 = document.getElementById("back"+selec[1]);
        if(back1.innerHTML != back2.innerHTML){
            let card1 = document.getElementById("card"+selec[0]);
            let card2 = document.getElementById("card"+selec[1]);
            card1.style.transform = "rotateY(0deg)"
            card2.style.transform = "rotateY(0deg)"
        }else{
            contFlipped+=2
            console.log(contFlipped);  
            if(contFlipped==16){

                finjuego();
            }
        }
    }, 1000);
}

function finjuego(){
    document.getElementById("fin-juego").style.visibility = "visible";
    clearInterval(interval)
}

buttomPlayAgain.addEventListener("click", ()=>{
    
    document.getElementById("tablero").style.visibility = "hidden";
    document.getElementById("fin-juego").style.visibility = "hidden";
    document.getElementById("username").value = "";
    document.getElementById("user-info").style.visibility = "visible";

})


