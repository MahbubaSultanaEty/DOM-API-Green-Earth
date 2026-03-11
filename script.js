// console.log("connected")

const catagoriesContainer = document.getElementById("catagories-container");
const treesContainer = document.getElementById("trees-container");
// console.log(treesContainer);
const loadingSpinner= document.getElementById("loadong-spinner")
const allTreesBtn = document.getElementById("allTreesBtn");
const treeDetailModal = document.getElementById("tree-details-modal");
// const cartContainer = document.getElementById("cart-container");
// let cart= []

// load catagories
async function loadCatagories(){
    const res =await fetch("https://openapi.programming-hero.com/api/categories");
    const data = await res.json();
    // console.log(data);
    data.categories.forEach(catagory => {
        
        const btn = document.createElement("button");
        btn.className = "btn  w-full shadow";
        btn.textContent = catagory.category_name;
        btn.onclick = () => selectCatagory(catagory.id, btn);
        catagoriesContainer.appendChild(btn);
    });
}
loadCatagories()

async function selectCatagory(catagoryId, btn) {
    // console.log(catagoryId, btn);
    
    showLoading()
    const allBtns = document.querySelectorAll("#catagories-container button, #allTrees");
    console.log(allBtns);
    allBtns.forEach(btn => {
        btn.classList.remove("btn-success");
        btn.classList.add("btn-outline")
    })
    btn.classList.add("btn-success");
    btn.classList.remove("btn-outline");
  
    const res = await fetch(`https://openapi.programming-hero.com/api/category/${catagoryId}`);
    const data = await res.json();
    // console.log(data);
    
    treesContainer.innerHTML = " ";
    displayTrees(data.plants);
    hideLoading()
}


allTreesBtn.addEventListener('click', () => {
    
    console.log(allTreesBtn)
    allTreesBtn.classList.add("btn-success");
        allTreesBtn.addEventListener('click', () => {
    
    console.log(allTreesBtn)
    allTreesBtn.classList.add("btn-success");
        showLoading()
    const allBtns = document.querySelectorAll("#catagories-container button, #allTreesBtn");
    console.log(allBtns);
    allBtns.forEach(btn => {
        btn.classList.remove("btn-success");
        btn.classList.add("btn-outline")
    })
    allTreesBtn.classList.add("btn-success");
    allTreesBtn.classList.remove("btn-outline");
  
    
    loadTrees()
    hideLoading()
})
    const allBtns = document.querySelectorAll("#catagories-container button, #allTreesBtn");
    console.log(allBtns);
    allBtns.forEach(btn => {
        btn.classList.remove("btn-success");
        btn.classList.add("btn-outline")
    })
    allTreesBtn.classList.add("btn-success");
    allTreesBtn.classList.remove("btn-outline");
  
    
    loadTrees()
    hideLoading()
})

// loading spinner
function showLoading() {
    loadingSpinner.classList.remove("hidden");
    treesContainer.innerHTML = " ";
}
function hideLoading() {
     loadingSpinner.classList.add("hidden");
}

// load all trees
async function loadTrees() {
    showLoading()
    
    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await res.json();
    displayTrees(data.plants);

    hideLoading()
}    
loadTrees()

// display all trees
function displayTrees(trees) {
    // console.log(trees);
    trees.forEach(tree => {
        // console.log(tree);

        const card = document.createElement("div");
        card.innerHTML = `
                            <div class="card bg-base-100 shadow-sm ">
  <figure class="px-4 pt-4 ">
    <img
      src="${tree.image}"
      alt="${tree.name}"
      class="rounded-xl h-[200px] w-[180px] md:w-[200px]" />
  </figure>
  <div class="card-body items-center text-left">
    <h2 onclick="openModal(${tree.id})" class="card-title btn btn-ghost">${tree.name}</h2>
    <p class="line-clamp-2">${tree.description}</p>

    <div class="flex items-start w-full mb-3 justify-between ">
      <div class="badge line-clamp-1 badge-outline bg-green-50 text-green-600">${tree.category}</div>
        <h2 class="font-bold  md:text-lg md:font-semibold text-black">ট${tree.price}</h2>
   </div>

    <div class="card-actions w-full">
      <button onclick="addToCart(${tree.id}, '${tree.name}' , ${tree.price})" class="btn btn-success rounded-full w-full">Add to Cart</button>
    </div>
  </div>
</div>
        `
 treesContainer.appendChild(card)
    });
}

// tree detail modal
async function openModal(treeId) {
    console.log(treeId)
    const res = await fetch(`https://openapi.programming-hero.com/api/plant/${treeId}`);
    const data = await res.json();
    console.log(data)
    const plants = data.plants;
    console.log(plants);
   
        
        treeDetailModal.innerHTML = `
    
            <div class="modal-box">

                <!-- Modal Header with Close Button -->
                <div class="flex justify-between items-start mb-4">
                    <h3 class="font-bold text-2xl text-green-700" id="modalTitle">Tree Details</h3>
                    <button class="btn btn-sm btn-circle btn-ghost"
                        onclick="document.getElementById('tree-details-modal').close()">✕</button>
                </div>

                <!-- Modal Content -->
                <div class=" gap-6">
                    <!-- Plant Image -->
                    <img id="modalImage" src="${plants.image}" alt="plant" class="w-full h-[250px] object-cover rounded-lg mb-12">

                    <!-- Plant Details -->
                    <div class="">
                        <p class="text-sm text-gray-500 mb-2">
                            <span class="font-bold">Category:</span>
                        <span id="modalCategory" class="badge badge-primary">${plants.category}</span>
                        </p>
                        <p class="text-sm text-gray-600 mb-4">
                            <span id="modalDescription">${plants.description}</span>
                        </p>
                        <div class="flex items-baseline gap-2 mb-6">
                            <span class="text-3xl font-bold text-green-600">$<span id="modalPrice">${plants.price}</span></span>
                        </div>
                    </div>
                </div>


                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn">Close</button>
                    </form>
                </div>
            </div>
    
    `
    treeDetailModal.showModal();
}


// add to cart
// function addToCart(id, name, price) {
//     console.log(id, name, price);

//     const existingItem = cart.find(item => item.id === id)
//         if(existingItem) {
//            existingItem.quantity++
//         } else {
//             cart.push(
//                 {
//                     id,
//                     name,
//                     price,
//                     quantity: 1
//                 }
//             ) }

//     updateCart()
// }
// function updateCart() {
//     cartContainer.innerHTML = " ";
//     console.log(cart);

//     let total = 0;
//     cart.forEach(cartItem => {
//         total+= cartItem.price * cartItem.quantity

//         const cartItemDiv = document.createElement('div');
//         cartItemDiv.innerHTML = `
//           <div class="card card-body bg-slate-100 shadow-md">
//                         <div class="flex justify-between items-center">
//                             <div>
//                                 <h2>${cartItem.name}</h2>
//                                 <p> $${cartItem.price} * ${cartItem.quantity}</p>
//                             </div>
//                             <button onclick="removeFromCart(${cartItem.id})" class="btn btn-ghost ">✕</button>
//                         </div>
//                         <div class="text-right font-semibold text-xl">$${cartItem.price * cartItem.quantity}</div>
//                     </div>
//         `
//         cartContainer.appendChild(cartItemDiv)
//     })
// }

// // remove from cart
// function removeFromCart(treeId) {
//     const updatedCartElements = cart.filter(item => item.id != treeId);
//     cart = updatedCartElements;
//     updateCart()
// }



// navbar for mobile
const mobileBtn = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});


// gpt generated
// --------------------
// Cart Setup
// Cart setup
const cartContainer = document.getElementById("cart-container");
const checkoutBtn = document.getElementById("checkoutBtn");
let cart = [];

// select all totalPrice elements
function getTotalElements() {
    return document.querySelectorAll(".totalPrice");
}

// Add to cart
function addToCart(id, name, price) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id, name, price, qty: 1 });
    }
    renderCart();
}

// Remove from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

// Render cart items
function renderCart() {
    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;

        const div = document.createElement("div");
        div.className = "flex justify-between items-center bg-base-100 p-3 rounded-lg shadow hover:shadow-md transition-shadow duration-200";

        div.innerHTML = `
            <div>
                <h3 class="font-semibold">${item.name}</h3>
                <span class="text-sm text-gray-500">Qty: ${item.qty}</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="font-bold">$${item.price * item.qty}</span>
                <button class="btn btn-sm btn-error btn-circle">×</button>
            </div>
        `;

        div.querySelector("button").addEventListener("click", () => removeFromCart(item.id));
        cartContainer.appendChild(div);
    });

    // Update all elements with class 'totalPrice'
    getTotalElements().forEach(el => {
        el.textContent = `$${total}`;
    });
}

// Checkout button
checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert(`Checkout successful! Total: $${cart.reduce((sum, item) => sum + item.price * item.qty, 0)}`);
        cart = [];
        renderCart();
    }
});


// reviews

const reviewsContainer = document.getElementById("reviews-container");
const addReviewForm = document.getElementById("addReviewForm");
const reviewName = document.getElementById("reviewName");
const reviewRating = document.getElementById("reviewRating");
const reviewComment = document.getElementById("reviewComment");

// Existing reviews data
let reviews = [
    { name: "Alice", rating: 5, comment: "I love my new Oak tree! Great quality and fast delivery." },
    { name: "Bob", rating: 4, comment: "Good variety of trees. The website is easy to use." }
];

// Function to render stars
function renderStars(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<svg class="w-5 h-5 text-yellow-400 inline-block" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.949a1 1 0 00.95.69h4.152c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.286 3.948c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.175 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.285-3.948a1 1 0 00-.364-1.118L2.025 9.376c-.783-.57-.38-1.81.588-1.81h4.152a1 1 0 00.95-.69l1.286-3.949z"/></svg>';
        } else {
            stars += '<svg class="w-5 h-5 text-gray-300 inline-block" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.949a1 1 0 00.95.69h4.152c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.286 3.948c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.175 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.285-3.948a1 1 0 00-.364-1.118L2.025 9.376c-.783-.57-.38-1.81.588-1.81h4.152a1 1 0 00.95-.69l1.286-3.949z"/></svg>';
        }
    }
    return stars;
}

// Function to render all reviews
function renderReviews() {
    reviewsContainer.innerHTML = "";
    reviews.forEach(review => {
        const card = document.createElement("div");
        card.className = "bg-base-100 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-200 text-left";

        card.innerHTML = `
            <div class="mb-2">${renderStars(review.rating)}</div>
            <p class="text-green-700 mb-4">${review.comment}</p>
            <h3 class="font-semibold text-green-900">- ${review.name}</h3>
        `;
        reviewsContainer.appendChild(card);
    });
}

// Initial render
renderReviews();

// Handle Add Review form submit
addReviewForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = reviewName.value.trim();
    const rating = parseInt(reviewRating.value);
    const comment = reviewComment.value.trim();

    if (!name || !rating || !comment) return;

    reviews.push({ name, rating, comment });
    renderReviews();

    // Reset form
    addReviewForm.reset();
});