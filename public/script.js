// Enhanced JavaScript for navigation functionality



document.addEventListener('DOMContentLoaded', function() {

    // Mobile Navigation Toggle with improved animation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');
    const navItems = document.querySelectorAll('.nav-links a');
    const body = document.body;

    // Function to toggle mobile menu
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if (hamburger.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    }

    // Toggle mobile menu on hamburger click
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking on a nav link
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (item.classList!= 'active'){
                item.classList = 'acitve';
            }
            if (hamburger.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (hamburger.classList.contains('active') && !isClickInsideNav && !isClickOnHamburger) {
            toggleMobileMenu();
        }
    });

    // Enhanced Sticky Header with scroll detection
    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Initial check on page load
    handleScroll();
    
    // Check on scroll with performance optimization
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                handleScroll();
                scrollTimeout = null;
            }, 10);
        }
    });

    // Active link highlighting based on current page
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop();
        
        navItems.forEach(link => {
            const linkHref = link.getAttribute('href');
            
            if (currentPage === linkHref || 
                (currentPage === '' && linkHref === 'index.html') ||
                (currentPage === '/' && linkHref === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Set active link on page load
    setActiveNavLink();

    // Smooth hover effect for nav links
    navItems.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });


    // Initialize AOS (Animate on Scroll)
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 800,
            easing: "ease-out",
            once: true,
            offset: 100,
            disable: window.innerWidth < 768 ? true : false // Disable on mobile for better performance
        });
    }

    // Scroll Animation for elements without AOS
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('[data-aos]');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.8) {
                element.classList.add('aos-animate');
            }
        });
    };

    // Run on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});


// Main JavaScript file

document.addEventListener("DOMContentLoaded", () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector(".hamburger")
    const navLinks = document.querySelector(".nav-links")
  
    if (hamburger) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active")
        navLinks.classList.toggle("active")
      })
    }
  
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll(".nav-links a")
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navLinks.classList.remove("active")
      })
    })
  
    // Scroll effect for header
    const header = document.querySelector(".header")
    if (header) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          header.classList.add("scrolled")
        } else {
          header.classList.remove("scrolled")
        }
      })
    }
  
    // Initialize AOS (if available)
    let AOS // Declare AOS variable
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 800,
        easing: "ease-out",
        once: true,
      })
    }
  
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split("/").pop()
    const navLinks2 = document.querySelectorAll(".nav-links a")
  
    navLinks2.forEach((link) => {
      const linkPage = link.getAttribute("href")
      if (currentPage === linkPage || (currentPage === "" && linkPage === "index.html")) {
        link.classList.add("active")
      } else {
        link.classList.remove("active")
      }
    })
    document.querySelectorAll('.cardLinks').forEach((item)=>{
item.addEventListener('click',()=>{
    window.location.href = 'products.html'
})
    })
  })
  
  document.addEventListener('DOMContentLoaded',()=>{
    const cart = JSON.parse(localStorage.getItem("count")) || []
    document.querySelector('.cart-count').textContent = `${cart}` || `0`
    console.log(cart);
  
  })


  document.addEventListener("DOMContentLoaded", () => {
    // Hamburger menu functionality
    const hamburger = document.querySelector(".hamburger")
    const navLinks = document.querySelector(".nav-links")
  
    if (hamburger) {
      hamburger.addEventListener("click", function () {
        // Toggle active class on hamburger
        this.classList.toggle("active")
        // Toggle active class on nav-links
        navLinks.classList.toggle("active")
  
        // Force repaint to ensure CSS transitions work properly
        navLinks.offsetHeight
  
        // Prevent body scrolling when menu is open
        if (this.classList.contains("active")) {
          document.body.style.overflow = "hidden"
        } else {
          document.body.style.overflow = ""
        }
      })
    }
  
    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll(".nav-links a")
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        if (hamburger.classList.contains("active")) {
          hamburger.classList.remove("active")
          navLinks.classList.remove("active")
          document.body.style.overflow = ""
        }
      })
    })
  
    // Scroll event for header
    const header = document.querySelector(".header")
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  })
  