document.addEventListener("DOMContentLoaded", () => {
  const crewNav = document.querySelector("a[href='#crew']");
  const crewSection = document.getElementById("crew-section");
  const homeSection = document.getElementById("home-section");
  const destinationSection = document.getElementById("destination-section");

  const role = document.getElementById("crew-role");
  const name = document.getElementById("crew-name");
  const bio = document.getElementById("crew-bio");
  const image = document.getElementById("crew-img");
  const navDotsContainer = document.getElementById("crew-nav-dots");
  const homeNav = document.querySelector("a[href='#']");
const destinationNav = document.querySelector("a[href='#destination']");

// La click pe HOME
homeNav?.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.className = "home";

  homeSection.classList.remove("hidden");
  destinationSection.classList.add("hidden");
  crewSection.classList.add("hidden");
});

// La click pe DESTINATION
destinationNav?.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.className = "destination";

  homeSection.classList.add("hidden");
  destinationSection.classList.remove("hidden");
  crewSection.classList.add("hidden");
});


  let crewData = [];

  crewNav?.addEventListener("click", (e) => {
    e.preventDefault();

    // Schimbă fundalul
    document.body.className = "crew";

    // Ascunde celelalte secțiuni
    homeSection.classList.add("hidden");
    destinationSection.classList.add("hidden");
    crewSection.classList.remove("hidden");

    // Încarcă și afișează echipajul
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => {
        crewData = data.crew;
        displayCrewMember(0);
        renderNavDots(crewData.length);
      });
  });

  function displayCrewMember(index) {
    const member = crewData[index];
    role.textContent = member.role.toUpperCase();
    name.textContent = member.name;
    bio.textContent = member.bio;
    image.src = member.images.png;
    image.alt = member.name;

    // Actualizează cerculețele active
    const dots = navDotsContainer.querySelectorAll(".crew-dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function renderNavDots(length) {
    navDotsContainer.innerHTML = "";

    for (let i = 0; i < length; i++) {
      const dot = document.createElement("div");
      dot.classList.add("crew-dot");
      if (i === 0) dot.classList.add("active");

      dot.addEventListener("click", () => {
        displayCrewMember(i);
      });

      navDotsContainer.appendChild(dot);
    }
  }
});
