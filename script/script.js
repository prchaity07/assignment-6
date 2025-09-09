let cart = [];

// Add item to cart
const addToCart = (id, name, price) => {
    const addItem = cart.find(item => item.id === id);
    if (addItem) {
        addItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCart();
}

// Remove item from cart
const removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Update Cart 
const updateCart = () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total");

    cartItemsContainer.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        const cartDiv = document.createElement("div");
        
        cartDiv.innerHTML = `
          <div class="flex  justify-between items-center text-start bg-[#DCFCE7] px-3 py-2 rounded-md mb-2">
          <ul class="space-y-1 flex flex-col justify-between">
             <li class =" text-sm font-semibold ">${item.name}</li>
             <li class="text-xl font-bold opacity-55">৳ ${item.price * item.quantity} * ${item.quantity}</li>
          </ul>
          <button onclick="removeFromCart('${item.id}')" class="text-red-500 font-bold">❌</button>
        </div>
        
        `;
        cartItemsContainer.appendChild(cartDiv);
    });

    
    totalPrice.textContent = ` ৳ ${total} `;
}

// Spinner
const showSpinner = () => document.getElementById("spinner").classList.remove("hidden");
const hideSpinner = () => document.getElementById("spinner").classList.add("hidden");

// Set active category
const activeBtn = (clickedBtn) => {
    document.querySelectorAll("#categories p").forEach(btn => {
        btn.classList.remove("bg-[#15803D]", "text-white");
        btn.classList.add("text-[#1F2937]");
    });
    clickedBtn.classList.add("bg-[#15803D]", "text-white");
    clickedBtn.classList.remove("text-[#1F2937]");
}

// Load categories
const loadCategory = () => {
    showSpinner();
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then(data => {
            displayCategory(data.categories);
            hideSpinner();
            // Default load All Trees
            const allBtn = document.querySelector("#categories p");
            activeBtn(allBtn);
            loadAllTrees();
        });
}

// Load all trees
const loadAllTrees = () => {
    showSpinner();
    fetch("https://openapi.programming-hero.com/api/plants")
        .then(res => res.json())
        .then(data => {
            displayTrees(data.plants);
            hideSpinner();
        });
}

// Load trees by category
const showCart = (categoryId, btn) => {
    activeBtn(btn); // Active style
    showSpinner();
    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
        .then(res => res.json())
        .then(data => {
            displayTrees(data.plants);
            hideSpinner();
        });
}

// Load tree details
const loadTreesDetail = async (id) => {
    showSpinner();
    const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
    const details = await res.json();
    displayTreesDetails(details.plants);
    hideSpinner();
}

// Display tree details
const displayTreesDetails = (plants) => {
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
        <div class="flex flex-col bg-white px-5 py-4 rounded-lg h-[100%] text-start">
            <img src="${plants.image}" alt="" class="w-full h-60 object-cover rounded-lg">
            <div class="flex-1 flex flex-col justify-between mt-3">
                <div>
                    <h2 class="text-2xl font-semibold text-[#1F2937]">${plants.name}</h2>
                    <p class="font-normal text-[1rem] text-[#1F2937] mt-2 line-clamp-3">${plants.description}</p>
                </div>
                <div>
                    <div class="flex justify-between items-center mt-3">
                        <p class="bg-[#DCFCE7] text-[#15803D] rounded-3xl px-5 py-1">${plants.category}</p>
                        <p class="text-[14px] font-semibold text-[#1F2937]"><span>${plants.price}</span>৳</p>
                    </div>
                    <button onclick="addToCart('${plants.id}', '${plants.name}', ${plants.price})" class="bg-[#15803D] w-full py-3 text-xl text-white font-semibold rounded-full mt-3">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
    document.getElementById("trees-modal").showModal();
}

// Display trees
const displayTrees = (trees) => {
    const treesContainer = document.getElementById("trees-container");
    treesContainer.innerHTML = "";

    trees.forEach(tree => {
        const card = document.createElement("div");
        card.innerHTML = `
            
            <div class="flex flex-col bg-white px-5 py-4 rounded-lg h-[100%] text-start">
            
                <img src="${tree.image}" alt="" class="w-full h-60 object-cover rounded-lg">
                <div class="flex-1 flex flex-col justify-between mt-3">
                    <div>
                        <h2 onclick="loadTreesDetail('${tree.id}')" class="text-2xl font-semibold text-[#1F2937] cursor-pointer">${tree.name}</h2>
                        <p class="font-normal text-[1rem] text-[#1F2937] mt-2 line-clamp-3">${tree.description}</p>
                    </div>
                    <div>
                        <div class="flex justify-between items-center mt-3">
                            <p class="bg-[#DCFCE7] text-[#15803D] text-xl font-semibold rounded-3xl px-5 py-1">${tree.category}</p>
                            <p class=" text-xl font-semibold  text-[#1F2937]">৳<span>${tree.price}</span></p>
                        </div>
                        <button onclick="addToCart('${tree.id}', '${tree.name}', ${tree.price})" class="bg-[#15803D] w-full py-3 text-xl text-white font-semibold rounded-full mt-3">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        treesContainer.appendChild(card);
    });
    hideSpinner();
}

// Display categories
const displayCategory = (allTrees) => {
    const categoryContainer = document.getElementById("categories");
    categoryContainer.innerHTML = "";

    // All Trees btn
    const allTreesBtn = document.createElement("p");
    allTreesBtn.textContent = "All Trees";
    allTreesBtn.className = "cursor-pointer m-2 px-3 py-2 rounded-lg hover:bg-[#15803D] hover:text-white text-[#1F2937] font-semibold text-lg";
    allTreesBtn.addEventListener("click", () => {
        activeBtn(allTreesBtn);
        loadAllTrees();
    });
    categoryContainer.appendChild(allTreesBtn);

    // Other categories
    allTrees.forEach(category => {
        const btn = document.createElement("p");
        btn.textContent = category.category_name;
        btn.className = "cursor-pointer m-2 px-3 py-2 rounded-lg hover:bg-[#15803D] hover:text-white text-[#1F2937] font-semibold text-lg";
        btn.addEventListener("click", () => showCart(category.id, btn));
        categoryContainer.appendChild(btn);
    });
}

// Initial load
loadCategory();
