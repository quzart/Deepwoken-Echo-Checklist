function updateEchoes() {
    let total = 0;

    document.querySelectorAll('#echoChecklist input[type="checkbox"]').forEach(box => {
        if (box.checked) {
            total += Number(box.dataset.echo);
        }
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
    document.body.classList.add("dark");

    const checkboxes = document.querySelectorAll('#echoChecklist input[type="checkbox"]');

    checkboxes.forEach(box => {
        box.addEventListener('change', updateEchoes);
    });

    document.getElementById('clearBtn').addEventListener('click', () => {
        checkboxes.forEach(box => {
            box.checked = false;
        });

        updateEchoes();
    });

    updateEchoes();
});