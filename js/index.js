const url = "https://olekorvald.no/wp-json/wp/v2/posts?_embed=wp:featuredmedia&per_page=3"

// HTML Dom elementer. 
const postFrontpage = document.querySelector(".post-frontpage");

const loading = document.querySelector(".loading");

// Dette er tilstand som vi bruker. F.eks. lagrer vi alle postene i posts, og 
// bruker disse til å endre de på nytt når vi trenger det. 

let posts = [];
let activeStart = 0;
let numberOfItems = 3;

fetch(url, {
  "method": "GET"
})
  .then(response => response.json())
  .then(data => {
    posts = data;
    renderPosts(data);
  })
//   .finally(() => loading.style.display = "none");

/* Sjekker with på vindu for å tilpasse antall elementer i karusellen*/
// Vi kan bruke window.innerWidth for å sjekke hvor vid skjermen er
// og sette antall elementer i karusell vi ønsker å vise.
// Kan brukes sammen med resize-event.


// window.addEventListener("resize", () => {
//   if (screen.width < 800) {
//     numberOfItems = 2;
//   }

//   else if (screen.width < 1100) {
//     numberOfItems = 1;
//   }
//   else {

//     numberOfItems = 2;
//   }
//     // Endre antall kort vi viser ved å endre numberOfItems. 


//   renderPosts(posts);
// });

// if (screen.width < 800) {
//     numberOfItems = 0;
// }
// else if (screen.width < 1100) {
//     numberOfItems = 2;
// }

/*skriver dom element for karusellen */
const renderPosts = (posts) => {
  console.log(posts)

  // tømmer DOM-treet for elementer, siden det skal bygges 
  // på nytt med nye data. 

  postFrontpage.innerHTML = "";

  /*entries får index og verdi*/

  // index = teller opp indeks til postene som iterer igjennom
  // F.eks. 10 poster -> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  // post = faktisk post fra Wordpress
  // posts.entries() = gir oss par av index og post. [0, post1], [1, post2].... [9, post10]

  for (let [index, post] of posts.entries()) {

    // showCard er true dersom index er større eller lik activeStart og
    // og mindre eller lik activeCarouselEnd. 
    // Dette definerer hvilket intervall som ønsker å vise aktive poster i karusellen.


    // Hvis man er innenfor intervallet start-index og start-index + antall kort som skal vises:
    // så vis kort (ved å ikke legge på hidden-klasse), ellers legg på "hidden"-klasse. 

    const showCard = index >= activeStart && index <= (activeStart + numberOfItems);
    let showCardClass = '';
    if (!showCard) {
      showCardClass = 'hidden'
    }
    /* Html*/
    let imageUrl = post._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url;
    let excerpt = post.excerpt.rendered;

    let htmlString = `
    <div class="image-card-homepage ${showCardClass}">
        <div class="container-allH2Cards-frontPage">
          <h2 class="h2-image-forntPage">${post.title.rendered}</h2>
        </div>

          <a class="navbar-links" href="post.html?id=${post.id}">
            <img class= "img-card-url"src = "${imageUrl}"/>
          </a>

          <div class= "p-image-card-homepage">${post.excerpt.rendered}</div>
              <div class="box-3">
    </div>
    
    `
    postFrontpage.innerHTML += htmlString;
  }
}



