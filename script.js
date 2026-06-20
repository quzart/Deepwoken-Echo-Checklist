document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll('#echoChecklist input[type="checkbox"]');

    function updateEchoes() {
        let total = 0;

        checkboxes.forEach(box => {
            const id = box.dataset.id;

            if (box.checked) {
                total += Number(box.dataset.echo);
            }

            localStorage.setItem("echo_" + id, box.checked);
        });

        document.getElementById('echoTotal').textContent = total;

        const maxEchoes = 140;
        let percent = (total / maxEchoes) * 100;
        if (percent > 100) percent = 100;

        document.getElementById('progressFill').style.width = percent + "%";

        let rank = "";

        if (total >= 140) rank = "S";
        else if (total >= 112) rank = "A";
        else if (total >= 87) rank = "B";
        else if (total >= 60) rank = "C";
        else if (total >= 30) rank = "D";
        else rank = "E";

        document.getElementById('echoRank').textContent = rank;

        let nextText = "";

        if (total >= 140) {
            nextText = "Max Rank Reached";
        } else if (total < 30) {
            nextText = (30 - total) + " Echoes until D Rank";
        } else if (total < 60) {
            nextText = (60 - total) + " Echoes until C Rank";
        } else if (total < 87) {
            nextText = (87 - total) + " Echoes until B Rank";
        } else if (total < 112) {
            nextText = (112 - total) + " Echoes until A Rank";
        } else {
            nextText = (140 - total) + " Echoes until S Rank";
        }

        document.getElementById("nextRankText").textContent = nextText;
    }

    checkboxes.forEach(box => {
        const id = box.dataset.id;

        const saved = localStorage.getItem("echo_" + id);
        if (saved === "true") {
            box.checked = true;
        }

        box.addEventListener("change", updateEchoes);
    });

    document.getElementById("clearBtn").addEventListener("click", () => {
        checkboxes.forEach(box => {
            const id = box.dataset.id;

            box.checked = false;
            localStorage.removeItem("echo_" + id);
        });

        updateEchoes();
    });

    updateEchoes();
});