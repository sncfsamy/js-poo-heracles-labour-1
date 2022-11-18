class Shield {
    constructor(name,protection) {
        this.name = name;
        this.protection = protection;
        this.durability = 50;
    }
    use() {
        this.durability -= 1;
        if (this.durability == 0) {
            return false;
        }
        return true;
    }
}