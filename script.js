let defaultTime = 1500; // 25 minutes
let time = defaultTime;
let timerInterval = null;

// STREAK SYSTEM
let today = new Date().toDateString();
let lastStudyDate = localStorage.getItem("lastStudyDate");
let streak = localStorage.getItem("streak")
    ? parseInt(localStorage.getItem("streak"))
    : 0;

// START TIMER
function startTimer() {
    if (timerInterval !== null) return;

    timerInterval = setInterval(function () {
        if (time > 0) {
            time--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;

            alert("Study Session Complete! 🎉");

            // Update streak
            if (lastStudyDate !== today) {
                let yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);

                if (lastStudyDate === yesterday.toDateString()) {
                    streak++;
                } else {
                    streak = 1;
                }

                localStorage.setItem("streak", streak);
                localStorage.setItem("lastStudyDate", today);
            }

            window.location.href = "mood.html";
        }
    }, 1000);
}

// RESET TIMER
function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    time = defaultTime;
    updateDisplay();
}

// SET CUSTOM TIME
function setCustomTime() {
    let input = document.getElementById("customTime");
    if (!input) return;

    let minutes = parseInt(input.value);

    if (!isNaN(minutes) && minutes > 0) {
        defaultTime = minutes * 60;
        time = defaultTime;
        updateDisplay();
    } else {
        alert("Enter valid minutes!");
    }
}

// UPDATE TIMER DISPLAY
function updateDisplay() {
    let timerElement = document.getElementById("timer");
    if (!timerElement) return;

    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    timerElement.innerText =
        minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

// MOTIVATIONAL + TASK MOOD FUNCTION
function selectMood(mood) {
    let suggestionElement = document.getElementById("suggestion");
    if (!suggestionElement) return;

    let suggestion = "";

    if (mood === "happy") {
        suggestion = 
        "😊 You're feeling great!\n\n" +
        "Mini Task:\n" +
        "• Write down 1 goal you want to complete today.\n" +
        "• Start it immediately after break.\n\n" +
        "Keep using this positive energy!";
    } 
    else if (mood === "neutral") {
        suggestion = 
        "😐 Feeling neutral.\n\n" +
        "Mini Task:\n" +
        "• Drink a glass of water 💧\n" +
        "• Stretch your arms for 30 seconds\n\n" +
        "Small refresh = better focus!";
    } 
    else if (mood === "sad") {
        suggestion = 
        "😔 Feeling low is okay.\n\n" +
        "Mini Task:\n" +
        "• Take 5 slow deep breaths\n" +
        "• Think of 1 small thing you're grateful for\n\n" +
        "One small step is enough today.";
    } 
    else if (mood === "stressed") {
        suggestion = 
        "😣 Feeling stressed?\n\n" +
        "Mini Task:\n" +
        "• Inhale 4 sec\n" +
        "• Hold 4 sec\n" +
        "• Exhale 4 sec\n" +
        "Repeat 3 times 🧘\n\n" +
        "You’ve got this!";
    } 
    else if (mood === "angry") {
        suggestion = 
        "😡 Feeling frustrated?\n\n" +
        "Mini Task:\n" +
        "• Close your eyes for 20 seconds\n" +
        "• Relax your shoulders\n" +
        "• Slowly count 1 to 10\n\n" +
        "Calm mind = better decisions.";
    }

    suggestionElement.innerText = suggestion;
}

// LOAD DISPLAY + STREAK SAFELY
document.addEventListener("DOMContentLoaded", function () {
    updateDisplay();

    let streakElement = document.getElementById("streakCount");
    if (streakElement) {
        streakElement.innerText = streak;
    }
});