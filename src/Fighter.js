
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
        let msg = "";
        switch(Math.random() * 10) {
            case 1:
                msg = `${this.name} a perdu son </b><b class="weapon">${this.weapon.name}</b><b class="loosing"> !`;
                break;
            case 2:
                msg =  `${this.name} a perdu son </b><b class="weapon">${this.weapon.name}</b><b class="loosing"> à cause de ${fighter.name} !`;
                break;
            case 3:
                msg =  `${fighter.name} a cassé </b><b class="weapon">l'${this.weapon.name}</b><b class="loosing"> de ${this.name}`;
                break;
            case 4:
                msg =  `${fighter.name} a avalé </b><b class="weapon">l'${this.weapon.name}</b><b class="loosing"> de ${this.name}`;
                break;
            case 5:
                msg =  `${fighter.name} a gardé </b><b class="weapon">l'${this.weapon.name}</b><b class="loosing"> de ${this.name} enfoncée dans son flanc !`;
                break;
            case 6:
                msg =  `${this.name} a laissé tomber son </b><b class="weapon">${this.weapon.name}</b><b class="loosing"> !`;
                break;
            default:
                msg =  `${this.name} a laissé échaper son </b><b class="weapon">${this.weapon.name}</b><b class="loosing"> !`;
        }
        this.weapon = null;
        this.addToPage(`<b class="loosing">${msg}</b>`);
    }

    looseShield() {
        this.addToPage(`<b class="loosing">${this.name} a perdu son </b><b class="shield">${this.shield.name}</b> !</b>`);    
        this.shield = null;
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
        this.weapon = new Weapon("Epée pointue un peu émoussée", 10);
    }

    giveShield() {
        this.shield = new Shield("Vieux bouclier pourri", 10);
    }

    getDamage(fighter) {
        const weaponDamage = this.weapon && this.weapon.durability ? this.weapon.damage : 0;
        let attack = Math.random() * (this.strength + weaponDamage);
        attack = (attack - fighter.getDefense())>0 ? attack-fighter.getDefense(): Math.random()>0.5? 1 : 0;
        if (attack <= 1)
            if ((Math.random() + Math.random() + Math.random() +Math.random() + this.badChance) > 3.2 || (this.name == '🧔 Héraclès' && Math.random()>0.9)) {
             attack = ((Math.random()+this.badChance) * this.strength)-fighter.getDefense()/4;
             attack = attack<10? attack+10 : attack;
             const msg = "<span class=\"chance\">" + this.name + " réussi à attaquer par chance ! (<b>" + attack.toFixed(2) + "pts de dégats</b> dont <b>" + this.badChance.toFixed(2) + "pts de dégats de chance</b> !)</span>";
             this.badChance = 0;
             this.addToPage ? this.addToPage(msg) : fighter.addToPage(msg);
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
        return fighter.life > 0 ? this.getName() + "⚔️" + fighter.name + ": " + fighter.getLife() : "<br /><br />🏆" + this.name + " a gagné ! ("+this.getLife() +")<br />" + "💀" + fighter.name + " est mort.";
    }

    getScore() {
        return "<div>" + this.name + "</div><div><span id=\"win" + this.id + "\">&nbsp;" + this.winCount + "</span></div><div><span id=\"death" + this.id + "\">&nbsp;" + this.deathCount + "</span></div>";
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