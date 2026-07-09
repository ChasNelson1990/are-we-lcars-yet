function updateStardate() {
  const now = new Date();
  const startOfYear = Date.UTC(now.getFullYear(), 0, 1);
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const dayOfYear = Math.floor((today - startOfYear) / 86400000) + 1;
  const frac = Math.min(
    9,
    Math.floor(((now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / 86400) * 10)
  );
  const stardate = `${now.getFullYear() - 1969}${dayOfYear.toString().padStart(3, "0")}.${frac}`;
  const el = document.getElementById("stardate");
  if (el) el.textContent = "STARDATE " + stardate;
}
updateStardate();
setInterval(updateStardate, 1000);

const tierGrid = document.querySelector(".tier-grid");
if (tierGrid) {
  const toggleRow = function (rowId) {
    tierGrid.querySelectorAll(`[data-row="${rowId}"]`).forEach(function (el) {
      el.classList.toggle("show-text");
    });
    const trigger = tierGrid.querySelector(`.row-label.togglable[data-row="${rowId}"]`);
    if (trigger) {
      trigger.setAttribute("aria-expanded", trigger.classList.contains("show-text"));
    }
  };

  tierGrid.addEventListener("click", function (e) {
    const target = e.target.closest("[data-row]");
    if (!target) return;
    toggleRow(target.getAttribute("data-row"));
  });

  tierGrid.querySelectorAll(".row-label.togglable").forEach(function (el) {
    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "button");
    el.setAttribute("aria-expanded", "false");
  });

  tierGrid.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    const target = e.target.closest(".row-label.togglable");
    if (!target) return;
    e.preventDefault();
    toggleRow(target.getAttribute("data-row"));
  });
}
