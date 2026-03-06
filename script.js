// console.log("connected")

const catagoriesContainer = document.getElementById("catagories-container");
const treesContainer = document.getElementById("trees-container");
// console.log(treesContainer);
const loadingSpinner= document.getElementById("loadong-spinner")
const allTreesBtn = document.getElementById("allTreesBtn");



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
    console.log(data);
    
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
      class="rounded-xl h-[400px]" />
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



