
document.getElementById("fin-juego").style.visibility = "hidden";
const ButtomElement= document.getElementById("botonJ");
const buttomPlayAgain= document.getElementById("jugar");
const abrirModal = document.getElementById("abrir-modal");
const cerrarModal = document.getElementById("cerrar-modal");
let tab = document.getElementById("tablero");
const modal = document.querySelector("#modal");
let contFlipped = 0;
let timeValue = document.getElementById("timer")
let sel = []
let interval;
let participants = localStorage.getItem("lista");
console.log(participants)

let seconds = 0,
  minutes = 0;

let puntuacion = 0;
const totalTime = 180;

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
        interval = setInterval(timeGenerator, 1000);
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
    document.getElementById("inicio").style.visibility = "hidden";
    console.log(cards)
    cards.sort(()=>Math.random()-0.5)
    document.getElementById("main-title").style.visibility = "visible"
    tab.innerHTML = cards.join(" ")
    console.log(tab.innerHTML = cards.join(" "))

}
});

let aver = false;

function seleccionartarjeta(i){
    console.log(aver)
    let remTime = minutes*60+seconds;
    if(remTime > 0){
        let card = document.getElementById("card"+i);
    if(!aver && card.style.transform != "rotateY(180deg)"){
        card.style.transform = "rotateY(180deg)";
        sel.push(i)
    }
    if(sel.length == 2){
        aver = true;
        deselec(sel);
        sel =[];
    }
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
        aver = false;
    }, 800);

}


function finjuego(){
    
    let restTime = minutes*60+seconds;
    puntuacion = 300*(restTime/totalTime).toFixed(2);
    document.getElementById("points").innerHTML= `Puntaje: ${puntuacion}`;
    document.getElementById("fin-juego").style.visibility = "visible";
    clearInterval(interval)
    const nomb = document.getElementById("username").value;

    let persona = {name:nomb, points: puntuacion};
    if(participants==null){
        participants = [];
        participants.push(persona);
        localStorage.setItem("lista", JSON.stringify(participants));
    }else{
        participants = JSON.parse(localStorage.getItem("lista"));
        participants.push(persona);
        localStorage.setItem("lista", JSON.stringify(participants));
    }
    console.log(localStorage.getItem("lista"));
    
}

buttomPlayAgain.addEventListener("click", ()=>{

    document.getElementById("points").innerHTML= "Puntaje: 000";
    document.getElementById("timer").innerHTML = "Tiempo: 000";
    document.getElementById("tablero").innerHTML="";
    document.getElementById("fin-juego").style.visibility = "hidden";
    document.getElementById("username").value = "";
    document.getElementById("user-info").style.visibility = "visible";
    document.getElementById("main-title").style.visibility = "hidden";
    document.getElementById("inicio").style.visibility = "visible";

})


abrirModal.addEventListener("click", ()=>{
    let par2 = JSON.parse(localStorage.getItem("lista"));
    par2.sort(((a, b) => b.points - a.points));
    console.log(par2);
    let nuevos = [];
    nuevos[0]=`<tr>
                <th class="usernames" id="headder">Nombre</th>
                <th class="scores" id="headder">Puntuación</th>
                </tr>`
    for(let i = 0; i<par2.length;i++){
        nuevos.push(`<tr>
                <td class="usernames">${par2[i].name}</td>
                <td class="scores">${par2[i].points}</td>
                 </tr>`)
    }

    document.getElementById("content").innerHTML=nuevos.join('');
    modal.showModal();

})

cerrarModal.addEventListener("click", ()=>{
    modal.close();
})


