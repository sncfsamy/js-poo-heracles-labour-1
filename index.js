// Import stylesheets
//import './style.css';

// First Labour : Heracles vs Nemean Lion
// use your Figher class here
//const Fighter = require('./src/Fighter');

const heracles = new Fighter('🧔 Héraclès', 20, 6);
const nemean = new Fighter('🦁 Lion de Némée', 11, 13);

function add(x) {
    const newDiv = document.createElement("div");
    newDiv.innerText = x;
    document.querySelector("#game").appendChild(newDiv);
    window.scrollTo(0, document.body.scrollHeight);
}

add(heracles.name + ' : ' + heracles.getLife());
add(nemean.name + ' : ' + nemean.getLife());
add("Le combat commencera dans 10sec...");
let round = 1;
function fight() {
  add('🕛 Round n°' + round);
  heracles.isAlive(() => add(heracles.fight(nemean)));
  nemean.isAlive(() => add(nemean.fight(heracles)));
  if (nemean.life === 0) {
    add("🕛 Le combat s'est terminé au round n°" + round);
    return;
  } else {
    round++;
    setTimeout(fight, 1000);
  }
}
setTimeout(fight, 10000);
