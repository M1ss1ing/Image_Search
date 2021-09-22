const auth = "563492ad6f91700001000001938ecf86681e4eafacbc762962c40ded";
const next = document.querySelector(".next");
const input = document.querySelector("input");
const searchbutton = document.querySelector(".searchbutton");

let pagen = 1;
let search = false;
let query = "";

input.addEventListener("input",(e) => {
    e.preventDefault();
    query = e.target.value;
});

async function CuratedPhotos(pagen){
    const data = await fetch(
        `https://api.pexels.com/v1/curated?per_page=15&page=${pagen}`, 
    {
        method:"GET", 
        headers: {
            Accept: "application/json",
            Authorization: auth,
        },
    }
    );
    const result = await data.json();
    result.photos.forEach((photo) => {
        const pic = document.createElement("div");
        pic.innerHTML = `<img src=${photo.src.large}>
                <p>Photo: ${photo.photographer}</p>
            <a href = ${photo.src.large}>Download</a>
        `;
        document.querySelector(".gallery").appendChild(pic);
    });
    //console.log(result);
}

async function SearchPhotos(query, pagen){
    const data = await fetch(
        `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=${pagen}`, 
    {
        method:"GET", 
        headers: {
            Accept: "application/json",
            Authorization: auth,
        },
    }
    );
    const result = await data.json();
    result.photos.forEach((photo) => {
        const pic = document.createElement("div");
        pic.innerHTML = `<img src=${photo.src.large}>
                <p>Photo: ${photo.photographer}</p>
            <a href = ${photo.src.large}>Download</a>
        `;
        document.querySelector(".gallery").appendChild(pic);
    });
    //console.log(result);
}

searchbutton.addEventListener("click", () => {
    if (input.value === "") return;
    clear();
    search = true;
    SearchPhotos(query, pagen);
});

function clear(){
    input.value = "";
    document.querySelector(".gallery").innerHTML = "";
    pagen = 1;
}

next.addEventListener("click", () => {
    if (!search){
        pagen++;
        CuratedPhotos(pagen)
    }else{
        if (query.value === "") return;
        pagen++;
        SearchPhotos(query, pagen);
    }
});


CuratedPhotos(pagen);
