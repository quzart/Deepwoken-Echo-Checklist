function updateEchoes() {
    let total = 0;

    const checkboxes = document.querySelectorAll('#echoChecklist input[type="checkbox"]');

    checkboxes.forEach((box, index) => {
        if (box.checked) {
            total += Number(box.dataset.echo);
        }
        localStorage.setItem("echoBox_" + index, box.checked);
    });

    document.getElementById('echoTotal').textContent = total;

    const maxEchoes = 140;
    let percent = (total / maxEchoes) * 100;
    if (percent > 100) percent = 100;

    document.getElementById('progressFill').style.width = percent + "%";

    let rank = "";

    if (total >= 140) {
        rank = "S";
    } else if (total >= 112) {
        rank = "A";
    } else if (total >= 87) {
        rank = "B";
    } else if (total >= 60) {
        rank = "C";
    } else if (total >= 30) {
        rank = "D";
    } else {
        rank = "E";
    }

    document.getElementById('echoRank').textContent = rank;
}

document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll('#echoChecklist input[type="checkbox"]');

    checkboxes.forEach((box, index) => {
        const saved = localStorage.getItem("echoBox_" + index);

        if (saved === "true") {
            box.checked = true;
        }

        box.addEventListener('change', updateEchoes);
    });

    document.getElementById('clearBtn').addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('#echoChecklist input[type="checkbox"]');

        checkboxes.forEach((box, index) => {
            box.checked = false;
            localStorage.removeItem("echoBox_" + index);
        });

        updateEchoes();
    });

    updateEchoes();
});