
/* Fighter class definition */
const MAX_LIFE = 100;

class Fighter {
    constructor (name, strength, dexterity, life = MAX_LIFE) {
        this.name = name;
        this.strength = strength;
        this.dexterity = dexterity;
        this.life = life;
        this.defaultLife = life;
    }

    getLife() {
        return this.name + " 💙: " + Math.ceil(this.life);
    }

    fight(fighter) {
        if (this.life == 0) return "";
        let attack = Math.random() * this.strength;
        attack = (attack - fighter.dexterity)>0 ? attack-fighter.dexterity: Math.random()>0.5? 1 : 0;
        fighter.life -= (fighter.life-attack >=0)? attack : fighter.life;
        return fighter.life > 0 ? this.name + "⚔️" + fighter.name + ": " + fighter.getLife() : "🏆" + this.name + " a gagné ! ("+this.getLife() +")\r\n" + "💀" + fighter.name + " est mort.";
    }

    isAlive(f) {
        if (this.life) f();
    }
}

//module.exports = Fighter;