// import magazines from "../data/magazines";




let ID = () => {
    return Math.random().toString(36).substring(2, 9);
};
let CreateAccordion = (title, id) =>{
  return `
  <div class="accordion-item" id="${id}">
    <h2 class="accordion-header" id="heading${id}">
      <button class="btn btn-link " type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-expanded="true" aria-controls="collapse${id}">
        ${title}
      </button>
    </h2>
    <div id="collapse${id}" class="  collapse accordion-collapse " aria-labelledby="heading${id}" >
    
    </div>
  </div>
  `;
};

let createCarouselOuter = (id, innerId)=>{
  return `
  <div id="carouselControls${id}" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner" id="${innerId}">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls${id}" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselControls${id}" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `;
};

let createCarouselInner = (id, active)=>{
  return `
  <div class="carousel-item ${active? "active":""}" id="${id}"></div>
  `;
};

let createCard = (item) =>{
  return `
  <div class="card d-block">
  <img class="card-img-top img-fluid carousel-img" src="${item["enclosure"]["link"]}" alt="card img cap">
  <div class="card-body">
  <h5 class="card-title">${item["title"]}</h5>
  <h5 class="card-subtitle mb-2  text-muted">${item["author"]}</h6>
  <p class="card-subtitle text-secondary">${item["pubDate"]}</p>
  <p class="card-text">${item["description"]}</p>
  <a href="${item["link"]}" class="stretched-link" target="_blank"</a>
  </div>
  </div>
  `;
}

let addContent = async()=>{
    // loop through each newsfeed
  for(let i = 0;i<magazines.length;i++){
    let url = magazines[i];
    // fetch the url 
    // here i fetch the url 
    let responce = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURI(url)}`);
    // here i converted that to json before it was xml 
    let data = await responce.json();

    // here i created the id
    // this function will create random string for id 
    let accordionId = ID();
    // here i created the accordion item  
    let accordion = CreateAccordion(data.feed.title, accordionId);
    // here i added to the accorion 
    document.getElementById("accordionId").innerHTML +=accordion;


    if(i === 0){
      // if the first accoridon than i add the class the show by default 
      document.getElementById(`collapse${accordionId}`).classList.add("show");
    }


    // create carousel
    let carouselId = ID();
    let carouselInnerId = ID();
    let carousel = createCarouselOuter(carouselId,carouselInnerId);
    document.getElementById(`collapse${accordionId}`).innerHTML = carousel;

    // add the card to the carousel 
    // this is the crousel inner part this will loop for the 10 times because there are 10 images in every accordion you have to loop through that and show the images
    let items = data["items"];
    for(j in items){
      let card = createCard(items[j]);
      let innerCarouselCardId = ID();
      let innerCarouselCard = createCarouselInner(innerCarouselCardId, j == 0);
      document.getElementById(`${carouselInnerId}`).innerHTML += innerCarouselCard;
      document.getElementById(`${innerCarouselCardId}`).innerHTML += card;
    }
  }
};
// this will give me random number 

addContent();