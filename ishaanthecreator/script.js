/* ─────────────────────────────────────────────────────────
   script.js — Landing page interactions
   ───────────────────────────────────────────────────────── */

/* ── start-btn ──────────────────────────────────────────────
   The centered "go" button.
   Navigates to the main stock analyzer app. */
document.getElementById("start-btn").addEventListener("click", function () {
  window.location.href = "../test-locally.html";
});

/* ── creator-btn ────────────────────────────────────────────
   The top-right "github" link.
   Opens the GitHub repository in a new tab. */
document.getElementById("creator-btn").addEventListener("click", function () {
  window.open("https://github.com/ishaanmukeshpatil-ui/indian-stock-analyzer", "_blank");
});
