
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const search = document.querySelector("#search");
const cards = [...document.querySelectorAll(".card")];
const buttons = [...document.querySelectorAll("[data-filter]")];
const status = document.querySelector("#status");

let activeFilter = "all";

function updateCards() {
  const query = (search?.value || "").trim().toLowerCase();
  let count = 0;

  cards.forEach(card => {
    const title = (card.dataset.title || "").toLowerCase();
    const type = (card.dataset.type || "").toLowerCase();
    const genres = (card.dataset.genres || "").toLowerCase();

    const matchesText =
      !query || `${title} ${type} ${genres}`.includes(query);

    const matchesFilter =
      activeFilter === "all" ||
      type === activeFilter ||
      genres.split(" ").includes(activeFilter);

    const visible = matchesText && matchesFilter;
    card.hidden = !visible;

    if (visible) count++;
  });

  if (status) {
    status.textContent = count
      ? `${count} work${count === 1 ? "" : "s"} found.`
      : "No matches yet. Try another search.";
  }
}

search?.addEventListener("input", updateCards);

buttons.forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter || "all";

    buttons.forEach(item => {
      item.classList.toggle("active", item === button);
    });

    updateCards();
  });
});
