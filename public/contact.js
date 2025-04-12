// Contact Page JavaScript

// Declare AOS and google variables
let AOS;
let google;

document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate on Scroll) if available
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: true
    });
  }

  // Initialize Google Map
  if (typeof google !== 'undefined') {
    initMap();
  } else {
    // Fallback if Google Maps API is not loaded
    const mapContainer = document.getElementById("map");
    if (mapContainer) {
      mapContainer.innerHTML = `
        <div style="height: 100%; display: flex; align-items: center; justify-content: center; background-color: #f5f5f5; border-radius: 10px;">
          <p style="text-align: center; padding: 20px;">Map loading... <br>Please check your internet connection or API key.</p>
        </div>
      `;
    }
  }

  // Contact Form Submission with enhanced animations
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    // Add input focus animations
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
      // Add focus and blur event listeners
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement.classList.remove('focused');
        }
      });
      
      // Check if input already has value on page load
      if (input.value) {
        input.parentElement.classList.add('focused');
      }
    });

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Validate form (enhanced validation)
      let isValid = true;
      let errorMessage = "";

      if (!name) {
        isValid = false;
        errorMessage = "Please enter your name.";
        animateInvalidField("name");
      } else if (!email) {
        isValid = false;
        errorMessage = "Please enter your email address.";
        animateInvalidField("email");
      } else if (!validateEmail(email)) {
        isValid = false;
        errorMessage = "Please enter a valid email address.";
        animateInvalidField("email");
      } else if (!subject) {
        isValid = false;
        errorMessage = "Please select a subject.";
        animateInvalidField("subject");
      } else if (!message) {
        isValid = false;
        errorMessage = "Please enter your message.";
        animateInvalidField("message");
      }

      if (!isValid) {
        showFormMessage(errorMessage, "error");
        return;
      }

      // Show loading message with animation
      showFormMessage("Sending your message...", "loading");

      // Simulate form submission with enhanced animations
      setTimeout(() => {
        // Show success message
        showFormMessage("Thank you! Your message has been sent successfully.", "success");

        // Reset form with animation
        formInputs.forEach(input => {
          input.style.transition = "all 0.5s ease";
          input.style.opacity = "0";
          
          setTimeout(() => {
            input.value = "";
            input.style.opacity = "1";
            input.parentElement.classList.remove('focused');
          }, 500);
        });

        // Add form submission animation
        const formContainer = document.querySelector(".contact-form");
        formContainer.classList.add("submitted");

        setTimeout(() => {
          formContainer.classList.remove("submitted");
        }, 3000);
      }, 2000);
    });
  }

  // Animate invalid field
  function animateInvalidField(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
      field.classList.add("invalid");
      
      // Add shake animation
      field.style.animation = "none";
      setTimeout(() => {
        field.style.animation = "shake 0.5s ease";
      }, 10);
      
      // Remove invalid class after animation
      setTimeout(() => {
        field.classList.remove("invalid");
      }, 600);
    }
  }

  // Email validation function
  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Show form message with enhanced animations
  function showFormMessage(message, type) {
    const messageElement = document.getElementById("form-message");
    if (messageElement) {
      // First fade out
      messageElement.style.opacity = "0";
      messageElement.style.transform = "translateY(10px)";
      
      setTimeout(() => {
        // Update content
        messageElement.textContent = message;
        messageElement.className = "form-message " + type;
        
        // Then fade in
        messageElement.style.opacity = "1";
        messageElement.style.transform = "translateY(0)";
      }, 300);

      // Clear message after 5 seconds if it's a success or error message
      if (type === "success" || type === "error") {
        setTimeout(() => {
          messageElement.style.opacity = "0";
          messageElement.style.transform = "translateY(10px)";
          
          setTimeout(() => {
            messageElement.textContent = "";
            messageElement.className = "form-message";
          }, 300);
        }, 5000);
      }
    }
  }

  // FAQ Accordion with enhanced animations
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const faqItem = this.parentElement;
      const isActive = faqItem.classList.contains("active");

      // Close all FAQ items with smooth animation
      document.querySelectorAll(".faq-item").forEach((item) => {
        if (item !== faqItem && item.classList.contains("active")) {
          const answer = item.querySelector(".faq-answer");
          const toggleIcon = item.querySelector(".faq-toggle i");
          
          // Animate the answer closing
          answer.style.opacity = "0";
          
          // Update toggle icon with animation
          toggleIcon.className = "fas fa-plus";
          toggleIcon.style.transform = "rotate(0deg)";
          
          // After fade out, collapse the height
          setTimeout(() => {
            item.classList.remove("active");
          }, 300);
        }
      });

      // Toggle current FAQ item with enhanced animation
      if (!isActive) {
        faqItem.classList.add("active");
        const answer = faqItem.querySelector(".faq-answer");
        
        // Animate the answer opening
        setTimeout(() => {
          answer.style.opacity = "1";
        }, 100);
      } else {
        const answer = faqItem.querySelector(".faq-answer");
        
        // Animate the answer closing
        answer.style.opacity = "0";
        
        // After fade out, collapse the height
        setTimeout(() => {
          faqItem.classList.remove("active");
        }, 300);
      }

      // Update toggle icon with animation
      const toggleIcon = this.querySelector(".faq-toggle i");
      if (!isActive) {
        toggleIcon.className = "fas fa-minus";
        toggleIcon.style.transform = "rotate(90deg)";
        setTimeout(() => {
          toggleIcon.style.transform = "rotate(0deg)";
        }, 200);
      } else {
        toggleIcon.className = "fas fa-plus";
        toggleIcon.style.transform = "rotate(90deg)";
        setTimeout(() => {
          toggleIcon.style.transform = "rotate(0deg)";
        }, 200);
      }
    });
  });

  // Chatbot Toggle with enhanced animations
  const chatbotToggle = document.getElementById("chatbot-toggle");
  const chatbotContainer = document.getElementById("chatbot-container");
  const closeChat = document.getElementById("close-chat");

  if (chatbotToggle && chatbotContainer && closeChat) {
    chatbotToggle.addEventListener("click", () => {
      if (!chatbotContainer.classList.contains("active")) {
        // Opening animation
        chatbotContainer.style.display = "block";
        chatbotContainer.style.opacity = "0";
        chatbotContainer.style.transform = "scale(0.8) translateY(20px)";
        
        setTimeout(() => {
          chatbotContainer.classList.add("active");
          chatbotContainer.style.opacity = "1";
          chatbotContainer.style.transform = "scale(1) translateY(0)";
        }, 50);
        
        // Stop pulse animation on toggle button when opened
        chatbotToggle.style.animation = "none";
      } else {
        // Closing animation
        chatbotContainer.style.opacity = "0";
        chatbotContainer.style.transform = "scale(0.8) translateY(20px)";
        
        setTimeout(() => {
          chatbotContainer.classList.remove("active");
          chatbotContainer.style.display = "none";
          
          // Restart pulse animation on toggle button when closed
          chatbotToggle.style.animation = "pulse 2s infinite";
        }, 300);
      }
    });

    closeChat.addEventListener("click", () => {
      // Closing animation
      chatbotContainer.style.opacity = "0";
      chatbotContainer.style.transform = "scale(0.8) translateY(20px)";
      
      setTimeout(() => {
        chatbotContainer.classList.remove("active");
        chatbotContainer.style.display = "none";
        
        // Restart pulse animation on toggle button when closed
        chatbotToggle.style.animation = "pulse 2s infinite";
      }, 300);
    });
  }

  // Chatbot Messaging with enhanced animations
  const chatInput = document.getElementById("chat-input");
  const sendMessage = document.getElementById("send-message");
  const chatMessages = document.getElementById("chatbot-messages");

  if (chatInput && sendMessage && chatMessages) {
    // Send message on button click
    sendMessage.addEventListener("click", () => {
      sendChatMessage();
    });

    // Send message on Enter key
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendChatMessage();
      }
    });

    // Function to send chat message with animations
    function sendChatMessage() {
      const message = chatInput.value.trim();

      if (message) {
        // Add user message with animation
        addChatMessage(message, "user");

        // Clear input with animation
        chatInput.value = "";
        chatInput.style.width = "0";
        setTimeout(() => {
          chatInput.style.width = "100%";
        }, 100);

        // Add typing indicator
        addTypingIndicator();

        // Simulate bot response after a short delay
        setTimeout(() => {
          // Remove typing indicator
          removeTypingIndicator();
          
          // Get bot response
          const botResponse = getBotResponse(message);

          // Add bot message with animation
          addChatMessage(botResponse, "bot");

          // Scroll to bottom of chat
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1500);
      }
    }

    // Function to add typing indicator
    function addTypingIndicator() {
      const typingElement = document.createElement("div");
      typingElement.className = "message bot-message typing-indicator";
      typingElement.innerHTML = `
        <div class="message-content">
          <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      `;
      chatMessages.appendChild(typingElement);
      
      // Add CSS for typing indicator if not already added
      if (!document.getElementById("typing-indicator-style")) {
        const style = document.createElement("style");
        style.id = "typing-indicator-style";
        style.textContent = `
          .typing-dots {
            display: flex;
            align-items: center;
            height: 20px;
          }
          .typing-dots span {
            width: 8px;
            height: 8px;
            margin: 0 2px;
            background-color: #888;
            border-radius: 50%;
            display: inline-block;
            opacity: 0.4;
          }
          .typing-dots span:nth-child(1) {
            animation: typingDot 1.4s infinite;
            animation-delay: 0s;
          }
          .typing-dots span:nth-child(2) {
            animation: typingDot 1.4s infinite;
            animation-delay: 0.2s;
          }
          .typing-dots span:nth-child(3) {
            animation: typingDot 1.4s infinite;
            animation-delay: 0.4s;
          }
          @keyframes typingDot {
            0% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
            100% { opacity: 0.4; transform: scale(1); }
          }
        `;
        document.head.appendChild(style);
      }
      
      // Scroll to bottom of chat
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to remove typing indicator
    function removeTypingIndicator() {
      const typingIndicator = chatMessages.querySelector(".typing-indicator");
      if (typingIndicator) {
        typingIndicator.remove();
      }
    }

    // Function to add message to chat with enhanced animations
    function addChatMessage(message, sender) {
      const messageElement = document.createElement("div");
      messageElement.className = `message ${sender}-message`;
      messageElement.style.opacity = "0";
      messageElement.style.transform = "translateY(20px)";

      const messageContent = document.createElement("div");
      messageContent.className = "message-content";
      
      // Add animation for message bubble
      if (sender === "bot") {
        messageContent.style.transform = "scale(0)";
        messageContent.style.transformOrigin = "top left";
      } else {
        messageContent.style.transform = "scale(0)";
        messageContent.style.transformOrigin = "top right";
      }

      const messageText = document.createElement("p");
      messageText.textContent = message;

      messageContent.appendChild(messageText);
      messageElement.appendChild(messageContent);
      chatMessages.appendChild(messageElement);

      // Animate message appearance
      setTimeout(() => {
        messageElement.style.opacity = "1";
        messageElement.style.transform = "translateY(0)";
        messageContent.style.transform = "scale(1)";
      }, 50);

      // Scroll to bottom of chat
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to get bot response (enhanced responses)
    function getBotResponse(message) {
      message = message.toLowerCase();

      if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
        return "Hello! 👋 How can I help you today?";
      } else if (message.includes("product") || message.includes("beverage") || message.includes("drink")) {
        return "We offer a wide range of beverages including Citrus Splash, Berry Blast, Tropical Paradise, and many more. 🥤 You can check out our Products page for the full range.";
      } else if (message.includes("location") || message.includes("address") || message.includes("where")) {
        return "Our headquarters is located at 123 Beverage St, Flavor City, FC 12345, United States. 📍 You can find us on the map on this page.";
      } else if (message.includes("contact") || message.includes("phone") || message.includes("email")) {
        return "You can contact us at info@beverageworld.com or call us at (555) 123-4567. 📞 You can also use the contact form on this page.";
      } else if (message.includes("hours") || message.includes("open") || message.includes("time")) {
        return "Our business hours are Monday to Friday: 9am - 6pm, Saturday: 10am - 4pm, and we are closed on Sundays. ⏰";
      } else if (message.includes("thank") || message.includes("thanks")) {
        return "You're welcome! 😊 Is there anything else I can help you with?";
      } else if (message.includes("price") || message.includes("cost") || message.includes("how much")) {
        return "Our beverage prices range from $2.99 to $5.99 depending on the product and size. 💰 Check our Products page for specific pricing.";
      } else if (message.includes("delivery") || message.includes("shipping")) {
        return "We offer free shipping on orders over $30. Standard delivery takes 3-5 business days, and express delivery (additional $5.99) takes 1-2 business days. 🚚";
      } else if (message.includes("discount") || message.includes("coupon") || message.includes("promo")) {
        return "Use code WELCOME10 for 10% off your first order! 🎉 We also have seasonal promotions - subscribe to our newsletter to stay updated.";
      } else {
        return "I'm not sure I understand. Could you please rephrase your question? You can ask about our products, locations, contact information, or business hours. 🤔";
      }
    }

    // Show welcome message after a short delay with typing animation
    setTimeout(() => {
      // Add typing indicator
      addTypingIndicator();
      
      setTimeout(() => {
        // Remove typing indicator
        removeTypingIndicator();
        
        // Add welcome message
        addChatMessage("Hi there! 👋 Welcome to Beverage World. How can I help you today?", "bot");
        
        // Add typing indicator for second message
        setTimeout(() => {
          addTypingIndicator();
          
          setTimeout(() => {
            // Remove typing indicator
            removeTypingIndicator();
            
            // Add second welcome message
            addChatMessage("Feel free to ask about our products, locations, or anything else you'd like to know! 😊", "bot");
          }, 1500);
        }, 1000);
      }, 1500);
    }, 1000);
  }
})

// Google Map Initialization with enhanced animations
function initMap() {
  // Check if the map container exists
  const mapContainer = document.getElementById("map");
  if (!mapContainer) return;

  // Create a map centered at Beverage World HQ (fictional location)
  const map = new google.maps.Map(mapContainer, {
    center: { lat: 40.7128, lng: -74.006 }, // New York coordinates for demo
    zoom: 15,
    styles: [
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#e9e9e9",
          },
          {
            lightness: 17,
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [
          {
            color: "#f5f5f5",
          },
          {
            lightness: 20,
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#ffffff",
          },
          {
            lightness: 17,
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#ffffff",
          },
          {
            lightness: 29,
          },
          {
            weight: 0.2,
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          {
            color: "#ffffff",
          },
          {
            lightness: 18,
          },
        ],
      },
      {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [
          {
            color: "#ffffff",
          },
          {
            lightness: 16,
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
          {
            color: "#f5f5f5",
          },
          {
            lightness: 21,
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
          {
            color: "#dedede",
          },
          {
            lightness: 21,
          },
        ],
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            visibility: "on",
          },
          {
            color: "#ffffff",
          },
          {
            lightness: 16,
          },
        ],
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            saturation: 36,
          },
          {
            color: "#333333",
          },
          {
            lightness: 40,
          },
        ],
      },
      {
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
          {
            color: "#f2f2f2",
          },
          {
            lightness: 19,
          },
        ],
      },
      {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#fefefe",
          },
          {
            lightness: 20,
          },
        ],
      },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#fefefe",
          },
          {
            lightness: 17,
          },
          {
            weight: 1.2,
          },
        ],
      },
    ],
  });

  // Add a marker for Beverage World HQ with animation
  const marker = new google.maps.Marker({
    position: { lat: 40.7128, lng: -74.006 },
    map: map,
    title: "Beverage World Headquarters",
    animation: google.maps.Animation.DROP,
    icon: {
      url: "assets/map-marker.png",
      scaledSize: new google.maps.Size(40, 40),
    },
  });

  // Add bounce animation on hover
  marker.addListener('mouseover', function() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  });
  
  marker.addListener('mouseout', function() {
    marker.setAnimation(null);
  });

  // Add info window with enhanced styling
  const infoWindow = new google.maps.InfoWindow({
    content: `
      <div class="map-info-window">
        <h3>Beverage World Headquarters</h3>
        <p><i class="fas fa-map-marker-alt" style="color: #ff6b35;"></i> 123 Beverage St<br>Flavor City, FC 12345<br>United States</p>
        <p><i class="fas fa-phone" style="color: #ff6b35;"></i> <strong>Phone:</strong> (555) 123-4567</p>
        <p><i class="fas fa-envelope" style="color: #ff6b35;"></i> <strong>Email:</strong> info@beverageworld.com</p>
        <p><a href="#" style="color: #ff6b35; text-decoration: none; font-weight: bold;">Get Directions</a></p>
      </div>
    `,
    maxWidth: 300
  });

  // Open info window when marker is clicked
  marker.addListener("click", () => {
    infoWindow.open(map, marker);
  });

  // Add smooth zoom animation when map is clicked
  map.addListener("click", () => {
    // Zoom in
    if (map.getZoom() < 18) {
      map.setZoom(map.getZoom() + 1);
    } else {
      // Reset zoom if already zoomed in
      map.setZoom(15);
    }
  });

  // Add CSS for map info window
  const style = document.createElement("style");
  style.textContent = `
    .map-info-window {
      padding: 10px;
      font-family: Arial, sans-serif;
    }
    
    .map-info-window h3 {
      margin-bottom: 10px;
      color: #ff6b35;
      font-size: 16px;
      border-bottom: 2px solid #ff6b35;
      padding-bottom: 5px;
    }
    
    .map-info-window p {
      margin: 8px 0;
      font-size: 14px;
      line-height: 1.4;
    }
    
    .map-info-window i {
      margin-right: 5px;
      width: 15px;
      text-align: center;
    }
  `;
  document.head.appendChild(style);

  // Add custom controls to the map
  const controlDiv = document.createElement('div');
  controlDiv.style.padding = '10px';
  controlDiv.style.margin = '10px';
  
  // Create the control UI
  const controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);
  
  // Create the control text
  const controlText = document.createElement('div');
  controlText.style.color = '#ff6b35';
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '14px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '10px';
  controlText.style.paddingRight = '10px';
  controlText.innerHTML = 'Center Map';
  controlUI.appendChild(controlText);
  
  // Setup the click event listener
  controlUI.addEventListener('click', function() {
    map.setCenter({ lat: 40.7128, lng: -74.006 });
    map.setZoom(15);
  });
  
  // Add the control to the map
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);
}

// Add shake animation for form validation
const shakeStyle = document.createElement("style");
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
  
  .invalid {
    border-color: #dc3545 !important;
    box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25) !important;
  }
  
  .form-group.focused label {
    transform: translateY(-5px);
    color: var(--primary-color);
    font-size: 0.9em;
  }
`;
document.head.appendChild(shakeStyle);

document.addEventListener('DOMContentLoaded',()=>{
  const cart = JSON.parse(localStorage.getItem("count")) || []
  document.querySelector('.cart-count').textContent = `${cart}` || `0`
  console.log(cart);

})


