document.addEventListener("DOMContentLoaded", () => {
  const techSection = document.getElementById("technology-section");
  const homeSection = document.getElementById("home-section");
  const destinationSection = document.getElementById("destination-section");
  const crewSection = document.getElementById("crew-section");

  const techLink = document.querySelector("a[href='#technology']");
  const techName = document.getElementById("tech-name");
  const techDesc = document.getElementById("tech-desc");
  const techImg = document.getElementById("tech-img");
  const techDots = document.querySelectorAll(".tech-dot");
  const homeLink = document.getElementById("home-link");
  const destinationLink = document.getElementById("destination-link");
  const crewLink = document.getElementById("crew-link");

  homeLink?.addEventListener("click", () => {
    techSection.classList.add("hidden");
  });

  destinationLink?.addEventListener("click", () => {
    techSection.classList.add("hidden");
  });

  crewLink?.addEventListener("click", () => {
    techSection.classList.add("hidden");
  });

  let techData = [];

  techLink?.addEventListener("click", (e) => {
    e.preventDefault();

    document.body.className = "technology";

    // ascunde celelalte secțiuni
    homeSection.classList.add("hidden");
    destinationSection.classList.add("hidden");
    crewSection.classList.add("hidden");
    techSection.classList.remove("hidden");

    // încarcă datele
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => {
        techData = data.technology;
        displayTech(0);

        techDots.forEach((dot, index) => {
          dot.addEventListener("click", () => {
            displayTech(index);
            updateActiveDot(index);
          });
        });
      });
  });

  function displayTech(index) {
    const tech = techData[index];
    techName.textContent = tech.name;
    techDesc.textContent = tech.description;
    techImg.src = tech.images.portrait; 
    techImg.alt = tech.name;
  }

  function updateActiveDot(index) {
    techDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }
});
