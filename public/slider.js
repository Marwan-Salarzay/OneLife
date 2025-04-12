// Enhanced Slider functionality
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider")
  const slides = document.querySelectorAll(".slide")
  const prevBtn = document.querySelector(".slider-prev")
  const nextBtn = document.querySelector(".slider-next")
  const dotsContainer = document.querySelector(".slider-dots")

  // Exit if slider elements don't exist
  if (!slider || !slides.length || !prevBtn || !nextBtn || !dotsContainer) {
    console.warn("Slider elements not found")
    return
  }

  let currentSlide = 0
  let isAnimating = false
  const animationDuration = 600 // Match this with CSS transition duration
  let autoSlideInterval
  let progressBar

  // Initialize slider
  function initSlider() {
    // Create dots
    dotsContainer.innerHTML = "" // Clear any existing dots
    slides.forEach((_, index) => {
      const dot = document.createElement("span")
      dot.classList.add("slider-dot")
      if (index === 0) dot.classList.add("active")
      dot.addEventListener("click", () => {
        if (currentSlide !== index && !isAnimating) {
          goToSlide(index)
        }
      })
      dotsContainer.appendChild(dot)
    })

    // Create progress bar for auto-slide
    const progressContainer = document.createElement("div")
    progressContainer.classList.add("slider-progress")
    progressBar = document.createElement("div")
    progressBar.classList.add("slider-progress-bar")
    progressContainer.appendChild(progressBar)
    slider.parentNode.appendChild(progressContainer)

    // Set initial slide states
    updateSlideClasses()

    // Add event listeners
    prevBtn.addEventListener("click", prevSlide)
    nextBtn.addEventListener("click", nextSlide)

    // Add keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") prevSlide()
      if (e.key === "ArrowRight") nextSlide()
    })

    // Add touch/swipe support
    let touchStartX = 0
    let touchEndX = 0

    slider.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX
        pauseAutoSlide()
      },
      { passive: true },
    )

    slider.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX
        handleSwipe()
        startAutoSlide()
      },
      { passive: true },
    )

    function handleSwipe() {
      const swipeThreshold = 50
      if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide()
      } else if (touchEndX > touchStartX + swipeThreshold) {
        prevSlide()
      }
    }

    // Start auto-slide
    startAutoSlide()

    // Pause auto-slide on hover
    slider.addEventListener("mouseenter", pauseAutoSlide)
    slider.addEventListener("mouseleave", startAutoSlide)

    // Pause auto-slide when page is not visible
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        pauseAutoSlide()
      } else {
        startAutoSlide()
      }
    })

    // Pause auto-slide when user interacts with controls
    prevBtn.addEventListener("mouseenter", pauseAutoSlide)
    nextBtn.addEventListener("mouseenter", pauseAutoSlide)
    dotsContainer.addEventListener("mouseenter", pauseAutoSlide)

    prevBtn.addEventListener("mouseleave", startAutoSlide)
    nextBtn.addEventListener("mouseleave", startAutoSlide)
    dotsContainer.addEventListener("mouseleave", startAutoSlide)
  }

  // Update slide classes for proper animation
  function updateSlideClasses() {
    slides.forEach((slide, index) => {
      // Remove all classes first
      slide.classList.remove("active", "previous", "next")

      // Add appropriate class based on position
      if (index === currentSlide) {
        slide.classList.add("active")
      } else if (index === getPreviousIndex()) {
        slide.classList.add("previous")
      } else if (index === getNextIndex()) {
        slide.classList.add("next")
      }
    })

    // Update dots
    const dots = dotsContainer.querySelectorAll(".slider-dot")
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide)
    })
  }

  // Get previous slide index
  function getPreviousIndex() {
    return (currentSlide - 1 + slides.length) % slides.length
  }

  // Get next slide index
  function getNextIndex() {
    return (currentSlide + 1) % slides.length
  }

  // Go to specific slide
  function goToSlide(index) {
    if (isAnimating || index === currentSlide) return
    isAnimating = true

    // Update current slide
    currentSlide = index

    // Update slide classes
    updateSlideClasses()

    // Reset animation flag after transition completes
    setTimeout(() => {
      isAnimating = false
    }, animationDuration)

    // Reset and restart progress bar
    resetProgressBar()
  }

  // Go to next slide
  function nextSlide() {
    goToSlide(getNextIndex())
  }

  // Go to previous slide
  function prevSlide() {
    goToSlide(getPreviousIndex())
  }

  // Start auto-slide
  function startAutoSlide() {
    pauseAutoSlide()
    autoSlideInterval = setInterval(nextSlide, 5000)
    animateProgressBar()
  }

  // Pause auto-slide
  function pauseAutoSlide() {
    clearInterval(autoSlideInterval)
    resetProgressBar()
  }

  // Animate progress bar
  function animateProgressBar() {
    if (!progressBar) return

    progressBar.classList.remove("animating")
    // Force reflow
    void progressBar.offsetWidth
    progressBar.classList.add("animating")
  }

  // Reset progress bar
  function resetProgressBar() {
    if (!progressBar) return

    progressBar.classList.remove("animating")
  }

  // Handle window resize
  window.addEventListener("resize", () => {
    // No need to reposition slides as we're using CSS classes now
  })

  // Handle visibility change
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      pauseAutoSlide()
    } else {
      startAutoSlide()
    }
  })

  // Initialize the slider
  initSlider()
})
