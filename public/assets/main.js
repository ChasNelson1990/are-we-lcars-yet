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
setInterval(updateStardate, 60000);

document.querySelectorAll(".rail-btn[data-target]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const target = document.getElementById(btn.getAttribute("data-target"));
    if (target) target.scrollIntoView({ inline: "center", block: "nearest" });
  });
});

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
    const eventTarget = e.target instanceof Element ? e.target : e.target.parentElement;
    const target = eventTarget && eventTarget.closest("[data-row]");
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
    const eventTarget = e.target instanceof Element ? e.target : e.target.parentElement;
    const target = eventTarget && eventTarget.closest(".row-label.togglable");
    if (!target) return;
    e.preventDefault();
    toggleRow(target.getAttribute("data-row"));
  });
}

let scrollCarouselToTier = null;

const tierCarousel = document.getElementById("tier-carousel");
if (tierGrid && tierCarousel) {
  const STATUS_PILLS = {
    yes: ["pill-yes", "YES"],
    warn: ["pill-warn", "CAVEAT"],
    bad: ["pill-bad", "NO"],
    na: ["pill-na", "N/A"],
  };

  const cellToValueNode = function (cell) {
    const value = document.createElement("div");
    if (cell.classList.contains("status")) {
      value.className = "carousel-value";
      const statusKey = ["yes", "warn", "bad", "na"].find(function (key) {
        return cell.classList.contains(key);
      });
      const pillInfo = STATUS_PILLS[statusKey] || STATUS_PILLS.na;
      const pill = document.createElement("span");
      pill.className = "pill " + pillInfo[0];
      pill.textContent = pillInfo[1];
      const txt = cell.querySelector(".txt");
      value.appendChild(pill);
      value.appendChild(document.createTextNode(" " + (txt ? txt.textContent.trim() : "")));
    } else {
      value.className = "carousel-value" + (cell.classList.contains("mono") ? " mono" : "");
      value.innerHTML = cell.innerHTML.trim();
    }
    return value;
  };

  const buildCarousel = function () {
    const children = Array.from(tierGrid.children);
    const tierIds = [];
    const cards = [];
    let i = 0;

    while (i < children.length) {
      const child = children[i];

      if (child.classList.contains("col-head")) {
        const header = child.cloneNode(true);
        header.removeAttribute("id");

        const card = document.createElement("div");
        card.className = "carousel-card";
        card.setAttribute("data-tier", child.id);
        card.setAttribute("role", "group");
        const eraEl = child.querySelector(".tier-era");
        const planEl = child.querySelector(".tier-plan");
        card.setAttribute(
          "aria-label",
          [planEl, eraEl]
            .filter(Boolean)
            .map(function (el) {
              return el.textContent.trim();
            })
            .join(", ")
        );

        const body = document.createElement("div");
        body.className = "carousel-card-body";

        card.appendChild(header);
        card.appendChild(body);
        tierIds.push(child.id);
        cards.push(card);
        i += 1;
        continue;
      }

      if (child.classList.contains("group-head")) {
        const tagEl = child.querySelector(".tag");
        const tagText = tagEl ? tagEl.textContent.trim() : "";
        cards.forEach(function (card) {
          const body = card.querySelector(".carousel-card-body");
          const groupEl = document.createElement("div");
          groupEl.className = "carousel-group";
          groupEl.textContent = tagText;
          body.appendChild(groupEl);
        });
        i += 1;
        continue;
      }

      if (child.classList.contains("footnote-row")) {
        const footnote = document.getElementById("carousel-footnote");
        if (footnote) footnote.innerHTML = child.innerHTML;
        i += 1;
        continue;
      }

      if (child.classList.contains("row-label")) {
        const labelText = child.textContent.trim();
        const rowCells = children.slice(i + 1, i + 1 + cards.length);
        rowCells.forEach(function (cell, index) {
          const body = cards[index].querySelector(".carousel-card-body");
          const field = document.createElement("div");
          field.className = "carousel-field";
          const fieldLabel = document.createElement("div");
          fieldLabel.className = "field-label";
          fieldLabel.textContent = labelText;
          field.appendChild(fieldLabel);
          field.appendChild(cellToValueNode(cell));
          body.appendChild(field);
        });
        i += 1 + cards.length;
        continue;
      }

      i += 1;
    }

    const track = document.getElementById("carousel-track");
    cards.forEach(function (card) {
      track.appendChild(card);
    });

    return { tierIds: tierIds, cards: cards };
  };

  const built = buildCarousel();
  window.__tierCarouselCards = built.cards;
  window.__tierCarouselTierIds = built.tierIds;
}
