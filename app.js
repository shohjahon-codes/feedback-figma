const baseUrl = "https://product-feedback-data.vercel.app";
const elCategory = document.querySelector(".category");
const elRoot = document.querySelector(".root");
const modal = document.querySelector(".modal")
const openModal = document.querySelector(".openModal")


// openModal.addEventListener("click",()=>{
//     modal.innerHTML = `
//     <div class="w-full h-full flex justify-center items-center fixed z-50 top-0 left-0 bg-[rgba(0,0,0,0.4)]">
//         <div class="w-[540px] relative h-[650px] bg-white p-4 py-14">
//         <p class="text-3xl absolute w-[40px] text-white flex justify-center items-center h-[40px] -top-5 left-5 bg-gradient-to-tr from-blue-500 to-red-500 rounded-full"><span class="text-white pb-2 font-bold">+</span></p>
//         <h1 class="text-gray-800 text-2xl font-bold">Create New Feedback</h1>
//            <div class="flex flex-col w-full gap-2" >
//            <h3 class="text-gray-800">Feedback Title</h3>
//            <p class="text-gray-400">Add a short, descriptive headline</p>
//            <input type="text" class="bg-gray-200 py-4 px-4  outline-none" name="" id="" placeholder="Enter your title" >
//            </div>
//            <div>
//            <h3 class="text-gray-800"> Category</h3>
//            <p class="text-gray-400">Choose a category for your feedback</p>
            
// <select name="" id="" class="w-full bg-gray-200 py-4>
// <option value="feature">Feature</option>
// <option value="enhancement">Enhancement</option>
// <option value="bugs">Bugs</option>

// </select>
//            </div>
//         </div>
//     </div>
//     `
// })

async function getData(path) {
    if (path) {
        const data = await fetch(`${baseUrl}/${path}`);
        return data;
    }else{
        elRoot = `<div class="w-full mx-auto text-center gap-4 h-full flex rounded-md justify-center items-center flex-col bg-white ">
        <img src="./imagies/loading.png" alt="">
        <h1 class="w-1/2">Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</h1>
        <button class="bg-[rgba(173,31,234,1)] py-4 px-6 text-white rounded-md font-medium">+ Add Feedback</button> 
    
      </div>`
    }

}

getData("all")
  .then((res) => res.json())
  .then((data) => {
    elRoot.innerHTML = data
      .map((item) => {
        return `
        <div class="flex justify-between  bg-white rounded-md p-5">
            <div class="flex flex-col items-start justify-center gap-3">
            <h1 class="text-gray-700 font-bold text-lg">${item.title}</h1>
            <p class="text-gray-400">${item.description}</p>
            <p class="py-1 px-3  bg-gray-200 text-blue-600 rounded-md">${
              item.type
            }</p>
            </div>
            <div class="flex gap-3 items-center">
            <p class="text-gray-400">
            <i class="fa-solid fa-comment"></i>
            </p>
            <p class="font-bold text-gray-700">${Math.floor(
              Math.random() * 5
            )}</p>
            </div>
        </div>
        `;
      })
      .join("");
  });

getData("category")
  .then((res) => res.json())
  .then(
    (data) =>
      (elCategory.innerHTML += data
        .map((item) => {
          return `
        <button data-path=${item}  class="cursor-pointer btn capitalize py-1 px-2 rounded-md  font-bold ${
            item == "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-blue-500"
          } ">${item}</button>
        `;
        })
        .join(""))
  );

elCategory.addEventListener("click", (e) => {
  const pathId = e.target.dataset.path;
  let btnAll = document.querySelectorAll(".btn");
  for (const btn of btnAll) {
    btn.classList.remove("bg-blue-500", "text-white");
    btn.classList.add("text-blue-500");
    btn.classList.add("bg-gray-200");
  }
  if (pathId) {
    let btn = e.target;
    btn.classList.remove("text-blue-500");
    btn.classList.add("bg-blue-500", "text-white");
    getData(pathId)
      .then((res) => res.json())
      .then((data) => {
        elRoot.innerHTML = data
          .map((item) => {
            return `
                <div class="flex justify-between  bg-white rounded-md p-5">
                    <div class="flex flex-col items-start justify-center gap-3">
                    <h1 class="text-gray-700 font-bold text-lg">${
                      item.title
                    }</h1>
                    <p class="text-gray-400">${item.description}</p>
                    <p class="py-1 px-3  bg-gray-200 text-blue-600 rounded-md">${
                      item.type
                    }</p>
                    </div>
                    <div class="flex gap-3 items-center">
                    <p class="text-gray-400">
                    <i class="fa-solid fa-comment"></i>
                    </p>
                    <p class="font-bold text-gray-700">${Math.floor(
                      Math.random() * 5
                    )}</p>
                    </div>
                </div>
                `;
          })
          .join("");
      });
  }
});




