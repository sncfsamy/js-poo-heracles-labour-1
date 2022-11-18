
/* Fighter class definition */
const MAX_LIFE = 100;

class Fighter {
    constructor (name, strength, dexterity, life = MAX_LIFE) {
        this.name = name;
        this.strength = strength;
        this.dexterity = dexterity;
        this.life = life;
        this.defaultLife = life;
        this.badChance = 0;
        this.winCount = 0;
        this.deathCount = 0;
    }

    win() {
        this.winCount += 1;
    }

    death() {
        this.deathCount += 1;
    }

    getLife() {
        return this.name + " 💙: " + Math.ceil(this.life);
    }

    fight(fighter) {
        if (this.life == 0) return "";
        let attack = Math.random() * this.strength;
        attack = (attack - fighter.dexterity)>0 ? attack-fighter.dexterity: Math.random()>0.5? 1 : 0;
        if (attack <= 1)
            if ((Math.random() + Math.random() + Math.random() +Math.random() + this.badChance || this.name == '🧔 Héraclès' && Math.random()>0.8) > 3.6) {
             attack = ((Math.random()+this.badChance) * this.strength)-fighter.dexterity/4;
             this.badChance = 0;
            } else this.badChance += 0.05;
            
        fighter.life -= (fighter.life-attack >=0)? Math.abs(attack) : fighter.life;
        if (fighter.life == 0) {
            this.win();
            fighter.death();
        } else if (this.life == 0) {
            fighter.win();
            this.death();
        }
        return fighter.life > 0 ? this.name + "⚔️" + fighter.name + ": " + fighter.getLife() : "🏆" + this.name + " a gagné ! ("+this.getLife() +")\r\n" + "💀" + fighter.name + " est mort.";
    }

    getScore() {
        return this.name + " : " + this.winCount + "🏆 - " + this.deathCount + "💀";
    }

    isAliveFct(f) {
        if (this.life) f();
    }

    isAlive() {
        return (this.life);
    }
    heal(healthpoints) {
        this.life += healthpoints;
        return this.name + ` a été soigné de ${Math.floor(healthpoints)} 💙`;
    }
}

//module.exports = Fighter;