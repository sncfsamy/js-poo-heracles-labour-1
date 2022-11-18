// Import stylesheets
//import './style.css';

// First Labour : Heracles vs Nemean Lion
// use your Figher class here
//const Fighter = require('./src/Fighter');

const heracles = new Fighter('🧔 Héraclès', 20, 6);
let simulation = 0, simulationMax = 0;
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
const autoGame = document.querySelector("#auto");
const simulate = document.querySelector("#startsimulation");
const simulationVal = document.querySelector("#simulation");

function addInPage(x) {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = x;
    game.appendChild(newDiv);
    game.scrollTo(0, game.scrollHeight);
}

heracles.setLooseWeapon(addInPage);

function pushScores(p1,p2) {
    let scores = "<h3>Scores:</h3><div class=\"scoreslist\"><div><span><u>Combattants</u></span></div><div>🏆</div><div>💀</div>" + heracles.getScore();
    enemies.forEach(animal => {
        scores += animal.getScore();
    });
    scores += "</div>";
    scoresDiv.innerHTML = scores;
    if (p1 && p2) {
        document.getElementById((p1.isAlive()? "win" : "death") + p1.id).classList.add(p1.isAlive()? "win" : "death");
        document.getElementById((p2.isAlive()? "win" : "death") + p2.id).classList.add(p2.isAlive()? "win" : "death");
        setTimeout(()=> {
            document.querySelectorAll(".win,.death").forEach(elem => { elem.classList.remove("win"); elem.classList.remove("death"); });
        }, simulation == simulationMax ? 10000 : 0);
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
        addInPage(heracles.name + ` a trouvé une <b class="weapon">${heracles.weapon.name}</b> et un <b class="shield">${heracles.shield.name}</b> !`);
    }
    if (enemy.life < 100) enemy.life = enemy.defaultLife;
    addInPage(heracles.getLife());
    addInPage(enemy.getLife());
    addInPage("Le combat commencera dans 10sec...");
    setTimeout(fight, simulation==simulationMax? 10000 : 0, enemy, index);
}

function autoRestart(index, timer = 10) {
    if (timer == 0) {
        if (autoGame.checked) restart(index);
    } else {
        const timeout = setTimeout((index, timer)=> {
            timer--;
            const button = document.querySelector("#restartfight");
            if (button) {
                if (autoGame.checked) {
                    button.innerText = "Relancer un combat (auto dans " + timer + "sec)";
                    autoRestart(index, timer);
                } else {
                    button.innerText = "Relancer un combat";
                }
            }
        }, simulation===simulationMax? 1000 : 0, index, timer);
    }
}

function auto() {
    if (autoGame.checked) {
        const button = document.querySelector("button");
        if (button) button.click();
    }
}

function fight(enemy,index) {
    if(simulation===simulationMax) {
        addInPage('🕛 Round n°' + round);
    }
    heracles.isAliveFct(() => simulation===simulationMax? addInPage(heracles.fight(enemy)) : heracles.fight(enemy));
    enemy.isAliveFct(() => simulation===simulationMax? addInPage(enemy.fight(heracles)) : enemy.fight(heracles));
    if (!enemy.isAlive() || !heracles.isAlive()) {
        addInPage("<br />🕛 Le combat s'est terminé au round n°" + round);
        pushScores(heracles,enemy);
        if(!autoGame.checked || simulation+1===simulationMax) {
            addInPage("<br /><br /></br /><button id=\"restartfight\" onClick='restart(" + index +");'>Relancer un combat</button>");
        }
        if (autoGame.checked || simulation!==simulationMax) {
            if (simulation!==simulationMax) {
                simulation = simulationMax>simulation? simulation+1: simulationMax;
                simulationVal.value = (Math.abs(Math.ceil(parseInt(simulationVal.value)))-1).toString();
            }
            autoRestart(index,simulation===simulationMax ? 10 : 0);
        }
        if (simulation === simulationMax && simulationVal.readOnly) {
            autoGame.disabled = false;
            autoGame.checked = false;
            simulate.disabled = false;
            simulationVal.readOnly = false;
        }
        return;
    } else {
        round++;
        setTimeout(fight, simulation==simulationMax? 500 : 0, enemy, index);
    }
}
simulate.addEventListener("click", function() {
    const value = Math.abs(Math.ceil(parseInt(simulationVal.value)));
    if (value > 0) {
        simulation = 0;
        simulationMax = value;
        simulationVal.readOnly = true;
        simulate.disabled = true;
        autoGame.checked = true;
        autoGame.disabled = true;
        const restartbutton = document.querySelector("#restartfight");
        if(restartbutton)
            restartbutton.click();
    }
});

simulationVal.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      simulate.click();
    }
});

pushScores();
start(enemies[0],0);
