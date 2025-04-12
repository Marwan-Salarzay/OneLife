// Home Page JavaScript with enhanced functionality

document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate on Scroll) if available
  if (typeof AOS !== "undefined") {
      AOS.init({
          duration: 800,
          easing: "ease-out",
          once: true,
          offset: 100,
          disable: window.innerWidth < 768 ? true : false // Disable on mobile for better performance
      });
  }

  // Testimonial Slider with enhanced animations
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".testimonial-controls .prev-btn");
  const nextBtn = document.querySelector(".testimonial-controls .next-btn");
  let currentSlide = 0;
  let isAnimating = false;
  let autoSlideInterval;

  function showSlide(index, direction = "right") {
      if (isAnimating) return;
      isAnimating = true;

      // Remove active class from all slides and dots
      testimonialSlides.forEach((slide) => {
          slide.classList.remove("active", "prev", "next");
      });
      
      dots.forEach((dot) => {
          dot.classList.remove("active");
      });

      // Add appropriate classes for animation
      if (direction === "right") {
          testimonialSlides[currentSlide].classList.add("prev");
      } else {
          testimonialSlides[currentSlide].classList.add("next");
      }
      
      // Force browser reflow to ensure animations work properly
      void testimonialSlides[index].offsetWidth;
      
      // Add active class to current slide
      testimonialSlides[index].classList.add("active");
      dots[index].classList.add("active");

      // Reset animation state after transition completes
      setTimeout(() => {
          testimonialSlides[currentSlide].classList.remove("prev", "next");
          currentSlide = index;
          isAnimating = false;
      }, 500); // Match this with CSS transition duration
  }

  // Next slide with enhanced animation
  function nextSlide() {
      const nextIndex = (currentSlide + 1) % testimonialSlides.length;
      showSlide(nextIndex, "right");
  }

  // Previous slide with enhanced animation
  function prevSlide() {
      const prevIndex = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
      showSlide(prevIndex, "left");
  }

  // Event listeners for controls with enhanced effects
  if (nextBtn) {
      nextBtn.addEventListener("click", function (e) {
          e.preventDefault();
          clearInterval(autoSlideInterval);
          nextSlide();

          // Add click animation with requestAnimationFrame for smoother animation
          requestAnimationFrame(() => {
              this.style.transform = "scale(0.95)";
              setTimeout(() => {
                  requestAnimationFrame(() => {
                      this.style.transform = "";
                  });
              }, 200);
          });
          
          // Restart auto slide
          autoSlideInterval = setInterval(nextSlide, 5000);
      });
  }

  if (prevBtn) {
      prevBtn.addEventListener("click", function (e) {
          e.preventDefault();
          clearInterval(autoSlideInterval);
          prevSlide();

          // Add click animation with requestAnimationFrame for smoother animation
          requestAnimationFrame(() => {
              this.style.transform = "scale(0.95)";
              setTimeout(() => {
                  requestAnimationFrame(() => {
                      this.style.transform = "";
                  });
              }, 200);
          });
          
          // Restart auto slide
          autoSlideInterval = setInterval(nextSlide, 5000);
      });
  }

  // Event listeners for dots with enhanced effects
  dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
          if (currentSlide === index || isAnimating) return;
          
          clearInterval(autoSlideInterval);
          const direction = index > currentSlide ? "right" : "left";
          showSlide(index, direction);

          // Add click animation with requestAnimationFrame for smoother animation
          requestAnimationFrame(() => {
              dot.style.transform = "scale(1.3)";
              setTimeout(() => {
                  requestAnimationFrame(() => {
                      dot.style.transform = "";
                  });
              }, 200);
          });
          
          // Restart auto slide
          autoSlideInterval = setInterval(nextSlide, 5000);
      });

      // Add hover animation
      dot.addEventListener("mouseenter", () => {
          if (!dot.classList.contains("active")) {
              requestAnimationFrame(() => {
                  dot.style.transform = "scale(1.2)";
              });
          }
      });

      dot.addEventListener("mouseleave", () => {
          if (!dot.classList.contains("active")) {
              requestAnimationFrame(() => {
                  dot.style.transform = "";
              });
          }
      });
  });

  // Auto slide every 5 seconds with smooth transitions
  autoSlideInterval = setInterval(nextSlide, 5000);

  // Pause auto slide on hover
  const testimonialSlider = document.querySelector(".testimonial-slider");
  if (testimonialSlider) {
      testimonialSlider.addEventListener("mouseenter", () => {
          clearInterval(autoSlideInterval);
      });

      testimonialSlider.addEventListener("mouseleave", () => {
          autoSlideInterval = setInterval(nextSlide, 5000);
      });
  }

  // Parallax Effect for About Section with enhanced smoothness
  const parallaxSection = document.querySelector(".parallax");

  if (parallaxSection) {
      // Use passive event listener for better scroll performance
      window.addEventListener("scroll", () => {
          // Only calculate parallax if the section is in view
          const rect = parallaxSection.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
              const scrollPosition = window.pageYOffset;
              const sectionTop = parallaxSection.offsetTop;
              const yPos = -(scrollPosition - sectionTop) / 5;

              // Use requestAnimationFrame for smoother animation
              requestAnimationFrame(() => {
                  parallaxSection.style.backgroundPosition = `center ${yPos}px`;
              });
          }
      }, { passive: true }); // Passive event for better performance
  }

  // Enhanced Product Card Hover Effects with hardware acceleration
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
          requestAnimationFrame(() => {
              this.style.transform = "translateY(-15px)";
              this.style.boxShadow = "0 20px 30px rgba(0, 0, 0, 0.1)";

              const image = this.querySelector(".product-image img");
              if (image) {
                  image.style.transform = "scale(1.1)";
              }

              const title = this.querySelector("h3");
              if (title) {
                  title.style.color = "var(--primary-color)";
              }
          });
      });

      card.addEventListener("mouseleave", function () {
          requestAnimationFrame(() => {
              this.style.transform = "";
              this.style.boxShadow = "";

              const image = this.querySelector(".product-image img");
              if (image) {
                  image.style.transform = "";
              }

              const title = this.querySelector("h3");
              if (title) {
                  title.style.color = "";
              }
          });
      });
  });

  // Newsletter Form Animation with improved transitions
  const newsletterForm = document.getElementById("newsletter-form");
  const newsletterMessage = document.getElementById("newsletter-message");

  if (newsletterForm && newsletterMessage) {
      newsletterForm.addEventListener("submit", function (e) {
          e.preventDefault();
          const email = this.querySelector('input[type="email"]').value;

          // Simple validation
          if (email && email.includes("@") && email.includes(".")) {
              // Success animation with requestAnimationFrame
              requestAnimationFrame(() => {
                  const button = this.querySelector("button");
                  button.innerHTML = '<i class="fas fa-check"></i>';
                  button.style.backgroundColor = "var(--secondary-color)";
                  button.style.width = "50px";

                  newsletterMessage.textContent = "Thank you for subscribing!";
                  newsletterMessage.style.color = "#2ec4b6";
                  newsletterMessage.classList.add("show");

                  // Reset form with animation
                  setTimeout(() => {
                      this.reset();
                      requestAnimationFrame(() => {
                          button.innerHTML = "Subscribe";
                          button.style.backgroundColor = "";
                          button.style.width = "";

                          // Hide message with animation
                          setTimeout(() => {
                              newsletterMessage.classList.remove("show");
                          }, 3000);
                      });
                  }, 2000);
              });
          } else {
              // Error animation with requestAnimationFrame
              requestAnimationFrame(() => {
                  const input = this.querySelector("input");
                  input.style.borderColor = "#ff4d4d";
                  input.style.animation = "shake 0.5s";

                  newsletterMessage.textContent = "Please enter a valid email address.";
                  newsletterMessage.style.color = "#ff4d4d";
                  newsletterMessage.classList.add("show");

                  // Reset animation
                  setTimeout(() => {
                      requestAnimationFrame(() => {
                          input.style.borderColor = "";
                          input.style.animation = "";
                      });
                  }, 500);
              });
          }
      });
  }

  // Add shake animation for form validation
  if (!document.getElementById("shake-animation")) {
      const shakeStyle = document.createElement("style");
      shakeStyle.id = "shake-animation";
      shakeStyle.textContent = `
          @keyframes shake {
              0%, 100% { transform: translateX(0); }
              10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
              20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
      `;
      document.head.appendChild(shakeStyle);
  }

  // Hero Section Video Background Enhancement
  const heroVideo = document.querySelector(".hero-video");
  if (heroVideo) {
      // Make sure video is playing
      heroVideo.play().catch((error) => {
          console.log("Auto-play was prevented:", error);

          // Create a play button as fallback
          const playButton = document.createElement("button");
          playButton.className = "video-play-btn";
          playButton.innerHTML = '<i class="fas fa-play"></i>';
          playButton.style.position = "absolute";
          playButton.style.top = "50%";
          playButton.style.left = "50%";
          playButton.style.transform = "translate(-50%, -50%)";
          playButton.style.zIndex = "10";
          playButton.style.backgroundColor = "rgba(53, 178, 255, 0.8)";
          playButton.style.color = "white";
          playButton.style.border = "none";
          playButton.style.borderRadius = "50%";
          playButton.style.width = "80px";
          playButton.style.height = "80px";
          playButton.style.fontSize = "2rem";
          playButton.style.cursor = "pointer";
          playButton.style.transition = "all 0.3s ease";

          playButton.addEventListener("mouseenter", () => {
              requestAnimationFrame(() => {
                  playButton.style.backgroundColor = "rgba(53, 178, 255, 1)";
                  playButton.style.transform = "translate(-50%, -50%) scale(1.1)";
              });
          });

          playButton.addEventListener("mouseleave", () => {
              requestAnimationFrame(() => {
                  playButton.style.backgroundColor = "rgba(53, 178, 255, 0.8)";
                  playButton.style.transform = "translate(-50%, -50%)";
              });
          });

          playButton.addEventListener("click", () => {
              heroVideo.play();
              requestAnimationFrame(() => {
                  playButton.style.opacity = "0";
                  setTimeout(() => {
                      playButton.remove();
                  }, 500);
              });
          });

          heroVideo.parentElement.appendChild(playButton);
      });
  }

  // Add smooth scroll for anchor links with improved performance
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
          const href = this.getAttribute("href");

          if (href !== "#") {
              e.preventDefault();
              const targetElement = document.querySelector(href);

              if (targetElement) {
                  const headerHeight = document.querySelector("header").offsetHeight;
                  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                  window.scrollTo({
                      top: targetPosition,
                      behavior: "smooth",
                  });
              }
          }
      });
  });
});

document.addEventListener('DOMContentLoaded',()=>{
    const cart = JSON.parse(localStorage.getItem("count")) || []
    document.querySelector('.cart-count').textContent = `${cart}` || `0`
    console.log(cart);
  
  })