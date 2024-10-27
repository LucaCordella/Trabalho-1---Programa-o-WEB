const diaSemana = document .getElementById("dia-semana");
const diaMesAno = document .getElementById("dia-mes-ano");
const horaMinSeg = document .getElementById("hora-min-seg"); 
const arrayDayWeek = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"]


const dialogPonto = document .getElementById("dialog-ponto");


function getUserLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            let userLocation = {
                "latitude": position.coords.latitude,
                "longitude": position.coords.longitude
            }
            resolve(userLocation);
        },
        (error) => {
            reject(error);
        })
    })
}


let proxPonto = {
    "entrada": "intervalo",
    "intervalo": "volta-intervalo",
    "volta-intervalo": "saida",
    "saida": "entrada"
}


let dialogHora = document.getElementById("dialog-hora");
let dialogData = document.getElementById("dialog-data");
dialogData.textContent = "Data: " + dataCompleta();

const btnRegistrarPonto = document.getElementById("btn-registrar-ponto");
btnRegistrarPonto.addEventListener("click", () => {

    let dialogSelect = document.getElementById("select-tipo-ponto");
    let ultimoPonto = localStorage.getItem("tipoUltimoPonto");

    dialogSelect.value = proxPonto[ultimoPonto];

    dialogPonto.showModal();
});

const btnDialogFechar = document .getElementById("btn-dialog-fechar");
btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
})


function recuperaPontosLocalStorage() {
    let todosOsPontos = localStorage.getItem("registro");

    if(!todosOsPontos) {
        return [];
    }

    return JSON.parse(todosOsPontos);
}


function salvarRegistroLocalStorage(ponto) {
    let pontos = recuperaPontosLocalStorage();

    pontos.push(ponto);

    localStorage.setItem("registro", JSON.stringify(pontos));
}


const divAlerta = document.getElementById("div-alerta");


const btnDialogRegistrarPonto = document.getElementById("btn-dialog-registrar-ponto");
btnDialogRegistrarPonto.addEventListener("click", async () => {

    let data = dataCompleta();
    let hora = horaCompleta();
    let tipoPonto = document.getElementById("select-tipo-ponto").value;

    let location = await getUserLocation();

    let ponto = {
        "data": data,
        "hora": hora,
        "tipo": tipoPonto,
        "location": location,
        "id": 1
    }

    salvarRegistroLocalStorage(ponto);

    localStorage.setItem("Registro", JSON.stringify(ponto));
    localStorage.setItem("tipoUltimoPonto", tipoPonto);

    console.log(ponto);
    dialogPonto.close();

    divAlerta.classList.remove("hidden");
    divAlerta.classList.add("show");

    setTimeout(() => {
        divAlerta.classList.remove("show");
    divAlerta.classList.add("hidden")
    }, 5000);
});


function daySemana() {
    const date = new Date();
    return arrayDayWeek[date.getDay()]
}

function dataCompleta() {
    const date = new Date();
    return String(date.getDate()).padStart(2, '0') + "/" + String(date.getMonth() + 1).padStart(2, '0') + "/" + date.getFullYear();
}

function horaCompleta() {
    const date = new Date();
    return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
}

function atualizaHora() {
    horaMinSeg.textContent = horaCompleta();    
}

function atualizaHoraDialog() {
    dialogHora.textContent = "Hora: " + horaCompleta();
}

atualizaHora();
setInterval(atualizaHora, 1000); 

atualizaHoraDialog()
setInterval(atualizaHoraDialog, 1000);

diaSemana.textContent = daySemana();
diaMesAno.textContent = dataCompleta();



// Seleção dos novos elementos de dialog
const dialogPontoPassado = document.getElementById("dialog-ponto-passado");
const dialogJustificarAusencia = document.getElementById("dialog-justificar-ausencia");

// Botões de fechar
const btnDialogFecharPassado = document.getElementById("btn-dialog-fechar-passado");
const btnDialogFecharAusencia = document.getElementById("btn-dialog-fechar-ausencia");

// Função para exibir dialog de ponto passado
document.getElementById("btn-registrar-ponto-passado").addEventListener("click", () => {
    dialogPontoPassado.showModal();
});

// Função para exibir dialog de justificar ausência
document.getElementById("btn-justificar-ausencia").addEventListener("click", () => {
    dialogJustificarAusencia.showModal();
});

// Função para fechar dialog de ponto passado
btnDialogFecharPassado.addEventListener("click", () => {
    dialogPontoPassado.close();
});

// Função para fechar dialog de justificativa de ausência
btnDialogFecharAusencia.addEventListener("click", () => {
    dialogJustificarAusencia.close();
});

// Função para registrar ponto passado
document.getElementById("btn-dialog-registrar-ponto-passado").addEventListener("click", () => {
    const dataPassado = document.getElementById("data-passado").value;
    const tipoPontoPassado = document.getElementById("select-tipo-ponto-passado").value;

    if (!dataPassado) {
        alert("Por favor, selecione uma data válida para o registro passado.");
        return;
    }

    const pontoPassado = {
        "data": dataPassado,
        "tipo": tipoPontoPassado,
        "observacao": "Registro passado",
    };

    salvarRegistroLocalStorage(pontoPassado);
    dialogPontoPassado.close();
    alert("Ponto passado registrado com sucesso!");
});

// Função para enviar justificativa de ausência
document.getElementById("btn-dialog-enviar-justificativa").addEventListener("click", () => {
    const dataAusencia = document.getElementById("data-ausencia").value;
    const justificativa = document.getElementById("justificativa-ausencia").value;

    if (!dataAusencia || !justificativa) {
        alert("Por favor, preencha a data e a justificativa.");
        return;
    }

    const ausencia = {
        "data": dataAusencia,
        "justificativa": justificativa,
        "observacao": "Ausência justificada"
    };

    salvarRegistroLocalStorage(ausencia);
    dialogJustificarAusencia.close();
    alert("Justificativa de ausência enviada com sucesso!");
});



const divAlertaPassado = document.getElementById("div-alerta-passado");

divAlertaPassado.classList.remove("hidden");
divAlertaPassado.classList.add("show");

    setTimeout(() => {
        divAlertaPassado.classList.remove("show");
    divAlertaPassado.classList.add("hidden")
    }, 5000);


const divAlertaJustificativa = document.getElementById("div-alerta-justificativa");

divAlertaJustificativa.classList.remove("hidden");
divAlertaJustificativa.classList.add("show");

    setTimeout(() => {
        divAlertaJustificativa.classList.remove("show");
    divAlertaJustificativa.classList.add("hidden")
    }, 5000);