// console.log("connected")

const catagoriesContainer = document.getElementById("catagories-container");

async function loadCatagories(){
    const res =await fetch("https://openapi.programming-hero.com/api/categories");
    const data = await res.json();
    console.log(data);
    data.categories.forEach(catagory => {
        
        const btn = document.createElement("button");
        btn.className = "btn btn-outline w-full shadow";
        btn.textContent = catagory.category_name;

        catagoriesContainer.appendChild(btn);
    });


}
loadCatagories()