var score = document.getElementById('score');
var totalrun = document.getElementById('totalrun');
var wicketcount = document.getElementById('wicketcount');
var currentover = document.getElementById('currentoverun');
var currentoverwicket = document.getElementById('currentoverwicket');
var current_over_wicket = 0;
var current_over_run = 0;
var totalScore = 0;
var totalwicket = 0;
var count_over_ball = 0;
var runtowin = 0;
var numberinning = 0;
var scoreArray = [];

function updateScoreDisplay() {
    score.innerHTML = '';
    scoreArray.forEach(item => {
        let scoreItem = document.createElement('span');
        scoreItem.className = 'score-item';
        scoreItem.textContent = item;
        score.appendChild(scoreItem);
    });
}

function winner() {
    document.getElementById('main').style.height = "500px"
    if (totalScore + current_over_run >= runtowin) {
        document.getElementById('winner').innerHTML = "Team 2 wins";
        totalScore += current_over_run;
        totalrun.innerHTML = totalScore;
        document.getElementById('inning').style.display = '';
    } else if (totalScore + current_over_run == runtowin - 1 && totalwicket == 10) {
        document.getElementById('winner').innerHTML = "Match tie";
        document.getElementById('inning').style.display = '';
    } else if (totalwicket == 10) {
        document.getElementById('winner').innerHTML = "Team 1 wins";
        document.getElementById('inning').style.display = '';
    }
}

function updateover() {
    if (count_over_ball == 6) {
        document.getElementById('main').style.width = '500px';
        document.getElementById('main').style.height = '420px';
        document.getElementById('over').style.display = "inline-block";
    }
}

function handleRun(run) {
    if (totalwicket < 10 && count_over_ball < 6) {
        current_over_run += run;
        scoreArray.push(run);
        updateScoreDisplay();
        currentover.innerHTML = current_over_run;
        count_over_ball++;
        if (numberinning == 1) {
            winner();
        }
    }
    updateover();
}

function handleWicket() {
    if (totalwicket < 10 && count_over_ball < 6) {
        scoreArray.push('W');
        updateScoreDisplay();
        current_over_wicket++;
        totalwicket++;
        currentoverwicket.innerHTML = current_over_wicket;
        count_over_ball++;
        if (numberinning == 1) {
            winner();
        }
    }
    if (totalwicket == 10) {
        wicketcount.innerHTML = totalwicket;
        document.getElementById('allout').innerHTML = " All out";
        document.getElementById('main').style.width = '500px';
        document.getElementById('inning').style.display = "inline-block";
        return;
    }
    updateover();
}

function handleNoBall(extraRuns) {
    if (totalwicket < 10 && count_over_ball < 6) {
        scoreArray.push(`NB+${extraRuns}`);
        updateScoreDisplay();
        current_over_run += (1 + extraRuns);
        currentover.innerHTML = current_over_run;
        if (numberinning == 1) {
            winner();
        }
    }
    updateover();
}

function handleWideBall(extraRuns) {
    if (totalwicket < 10 && count_over_ball < 6) {
        scoreArray.push(`WB+${extraRuns}`);
        updateScoreDisplay();
        current_over_run += (1 + extraRuns);
        currentover.innerHTML = current_over_run;
        if (numberinning == 1) {
            winner();
        }
    }
    updateover();
}

function handleLegBye(extraRuns){
    if (totalwicket < 10 && count_over_ball < 6) {
        scoreArray.push(`LB+${extraRuns}`);
        updateScoreDisplay();
        current_over_run += extraRuns;
        currentover.innerHTML = current_over_run;
        count_over_ball++;
        if (numberinning == 1) {
            winner();
        }
    }
    updateover();
}

function handleNewOver() {
    totalScore += current_over_run;
    totalrun.innerHTML = totalScore;
    wicketcount.innerHTML = totalwicket;
    count_over_ball = 0;
    current_over_run = 0;
    current_over_wicket = 0;
    currentover.innerHTML = '';
    currentoverwicket.innerHTML = '';
    scoreArray = [];
    updateScoreDisplay();
    document.getElementById('main').style.width = '500px';
    document.getElementById('over').style.display = '';
}

function handleNewInning() {
    numberinning = 1;
    runtowin = totalScore + 1;
    document.getElementById('targetscore').innerHTML = runtowin;
    totalrun.innerHTML = '';
    wicketcount.innerHTML = '';
    count_over_ball = 0;
    totalScore = 0;
    totalwicket = 0;
    current_over_run = 0;
    current_over_wicket = 0;
    scoreArray = [];
    updateScoreDisplay();
    document.getElementById('main').style.width = '500px';
    document.getElementById('main').style.height = '420px';
    document.getElementById('over').style.display = '';
    document.getElementById('inning').style.display = '';
    document.getElementById('allout').innerHTML = '';
    document.getElementById('currentoverun').innerHTML = '';
    document.getElementById('currentoverwicket').innerHTML = '';
    document.getElementById('team2msg').style.display = "block";
}

document.getElementById("1").addEventListener("click", function () { handleRun(1); });

document.getElementById("2").addEventListener("click", function () { handleRun(2); });

document.getElementById("3").addEventListener("click", function () { handleRun(3); });

document.getElementById("4").addEventListener("click", function () { handleRun(4); });

document.getElementById("6").addEventListener("click", function () { handleRun(6); });

document.getElementById("dotball").addEventListener("click", function () { handleRun(0); });

document.getElementById("wicket").addEventListener("click", function () { handleWicket(); });

document.getElementById('nb').addEventListener('click', function () { handleNoBall(0); });
document.getElementById('nb+1').addEventListener('click', function () { handleNoBall(1); });
document.getElementById('nb+2').addEventListener('click', function () { handleNoBall(2); });
document.getElementById('nb+3').addEventListener('click', function () { handleNoBall(3); });
document.getElementById('nb+4').addEventListener('click', function () { handleNoBall(4); });
document.getElementById('nb+6').addEventListener('click', function () { handleNoBall(6); });

document.getElementById('wb').addEventListener('click', function () { handleWideBall(0); });
document.getElementById('wb+1').addEventListener('click', function () { handleWideBall(1); });
document.getElementById('wb+2').addEventListener('click', function () { handleWideBall(2); });
document.getElementById('wb+3').addEventListener('click', function () { handleWideBall(3); });
document.getElementById('wb+4').addEventListener('click', function () { handleWideBall(4); });

document.getElementById('lb').addEventListener('click', function () { handleLegBye(0)});
document.getElementById('lb+1').addEventListener('click', function () { handleLegBye(1); });
document.getElementById('lb+2').addEventListener('click', function () { handleLegBye(2); });
document.getElementById('lb+3').addEventListener('click', function () { handleLegBye(3); });
document.getElementById('lb+4').addEventListener('click', function () { handleLegBye(4); });

document.getElementById('over').addEventListener('click', function () { handleNewOver(); });

document.getElementById('inning').addEventListener('click', function () { handleNewInning(); });