class Weapon {
    constructor(name,damage=10) {
        this.name = name;
        this.damage = damage;
        this.durability = 30;
    }
    use() {
        this.durability -= 1;
        if (this.durability == 0) {
            return false;
        }
        return true;
    }
}