logEvent({ chateau: "chateau2", event: "arrivee_page" });

// Codes équipes (test)
const codesEquipes = {
  "equipe1": "EQUIPE1",
  "equipe2": "EQUIPE2",
  "equipe3": "EQUIPE3"
};

const btnValider = document.getElementById("valider-code");
const inputCode = document.getElementById("code-chateau");
const message = document.getElementById("message-code");
const contenuChateau = document.getElementById("contenu-chateau");
const validationBloc = document.getElementById("validation-code");

// Toujours demander le code équipe
validationBloc.style.display = "block";
contenuChateau.style.display = "none";

btnValider.addEventListener("click", () => {
  const codeEntre = inputCode.value.trim();

  const equipeTrouvee = Object.keys(codesEquipes).find(
    (nomEquipe) => codesEquipes[nomEquipe] === codeEntre
  );

  if (equipeTrouvee) {
    // On stocke quand même l'équipe (utile pour le QCM après)
    localStorage.setItem("equipe_nom", equipeTrouvee);

    message.innerText = "Équipe reconnue : " + equipeTrouvee;
    validationBloc.style.display = "none";
    contenuChateau.style.display = "block";

    logEvent({ chateau: "chateau2", event: "equipe_identifiee", extra: { equipe: equipeTrouvee } });
  } else {
    message.innerText = "Code équipe incorrect. Essayez à nouveau.";
  }
});

document.getElementById("btn-qcm").addEventListener("click", () => {
  window.location.href = "qcm2.html";
});
