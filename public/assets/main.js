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

const tierGrid = document.querySelector(".tier-grid");
if (tierGrid) {
  const toggleRow = function (rowId) {
    document.querySelectorAll(`[data-row="${rowId}"]`).forEach(function (el) {
      el.classList.toggle("show-text");
    });
  };

  tierGrid.addEventListener("click", function (e) {
    const target = e.target.closest("[data-row]");
    if (!target) return;
    toggleRow(target.getAttribute("data-row"));
  });

  tierGrid.querySelectorAll(".row-label.togglable").forEach(function (el) {
    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "button");
  });

  tierGrid.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    const target = e.target.closest(".row-label.togglable");
    if (!target) return;
    e.preventDefault();
    toggleRow(target.getAttribute("data-row"));
  });
}
