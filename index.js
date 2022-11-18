// Import stylesheets
//import './style.css';

// First Labour : Heracles vs Nemean Lion
// use your Figher class here
//const Fighter = require('./src/Fighter');

const heracles = new Fighter('🧔 Héraclès', 20, 6);
const enemies = [
    new Fighter("🐗 Sanglier d'Érymanthe", 28, 20),
    new Fighter('🦁 Lion de Némée', 11, 13),
    new Fighter('🦘 Kangourou d\'Australie', 11, 22, 90),
    new Fighter('🐘 Élephant d\'Afrique', 21, 8, 150),
    new Fighter('🐅 Tigre du Bengale', 15, 17),
    new Fighter('🐿️ Écureuil enragé', 11, 19),
    new Fighter('🦛 Hippopotame', 21, 12)
];

let round = 1;
    
const game = document.querySelector("#game");
const scoresDiv = document.querySelector("#scores");
const autoGame = document.querySelector("input");

function addInPage(x) {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = x;
    game.appendChild(newDiv);
    window.scrollTo(0, document.body.scrollHeight);
}

heracles.setLooseWeapon(addInPage);

function pushScores(p1,p2) {
    let scores = "<h3>Scores:</h3><div>" + heracles.getScore() + "</div>";
    enemies.forEach(animal => {
        scores += "<div>" +animal.getScore()+ "</div>";
    });
    scoresDiv.innerHTML = scores;
    if (p1 && p2) {
        document.getElementById((p1.isAlive()? "win" : "death") + p1.id).classList.add(p1.isAlive()? "win" : "death");
        document.getElementById((p2.isAlive()? "win" : "death") + p2.id).classList.add(p2.isAlive()? "win" : "death");
        setTimeout(()=> {
            document.querySelectorAll(".win,.death").forEach(elem => { elem.classList.remove("win"); elem.classList.remove("death"); });
        }, 10000);
    }
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
    if (!heracles.isAlive()) {
        heracles.weapon = null;
        heracles.shield = null;
    }
    if (heracles.life < 100) {
        let heal = (enemy.defaultLife - heracles.life > 100 || heracles.life === 0) ? 100-heracles.life : 50;
        heal = (heracles.life+heal > 100)? 100-heracles.life : heal;
        addInPage(heracles.heal(heal));
    }
    if (!heracles.shield && !heracles.weapon && (Math.random() > 0.8 || index == 0)) {
        heracles.giveWeapon();
        heracles.giveShield();
        addInPage(heracles.name + ` a trouvé une <b style="color:orange;">${heracles.weapon.name}</b> et un <b style="color: blue;">${heracles.shield.name}</b> !`);
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
    addInPage("<br />🕛 Le combat s'est terminé au round n°" + round);
    addInPage("<br /><br /></br /><button onClick='restart(" + index +");'>Relancer un combat</button>");
    pushScores(heracles,enemy);
    if (autoGame.checked) autoRestart(index,10);
    return;
  } else {
    round++;
    setTimeout(fight, 500, enemy, index);
  }
}

pushScores();
start(enemies[0],0);
