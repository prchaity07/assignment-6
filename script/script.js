
// load categories
const loadCategory = () =>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json()) 
    .then(data => {
        
        displayCategory(data.categories);
    })
    

}
// Show Cart
const showCart = (categoryId) =>{
    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then(res => res.json())
    .then(data =>{
        console.log(data.plants)
         displayTrees(data.plants); 
    })
}

// display Cart

const displayTrees= (trees) =>{
    const treesContainer = document.getElementById("trees-container")

    treesContainer.innerHTML ="";

    // get every tree
    trees.forEach(tree => {

        const card = document.createElement("div");

        card.innerHTML = `
           <div class="flex flex-col justify-center text-start bg-white px-5 space-y-4 rounded-lg">
             <img  src="./assets/hero-leaf1.png" alt="">
      <h2 class="text-2xl font-semibold text-[#1F2937]">Mango Tree</h2>
      <p class="font-normal text-xl text-[#1F2937]">A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green</p>
      
      <div class="flex justify-between">
        <p class="bg-[#DCFCE7] text-[#15803D] rounded-3xl px-5 ">Fruit Tree</p>
        <p class="text-[14px] font-semibold text-[#1F2937]">500৳</p>
      </div>

      <button class=" bg-[#15803D] w-full py-3 text-xl text-white font-semibold rounded-[999px]">Add to Cart</button>
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