// Products Page JavaScript
let products = []
document.addEventListener("DOMContentLoaded", () => {
  // Generate Products (for demo purposes)
  async function generateProducts(category = "all", flavor = "all", sort = "popularity") {
    const productsContainer = document.getElementById("products-container")
    if (!productsContainer) return

    // In a real application, you would fetch this data from your server
    const response = await fetch("http://localhost:3000/api/Products")
    if (!response.ok) throw new Error("Network response was not ok")
    products = await response.json()

    // Filter products
    let filteredProducts = products

    if (category !== "all") {
      filteredProducts = filteredProducts.filter((product) => product.category === category)
    }

    if (flavor !== "all") {
      filteredProducts = filteredProducts.filter((product) => product.flavor === flavor)
    }

    // Sort products
    switch (sort) {
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "newest":
        // In a real app, you would sort by date
        filteredProducts.reverse()
        break
      default:
        // Default is popularity (no change to order)
        break
    }

    // Generate HTML
    let html = ""

    if (filteredProducts.length === 0) {
      html = '<div class="no-products">No products match your filters. Please try different criteria.</div>'
    } else {
      filteredProducts.forEach((product) => {
        html += `
                <div class="product-card" data-id="${product.id}">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <h4>${product.bottlesize}</h4>
                        <p>${product.description}</p>
                        <span class="price">$${product.price.toFixed(2)}</span>
                        <div class="product-actions">
                            <button class="btn-small add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                        </div>
                    </div>
                </div>
                `
      })
    }

    productsContainer.innerHTML = html

    // Add event listeners to the new products
    const productCards = document.querySelectorAll(".product-card")
    productCards.forEach((card) => {
      card.addEventListener("click", function (e) {
        // Don't open modal if clicking on buttons
        if (e.target.closest(".product-actions")) return

        const productId = this.getAttribute("data-id")
        openProductModal(productId)
      })
    })

    // Add event listeners to the "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn")
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.stopPropagation() // Prevent opening the modal
        const productId = this.getAttribute("data-id")
        const product = products.find((p) => p.id == productId)
        if (product) {
          addToCart(product, 1)

          // Show added to cart message
          this.textContent = "Added to Cart!"
          this.style.backgroundColor = "#2ec4b6"

          setTimeout(() => {
            this.textContent = "Add to Cart"
            this.style.backgroundColor = ""
          }, 1500)
        }
      })
    })
  }

  // Initialize products on page load
  generateProducts()

  // Add these event listeners once during DOMContentLoaded instead of every time the modal opens
  // Add this code right after the generateProducts() call in the DOMContentLoaded event

  // Close modal when clicking on X or outside the modal
  const modal = document.getElementById("product-modal")
  const closeModal = document.querySelector(".close-modal")
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      closeProductModal()
    })
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeProductModal()
      }
    })

    // Tab functionality
    const tabBtns = document.querySelectorAll(".tab-btn")
    const tabPanes = document.querySelectorAll(".tab-pane")

    tabBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons and panes
        tabBtns.forEach((b) => b.classList.remove("active"))
        tabPanes.forEach((p) => p.classList.remove("active"))

        // Add active class to clicked button and corresponding pane
        this.classList.add("active")
        const tabId = this.getAttribute("data-tab")
        document.getElementById(tabId).classList.add("active")
      })
    })

    // Quantity selector
    const minusBtn = document.querySelector(".quantity-btn.minus")
    const plusBtn = document.querySelector(".quantity-btn.plus")
    const quantityInput = document.getElementById("product-quantity")

    if (minusBtn && plusBtn && quantityInput) {
      minusBtn.addEventListener("click", () => {
        const value = Number.parseInt(quantityInput.value)
        if (value > 1) {
          quantityInput.value = value - 1
        }
      })

      plusBtn.addEventListener("click", () => {
        const value = Number.parseInt(quantityInput.value)
        quantityInput.value = value + 1
      })
    }

    // Add to cart button in modal
    const addToCartBtnModal = modal.querySelector(".modal-product-actions .add-to-cart-btn")
    if (addToCartBtnModal) {
      addToCartBtnModal.addEventListener("click", function () {
        const quantityInput = document.getElementById("product-quantity")
        const quantity = Number.parseInt(quantityInput.value)
        const productId = modal.getAttribute("data-product-id")
        const product = products.find((p) => p.id == productId)

        if (product) {
          addToCart(product, quantity)

          // Show added to cart message
          this.textContent = "Added to Cart!"
          this.style.backgroundColor = "#2ec4b6"

          setTimeout(() => {
            this.textContent = "Add to Cart"
            this.style.backgroundColor = ""
            closeProductModal()
          }, 1500)
        }
      })
    }
  }

  // Product Modal
  function openProductModal(productId) {
    const modal = document.getElementById("product-modal")
    if (!modal) return

    const product = products.find((p) => p.id == productId) || products[0]

    // Populate modal with product details
    document.getElementById("modal-image").src = product.image
    document.getElementById("modal-title").textContent = product.name
    document.getElementById("modal-description").textContent = product.description
    document.getElementById("modal-liters").textContent = product.bottlesize
    document.getElementById("modal-category").textContent = product.category
    document.getElementById("modal-price").textContent = "$" + product.price.toFixed(2)

    // Reset quantity to 1
    const quantityInput = document.getElementById("product-quantity")
    if (quantityInput) {
      quantityInput.value = 1
    }

    // Reset add to cart button
    const addToCartBtnModal = modal.querySelector(".modal-product-actions .add-to-cart-btn")
    if (addToCartBtnModal) {
      addToCartBtnModal.textContent = "Add to Cart"
      addToCartBtnModal.style.backgroundColor = ""
    }

    // Store the current product ID in the modal
    modal.setAttribute("data-product-id", productId)

    // Show modal with animation
    modal.style.display = "block"
    document.body.style.overflow = "hidden" // Prevent scrolling
  }

  function closeProductModal() {
    const modal = document.getElementById("product-modal")
    if (!modal) return

    modal.style.display = "none"
    document.body.style.overflow = "" // Restore scrolling
  }

  // Add to cart function
  function addToCart(product, quantity) {
    // Ensure quantity is a valid number
    quantity = Number.parseInt(quantity) || 1
    if (quantity < 1) quantity = 1

    // Get existing cart items
    const cart = JSON.parse(localStorage.getItem("cart")) || []

    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex((item) => item.id === product.id)

    if (existingItemIndex !== -1) {
      // Update quantity if product already in cart
      cart[existingItemIndex].quantity += quantity
    } else {
      // Add new item to cart
      cart.push({
        id: product.id,
        name: product.name,
        image: product.image,
        size: product.bottlesize,
        category: product.category,
        price: product.price,
        quantity: quantity,
      })
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart))

    // Update cart count in the header
    updateCartCount()

    console.log("Cart updated:", cart)
  }

  // Update cart count in the header
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

    const cartCountElement = document.querySelector(".cart-count")
    if (cartCountElement) {
      cartCountElement.textContent = totalItems
      // let temp = JSON.parse(localStorage.getItem("count")) || []
      // temp = totalItems
      localStorage.setItem("count", JSON.stringify(totalItems))
    }
  }

  // Initialize cart count on page load
  updateCartCount()
})
