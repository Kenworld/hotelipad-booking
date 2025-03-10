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
  const formattedValue = parseInt(priceRange.value).toLocaleString(); // Adds comma
  priceDisplay.textContent = "GHS " + formattedValue + ".00";
});

// Initialize Swiper for property gallery
const propertyGallery = new Swiper(".property-gallery", {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Sticky booking card behavior
const bookingCard = document.querySelector(".booking-card");
if (bookingCard) {
  window.addEventListener("scroll", () => {
    if (window.innerWidth > 768) {
      const headerHeight = 80;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > headerHeight) {
        bookingCard.style.position = "fixed";
        bookingCard.style.top = "20px";
        bookingCard.style.width = bookingCard.parentElement.offsetWidth + "px";
      } else {
        bookingCard.style.position = "static";
        bookingCard.style.width = "100%";
      }
    }
  });
}

// Handle date selection
const checkInDate = document.querySelector('input[type="date"]:first-of-type');
const checkOutDate = document.querySelector('input[type="date"]:last-of-type');

if (checkInDate && checkOutDate) {
  // Set minimum date as today
  const today = new Date().toISOString().split("T")[0];
  checkInDate.min = today;

  checkInDate.addEventListener("change", (e) => {
    // Set minimum check-out date as check-in date
    checkOutDate.min = e.target.value;

    // If check-out date is before check-in date, reset it
    if (checkOutDate.value && checkOutDate.value < e.target.value) {
      checkOutDate.value = e.target.value;
    }
  });
}

// Mobile booking card interaction
const bookingCardMobile = document.querySelector(".booking-card");
if (bookingCardMobile && window.innerWidth <= 768) {
  let startY;
  let currentY;
  let initialTransform;

  bookingCardMobile.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY;
    initialTransform = bookingCardMobile.style.transform;
    bookingCardMobile.style.transition = "none";
  });

  bookingCardMobile.addEventListener("touchmove", (e) => {
    currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;

    // Limit the drag to only collapse and expand
    const newTransform = Math.min(
      85,
      Math.max(0, (deltaY / bookingCardMobile.offsetHeight) * 100)
    );
    bookingCardMobile.style.transform = `translateY(${newTransform}%)`;
  });

  bookingCardMobile.addEventListener("touchend", () => {
    bookingCardMobile.style.transition = "transform 0.3s ease";

    // If dragged more than 40% of its height, collapse it
    const currentTransform = parseFloat(
      bookingCardMobile.style.transform.replace("translateY(", "")
    );
    if (currentTransform > 40) {
      bookingCardMobile.style.transform = "translateY(85%)";
      bookingCardMobile.classList.remove("expanded");
    } else {
      bookingCardMobile.style.transform = "translateY(0%)";
      bookingCardMobile.classList.add("expanded");
    }
  });

  // Toggle on click of the handle area
  bookingCardMobile.addEventListener("click", (e) => {
    // Only toggle if clicking the handle area (top 40px)
    if (e.clientY - bookingCardMobile.getBoundingClientRect().top < 40) {
      bookingCardMobile.classList.toggle("expanded");
      bookingCardMobile.style.transform = bookingCardMobile.classList.contains(
        "expanded"
      )
        ? "translateY(0%)"
        : "translateY(85%)";
    }
  });
}
