// load categories
const loadCategory = () =>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json()) 
    .then(data => {
       
        displayCategory(data.categories);
    })

}

const displayCategory= (allTrees) => {
    console.log(allTrees)

    const categoryContainer = document.getElementById("categories");
    

    categoryContainer.innerHTML = "";

 for (let category of allTrees) {
    console.log(category);

    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML =  `
        <p 
            onclick="showCart('${category.category_name}')" 
            class="cursor-pointer m-2 px-3 py-2 rounded-lg  hover:bg-[#15803D] hover:text-white text-[#1F2937] font-semibold text-lg">
            ${category.category_name}
        </p>
    `;

    categoryContainer.appendChild(categoryDiv);
}



}

loadCategory()