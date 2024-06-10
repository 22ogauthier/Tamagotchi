function startGame() {
    sleepScene.visible = false;
    endScene.visible = false;
    playScene.visible = false;
    foodScene.visible = false;
}

function submitName() {
    let term = document.querySelector("#nameInput").value;
    if (term) {
        localStorage.setItem('term', term);
    }
    name.text = `Name: ${term}`;
}

function updateSleepScore(newScore) {
    sleepScore.text = newScore.toString();
    localStorage.setItem('sleep', newScore);
    let storedScore = localStorage.getItem('sleep');
    if (storedScore) {
        sleepScore.text = `Sleep: ${storedScore}`;
    } else {
        sleepScore.text = `Sleep: 0`;
    }
}

function displayStoredSleepScore() {
    let storedScore = localStorage.getItem('sleep');
    if (storedScore) {
        sleepScore.text = `Sleep: ${storedScore}`;
    } else {
        sleepScore.text = `Sleep: 0`;
    }
}

function updateHungerScore(newScore) {
    hungerScore.text = newScore.toString();
    localStorage.setItem('hunger', newScore);
    let storedScore = localStorage.getItem('hunger');
    if (storedScore) {
        hungerScore.text = `Hunger: ${storedScore}`;
    } else {
        hungerScore.text = `Hunger: 0`;
    }
}

function displayStoredHungerScore() {
    let storedScore = localStorage.getItem('hunger');
    if (storedScore) {
        hungerScore.text = `Hunger: ${storedScore}`;
    } else {
        hungerScore.text = `Hunger: 0`;
    }
}

function updatePlayScore(newScore) {
    playScore.text = newScore.toString();
    localStorage.setItem('play', newScore);
    let storedScore = localStorage.getItem('play');
    if (storedScore) {
        playScore.text = `Play: ${storedScore}`;
    } else {
        playScore.text = `Play: 0`;
    }
}

function displayStoredPlayScore() {
    let storedScore = localStorage.getItem('play');
    if (storedScore) {
        playScore.text = `Play: ${storedScore}`;
    } else {
        playScore.text = `Play: 0`;
    }
}

function checkGameConditions() {
    if (hunger <= 0 || play <= 0 || sleep <= 0) {
        showEndScene();
    }
}

function showEndScene() {
    endScene.visible = true;
    gameScene.visible = false;
}

function showGeneralBox() {
    gameScene.removeChild(playBox);
    gameScene.removeChild(eatBox);
    gameScene.removeChild(sleepBox);
    gameScene.addChild(generalBox);
}

function showEatBox() {
    gameScene.removeChild(playBox);
    gameScene.removeChild(generalBox);
    gameScene.removeChild(sleepBox);
    gameScene.addChild(eatBox);
}

function showSleepBox() {
    gameScene.removeChild(playBox);
    gameScene.removeChild(generalBox);
    gameScene.removeChild(eatBox);
    gameScene.addChild(sleepBox);
}

function showPlayBox() {
    gameScene.removeChild(sleepBox);
    gameScene.removeChild(generalBox);
    gameScene.removeChild(eatBox);
    gameScene.addChild(playBox);
}
