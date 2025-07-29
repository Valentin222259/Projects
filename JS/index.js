document.addEventListener("DOMContentLoaded", () => {
  const destinationNav = document.getElementById("destination-link");
  const destinationSection = document.getElementById("destination-section");
  const homeNav = document.getElementById("home-link");
  const homeSection = document.getElementById("home-section");
  const exploreBtn = document.getElementById("explore-button");

  exploreBtn.addEventListener("click", (e) => {
    e.preventDefault();
    loadDestinations();
  });

  homeNav.addEventListener("click", (e) => {
    e.preventDefault();

    // Arată HOME
    homeSection.classList.remove("hidden");

    // Ascunde DESTINATION
    destinationSection.classList.add("hidden");

    // Schimbă fundalul înapoi
    document.body.className = "home";
  });

  destinationNav.addEventListener("click", (e) => {
    e.preventDefault();
    loadDestinations();
  });

  function loadDestinations() {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => {
        const destinations = data.destinations;

        // Setăm fundalul
        document.body.className = "destination";

        // Ascundem HOME și afișăm DESTINATION
        homeSection.classList.add("hidden");
        destinationSection.classList.remove("hidden");

        // Populăm tab-urile
        const tabsContainer = document.getElementById("tabs-container");
        tabsContainer.innerHTML = "";
        destinations.forEach((dest, index) => {
          const button = document.createElement("button");
          button.className = `tab ${index === 0 ? "active" : ""}`;
          button.dataset.index = index;
          button.textContent = dest.name;
          tabsContainer.appendChild(button);
        });

        // Afișăm prima planetă
        displayDestination(destinations[0]);

        // Adăugăm evenimente pe butoanele tab
        const buttons = Array.from(
          destinationSection.getElementsByClassName("tab")
        );
        buttons.forEach((btn) => {
          btn.addEventListener("click", () => {
            const idx = btn.dataset.index;
            const d = destinations[idx];

            displayDestination(d);

            buttons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
          });
        });
      });
  }

  function displayDestination(dest) {
    document.getElementById("planet-img").src = dest.images.png;
    document.getElementById("planet-img").alt = dest.name;
    document.getElementById("planet-name").textContent = dest.name;
    document.getElementById("planet-desc").textContent = dest.description;
    document.getElementById("planet-distance").textContent = dest.distance;
    document.getElementById("planet-time").textContent = dest.travel;
  }
});
