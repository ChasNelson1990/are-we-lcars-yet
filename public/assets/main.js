function updateStardate() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const dayOfYear = Math.floor(diff / 86400000);
  const frac = (
    ((now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / 86400) *
    10
  ).toFixed(0);
  const stardate = `${now.getFullYear() - 1969}${dayOfYear.toString().padStart(3, "0")}.${frac}`;
  const el = document.getElementById("stardate");
  if (el) el.textContent = "STARDATE " + stardate;
}
updateStardate();
setInterval(updateStardate, 1000);

document.querySelector(".tier-grid").addEventListener("click", function (e) {
  const target = e.target.closest("[data-row]");
  if (!target) return;
  const rowId = target.getAttribute("data-row");
  document.querySelectorAll(`[data-row="${rowId}"]`).forEach(function (el) {
    el.classList.toggle("show-text");
  });
});
