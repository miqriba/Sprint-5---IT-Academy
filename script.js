const HTMLResponse = document.querySelector("#acudit");
const inputs = document.querySelector("#inputs");
const puntuacio1 = document.querySelector("#punt1");
const puntuacio2 = document.querySelector("#punt2");
const puntuacio3 = document.querySelector("#punt3");
const seguentAcudit = document.querySelector("#seguentAcudit");
const temps = document.querySelector("#temps");

const DADJOKES_URL = "https://icanhazdadjoke.com/";
const WEATHER_URL = "https://community-open-weather-map.p.rapidapi.com/weather";

const headerAccept = new Headers();
headerAccept.append("Accept", "application/json");

//Exercici 1
let acuditActual = {};
let reportAcudits = [];

seguentAcudit.addEventListener("click", async function () {
  let tipusAcudit = Math.random();
  // Donem una proporció de 20% Acudits de Chuck Norris i 80% dad jokes.
  if (tipusAcudit < 0.2) {
    acuditActual = await chuckJoke();
    HTMLResponse.textContent = acuditActual.value;
  } else {
    acuditActual = await dadJoke();
    HTMLResponse.textContent = acuditActual.joke;
  }
  //   només obrir el acudit ja el guardem a l'array: després si es puntua li canviarem la propietat score.
  afegirAcudit(acuditActual);
  // Passem a ensenyar els botons de puntuació un cop mostrem el primer acudit
  if (reportAcudits.length === 1) {
    inputs.classList.remove("d-none");
  }
});

/** Afegeix l'acudit a l'array reportAcudits tant si es puntua com si no:
 *
 * @param acuditActual - l'acudit que s'està mostrant per pantalla un cop apretat 'seguent acudit'
 * @param puntuacio - la puntuació de l'acudit. (paràmetre no obligatori)
 * @param acuditText - l'acudit en si
 *
 * @returns no retorna res ja que la seva acció és omplir l'array reportAcudits
 */
function afegirAcudit(acuditActual, puntuacio) {
  if (acuditActual.value) {
    reportAcudits.push({
      joke: acuditActual.value,
      score: puntuacio,
      date: new Date().toISOString(),
    });
  } else if (acuditActual.joke) {
    reportAcudits.push({
      joke: acuditActual.joke,
      score: puntuacio,
      date: new Date().toISOString(),
    });
  }
  // Es mostra per consola l'array reportAcudits actualitzat cada cop que obrim un nou acudit i cada cop que el puntuem.
  console.log(reportAcudits);
}

// Exercici 3

// El score és actualitzat en el objecte acudit ja present en l'array reportAcudits.
// Per tant l'usuari pot canviar d'opinió i es guardarà l'útima puntuació que apreti. La data també s'actualitza. També pot no puntuar l'acudit.

document.body.addEventListener("click", (e) => {
  // ⚠️ simplificar/ eliminar switch statement
  switch (e.target) {
    case puntuacio1:
      reportAcudits[reportAcudits.length - 1].score = 1;
      reportAcudits[reportAcudits.length - 1].date = new Date().toISOString();
      console.log(`S'ha afegit puntuació a l'últim acudit: ${reportAcudits}`);
      break;
    case puntuacio2:
      reportAcudits[reportAcudits.length - 1].score = 2;
      reportAcudits[reportAcudits.length - 1].date = new Date().toISOString();
      console.log(`S'ha afegit puntuació a l'últim acudit: ${reportAcudits}`);
      break;
    case puntuacio3:
      reportAcudits[reportAcudits.length - 1].score = 3;
      reportAcudits[reportAcudits.length - 1].date = new Date().toISOString();
      console.log(`S'ha afegit puntuació a l'últim acudit: ${reportAcudits}`);
      break;
    default:
      null;
  }
});

// Exercici 4
mostrarTemps();
async function mostrarTemps() {
  const result = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=d4b9e3cf3354c90bf920e2c3dba024bf&units=metric&lang=ca"
  );
  const resultJSON = await result.json();

  temps.textContent = `${resultJSON.weather[0].description} | ${Math.round(
    resultJSON.main.temp
  )}ºC`;
}

//Exercici 5
async function dadJoke() {
  return fetch(`${DADJOKES_URL}`, { headers: headerAccept })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
}
async function chuckJoke() {
  return fetch("https://api.chucknorris.io/jokes/random")
    .then((result) => {
      return result.json();
    })
    .catch((error) => console.log(error));
}
