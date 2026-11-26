const sectionNav = document.querySelector("[data-section-nav]");

if (sectionNav) {
  const links = [...sectionNav.querySelectorAll('a[href^="#"]')];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const setActiveLink = (section) => {
    links.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${section.id}`;
      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const updateActiveLink = () => {
    const readingLine = window.innerHeight * 0.35;
    const activeSection = sections.reduce(
      (current, section) => section.getBoundingClientRect().top <= readingLine ? section : current,
      sections[0],
    );

    setActiveLink(activeSection);
  };

  let frameId;
  window.addEventListener(
    "scroll",
    () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateActiveLink);
    },
    { passive: true },
  );

  window.addEventListener("resize", updateActiveLink);
  updateActiveLink();

  window.addEventListener("load", () => {
    const initialSection = document.getElementById(window.location.hash.slice(1));
    if (initialSection) {
      document.documentElement.style.scrollBehavior = "auto";
      initialSection.scrollIntoView({ block: "start" });
      document.documentElement.style.scrollBehavior = "";
    }
  });

  const homeLink = sectionNav.querySelector('a[href="#hero"]');
  homeLink?.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  });
}
