// // Payment Page JavaScript

// document.addEventListener("DOMContentLoaded", () => {
//   // Checkout Progress
//   const progressBar = document.getElementById("checkout-progress-bar")
//   const progressSteps = document.querySelectorAll(".progress-step")
//   const checkoutSteps = document.querySelectorAll(".checkout-step")
//   let currentStep = 1

//   // Next Step Buttons
//   const nextStepBtns = document.querySelectorAll(".next-step")
//   nextStepBtns.forEach((btn) => {
//     btn.addEventListener("click", function () {
//       const nextStep = Number.parseInt(this.getAttribute("data-next"))

//       // Validate current step before proceeding
//       if (validateStep(currentStep)) {
//         goToStep(nextStep)
//       }
//     })
//   })

//   // Previous Step Buttons
//   const prevStepBtns = document.querySelectorAll(".prev-step")
//   prevStepBtns.forEach((btn) => {
//     btn.addEventListener("click", function () {
//       const prevStep = Number.parseInt(this.getAttribute("data-prev"))
//       goToStep(prevStep)
//     })
//   })

//   // Go to specific step
//   function goToStep(step) {
//     // Hide all steps
//     checkoutSteps.forEach((s) => {
//       s.classList.remove("active")
//     })

//     // Show the target step
//     checkoutSteps[step - 1].classList.add("active")

//     // Update progress bar
//     progressBar.style.width = (step / 4) * 100 + "%"

//     // Update progress steps
//     progressSteps.forEach((s, index) => {
//       if (index + 1 < step) {
//         s.classList.add("completed")
//         s.classList.remove("active")
//       } else if (index + 1 === step) {
//         s.classList.add("active")
//         s.classList.remove("completed")
//       } else {
//         s.classList.remove("active", "completed")
//       }
//     })

//     // Update current step
//     currentStep = step

//     // Scroll to top of checkout section
//     const checkoutSection = document.querySelector(".checkout-content")
//     if (checkoutSection) {
//       checkoutSection.scrollIntoView({ behavior: "smooth" })
//     }

//     // Special handling for confirmation step
//     if (step === 4) {
//       // Trigger confetti animation
//       createConfetti()

//       // Show review popup after 3 seconds
//       setTimeout(() => {
//         showReviewPopup()
//       }, 3000)
//     }
//   }

//   // Validate step before proceeding
//   function validateStep(step) {
//     switch (step) {
//       case 1:
//         // Cart validation (always valid for demo)
//         // return validateCartItems()
//         return true
//       case 2:
//         // Shipping form validation
//         // return validateShippingForm()
//         return true
//       case 3:
//         // Payment form validation
//         // return validatePaymentForm()
//         return true
//       default:
//         return true
//     }
//   }

//   // Validate Shipping Form
//   function validateShippingForm() {
//     const shippingForm = document.getElementById("shipping-form")
//     const requiredFields = shippingForm.querySelectorAll("[required]")
//     let isValid = true

//     requiredFields.forEach((field) => {
//       if (!field.value.trim()) {
//         isValid = false
//         field.classList.add("error")

//         // Add error message if it doesn't exist
//         let errorMsg = field.nextElementSibling
//         if (!errorMsg || !errorMsg.classList.contains("error-message")) {
//           errorMsg = document.createElement("div")
//           errorMsg.className = "error-message"
//           errorMsg.classList.add('red')
//           errorMsg.textContent = "This field is required"
//           field.parentNode.insertBefore(errorMsg, field.nextSibling)
//         }
//       } else {
//         field.classList.remove("error")

//         // Remove error message if it exists
//         const errorMsg = field.nextElementSibling
//         if (errorMsg && errorMsg.classList.contains("error-message")) {
//           errorMsg.remove()
//         }
//       }
//     })

//     // For demo purposes, let's make it always valid
//     return isValid
//   }

//   // Validate Payment Form
//   function validatePaymentForm() {
//     const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value

//     if (paymentMethod === "credit-card") {
//       const cardNumber = document.getElementById("card-number")
//       const cardName = document.getElementById("card-name")
//       const expiryDate = document.getElementById("expiry-date")
//       const cvv = document.getElementById("cvv")

//       // Validate card number (16 digits)
//       if (!/^\d{16}$/.test(cardNumber.value.replace(/\s/g, ""))) {
//         cardNumber.classList.add("error")
//         return false
//       }

//       // Validate card name (not empty)
//       if (!cardName.value.trim()) {
//         cardName.classList.add("error")
//         return false
//       }

//       // Validate expiry date (MM/YY format)
//       if (!/^\d{2}\/\d{2}$/.test(expiryDate.value)) {
//         expiryDate.classList.add("error")
//         return false
//       }

//       // Validate CVV (3 or 4 digits)
//       if (!/^\d{3,4}$/.test(cvv.value)) {
//         cvv.classList.add("error")
//         return false
//       }
//     }

//     // For demo purposes, let's make it always valid
//     return true
//   }
//   function validateCartItems(){
//     const cart = JSON.parse(localStorage.getItem("cart")) || []
//     if(cart.length == 0){
//       return false
//     }
//     else{
//       return true
//     }
//   }

//   // Payment Method Toggle
//   const paymentMethods = document.querySelectorAll('input[name="payment-method"]')
//   const creditCardForm = document.getElementById("credit-card-form")
//   const paypalForm = document.getElementById("paypal-form")

//   paymentMethods.forEach((method) => {
//     method.addEventListener("change", function () {
//       if (this.value === "credit-card") {
//         creditCardForm.style.display = "block"
//         paypalForm.style.display = "none"
//       } else if (this.value === "paypal") {
//         creditCardForm.style.display = "none"
//         paypalForm.style.display = "block"
//       }
//     })
//   })

//   // Billing Address Toggle
//   const sameAddressCheckbox = document.getElementById("same-address")
//   const billingAddressForm = document.getElementById("billing-address-form")

//   if (sameAddressCheckbox && billingAddressForm) {
//     sameAddressCheckbox.addEventListener("change", function () {
//       billingAddressForm.style.display = this.checked ? "none" : "block"
//     })
//   }

//   // Load and display cart items
//   function loadCartItems() {
//     const cart = JSON.parse(localStorage.getItem("cart")) || []
//     const cartItemsContainer = document.querySelector(".cart-items")

//     if (!cartItemsContainer) return

//     // Clear existing content
//     cartItemsContainer.innerHTML = ""

//     if (cart.length === 0) {
//       cartItemsContainer.innerHTML = `<div class="empty-cart">
//         <p>Your cart is empty.</p>
//         <a href="products.html" class="btn">Shop Now</a>
//       </div>`
//       return
//     }

//     // Add each cart item to the container
//     cart.forEach((item, index) => {
//       const itemTotal = (item.price * item.quantity).toFixed(2)

//       const itemElement = document.createElement("div")
//       itemElement.className = "cart-item"
//       itemElement.setAttribute("data-index", index)

//       itemElement.innerHTML = `
//         <div class="cart-item-image">
//           <img src="${item.image}" alt="${item.name}">
//         </div>
//         <div class="cart-item-details">
//           <h3>${item.name}</h3>
//           <p>${item.size || ""}</p>
//         </div>
//         <div class="cart-item-quantity">
//           <button class="quantity-btn minus">-</button>
//           <input type="number" value="${item.quantity}" min="1" max="99">
//           <button class="quantity-btn plus">+</button>
//         </div>
//         <div class="cart-item-price">
//           <span>$${item.price.toFixed(2)}</span>
//           <span class="item-total">$${itemTotal}</span>
//         </div>
//         <button class="remove-btn"><i class="fas fa-trash-alt"></i></button>
//       `

//       cartItemsContainer.appendChild(itemElement)
//     })

//     // Add event listeners to quantity buttons and remove buttons
//     setupCartItemEvents()

//     // Update cart summary
//     updateCartSummary()
//   }

//   // Setup event listeners for cart item interactions
//   function setupCartItemEvents() {
//     // Quantity Buttons
//     const quantityBtns = document.querySelectorAll(".cart-item .quantity-btn")
//     quantityBtns.forEach((btn) => {
//       btn.addEventListener("click", function () {
//         const cartItem = this.closest(".cart-item")
//         const index = Number.parseInt(cartItem.getAttribute("data-index"))
//         const input = this.parentElement.querySelector("input")
//         let value = Number.parseInt(input.value)

//         if (this.classList.contains("minus") && value > 1) {
//           value--
//         } else if (this.classList.contains("plus")) {
//           value++
//         }

//         input.value = value

//         // Update cart in localStorage
//         updateCartItemQuantity(index, value)

//         // Update price display
//         const priceElement = cartItem.querySelector(".cart-item-price span:first-child")
//         const totalElement = cartItem.querySelector(".item-total")

//         if (priceElement && totalElement) {
//           const price = Number.parseFloat(priceElement.textContent.replace("$", ""))
//           totalElement.textContent = "$" + (price * value).toFixed(2)

//           // Update cart summary
//           updateCartSummary()
//         }
//       })
//     })

//     // Remove Buttons
//     const removeButtons = document.querySelectorAll(".remove-btn")
//     removeButtons.forEach((button) => {
//       button.addEventListener("click", function () {
//         const item = this.closest(".cart-item")
//         const index = Number.parseInt(item.getAttribute("data-index"))

//         // Remove item from localStorage
//         removeCartItem(index)

//         // Animate removal
//         item.style.opacity = "0"
//         item.style.height = item.offsetHeight + "px"
//         item.style.marginTop = "0"
//         item.style.marginBottom = "0"
//         item.style.padding = "0"
//         item.style.overflow = "hidden"

//         setTimeout(() => {
//           item.style.height = "0"

//           setTimeout(() => {
//             // Reload cart items to update indexes
//             loadCartItems()
//           }, 300)
//         }, 300)
//       })
//     })
//   }

//   // Update cart item quantity in localStorage
//   function updateCartItemQuantity(index, quantity) {
//     const cart = JSON.parse(localStorage.getItem("cart")) || []

//     if (index >= 0 && index < cart.length) {
//       cart[index].quantity = quantity
//       localStorage.setItem("cart", JSON.stringify(cart))

//       // Update cart count in header
//       updateCartCount()
//     }
//   }

//   // Remove cart item from localStorage
//   function removeCartItem(index) {
//     const cart = JSON.parse(localStorage.getItem("cart")) || []

//     if (index >= 0 && index < cart.length) {
//       cart.splice(index, 1)
//       localStorage.setItem("cart", JSON.stringify(cart))

//       // Update cart count in header
//       updateCartSummary()
//       updateCartCount()
//     }
//   }

//   // Update cart count in header
//   function updateCartCount() {
//     const cart = JSON.parse(localStorage.getItem("cart")) || []
//     const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

//     const cartCountElement = document.querySelector(".cart-count")
//     if (cartCountElement) {
//       cartCountElement.textContent = totalItems
//     }
//   }

//   // Update Cart Summary
//   function updateCartSummary() {
//     const cart = JSON.parse(localStorage.getItem("cart")) || []
//     const cartSummary = document.querySelector(".cart-summary")

//     if (!cartSummary) return

//     // Calculate subtotal
//     let subtotal = 0
//     cart.forEach((item) => {
//         subtotal += item.price * item.quantity
//     })

//     // Update subtotal
//     const subtotalElement = cartSummary.querySelector(".summary-row:first-child span:last-child")
//     if (subtotalElement) {
//         subtotalElement.textContent = "PKR " + subtotal.toFixed(2)
//     }

//     // Get shipping cost - FIX: Parse PKR instead of $
//     const shippingElement = cartSummary.querySelector(".summary-row:nth-child(2) span:last-child")
//     const shippingText = shippingElement ? shippingElement.textContent : "PKR4.99"
//     const shipping = shippingElement ? Number.parseFloat(shippingText.replace("PKR", "")) : 4.99

//     // Calculate and update tax (assuming 12.5%)
//     const taxElement = cartSummary.querySelector(".summary-row:nth-child(3) span:last-child")
//     if (taxElement) {
//         const tax = subtotal * 0.125
//         taxElement.textContent = "PKR " + tax.toFixed(2)
//     }

//     // Calculate and update total - FIX: Parse PKR instead of $
//     const totalElement = cartSummary.querySelector(".summary-row.total span:last-child")
//     if (totalElement) {
//         const taxText = taxElement ? taxElement.textContent : "PKR0.00"
//         const tax = Number.parseFloat(taxText.replace("PKR", ""))
//         const total = subtotal + shipping + tax
//         totalElement.textContent = "PKR " + total.toFixed(2)
//     }
    

//   }

//   // Shipping Method Selection
//   const shippingOptions = document.querySelectorAll('input[name="shipping-method"]')
//   shippingOptions.forEach((option) => {
//     option.addEventListener("change", function () {
//       const shippingPrice = this.closest(".shipping-option").querySelector(".option-price").textContent

//       // Update shipping price in cart summary
//       const shippingElement = document.querySelector(".cart-summary .summary-row:nth-child(2) span:last-child")
//       if (shippingElement) {
//         shippingElement.textContent = shippingPrice
//         updateCartSummary()
//       }
//     })
//   })

//   // Download Receipt
//   const downloadReceiptBtn = document.getElementById("download-receipt")
//   if (downloadReceiptBtn) {
//     downloadReceiptBtn.addEventListener("click", () => {
//       // In a real application, you would generate a PDF receipt
//       alert("Receipt downloaded successfully!")
//     })
//   }

//   // Confetti Animation for Order Confirmation
//   function createConfetti() {
//     const confettiContainer = document.createElement("div")
//     confettiContainer.className = "confetti-container"
//     document.body.appendChild(confettiContainer)

//     // Create confetti pieces
//     for (let i = 0; i < 100; i++) {
//       const confetti = document.createElement("div")
//       confetti.className = "confetti"
//       confetti.style.left = Math.random() * 100 + "vw"
//       confetti.style.animationDelay = Math.random() * 5 + "s"
//       confetti.style.backgroundColor = getRandomColor()
//       confettiContainer.appendChild(confetti)
//     }

//     // Remove confetti after animation
//     setTimeout(() => {
//       confettiContainer.remove()
//     }, 10000)
//   }

//   // Helper function to get random color
//   function getRandomColor() {
//     const colors = ["#ff6b35", "#2ec4b6", "#ff9f1c", "#011627", "#fdfffc"]
//     return colors[Math.floor(Math.random() * colors.length)]
//   }

//   // Format Credit Card Number
//   const cardNumberInput = document.getElementById("card-number")
//   if (cardNumberInput) {
//     cardNumberInput.addEventListener("input", function (e) {
//       // Remove non-digits
//       let value = this.value.replace(/\D/g, "")

//       // Add spaces after every 4 digits
//       value = value.replace(/(\d{4})(?=\d)/g, "$1 ")

//       // Limit to 16 digits (19 characters with spaces)
//       if (value.length > 19) {
//         value = value.slice(0, 19)
//       }

//       this.value = value
//     })
//   }

//   // Format Expiry Date
//   const expiryDateInput = document.getElementById("expiry-date")
//   if (expiryDateInput) {
//     expiryDateInput.addEventListener("input", function (e) {
//       // Remove non-digits
//       let value = this.value.replace(/\D/g, "")

//       // Add slash after 2 digits
//       if (value.length > 2) {
//         value = value.slice(0, 2) + "/" + value.slice(2)
//       }

//       // Limit to 4 digits (5 characters with slash)
//       if (value.length > 5) {
//         value = value.slice(0, 5)
//       }

//       this.value = value
//     })
//   }

//   // Add CSS for confetti animation
//   const style = document.createElement("style")
//   style.textContent = `
//         .confetti-container {
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             pointer-events: none;
//             z-index: 9999;
//         }
        
//         .confetti {
//             position: absolute;
//             top: -10px;
//             width: 10px;
//             height: 10px;
//             border-radius: 50%;
//             animation: confetti-fall 5s linear infinite;
//         }
        
//         @keyframes confetti-fall {
//             0% {
//                 transform: translateY(0) rotate(0deg);
//                 opacity: 1;
//             }
//             100% {
//                 transform: translateY(100vh) rotate(720deg);
//                 opacity: 0;
//             }
//         }
//     `
//   document.head.appendChild(style)

//   // Review Popup
//   function showReviewPopup() {
//     // Create popup container
//     const popupContainer = document.createElement("div")
//     popupContainer.className = "review-popup-container"

//     // Create popup content
//     popupContainer.innerHTML = `
//         <div class="review-popup">
//             <button class="close-review-popup"><i class="fas fa-times"></i></button>
//             <h3>Thank You for Your Order!</h3>
//             <p>We'd love to hear your feedback. How was your shopping experience?</p>
//             <div class="star-rating">
//                 <i class="far fa-star" data-rating="1"></i>
//                 <i class="far fa-star" data-rating="2"></i>
//                 <i class="far fa-star" data-rating="3"></i>
//                 <i class="far fa-star" data-rating="4"></i>
//                 <i class="far fa-star" data-rating="5"></i>
//             </div>
//             <div class="rating-text">Click to rate</div>
//             <textarea placeholder="Tell us more about your experience (optional)"></textarea>
//             <button class="submit-review-btn" disabled>Submit Review</button>
//         </div>
//     `

//     // Add popup to body
//     document.body.appendChild(popupContainer)

//     // Show popup with animation
//     setTimeout(() => {
//       popupContainer.classList.add("active")
//     }, 10)

//     // Close popup
//     const closeBtn = popupContainer.querySelector(".close-review-popup")
//     closeBtn.addEventListener("click", () => {
//       popupContainer.classList.remove("active")
//       setTimeout(() => {
//         popupContainer.remove()
//       }, 300)
//     })

//     // Star rating functionality
//     const stars = popupContainer.querySelectorAll(".star-rating i")
//     const ratingText = popupContainer.querySelector(".rating-text")
//     const submitBtn = popupContainer.querySelector(".submit-review-btn")
//     let selectedRating = 0

//     stars.forEach((star) => {
//       // Hover effect
//       star.addEventListener("mouseenter", () => {
//         const rating = Number.parseInt(star.getAttribute("data-rating"))
//         highlightStars(rating)
//       })

//       // Click to select rating
//       star.addEventListener("click", () => {
//         selectedRating = Number.parseInt(star.getAttribute("data-rating"))
//         highlightStars(selectedRating)
//         updateRatingText(selectedRating)
//         submitBtn.disabled = false
//       })
//     })

//     // Reset stars on mouse leave if no rating selected
//     const starContainer = popupContainer.querySelector(".star-rating")
//     starContainer.addEventListener("mouseleave", () => {
//       if (selectedRating === 0) {
//         highlightStars(0)
//       } else {
//         highlightStars(selectedRating)
//       }
//     })

//     // Highlight stars up to the given rating
//     function highlightStars(rating) {
//       stars.forEach((star) => {
//         const starRating = Number.parseInt(star.getAttribute("data-rating"))
//         if (starRating <= rating) {
//           star.className = "fas fa-star"
//         } else {
//           star.className = "far fa-star"
//         }
//       })
//     }

//     // Update rating text based on selected rating
//     function updateRatingText(rating) {
//       const texts = ["Click to rate", "Poor", "Fair", "Good", "Very Good", "Excellent"]
//       ratingText.textContent = texts[rating]
//     }

//     // Submit review
//     submitBtn.addEventListener("click", () => {
//       const reviewText = popupContainer.querySelector("textarea").value

//       // In a real application, you would send this data to your server
//       console.log("Review submitted:", {
//         rating: selectedRating,
//         comment: reviewText,
//       })

//       // Show thank you message
//       popupContainer.innerHTML = `
//             <div class="review-popup thank-you">
//                 <h3>Thank You for Your Review!</h3>
//                 <p>We appreciate your feedback.</p>
//                 <div class="submitted-rating">
//                     ${Array(selectedRating).fill('<i class="fas fa-star"></i>').join("")}
//                 </div>
//                 <button class="close-thank-you">Close</button>
//             </div>
//         `

//       // Close thank you message
//       const closeThankYouBtn = popupContainer.querySelector(".close-thank-you")
//       closeThankYouBtn.addEventListener("click", () => {
//         popupContainer.classList.remove("active")
//         setTimeout(() => {
//           popupContainer.remove()
//         }, 300)
//       })
//     })
//   }

//   // Add CSS for review popup
//   const reviewPopupStyle = document.createElement("style")
//   reviewPopupStyle.textContent = `
//     .review-popup-container {
//         position: fixed;
//         top: 0;
//         left: 0;
//         width: 100%;
//         height: 100%;
//         background-color: rgba(0, 0, 0, 0.7);
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         z-index: 10000;
//         opacity: 0;
//         visibility: hidden;
//         transition: opacity 0.3s, visibility 0.3s;
//     }
    
//     .review-popup-container.active {
//         opacity: 1;
//         visibility: visible;
//     }
    
//     .review-popup {
//         background-color: white;
//         border-radius: 10px;
//         padding: 30px;
//         width: 90%;
//         max-width: 500px;
//         box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
//         position: relative;
//         transform: translateY(20px);
//         opacity: 0;
//         transition: transform 0.3s, opacity 0.3s;
//         animation: popup-appear 0.5s forwards;
//     }
    
//     @keyframes popup-appear {
//         to {
//             transform: translateY(0);
//             opacity: 1;
//         }
//     }
    
//     .close-review-popup {
//         position: absolute;
//         top: 15px;
//         right: 15px;
//         background: none;
//         border: none;
//         font-size: 20px;
//         cursor: pointer;
//         color: #888;
//         transition: color 0.2s;
//     }
    
//     .close-review-popup:hover {
//         color: #333;
//     }
    
//     .review-popup h3 {
//         margin-top: 0;
//         color: #ff6b35;
//         font-size: 24px;
//         text-align: center;
//     }
    
//     .review-popup p {
//         text-align: center;
//         margin-bottom: 20px;
//         color: #555;
//     }
    
//     .star-rating {
//         display: flex;
//         justify-content: center;
//         gap: 10px;
//         margin-bottom: 10px;
//         font-size: 30px;
//     }
    
//     .star-rating i {
//         color: #ffc107;
//         cursor: pointer;
//         transition: transform 0.2s;
//     }
    
//     .star-rating i:hover {
//         transform: scale(1.2);
//     }
    
//     .rating-text {
//         text-align: center;
//         margin-bottom: 20px;
//         font-size: 14px;
//         color: #666;
//         height: 20px;
//     }
    
//     .review-popup textarea {
//         width: 100%;
//         height: 100px;
//         padding: 10px;
//         border: 1px solid #ddd;
//         border-radius: 5px;
//         resize: none;
//         margin-bottom: 20px;
//         font-family: inherit;
//     }
    
//     .submit-review-btn {
//         display: block;
//         width: 100%;
//         padding: 12px;
//         background-color: #ff6b35;
//         color: white;
//         border: none;
//         border-radius: 5px;
//         font-size: 16px;
//         cursor: pointer;
//         transition: background-color 0.2s;
//     }
    
//     .submit-review-btn:hover {
//         background-color: #e55a2a;
//     }
    
//     .submit-review-btn:disabled {
//         background-color: #ccc;
//         cursor: not-allowed;
//     }
    
//     .thank-you {
//         text-align: center;
//     }
    
//     .submitted-rating {
//         font-size: 30px;
//         color: #ffc107;
//         margin: 20px 0;
//     }
    
//     .close-thank-you {
//         display: inline-block;
//         padding: 10px 20px;
//         background-color: #ff6b35;
//         color: white;
//         border: none;
//         border-radius: 5px;
//         font-size: 16px;
//         cursor: pointer;
//         transition: background-color 0.2s;
//     }
    
//     .close-thank-you:hover {
//         background-color: #e55a2a;
//     }
//   `
//   document.head.appendChild(reviewPopupStyle)

//   // Initialize the page
//   loadCartItems()
//   updateCartCount()
// })












// Payment Page JavaScript
var orderNo = randomOrderNo(6)
document.addEventListener("DOMContentLoaded", () => {
  // Checkout Progress
  const progressBar = document.getElementById("checkout-progress-bar")
  const progressSteps = document.querySelectorAll(".progress-step")
  const checkoutSteps = document.querySelectorAll(".checkout-step")
  let currentStep = 1

  // Next Step Buttons
  const nextStepBtns = document.querySelectorAll(".next-step")
  nextStepBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const nextStep = Number.parseInt(this.getAttribute("data-next"))

      // Validate current step before proceeding
      if (validateStep(currentStep)) {
        goToStep(nextStep)
      }
    })
  })

  // Previous Step Buttons
  const prevStepBtns = document.querySelectorAll(".prev-step")
  prevStepBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const prevStep = Number.parseInt(this.getAttribute("data-prev"))
      goToStep(prevStep)
    })
  })

  // Go to specific step
  const originalGoToStep = goToStep;
  function goToStep(step) {
    // If moving from shipping step, save shipping info
    if (currentStep === 2 && step !== 2) {
      saveShippingInfo();
    }
    
    // Hide all steps
    checkoutSteps.forEach((s) => {
      s.classList.remove("active")
    })

    // Show the target step
    checkoutSteps[step - 1].classList.add("active")

    // Update progress bar
    progressBar.style.width = (step / 4) * 100 + "%"

    // Update progress steps
    progressSteps.forEach((s, index) => {
      if (index + 1 < step) {
        s.classList.add("completed")
        s.classList.remove("active")
      } else if (index + 1 === step) {
        s.classList.add("active")
        s.classList.remove("completed")
      } else {
        s.classList.remove("active", "completed")
      }
    })

    // Update current step
    currentStep = step

    // Scroll to top of checkout section
    const checkoutSection = document.querySelector(".checkout-content")
    if (checkoutSection) {
      checkoutSection.scrollIntoView({ behavior: "smooth" })
    }

    // Special handling for confirmation step
    if (step === 4) {
      // Trigger confetti animation
      createConfetti()

      // Show review popup after 3 seconds
      setTimeout(() => {
        showReviewPopup()
      }, 3000)
      
      displayOrderItems();
    }
  }

  // Validate step before proceeding
  function validateStep(step) {
    switch (step) {
      case 1:
        // Cart validation (always valid for demo)
        return validateCartItems()
        // return true
      case 2:
        // Shipping form validation
        return validateShippingForm()
        // return true
      case 3:
        // Payment form validation
        return validatePaymentForm()
        // return true
      default:
        return true
    }
  }

  // Validate Shipping Form
  function validateShippingForm() {
    const shippingForm = document.getElementById("shipping-form")
    const requiredFields = shippingForm.querySelectorAll("[required]")
    let isValid = true

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false
        field.classList.add("error")

        // Add error message if it doesn't exist
        let errorMsg = field.nextElementSibling
        if (!errorMsg || !errorMsg.classList.contains("error-message")) {
          errorMsg = document.createElement("div")
          errorMsg.className = "error-message"
          errorMsg.classList.add('red')
          errorMsg.textContent = "This field is required"
          field.parentNode.insertBefore(errorMsg, field.nextSibling)
        }
      } else {
        field.classList.remove("error")

        // Remove error message if it exists
        const errorMsg = field.nextElementSibling
        if (errorMsg && errorMsg.classList.contains("error-message")) {
          errorMsg.remove()
        }
      }
    })

    return isValid
  }

  // Validate Payment Form
  function validatePaymentForm() {
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value
    let isValid = true

    if (paymentMethod === "credit-card") {
      const cardNumber = document.getElementById("card-number")
      const cardName = document.getElementById("card-name")
      const expiryDate = document.getElementById("expiry-date")
      const cvv = document.getElementById("cvv")

      // Validate card number (16 digits)
      if (!/^\d{16}$/.test(cardNumber.value.replace(/\s/g, ""))) {
        cardNumber.classList.add("error")
        isValid = false
      }

      // Validate card name (not empty)
      if (!cardName.value.trim()) {
        cardName.classList.add("error")
        isValid = false
      }

      // Validate expiry date (MM/YY format)
      if (!/^\d{2}\/\d{2}$/.test(expiryDate.value)) {
        expiryDate.classList.add("error")
        isValid = false
      }

      // Validate CVV (3 or 4 digits)
      if (!/^\d{3,4}$/.test(cvv.value)) {
        cvv.classList.add("error")
        isValid = false
      }
    }

    populateOrderDetails()
    return isValid
  }
  function validateCartItems(){
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    if(cart.length == 0){
      return false
    }
    else{
      return true
    }
  }

  // Payment Method Toggle
  const paymentMethods = document.querySelectorAll('input[name="payment-method"]')
  const creditCardForm = document.getElementById("credit-card-form")
  const paypalForm = document.getElementById("paypal-form")

  paymentMethods.forEach((method) => {
    method.addEventListener("change", function () {
      if (this.value === "credit-card") {
        creditCardForm.style.display = "block"
        paypalForm.style.display = "none"
      } else if (this.value === "paypal") {
        creditCardForm.style.display = "none"
        paypalForm.style.display = "block"
      }
    })
  })

  // Billing Address Toggle
  const sameAddressCheckbox = document.getElementById("same-address")
  const billingAddressForm = document.getElementById("billing-address-form")

  if (sameAddressCheckbox && billingAddressForm) {
    sameAddressCheckbox.addEventListener("change", function () {
      billingAddressForm.style.display = this.checked ? "none" : "block"
    })
  }

  // Load and display cart items
  function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const cartItemsContainer = document.querySelector(".cart-items")

    if (!cartItemsContainer) return

    // Clear existing content
    cartItemsContainer.innerHTML = ""

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `<div class="empty-cart">
        <p>Your cart is empty.</p>
        <a href="products.html" class="btn">Shop Now</a>
      </div>`
      return
    }

    // Add each cart item to the container
    cart.forEach((item, index) => {
      const itemTotal = (item.price * item.quantity).toFixed(2)

      const itemElement = document.createElement("div")
      itemElement.className = "cart-item"
      itemElement.setAttribute("data-index", index)

      itemElement.innerHTML = `
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p>${item.size || ""}</p>
        </div>
        <div class="cart-item-quantity">
          <button class="quantity-btn minus">-</button>
          <input type="number" value="${item.quantity}" min="1" max="99">
          <button class="quantity-btn plus">+</button>
        </div>
        <div class="cart-item-price">
          <span>$${item.price.toFixed(2)}</span>
          <span class="item-total">$${itemTotal}</span>
        </div>
        <button class="remove-btn"><i class="fas fa-trash-alt"></i></button>
      `

      cartItemsContainer.appendChild(itemElement)
    })

    // Add event listeners to quantity buttons and remove buttons
    setupCartItemEvents()

    // Update cart summary
    updateCartSummary()
  }

  // Setup event listeners for cart item interactions
  function setupCartItemEvents() {
    // Quantity Buttons
    const quantityBtns = document.querySelectorAll(".cart-item .quantity-btn")
    quantityBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const cartItem = this.closest(".cart-item")
        const index = Number.parseInt(cartItem.getAttribute("data-index"))
        const input = this.parentElement.querySelector("input")
        let value = Number.parseInt(input.value)

        if (this.classList.contains("minus") && value > 1) {
          value--
        } else if (this.classList.contains("plus")) {
          value++
        }

        input.value = value

        // Update cart in localStorage
        updateCartItemQuantity(index, value)

        // Update price display
        const priceElement = cartItem.querySelector(".cart-item-price span:first-child")
        const totalElement = cartItem.querySelector(".item-total")

        if (priceElement && totalElement) {
          const price = Number.parseFloat(priceElement.textContent.replace("$", ""))
          totalElement.textContent = "$" + (price * value).toFixed(2)

          // Update cart summary
          updateCartSummary()
        }
      })
    })

    // Remove Buttons
    const removeButtons = document.querySelectorAll(".remove-btn")
    removeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const item = this.closest(".cart-item")
        const index = Number.parseInt(item.getAttribute("data-index"))

        // Remove item from localStorage
        removeCartItem(index)

        // Animate removal
        item.style.opacity = "0"
        item.style.height = item.offsetHeight + "px"
        item.style.marginTop = "0"
        item.style.marginBottom = "0"
        item.style.padding = "0"
        item.style.overflow = "hidden"

        setTimeout(() => {
          item.style.height = "0"

          setTimeout(() => {
            // Reload cart items to update indexes
            loadCartItems()
          }, 300)
        }, 300)
      })
    })
  }

  // Update cart item quantity in localStorage
  function updateCartItemQuantity(index, quantity) {
    const cart = JSON.parse(localStorage.getItem("cart")) || []

    if (index >= 0 && index < cart.length) {
      cart[index].quantity = quantity
      localStorage.setItem("cart", JSON.stringify(cart))

      // Update cart count in header
      updateCartCount()
    }
  }

  // Remove cart item from localStorage
  function removeCartItem(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || []

    if (index >= 0 && index < cart.length) {
      cart.splice(index, 1)
      localStorage.setItem("cart", JSON.stringify(cart))

      // Update cart count in header
      updateCartSummary()
      updateCartCount()
    }
  }

  // Update cart count in header
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

    const cartCountElement = document.querySelector(".cart-count")
    if (cartCountElement) {
      cartCountElement.textContent = totalItems
    }
  }

  // Update Cart Summary
  function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const cartSummary = document.querySelector(".cart-summary")

    if (!cartSummary) return

    // Calculate subtotal
    let subtotal = 0
    cart.forEach((item) => {
        subtotal += item.price * item.quantity
    })

    // Update subtotal
    const subtotalElement = cartSummary.querySelector(".summary-row:first-child span:last-child")
    if (subtotalElement) {
        subtotalElement.textContent = "PKR " + subtotal.toFixed(2)
    }

    // Get shipping cost - FIX: Parse PKR instead of $
    const shippingElement = cartSummary.querySelector(".summary-row:nth-child(2) span:last-child")
    const shippingText = shippingElement ? shippingElement.textContent : "PKR4.99"
    const shipping = shippingElement ? Number.parseFloat(shippingText.replace("PKR", "")) : 4.99

    // Calculate and update tax (assuming 12.5%)
    const taxElement = cartSummary.querySelector(".summary-row:nth-child(3) span:last-child")
    if (taxElement) {
        const tax = subtotal * 0.125
        taxElement.textContent = "PKR " + tax.toFixed(2)
    }

    // Calculate and update total - FIX: Parse PKR instead of $
    const totalElement = cartSummary.querySelector(".summary-row.total span:last-child")
    if (totalElement) {
        const taxText = taxElement ? taxElement.textContent : "PKR0.00"
        const tax = Number.parseFloat(taxText.replace("PKR", ""))
        const total = subtotal + shipping + tax
        totalElement.textContent = "PKR " + total.toFixed(2)
    }
    

  }

  // Shipping Method Selection
  const shippingOptions = document.querySelectorAll('input[name="shipping-method"]')
  shippingOptions.forEach((option) => {
    option.addEventListener("change", function () {
      const shippingPrice = this.closest(".shipping-option").querySelector(".option-price").textContent

      // Update shipping price in cart summary
      const shippingElement = document.querySelector(".cart-summary .summary-row:nth-child(2) span:last-child")
      if (shippingElement) {
        shippingElement.textContent = shippingPrice
        updateCartSummary()
      }
    })
  })

  // Confetti Animation for Order Confirmation
  function createConfetti() {
    const confettiContainer = document.createElement("div")
    confettiContainer.className = "confetti-container"
    document.body.appendChild(confettiContainer)

    // Create confetti pieces
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div")
      confetti.className = "confetti"
      confetti.style.left = Math.random() * 100 + "vw"
      confetti.style.animationDelay = Math.random() * 5 + "s"
      confetti.style.backgroundColor = getRandomColor()
      confettiContainer.appendChild(confetti)
    }

    // Remove confetti after animation
    setTimeout(() => {
      confettiContainer.remove()
    }, 10000)
  }

  // Helper function to get random color
  function getRandomColor() {
    const colors = ["#ff6b35", "#2ec4b6", "#ff9f1c", "#011627", "#fdfffc"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // Format Credit Card Number
  const cardNumberInput = document.getElementById("card-number")
  if (cardNumberInput) {
    cardNumberInput.addEventListener("input", function (e) {
      // Remove non-digits
      let value = this.value.replace(/\D/g, "")

      // Add spaces after every 4 digits
      value = value.replace(/(\d{4})(?=\d)/g, "$1 ")

      // Limit to 16 digits (19 characters with spaces)
      if (value.length > 19) {
        value = value.slice(0, 19)
      }

      this.value = value
    })
  }

  // Format Expiry Date
  const expiryDateInput = document.getElementById("expiry-date")
  if (expiryDateInput) {
    expiryDateInput.addEventListener("input", function (e) {
      // Remove non-digits
      let value = this.value.replace(/\D/g, "")

      // Add slash after 2 digits
      if (value.length > 2) {
        value = value.slice(0, 2) + "/" + value.slice(2)
      }

      // Limit to 4 digits (5 characters with slash)
      if (value.length > 5) {
        value = value.slice(0, 5)
      }

      this.value = value
    })
  }

  // Add CSS for confetti animation
  const style = document.createElement("style")
  style.textContent = `
        .confetti-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        }
        
        .confetti {
            position: absolute;
            top: -10px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            animation: confetti-fall 5s linear infinite;
        }
        
        @keyframes confetti-fall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `
  document.head.appendChild(style)

  // Review Popup
  async function showReviewPopup() {
    await processOrderFromLocalStorage("shippingInfo")
    // processOrderFromLocalStorage("cart")
    // Create popup container
    const popupContainer = document.createElement("div")
    popupContainer.className = "review-popup-container"

    // Create popup content
    popupContainer.innerHTML = `
        <div class="review-popup">
            <button class="close-review-popup"><i class="fas fa-times"></i></button>
            <h3>Thank You for Your Order!</h3>
            <p>We'd love to hear your feedback. How was your shopping experience?</p>
            <div class="star-rating">
                <i class="far fa-star" data-rating="1"></i>
                <i class="far fa-star" data-rating="2"></i>
                <i class="far fa-star" data-rating="3"></i>
                <i class="far fa-star" data-rating="4"></i>
                <i class="far fa-star" data-rating="5"></i>
            </div>
            <div class="rating-text">Click to rate</div>
            <textarea placeholder="Tell us more about your experience (optional)"></textarea>
            <button class="submit-review-btn" disabled>Submit Review</button>
        </div>
    `

    // Add popup to body
    document.body.appendChild(popupContainer)

    // Show popup with animation
    setTimeout(() => {
      popupContainer.classList.add("active")
    }, 10)

    // Close popup
    const closeBtn = popupContainer.querySelector(".close-review-popup")
    closeBtn.addEventListener("click", () => {
      popupContainer.classList.remove("active")
      localStorage.clear()
      updateCartCount()
      setTimeout(() => {
        popupContainer.remove()
      }, 300)
    })

    // Star rating functionality
    const stars = popupContainer.querySelectorAll(".star-rating i")
    const ratingText = popupContainer.querySelector(".rating-text")
    const submitBtn = popupContainer.querySelector(".submit-review-btn")
    let selectedRating = 0

    stars.forEach((star) => {
      // Hover effect
      star.addEventListener("mouseenter", () => {
        const rating = Number.parseInt(star.getAttribute("data-rating"))
        highlightStars(rating)
      })

      // Click to select rating
      star.addEventListener("click", () => {
        selectedRating = Number.parseInt(star.getAttribute("data-rating"))
        highlightStars(selectedRating)
        updateRatingText(selectedRating)
        submitBtn.disabled = false
      })
    })

    // Reset stars on mouse leave if no rating selected
    const starContainer = popupContainer.querySelector(".star-rating")
    starContainer.addEventListener("mouseleave", () => {
      if (selectedRating === 0) {
        highlightStars(0)
      } else {
        highlightStars(selectedRating)
      }
    })

    // Highlight stars up to the given rating
    function highlightStars(rating) {
      stars.forEach((star) => {
        const starRating = Number.parseInt(star.getAttribute("data-rating"))
        if (starRating <= rating) {
          star.className = "fas fa-star"
        } else {
          star.className = "far fa-star"
        }
      })
    }

    // Update rating text based on selected rating
    function updateRatingText(rating) {
      const texts = ["Click to rate", "Poor", "Fair", "Good", "Very Good", "Excellent"]
      ratingText.textContent = texts[rating]
    }

    // Submit review
    submitBtn.addEventListener("click", () => {
      const reviewText = popupContainer.querySelector("textarea").value

      // In a real application, you would send this data to your server
      console.log("Review submitted:", {
        rating: selectedRating,
        comment: reviewText,
      })

      localStorage.clear()
      updateCartCount()

      // Show thank you message
      popupContainer.innerHTML = `
            <div class="review-popup thank-you">
                <h3>Thank You for Your Review!</h3>
                <p>We appreciate your feedback.</p>
                <div class="submitted-rating">
                    ${Array(selectedRating).fill('<i class="fas fa-star"></i>').join("")}
                </div>
                <button class="close-thank-you">Close</button>
            </div>
        `

      // Close thank you message
      const closeThankYouBtn = popupContainer.querySelector(".close-thank-you")
      closeThankYouBtn.addEventListener("click", () => {
        popupContainer.classList.remove("active")
        setTimeout(() => {
          popupContainer.remove()
        }, 300)
      })
    })
  }

  // Add CSS for review popup
  const reviewPopupStyle = document.createElement("style")
  reviewPopupStyle.textContent = `
    .review-popup-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s, visibility 0.3s;
    }
    
    .review-popup-container.active {
        opacity: 1;
        visibility: visible;
    }
    
    .review-popup {
        background-color: white;
        border-radius: 10px;
        padding: 30px;
        width: 90%;
        max-width: 500px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        position: relative;
        transform: translateY(20px);
        opacity: 0;
        transition: transform 0.3s, opacity 0.3s;
        animation: popup-appear 0.5s forwards;
    }
    
    @keyframes popup-appear {
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .close-review-popup {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #888;
        transition: color 0.2s;
    }
    
    .close-review-popup:hover {
        color: #333;
    }
    
    .review-popup h3 {
        margin-top: 0;
        color: #ff6b35;
        font-size: 24px;
        text-align: center;
    }
    
    .review-popup p {
        text-align: center;
        margin-bottom: 20px;
        color: #555;
    }
    
    .star-rating {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 10px;
        font-size: 30px;
    }
    
    .star-rating i {
        color: #ffc107;
        cursor: pointer;
        transition: transform 0.2s;
    }
    
    .star-rating i:hover {
        transform: scale(1.2);
    }
    
    .rating-text {
        text-align: center;
        margin-bottom: 20px;
        font-size: 14px;
        color: #666;
        height: 20px;
    }
    
    .review-popup textarea {
        width: 100%;
        height: 100px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        resize: none;
        margin-bottom: 20px;
        font-family: inherit;
    }
    
    .submit-review-btn {
        display: block;
        width: 100%;
        padding: 12px;
        background-color: #ff6b35;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    
    .submit-review-btn:hover {
        background-color: #e55a2a;
    }
    
    .submit-review-btn:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
    
    .thank-you {
        text-align: center;
    }
    
    .submitted-rating {
        font-size: 30px;
        color: #ffc107;
        margin: 20px 0;
    }
    
    .close-thank-you {
        display: inline-block;
        padding: 10px 20px;
        background-color: #ff6b35;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    
    .close-thank-you:hover {
        background-color: #e55a2a;
    }
  `
  document.head.appendChild(reviewPopupStyle)

  // Initialize the page
  loadCartItems()
  updateCartCount()
})

// Add this function to display purchased items in the confirmation page
let currentStep = 1;
function displayOrderItems() {
  // Only run this on the confirmation step
  if (currentStep !== 4) return;
  
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const orderItemsContainer = document.querySelector(".order-details");
  
  if (!orderItemsContainer || cart.length === 0) return;
  
  // Get shipping information from localStorage
  const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo")) || {};
  
  // Create a section for order items
  const orderItemsSection = document.createElement("div");
  orderItemsSection.className = "order-items-section";
  orderItemsSection.innerHTML = `
    <h3>Purchased Items</h3>
    <div class="order-items-list"></div>
  `;
  
  // Insert it before the confirmation actions
  const confirmationActions = document.querySelector(".confirmation-actions");
  if (confirmationActions) {
    confirmationActions.parentNode.insertBefore(orderItemsSection, confirmationActions);
  }
  
  const orderItemsList = orderItemsSection.querySelector(".order-items-list");
  
  // Add each item to the list
  cart.forEach(item => {
    const itemElement = document.createElement("div");
    itemElement.className = "order-item";
    itemElement.innerHTML = `
      <div class="order-item-details">
        <div class="order-item-image">
          <img src="${item.image}" alt="${item.name}" width="60" height="60">
        </div>
        <div class="order-item-info">
          <h4>${item.name}</h4>
          <p>${item.size || ""}</p>
        </div>
      </div>
      <div class="order-item-quantity">
        <span>Qty: ${item.quantity}</span>
      </div>
      <div class="order-item-price">
        <span>PKR ${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    `;
    orderItemsList.appendChild(itemElement);
  });
  
  // Update order details with shipping information
  const orderDetails = document.querySelector(".order-details");
  if (orderDetails && shippingInfo) {
    // Update shipping address
    const shippingAddressRow = orderDetails.querySelector(".detail-row:nth-child(4) span:last-child");
    if (shippingAddressRow && shippingInfo.address) {
      shippingAddressRow.textContent = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zip}, ${shippingInfo.country}`;
    }
    
    // Add customer name
    const customerNameRow = document.createElement("div");
    customerNameRow.className = "detail-row";
    customerNameRow.innerHTML = `
      <span>Customer:</span>
      <span>${shippingInfo.firstName || ""} ${shippingInfo.lastName || ""}</span>
    `;
    orderDetails.insertBefore(customerNameRow, orderDetails.children[1]);
    
    // Add email
    if (shippingInfo.email) {
      const emailRow = document.createElement("div");
      emailRow.className = "detail-row";
      emailRow.innerHTML = `
        <span>Email:</span>
        <span>${shippingInfo.email}</span>
      `;
      orderDetails.insertBefore(emailRow, orderDetails.children[2]);
    }
    
    // Add phone
    if (shippingInfo.phone) {
      const phoneRow = document.createElement("div");
      phoneRow.className = "detail-row";
      phoneRow.innerHTML = `
        <span>Phone:</span>
        <span>${shippingInfo.phone}</span>
      `;
      orderDetails.insertBefore(phoneRow, orderDetails.children[3]);
    }
    
    // Update order date with current date
    const orderDateRow = orderDetails.querySelector(".detail-row:nth-child(2) span:last-child");
    if (orderDateRow) {
      const today = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      orderDateRow.textContent = today.toLocaleDateString('en-US', options);
    }
  }
  
  // Add CSS for order items
  const style = document.createElement("style");
  style.textContent = `
    .order-items-section {
      max-width: 550px;
      margin: 30px auto;
      text-align: left;
      background: linear-gradient(to bottom right, #f9f9f9, #f0f0f0);
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      animation: slideInUp 0.8s ease-out;
      transition: all 0.3s ease;
    }
    
    .order-items-section h3 {
      margin-bottom: 20px;
      font-size: 1.8rem;
      text-align: center;
      position: relative;
      padding-bottom: 15px;
      background: linear-gradient(90deg, #35b2ff, #2ec4b6);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: textGradient 4s linear infinite;
    }
    
    .order-items-section h3::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 3px;
      background: linear-gradient(90deg, #35b2ff, #2ec4b6);
      border-radius: 3px;
      animation: widthPulse 2s infinite alternate;
    }
    
    .order-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
      border-bottom: 1px solid #e2e8f0;
      transition: all 0.3s ease;
    }
    
    .order-item:hover {
      background-color: rgba(255, 255, 255, 0.6);
      padding-left: 10px;
      padding-right: 10px;
      border-radius: 5px;
    }
    
    .order-item-details {
      display: flex;
      align-items: center;
    }
    
    .order-item-image {
      margin-right: 15px;
    }
    
    .order-item-image img {
      border-radius: 5px;
      object-fit: cover;
    }
    
    .order-item-info h4 {
      margin: 0 0 5px 0;
      font-size: 1rem;
    }
    
    .order-item-info p {
      margin: 0;
      font-size: 0.9rem;
      color: #4a5568;
    }
    
    .order-item-quantity {
      font-size: 0.9rem;
      color: #4a5568;
    }
    
    .order-item-price {
      font-weight: 700;
      color: #35b2ff;
    }
  `;
  document.head.appendChild(style);
}

// Save shipping information to localStorage
function saveShippingInfo() {
  const firstName = document.getElementById("first-name")?.value || "";
  const lastName = document.getElementById("last-name")?.value || "";
  const email = document.getElementById("email")?.value || "";
  const phone = document.getElementById("phone")?.value || "";
  const address = document.getElementById("address")?.value || "";
  const city = document.getElementById("city")?.value || "";
  const state = document.getElementById("state")?.value || "";
  const zip = document.getElementById("zip")?.value || "";
  const country = document.getElementById("country")?.value || "";
  
  const shippingMethod = document.querySelector('input[name="shipping-method"]:checked')?.value;
  const shippingPrice = document.querySelector(`label[for="${shippingMethod}"] .option-price`)?.textContent || "";
  
  const shippingInfo = {
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    state,
    zip,
    country,
    shippingMethod,
    shippingPrice,
    orderDate: getDate('today'),
    newDate: getDate('newDate'),
    orderNo: orderNo
  
  };
  
  localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
}


function getDate(date){

  const today = new Date();
  const twoDaysLater = new Date(today);
  let orderDate = ''

  if(date == 'today'){
     orderDate = today.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
  });

  }

  if(date == 'newDate'){

    twoDaysLater.setDate(today.getDate() + 2);
     orderDate = twoDaysLater.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
  });

  }

return orderDate
 
}

function populateOrderDetails(){
  const orderDetails = document.querySelector('.order-details')
  const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo")) || {};

  orderDetails.innerHTML = `
                            <h3>Order Details</h3>
                            <div class="detail-row">
                                <span>Order Number:</span>
                                <span>${shippingInfo.orderNo}</span>
                            </div>
                            <div class="detail-row">
                                <span>Order Date:</span>
                                <span>${shippingInfo.orderDate}</span>
                            </div>
                            <div class="detail-row">
                                <span>Estimated Delivery:</span>
                                <span>${shippingInfo.newDate}</span>
                            </div>
                            <div class="detail-row">
                                <span>Full Name:</span>
                                <span>${shippingInfo.firstName} ${shippingInfo.lastName}</span>
                            </div>
                            <div class="detail-row">
                                <span>email:</span>
                                <span>${shippingInfo.email}</span>
                            </div>
                            <div class="detail-row">
                                <span>Phone No:</span>
                                <span>${shippingInfo.phone}</span>
                            </div>
                            <div class="detail-row">
                                <span>Shipping Address:</span>
                                <span>${shippingInfo.city} , ${shippingInfo.address}</span>
                            </div>
                            <div class="detail-row">
                                <span>Postal Code:</span>
                                <span>${shippingInfo.zip}</span>
                            </div>
                            <div class="detail-row">
                                <span>Payment Method:</span>
                                <span>${shippingInfo.shippingMethod}</span>
                            </div>
                            
  `
}

function randomOrderNo(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let orderId = '';
  for (let i = 0; i < length; i++) {
    orderId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return orderId;
}


async function processOrderFromLocalStorage(localStorageName) {
  try {
    const orderData = await JSON.parse(localStorage.getItem("shippingInfo")) || []
    if (!orderData) {
      console.error("No order data found in localStorage")
      return
    }
    const response = await fetch("http://localhost:3000/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderData }),
    })

    const result = await response.json()
    if (result.success) {
      console.log("Order processed successfully:", result)

      alert("Your order has been placed successfully!")
    } else {
      console.error("Failed to process order:", result.message)
      alert("There was an error processing your order. Please try again.")
    }
  } catch (error) {
    console.error("Error sending order data:", error)
    alert("There was an error processing your order. Please try again.")
  }
  addToDataBase(localStorageName)
}


async function addToDataBase(localStorageName){
  try {
    let orderData = JSON.parse(localStorage.getItem(`${localStorageName}`)) || [];
    
    if (!orderData) {
      console.error("No order data found in localStorage")
      return
    }
    const response = await fetch(`http://localhost:3000/api/${localStorageName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderData }),
    })

    const result = await response.json()
    if (result.success) {
      console.log("Order processed successfully:", result)
      alert("Your order has been placed successfully!")
    } else {
      console.error("Failed to process order:", result.message)
      alert("There was an error processing your order. Please try again.")
    }
  } catch (error) {
    console.error("Error sending order data:", error)
    alert("There was an error processing your order. Please try again.")
  }

}