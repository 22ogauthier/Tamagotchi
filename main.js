
window.onload = function () {
    let storedName = localStorage.getItem('term');
    if (storedName) {
        document.querySelector('#nameInput').value = storedName;
    } else {
        storedName = "Fluffy";
    }
    name.text = `Name: ${storedName}`;
    displayStoredSleepScore();
    displayStoredHungerScore();
    displayStoredPlayScore();
};


setInterval(() => {
    if (hunger > 0) {
        hunger -= 10;
        hungerScore.text = 'Hunger: ' + hunger;
    }

    if (hunger <= 0) {
        hunger = 0;  
        hungerScore.text = 'Hunger: 0';
        console.log("Hunger reached zero.");
    }

    if (sleep > 0) {
        sleep -= 10;
        sleepScore.text = 'Sleep: ' + sleep;
    }

    if (sleep <= 0) {
        sleep = 0;  
        sleepScore.text = 'Sleep: 0';
        console.log("Sleep reached zero.");
    }

    if (play > 0) {
        play -= 10;
        playScore.text = 'Play: ' + play;
    }

    if (play <= 0) {
        play = 0;  
        playScore.text = 'Play: 0';
        console.log("Play reached zero.");
    }

    checkGameConditions();

}, 5000);

"use strict";
const app = new PIXI.Application({
    width: 650,
    height: 500,
    backgroundColor: 0xFFC0CB
});
document.body.appendChild(app.view);

// constants
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;

// game variables
let stage;
let pet;
let startScene;
let gameScene;
let foodScene;
let playScene;
let sleepScene;
let endScene;
let hungerLabel, sleepLabel, playLabel;
let hungerScore, sleepScore, playScore, name;
let hunger = 100;
let play = 100;
let sleep = 100;
let elapsed = 0;

// pre-load the images (this code works with PIXI v6)
app.loader.onProgress.add(e => { console.log(`progress=${e.progress}`) });
app.loader.onComplete.add(setup);
app.loader.load();


function setup() {
    stage = app.stage;
    // start/general scene
    gameScene = new PIXI.Container();
    stage.addChild(gameScene);

    // food scene
    eatBox = new PIXI.Container();
    //general box
    generalBox = new PIXI.Container();
    // play scene
    playBox = new PIXI.Container();
    //sleep scene
    sleepBox = new PIXI.Container();
    //end scene
    endScene = new PIXI.Container();
    endScene.visible = false;
    stage.addChild(endScene);

    //create pet
    pet = new Pet();

    // create labels and buttons
    createLabelsAndButtons();
}

function createLabelsAndButtons() {
    //sleep button
    const sleepButton = new PIXI.Graphics();
    sleepButton.beginFill(0xAA336A); // light pink
    sleepButton.drawRoundedRect(0, 0, 150, 50, 10); // x, y, width, height, radius
    sleepButton.endFill();
    sleepButton.interactive = true;
    sleepButton.buttonMode = true;
    sleepButton.x = 50; 
    sleepButton.y = 400;
    sleepButton.on('pointerover', () => sleepButton.tint = 0xAA336A); // lighter pink on hover
    sleepButton.on('pointerout', () => sleepButton.tint = 0xFFFFFF); // back to normal
    //label for the button
    const sleepLabel = new PIXI.Text('Naptime!', {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xffffff,
        align: 'center'
    });
    sleepLabel.x = sleepButton.width / 2 - sleepLabel.width / 2;
    sleepLabel.y = sleepButton.height / 2 - sleepLabel.height / 2;
    sleepButton.addChild(sleepLabel);
    gameScene.addChild(sleepButton);
    sleepButton.on('pointerdown', () => {
        console.log('Sleep Button clicked!');
        showSleepBox();
    });

    const eatButton = new PIXI.Graphics();
    eatButton.beginFill(0xAA336A); // light pink
    eatButton.drawRoundedRect(0, 0, 150, 50, 10); // x, y, width, height, radius
    eatButton.endFill();
    eatButton.interactive = true;
    eatButton.buttonMode = true;
    eatButton.x = 250; 
    eatButton.y = 400;
    eatButton.on('pointerover', () => eatButton.tint = 0xAA336A); // lighter pink on hover
    eatButton.on('pointerout', () => eatButton.tint = 0xFFFFFF); // back to normal
    //label for the button
    const eatLabel = new PIXI.Text('Feed me!', {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xffffff,
        align: 'center'
    });
    eatLabel.x = eatButton.width / 2 - eatLabel.width / 2;
    eatLabel.y = eatButton.height / 2 - eatLabel.height / 2;
    eatButton.addChild(eatLabel);
    gameScene.addChild(eatButton);
    eatButton.on('pointerdown', () => {
        console.log('Eat Button clicked!');
        showEatBox();
    });

    //play button
    const playButton = new PIXI.Graphics();
    playButton.beginFill(0xAA336A); // light pink
    playButton.drawRoundedRect(0, 0, 150, 50, 10); // x, y, width, height, radius
    playButton.endFill();
    playButton.interactive = true;
    playButton.buttonMode = true;
    playButton.x = 450;
    playButton.y = 400;
    playButton.on('pointerover', () => playButton.tint = 0xAA336A); // lighter pink on hover
    playButton.on('pointerout', () => playButton.tint = 0xFFFFFF); // back to normal
    //label for the button
    const playLabel = new PIXI.Text("Let's Play!", {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xffffff,
        align: 'center'
    });
    playLabel.x = playButton.width / 2 - playLabel.width / 2;
    playLabel.y = playButton.height / 2 - playLabel.height / 2;
    playButton.addChild(playLabel);
    gameScene.addChild(playButton);
    playButton.on('pointerdown', () => {
        console.log('Play Button clicked!');
        showPlayBox();
    });

    //title
    let title = new PIXI.Text("My Personal Pet!");
    title.style = new PIXI.TextStyle({
        fill: 0xAA336A,
        fontSize: 50,
        fontFamily: 'Arial',
    });
    title.interactive = true;
    title.buttonMode = true;
    title.x = 150;
    title.y = 25;
    gameScene.addChild(title);
    // Create an underline using PIXI.Graphics
    let underline = new PIXI.Graphics();
    underline.lineStyle(2, 0xAA336A, 1);
    underline.moveTo(title.x, title.y + title.height);
    underline.lineTo(title.x + title.width, title.y + title.height);
    underline.visible = false; // Initially hidden
    title.on('pointerover', () => {
        underline.visible = true;
    });
    title.on('pointerout', () => {
        underline.visible = false;
    });
    gameScene.addChild(underline);
    title.on('pointerdown', () => {
        console.log('General Button clicked!');
        showGeneralBox();
    });

    //name
    name = new PIXI.Text();
    name.style = new PIXI.TextStyle({
        fill: 0xAA336A,
        fontSize: 20,
        fontFamily: 'Arial'
    });
    name.x = 20;
    name.y = 100;
    gameScene.addChild(name);
    name.text = `Name: `;

    //hunger label
    hungerScore = new PIXI.Text();
    hungerScore.style = new PIXI.TextStyle({
        fill: 0xAA336A,
        fontSize: 20,
        fontFamily: 'Arial'
    });
    hungerScore.x = 20;
    hungerScore.y = 130;
    gameScene.addChild(hungerScore);
    updateHungerScore(100);

    //play label
    playScore = new PIXI.Text();
    playScore.style = new PIXI.TextStyle({
        fill: 0xAA336A,
        fontSize: 20,
        fontFamily: 'Arial'
    });
    playScore.x = 20;
    playScore.y = 160;
    gameScene.addChild(playScore);
    updatePlayScore(100);

    //sleep label
    sleepScore = new PIXI.Text();
    sleepScore.style = new PIXI.TextStyle({
        fill: 0xAA336A,
        fontSize: 20,
        fontFamily: 'Arial'
    });
    sleepScore.x = 20;
    sleepScore.y = 190;
    gameScene.addChild(sleepScore);
    updateSleepScore(100);

    /////END SCENE//////
    let gameOverText = new PIXI.Text('Game Over :(', {
        fontFamily: 'Arial',
        fontSize: 36,
        fill: 0xff1010,
        align: 'center'
    });
    gameOverText.x = app.screen.width / 2 - gameOverText.width / 2;
    gameOverText.y = app.screen.height / 2 - gameOverText.height / 2;
    endScene.addChild(gameOverText);

    ////GENERAL BOX
    let texture = PIXI.Texture.from("images/generalDog.png");
    let imageSprite = new PIXI.Sprite(texture);
    imageSprite.x = app.screen.width / 2;
    imageSprite.y = app.screen.height / 2 - 20;
    imageSprite.anchor.set(0.5);
    generalBox.addChild(imageSprite);
    showGeneralBox();

    //EAT BOX
    let texture2 = PIXI.Texture.from("images/eatDog.png");
    let imageSprite2 = new PIXI.Sprite(texture2);
    imageSprite2.x = app.screen.width / 2;
    imageSprite2.y = app.screen.height / 2 - 20;
    imageSprite2.anchor.set(0.5);
    imageSprite2.interactive = true;
    imageSprite2.buttonMode = true;
    imageSprite2.on('pointerdown', () => {
        console.log('Sleep was clicked!');
        pet.increaseHungerBy();
    });
    eatBox.addChild(imageSprite2);

    //instructions
    eatInstructions = new PIXI.Text("Click on the food bowl to feed me!");
    eatInstructions.style = new PIXI.TextStyle({
        fill: 0xAA336A,
        fontSize: 20,
        fontFamily: 'Arial'
    });
    eatInstructions.x = 320;
    eatInstructions.y = 80;
    eatBox.addChild(eatInstructions);

    //SLEEP BOX
    let texture3 = PIXI.Texture.from("images/sleepDog.png");
    let imageSprite3 = new PIXI.Sprite(texture3);
    imageSprite3.x = app.screen.width / 2;
    imageSprite3.y = app.screen.height / 2 - 20;
    imageSprite3.anchor.set(0.5);
    imageSprite3.interactive = true;
    imageSprite3.buttonMode = true;
    imageSprite3.on('pointerdown', () => {
        console.log('Sleep was clicked!');
        pet.increaseSleepBy();
    });
    sleepBox.addChild(imageSprite3);

    //instructions
    sleepInstructions = new PIXI.Text("Pet me to sleep.");
    sleepInstructions.style = new PIXI.TextStyle({
        fill: 0xAA336A,
        fontSize: 20,
        fontFamily: 'Arial'
    });
    sleepInstructions.x = 320;
    sleepInstructions.y = 80;
    sleepBox.addChild(sleepInstructions);

    //PLAY BOX
    let texture4 = PIXI.Texture.from("images/playDog.png");
    let imageSprite4 = new PIXI.Sprite(texture4);
    imageSprite4.x = app.screen.width / 2;
    imageSprite4.y = app.screen.height / 2 - 20;
    imageSprite4.anchor.set(0.5);
    playBox.addChild(imageSprite4);

    let texture5 = PIXI.Texture.from('images/ball.png'); 
    let draggableSprite = new PIXI.Sprite(texture5);
    draggableSprite.anchor.set(0.5);
    draggableSprite.x = 520;
    draggableSprite.y = 180;
    draggableSprite.interactive = true;
    draggableSprite.buttonMode = true;
    let dragging = false;

    //dragging
    draggableSprite.on('pointerdown', (event) => {
        dragging = true;
        draggableSprite.data = event.data;
        draggableSprite.alpha = 0.5;
        pet.increasePlayBy();
    });
    draggableSprite.on('pointerup', () => {
        dragging = false;
        draggableSprite.alpha = 1;
    });
    draggableSprite.on('pointerupoutside', () => {
        dragging = false;
        draggableSprite.alpha = 1;
    });
    draggableSprite.on('pointermove', () => {
        if (dragging) {
            const newPosition = draggableSprite.data.getLocalPosition(draggableSprite.parent);
            draggableSprite.x = newPosition.x;
            draggableSprite.y = newPosition.y;
        }
    });
    playBox.addChild(draggableSprite);

    //instructions
    playInstructions = new PIXI.Text("Drag the ball to play with me!");
    playInstructions.style = new PIXI.TextStyle({
        fill: 0xAA336A,
        fontSize: 20,
        fontFamily: 'Arial'
    });
    playInstructions.x = 320;
    playInstructions.y = 80;
    playBox.addChild(playInstructions);

}
