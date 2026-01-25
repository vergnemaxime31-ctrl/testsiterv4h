// On capture l'heure d'arrivée AU CHARGEMENT (scan QR) mais on n'envoie rien encore
const heureArrivee = new Date().toLocaleTimeString("fr-FR", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

// Codes équipes (test)
const codesEquipes = {
  equipe1: "EQUIPE1",
  equipe2: "EQUIPE2",
  equipe3: "EQUIPE3",
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
    // On stocke l'équipe pour le QCM juste après
    localStorage.setItem("equipe_nom", equipeTrouvee);

    // ✅ Log "arrivée scan" AVEC l'équipe + l'heure du scan (capturée au chargement)
    logEvent({
      chateau: "chateau1",
      event: "arrivee_scan_qr",
      extra: { heure_arrivee: heureArrivee },
    });

    // (Optionnel) si tu ne veux pas de ligne en plus, on peut supprimer ce log
    // logEvent({ chateau: "chateau1", event: "equipe_identifiee" });

    message.innerText = "Équipe reconnue : " + equipeTrouvee;
    validationBloc.style.display = "none";
    contenuChateau.style.display = "block";
  } else {
    message.innerText = "Code équipe incorrect. Essayez à nouveau.";
  }
});

// Bouton QCM
document.getElementById("btn-qcm").addEventListener("click", () => {
  window.location.href = "qcm1.html";
});

