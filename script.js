// Codes de validation pour chaque château
const codesChateau = {
    chateau1: "CODE1",
    chateau2: "CODE2",
    chateau3: "CODE3"
};

// === PAGE D'ACCUEIL : validation du code QR ===
const formCode = document.getElementById("form-code");
if (formCode) { // Vérifie qu'on est sur index.html
    formCode.addEventListener("submit", function(e) {
        e.preventDefault(); // Empêche le rechargement de la page
        const codeEntré = document.getElementById("code").value.trim();
        const chateau = document.getElementById("chateau-select").value;
        const message = document.getElementById("message");

        if (codeEntré === codesChateau[chateau]) {
            // Stocke que le château est débloqué
            localStorage.setItem(chateau + "_access", "true");
            message.innerText = "Code valide ! Vous pouvez visiter le château.";
            // Redirige vers la page du château
            window.location.href = chateau + ".html";
        } else {
            message.innerText = "Code incorrect, essayez à nouveau.";
        }
    });
}

// === PAGE CHÂTEAU : vérifie l'accès et bouton "Visite terminée" ===
const currentChateau = window.location.pathname.includes("chateau1") ? "chateau1" :
                       window.location.pathname.includes("chateau2") ? "chateau2" :
                       window.location.pathname.includes("chateau3") ? "chateau3" : null;

if (currentChateau) {
    // Vérifie si l'accès a été débloqué
    if (localStorage.getItem(currentChateau + "_access") !== "true") {
        alert("Vous devez d'abord valider le code du château !");
        window.location.href = "index.html";
    }

    // Crée le bouton "Visite terminée" dynamiquement
    const finishBtn = document.createElement("button");
    finishBtn.innerText = "Visite terminée";
    finishBtn.id = "finish-visit";
    document.body.appendChild(finishBtn);

    finishBtn.addEventListener("click", function() {
        localStorage.setItem(currentChateau + "_done", "true");
        // Redirection vers le QCM correspondant
        window.location.href = "qcm" + currentChateau.slice(-1) + ".html";
    });
}

// === QCM : fonction de vérification avec accès unique ===
function verifierQCM(formId, resultatId, chateau) {
    // Empêche de refaire le QCM si score déjà enregistré
    if (localStorage.getItem(chateau + "_score")) {
        document.getElementById(resultatId).innerText = 
            "Votre score : " + localStorage.getItem(chateau + "_score") + " / 2";
        document.getElementById(formId).querySelector("button").disabled = true;
        return;
    }

    let score = 0;

    const reponsesCorrectes = {
        "form-qcm1": { "q1": "B", "q2": "A" },
        "form-qcm2": { "q1": "B", "q2": "A" },
        "form-qcm3": { "q1": "A", "q2": "B" }
    };

    const form = document.getElementById(formId);
    const reponses = reponsesCorrectes[formId];

    for (let question in reponses) {
        const radios = form.elements[question];
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked && radios[i].value === reponses[question]) {
                score++;
            }
        }
    }

    // Stocke le score dans localStorage
    localStorage.setItem(chateau + "_score", score);
    document.getElementById(resultatId).innerText = "Votre score : " + score + " / 2";
}


