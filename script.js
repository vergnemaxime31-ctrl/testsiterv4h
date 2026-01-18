function verifierQCM(formId, resultatId) {
    let score = 0;

    // Réponses correctes par château
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

    document.getElementById(resultatId).innerText = "Votre score : " + score + " / 2";
}

