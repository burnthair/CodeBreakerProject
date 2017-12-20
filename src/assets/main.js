let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    if (!answer.value && !attempt.value) setHiddenFields();
    (validateInput(input.value)) ? attempt++ : false;
    getResults(input.value);
    console.log(getResults.value);
    if (getResults.value === true) setMessage('You Win! :)');
    if (getResults.value === false && attempt >= 10) setMessage('You Lose! :(');
    setMessage('Incorrect, try again.');
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
    inp.length === 4 ? true : setMessage('Guesses must be exactly 4 characters long.'); return false;
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
        if (userGuess[i] === answer.value[i])   {
            correctCount++;
            glyphArray[i] = i + correct;
            console.log(correctCount);
            continue;
        } else if (userGuess.indexOf(answer.value[i]) >= 0)    {
            glyphArray[i] = i + transfer;
            continue;
        } else if (userGuess.indexOf(answer.value[i]) === -1) {
            glyphArray[i] = i + incorrect;
            continue;
        }
    }
    results.innerHTML += '<div class="row"><span class="col-md-6">' + userGuess + '</span><div class="col-md-6">' + glyphArray.join(' ') + '</div></div>';

    return correctCount === 4;
}


// glyphArray.forEach(function (el) { return el; })