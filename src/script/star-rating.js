export function initStarRating(selector = ".star-rating") {
  const ratingContainers = document.querySelectorAll(selector);

  ratingContainers.forEach(container => {
    const stars = container.querySelectorAll(".star");
    const input = container.querySelector("input[name='rating']");
    let currentRating = parseInt(container.dataset.rating || "0");

    const updateStars = (activeIndex) => {
      stars.forEach((s, i) => {
        s.classList.toggle("selected", i < activeIndex);
      });
    };

    updateStars(currentRating);

    stars.forEach((star, index) => {
      star.addEventListener("mouseenter", () => updateStars(index + 1));
      star.addEventListener("mouseleave", () => updateStars(currentRating));
      star.addEventListener("click", () => {
        currentRating = index + 1;
        container.dataset.rating = currentRating;
        input.value = currentRating;
        console.log("Valor seleccionado:", currentRating);
      });
    });
  });
}
