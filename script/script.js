let cart = [];

// load categories
const loadCategory = () =>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json()) 
    .then(data => {
        
        displayCategory(data.categories);
    })
    

}

//Load All Trees
const loadAllTrees = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
    .then (  res => res.json())
    .then(data => {
        console.log(data.plants);
        displayTrees(data.plants);
    })
}

// Load Cart
const showCart = (categoryId) =>{
    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then(res => res.json())
    .then(data =>{
        console.log(data.plants)
         displayTrees(data.plants); 
    })
}

// load trees details
const loadTreesDetail = async(id) =>{
    const url =`https://openapi.programming-hero.com/api/plant/${id}`
    const res = await fetch(url);
    const details = await res.json();
    console.log(details)
    displayTreesDetails(details.plants)
}

// display card details
const displayTreesDetails = (plants)=>{
 const detailsBox = document.getElementById("details-container");
 detailsBox.innerHTML = `
  <div class="flex flex-col  bg-white px-5 py-4 rounded-lg h-[100%] text-start ">
             <img  src="${plants.image}" alt=""  class="w-full h-60 object-cover rounded-lg" >
      

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
                <button onclick="addToCart('${plants.id}', '${plants.name}', ${plants.price})"  class="bg-[#15803D] w-full py-3 text-xl text-white font-semibold rounded-full mt-3">Add to Cart</button>
            </div>
        </div>
      </div>
 
 `;

  document.getElementById("trees-modal").showModal()
}


// display Card
const displayTrees= (trees) =>{
    const treesContainer = document.getElementById("trees-container")

    treesContainer.innerHTML ="";

    // get every tree
    trees.forEach(tree => {

        const card = document.createElement("div");

        card.innerHTML = `
           <div class="flex flex-col  bg-white px-5 py-4 rounded-lg h-[100%] text-start ">
             <img  src="${tree.image}" alt=""  class="w-full h-60 object-cover rounded-lg" >
      

            <div class="flex-1 flex flex-col justify-between mt-3">

            <div>
                 <h2 onclick="loadTreesDetail('${tree.id}')" class="text-2xl font-semibold text-[#1F2937]">${tree.name}</h2>
                 <p class="font-normal text-[1rem] text-[#1F2937] mt-2 line-clamp-3">${tree.description}</p>
            </div>

        
        <div>
            <div class="flex justify-between items-center mt-3">
                <p class="bg-[#DCFCE7] text-[#15803D] rounded-3xl px-5 py-1">${tree.category}</p>
                <p class="text-[14px] font-semibold text-[#1F2937]"><span>${tree.price}</span>৳</p>
            </div>
                <button class="bg-[#15803D] w-full py-3 text-xl text-white font-semibold rounded-full mt-3">Add to Cart</button>
            </div>
        </div>
      </div>
        
        `;

        treesContainer.appendChild(card)
        
    });

}

// Category Display
const displayCategory= (allTrees) => {
    console.log(allTrees)

    const categoryContainer = document.getElementById("categories");
    

    categoryContainer.innerHTML = "";

    // all trees btn
    const allTreesBtn = document.createElement("div");
    allTreesBtn.innerHTML =`
    <p onclick = "loadAllTrees()" class ="cursor-pointer m-2 px-3 py-2 rounded-lg  hover:bg-[#15803D] hover:text-white text-[#1F2937] font-semibold text-lg">All Trees</p>   
    
    
    `;

    categoryContainer.appendChild(allTreesBtn);

 for (let category of allTrees) {
    console.log(category);

    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML =  `
        <p 
            onclick="showCart('${category.id}')" 
            class="cursor-pointer m-2 px-3 py-2 rounded-lg  hover:bg-[#15803D] hover:text-white text-[#1F2937] font-semibold text-lg">
            ${category.category_name}
        </p>
    `;

    categoryContainer.appendChild(categoryDiv);
}



}

loadCategory()