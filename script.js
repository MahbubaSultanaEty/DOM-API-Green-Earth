// console.log("connected")

fetch("https://openapi.programming-hero.com/api/categoriesh").then((res) => res.json()).then(data => {
    console.log(data);
}) //.catch(e => console.log(e))