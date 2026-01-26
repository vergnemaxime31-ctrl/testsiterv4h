const btnValiderQCM = document.getElementById("valider-qcm");
const formQCM = document.getElementById("form-qcm3");
const resultat = document.getElementById("resultat");

// Empêche de refaire le QCM
if (localStorage.getItem("chateau3_score")) {
  resultat.innerText = "Votre score : " + localStorage.getItem("chateau3_score") + " / 3";
  btnValiderQCM.disabled = true;
}

btnValiderQCM.addEventListener("click", () => {
  if (localStorage.getItem("chateau3_score")) return;

  let score = 0;
  const reponsesCorrectes = { q1: "A", q2: "B", q3: "A" };

  for (let question in reponsesCorrectes) {
    const radios = formQCM.elements[question];
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked && radios[i].value === reponsesCorrectes[question]) {
        score++;
      }
    }
  }

  localStorage.setItem("chateau3_score", score);

  // Log score vers Google Sheet
  logEvent({ chateau: "chateau3", event: "qcm_valide", score });

  alert("Votre score : " + score + " / 3\nRetour à l'accueil.");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 300);
});

// Reset pour tests
const resetBtn = document.getElementById("reset-test");
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    localStorage.removeItem("chateau3_score");
    resultat.innerText = "";
    btnValiderQCM.disabled = false;
    alert("Reset OK : tu peux refaire le QCM 3.");
  });
}
