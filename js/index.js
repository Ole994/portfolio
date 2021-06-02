const queryString = window.location.search;
const id = new URLSearchParams(queryString).get('id');
const spinner = document.querySelector(".lds-spinner");
const viewMoreButton = document.querySelector(".single-button-view-more");
let postOffset = 10;
const loading = document.querySelector(".loading");
console.log(id)


/*henter ut data*/
const url = "https://olekorvald.no/wp-json/wp/v2/posts?_embed=wp:featuredmedia&per_page=2"

const postContent = document.querySelector(".posts-content-Posts-Page")
fetch(url, {
  "method": "GET"
})
  .then(response => response.json())
  .then(data => template(data))
  .finally(() => loading.style.display = "none");

const template = (posts) => {
  console.log(posts)
  for (post of posts) {
    console.log(post.title)
    let imageUrl = post._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
    let htmlString = `
    <div class"image-card-postsPage>
    <div class="post-title"><h2>${post.title.rendered}</h2></div>
    <div class="posts-image"> <a class="navbar-links" href="post.html?id=${post.id}"><img class= "img-cards-single-posts"src = "${imageUrl}"/></a>
    </div>
     ${post.excerpt.rendered}
    </div>
            `
    postContent.innerHTML += htmlString;
  }
}
//Først lage en variabel, i dette tilfelle øverst på siden
//Denne variabelen innholder antall poster som er hentet så langt
//Deretter lages det en addEventListner funksjon son reagerer når knappen blir trykket på.
//En ser at i dette tilfelle postOffset under er satt til 2
//som vil si at den legger til 2 poster på siden.
//$postOffset den forteller til wordpress at den skal ignorere postene som alt er hentet
//Så skjer et fetchCall som utfører et httpCall (restcall)
//som får tilbake poster fra wordpress 
//de postene blir lagt til i dommen gjennom templaten som ble laget.


viewMoreButton.addEventListener("click", () => {

  const url = `https://olekorvald.no/wp-json/wp/v2/posts?_embed=wp:featuredmedia&per_page=2&offset=${postOffset}`
  postOffset += 2
  fetch(url, {
    "method": "GET"
  })
    .then(response => response.json())
    .then(data => template(data))

})