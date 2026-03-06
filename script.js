// console.log("connected")

const catagoriesContainer = document.getElementById("catagories-container");
const treesContainer = document.getElementById("trees-container");
console.log(treesContainer);
const loadingSpinner= document.getElementById("loadong-spinner")


async function loadCatagories(){
    const res =await fetch("https://openapi.programming-hero.com/api/categories");
    const data = await res.json();
    // console.log(data);
    data.categories.forEach(catagory => {
        
        const btn = document.createElement("button");
        btn.className = "btn btn-outline w-full shadow";
        btn.textContent = catagory.category_name;

        catagoriesContainer.appendChild(btn);
    });


}
loadCatagories()


function showLoading() {
    loadingSpinner.classList.remove("hidden");
    treesContainer.innerHTML= " "
}
function hideLoading() {
     loadingSpinner.classList.add("hidden");
}

async function loadTrees() {

    showLoading()
    
    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await res.json();
    displayTrees(data.plants);

    hideLoading()
}    
loadTrees()


function displayTrees(trees) {
    console.log(trees);
    trees.forEach(tree => {
        console.log(tree);

        const card = document.createElement("div");
        card.innerHTML = `
                            <div class="card bg-base-100 shadow-sm ">
  <figure class="px-4 pt-4 ">
    <img
      src="${tree.image}"
      alt="${tree.name}"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-left">
    <h2 class="card-title ">${tree.name}</h2>
    <p class="line-clamp-2">${tree.description}</p>

    <div class="flex items-start w-full mb-3 justify-between ">
      <div class="badge line-clamp-1 badge-outline bg-green-50 text-green-600">${tree.category}</div>
        <h2 class="font-bold  md:text-xl text-black">ট${tree.price}</h2>
   </div>

    <div class="card-actions w-full">
      <button class="btn btn-success rounded-full w-full">Add to Cart</button>
    </div>
  </div>
</div>
        `
 treesContainer.appendChild(card)
    });
}

