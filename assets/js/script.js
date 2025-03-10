document.addEventListener("DOMContentLoaded", function () {
  const thumbnails = document.querySelectorAll(".thumbnail");
  const mainImage = document.getElementById("mainImage");

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      // Remove active class from all thumbnails
      thumbnails.forEach((t) => t.classList.remove("active"));
      // Add active class to the clicked thumbnail
      this.classList.add("active");
      // Change the main image
      mainImage.src = this.getAttribute("data-image");
      mainImage.setAttribute("data-lightbox", "hotel"); // Ensure Lightbox works with new image
    });
  });

  // Initialize Lightbox
  lightbox.option({
    resizeDuration: 200,
    wrapAround: true,
  });
});

const priceRange = document.getElementById("priceRange");
const priceDisplay = document.getElementById("priceDisplay");
// Update the displayed value when the range input changes
priceRange.addEventListener("input", function () {
  priceDisplay.textContent = "GHS " + priceRange.value;
});
