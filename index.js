// Import stylesheets
//import './style.css';

// First Labour : Heracles vs Nemean Lion
// use your Figher class here
//const Fighter = require('./src/Fighter');

const heracles = new Fighter('🧔 Héraclès', 20, 6);
const enemies = [
    new Fighter('🦁 Lion de Némée', 11, 13),
    new Fighter('🦘 Kangourou d\'Australie', 9, 22, 90),
    new Fighter('🐘 Elephant d\'Afrique', 19, 2, 150),
    new Fighter('🐅 Tigre du Bengale', 15, 15),
    new Fighter('🐿️ Ecureuil enragé', 11, 16)
]
    
const game = document.querySelector("#game");

function add(x) {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = x;
    game.appendChild(newDiv);
    window.scrollTo(0, document.body.scrollHeight);
}

function restart(lastEnemyIndex) {
    game.innerHTML = "";
    let newEnemy = Math.floor(Math.random() * enemies.length - 1);
    while (newEnemy == lastEnemyIndex) newEnemy = Math.floor(Math.random() * enemies.length - 1);
    start(enemies[newEnemy], newEnemy);
}
function start(enemy,index) {
    if (heracles.life < 100) {
        const heal = (enemy.defaultLife - heracles.life > 100) ? 100 : 50;
        heracles.life += (heracles.life+heal > 100)? 100-heracles.life : heal;
        add(heracles.name + ` est soigné de ${heal} 💙`);
    }
    if (enemy.life < 100) enemy.life = enemy.defaultLife;
    add(heracles.name + ' : ' + heracles.getLife());
    add(enemy.name + ' : ' + enemy.getLife());
    add("Le combat commencera dans 10sec...");
    setTimeout(fight, 10000, enemy, index);
}
let round = 1;
function fight(enemy,index) {
  add('🕛 Round n°' + round);
  heracles.isAlive(() => add(heracles.fight(enemy)));
  enemy.isAlive(() => add(enemy.fight(heracles)));
  if (enemy.life === 0 || heracles.life === 0) {
    add("🕛 Le combat s'est terminé au round n°" + round);
    add("<button onClick='restart(" + index +");'>Relancer un combat</button>");
    return;
  } else {
    round++;
    setTimeout(fight, 500, enemy, index);
  }
}
start(enemies[0],0);
