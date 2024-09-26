const baseUrl = "https://product-feedback-data.vercel.app";
const elCategory = document.querySelector(".category");
const elRoot = document.querySelector(".root");
const modal = document.querySelector(".modal")
const openModal = document.querySelector(".openModal")



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




