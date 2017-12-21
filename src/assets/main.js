let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    if (!answer.value && !attempt.value) { setHiddenFields(); }
    if (validateInput(input.value)) {
        attempt.value++;
        console.log(attempt);
    } else {
        return false;
    }
    if (getResults(input.value)) {
        setMessage('You Win! :)');
        showAnswer(true);
        showReplay();
    } else if (attempt.value >= 10) {
        setMessage('You Lose! :(');
        showAnswer(false);
        showReplay();
    } else {
        setMessage('Incorrect, try again.');
    }
}

//implement new functions here
function setHiddenFields() {
    attempt.value = 0;
    answer.value = Math.floor(Math.random() * 10000).toString();
    while (answer.value.length < 4) {
        answer.value = '0' + answer.value;
    }
    console.log(answer.value);
}

function setMessage(mes) {
    let message = document.getElementById('message');
    message.innerHTML = mes;
}

function validateInput(inp) {
    if (inp.length === 4) {
        return true;
    } else {
        setMessage('Guesses must be exactly 4 characters long.');
        return false;
    } 
}

function getResults(userGuess) {
    let results = document.getElementById('results');
    let correct = '<span class="glyphicon glyphicon-ok"></span>';
    let transfer = '<span class="glyphicon glyphicon-transfer"></span>';
    let incorrect = '<span class="glyphicon glyphicon-remove"></span>';
    let glyphArray = [];
    let correctCount = 0;

    for (var i = 0; i < userGuess.length; i++) {
        console.log(answer.value[i]);
        console.log(userGuess);
        if (userGuess[i] === answer.value[i]) {
            correctCount++;
            glyphArray[i] = i + correct;
            console.log(correctCount);
            continue;
        } else if (answer.value.indexOf(userGuess[i]) >= 0) {
            glyphArray[i] = i + transfer;
            continue;
        } else if (answer.value.indexOf(userGuess[i]) === -1) {
            glyphArray[i] = i + incorrect;
            continue;
        }
    }

    results.innerHTML += '<div class="row"><span class="col-md-6">' + userGuess + '</span><div class="col-md-6">' + glyphArray.join(' ') + '</div></div>';

    return userGuess == answer.value;
}

function showAnswer(res) {
    code = document.getElementById('code');
    code.innerHTML = answer.value;
    if (res) {
        code.className += ' success';
    }
    code.className += ' failure'
}

function showReplay() {
    document.getElementById('guessing-div').style.display = 'none';
    document.getElementById('replay-div').style.display = 'block';
}