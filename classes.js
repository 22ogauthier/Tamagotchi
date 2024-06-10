class Pet extends PIXI.Sprite {
    constructor() {
        super();
        this.interactive = true;
        this.buttonMode = true;
        this.name = "Fluffy";
        this.hunger = 80;
        this.play = 80;
        this.sleep = 80;
    }

    increaseHungerBy() {
        hunger += 5;
        hungerScore.text = `Hunger: ${hunger}`;
    }

    increasePlayBy() {
        play += 5;
        playScore.text = `Play: ${play}`;
    }
    increaseSleepBy() {
        sleep += 5;
        sleepScore.text = `Sleep: ${sleep}`;
    }
}
