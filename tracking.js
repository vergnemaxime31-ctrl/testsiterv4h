const SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbzrIrCZFvWbG5FmJxnxemVmhzFTZ5URv00KHrCkR1g5tMizfbWuuithK5PjbzXQYRqS/exec";

function getEquipe() {
  return localStorage.getItem("equipe_nom") || "inconnue";
}

function logEvent({ chateau, event, score = "", extra = {} }) {
  const payload = {
    equipe: getEquipe(),
    timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    chateau,
    event,
    score,
    extra
  };

  const blob = new Blob([JSON.stringify(payload)], { type: "text/plain" });
  navigator.sendBeacon(SHEET_ENDPOINT, blob);
}
