
/* Fighter class definition */
const MAX_LIFE = 100;
let ids = Math.random()*1000;

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
        this.weapon = null;
        this.shield = null;
        this.id = ids;
        ids++;
    }

    setLooseWeapon(f) {
        this.addToPage = f;
    }

    looseWeapon(fighter) {
        this.weapon = null;
        switch(Math.random() * 10) {
            case 1:
                this.addToPage("<b style=\"color: red;\">" + this.name + " a perdu son épée !</b>");
                break;
            case 2:
                this.addToPage("<b style=\"color: red;\">" + this.name + " a perdu son épée à cause de " + fighter.name + " !</b>");
                break;
            case 3:
                this.addToPage("<b style=\"color: red;\">" + fighter.name + " a cassé l'épée de " + this.name + "</b>");
                break;
            case 4:
                this.addToPage("<b style=\"color: red;\">" + fighter.name + " a avalé l'épée de " + this.name + "</b>");
                break;
            case 5:
                this.addToPage("<b style=\"color: red;\">" + fighter.name + " a gardé l'épée de " + this.name + " enfoncée dans son flanc !</b>");
                break;
            case 6:
                this.addToPage("<b style=\"color: red;\">" + this.name + " a laissé tomber son épée !</b>");
                break;
            default:
                this.addToPage("<b style=\"color: red;\">" + this.name + " a laissé échaper son épée !</b>");
        }
    }

    looseShield() {
        this.shield = null;
        this.addToPage("<b style=\"color: red;\">" + this.name + " a perdu son bouclier !</b>");    
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

    getName() {
        return (this.shield?"🛡️":"") + (this.weapon? "🗡️" : "") + this.name;
    }

    giveWeapon() {
        this.weapon = new Weapon("Epée pointue", 10);
    }

    giveShield() {
        this.shield = new Shield("Vieux bouclier pourris", 10);
    }

    getDamage(fighter) {
        const weaponDamage = this.weapon && this.weapon.durability ? this.weapon.damage : 0;
        let attack = Math.random() * (this.strength + weaponDamage);
        attack = (attack - fighter.getDefense())>0 ? attack-fighter.getDefense(): Math.random()>0.5? 1 : 0;
        if (attack <= 1)
            if ((Math.random() + Math.random() + Math.random() +Math.random() + this.badChance) > 3.8 || (this.name == '🧔 Héraclès' && Math.random()>0.9)) {
             attack = ((Math.random()+this.badChance) * this.strength)-fighter.getDefense()/4;
             this.badChance = 0;
            } else this.badChance += 0.025;
        
        if (attack && this.weapon && !this.weapon.use()) this.looseWeapon(fighter);
        
        return attack;
    }

    getDefense() {
        return this.dexterity + (this.shield? this.shield.protection : 0);
    }

    fight(fighter) {
        if (this.life == 0) return "";
        let attack = this.getDamage(fighter);

        if (fighter.shield && !fighter.shield.use()) fighter.looseShield();

        fighter.life -= (fighter.life-attack >=0)? Math.abs(attack) : fighter.life;
        if (fighter.life == 0) {
            this.win();
            fighter.death();
        } else if (this.life == 0) {
            fighter.win();
            this.death();
        }
        return fighter.life > 0 ? this.getName() + "⚔️" + fighter.name + ": " + fighter.getLife() : "🏆" + this.name + " a gagné ! ("+this.getLife() +")\r\n" + "💀" + fighter.name + " est mort.";
    }

    getScore() {
        return this.name + " : <span id=\"win" + this.id + "\">" + this.winCount + "</span>🏆 - <span id=\"death" + this.id + "\">" + this.deathCount + "</span>💀";
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