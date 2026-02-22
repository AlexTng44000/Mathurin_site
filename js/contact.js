const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

function setError(name, msg) {
    const el = document.querySelector(`[data-error-for="${name}"]`);
    if (el) el.textContent = msg || "";
}

function isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim());
}

async function fakeSend(data) {
    // Ici on mettra EmailJS ou Formspree.
    // Pour l’instant, on simule 700 ms.
    await new Promise(r => setTimeout(r, 700));
    return { ok: true };
}

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = new FormData(form);
        const name = (data.get("name") || "").toString().trim();
        const email = (data.get("email") || "").toString().trim();
        const message = (data.get("message") || "").toString().trim();

        setError("name", "");
        setError("email", "");
        setError("message", "");
        if (statusEl) statusEl.textContent = "";

        let ok = true;
        if (name.length < 2) { setError("name", "Indique ton nom."); ok = false; }
        if (!isEmail(email)) { setError("email", "Email invalide."); ok = false; }
        if (message.length < 10) { setError("message", "Message trop court."); ok = false; }

        if (!ok) return;

        if (statusEl) statusEl.textContent = "Envoi en cours...";
        try {
            const res = await fakeSend(Object.fromEntries(data.entries()));
            if (!res.ok) throw new Error("send_failed");
            window.location.href = "./merci.html";
        } catch (err) {
            if (statusEl) statusEl.textContent = "Erreur d’envoi. Réessaie.";
        }
    });
}

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();