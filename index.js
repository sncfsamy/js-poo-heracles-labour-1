// Import stylesheets
//import './style.css';

// First Labour : Heracles vs Nemean Lion
// use your Figher class here
//const Fighter = require('./src/Fighter');

const heracles = new Fighter('🧔 Héraclès', 20, 6);
const enemies = [
    new Fighter('🦁 Lion de Némée', 11, 13),
    new Fighter('🦘 Kangourou d\'Australie', 9, 22, 90),
    new Fighter('🐘 Elephant d\'Afrique', 18, 2, 150),
    new Fighter('🐅 Tigre du Bengale', 15, 15),
    new Fighter('🐿️ Ecureuil enragé', 11, 16),
    new Fighter('🦛 Hippopotame', 21, 5)
];

let round = 1;
    
const game = document.querySelector("#game");
const autoGame = document.querySelector("input");

function addInPage(x) {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = x;
    game.appendChild(newDiv);
    window.scrollTo(0, document.body.scrollHeight);
}

function restart(lastEnemyIndex) {
    game.innerHTML = "";
    round = 1;
    let newEnemy = Math.ceil(Math.random() * enemies.length) - 1;
    while (newEnemy == lastEnemyIndex) newEnemy = Math.ceil(Math.random() * enemies.length)-1;
    newEnemy = newEnemy< 0 ? 0 : newEnemy;
    start(enemies[newEnemy], newEnemy);
}

function start(enemy,index) {
    if (heracles.life < 100) {
        let heal = (enemy.defaultLife - heracles.life > 100 || heracles.life === 0) ? 100-heracles.life : 50;
        heal = (heracles.life+heal > 100)? 100-heracles.life : heal;
        addInPage(heracles.heal(heal));
    }
    if (enemy.life < 100) enemy.life = enemy.defaultLife;
    addInPage(heracles.getLife());
    addInPage(enemy.getLife());
    addInPage("Le combat commencera dans 10sec...");
    setTimeout(fight, 10000, enemy, index);
}

function autoRestart(index, timer = 10) {
    if (timer == 0) {
        if (autoGame.checked) restart(index);
    } else {
        const timeout = setTimeout((index, timer)=> {
            timer--;
            if (autoGame.checked) {
                document.querySelector("button").innerText = "Relancer un combat (auto dans " + timer + "sec)";
                autoRestart(index, timer);
            } else {
                document.querySelector("button").innerText = "Relancer un combat";
            }
        }, 1000, index, timer);
    }
}

function auto() {
    if (autoGame.checked) {
        const button = document.querySelector("button");
        if (button) button.click();
    }
}

function fight(enemy,index) {
  addInPage('🕛 Round n°' + round);
  heracles.isAliveFct(() => addInPage(heracles.fight(enemy)));
  enemy.isAliveFct(() => addInPage(enemy.fight(heracles)));
  if (!enemy.isAlive() || !heracles.isAlive()) {
    addInPage("🕛 Le combat s'est terminé au round n°" + round);
    addInPage("<button onClick='restart(" + index +");'>Relancer un combat</button>");
    addInPage("<h3>Scores:</h3>");
    addInPage(heracles.getScore());
    enemies.forEach(animal => {
        addInPage(animal.getScore());
    });
    if (autoGame.checked) autoRestart(index,10);
    return;
  } else {
    round++;
    setTimeout(fight, 500, enemy, index);
  }
}

start(enemies[0],0);
