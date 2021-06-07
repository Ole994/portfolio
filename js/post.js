const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const spinner = document.querySelector(".lds-spinner");
const url = `https://olekorvald.no/wp-json/wp/v2/posts/${id}?_embed`
const postContent = document.querySelector(".post-content-post-page")
const loading = document.querySelector(".loading");
const modalDiv = document.querySelector(".image-modal-div");
const closeButton = document.querySelector(".close-button-modal");
closeButton.addEventListener("click", () => {
  modalDiv.style.display = "none";
})
fetch(url, {
  "method": "GET"
})
  .then(response => response.json())
  .then(data => renderPost(data))
//   .finally(() => loading.style.display = "none");
const renderPost = (post) => {
  console.log(post)
  let imageUrl = post._embedded["wp:featuredmedia"][0].source_url;
  let htmlString = `
      
              <div class"image-card-postPage">
                  <div class="post-title"><h2 class= "h2-post-page">${post.title.rendered}</h2></div>
              
                <div class="post-image">
                            
                  <img class= "img-cards-single-post-post-page"src = "${imageUrl}"/>
                  
                </div>
                <div class="post-text-post-page"> 
                  <div class"flex-text">
                  <p class= "post-p-post-page"${post.content.rendered}</p>
                  </div>
                </div>
              </div>            
            `

  postContent.innerHTML += htmlString;
  const postImage = document.querySelector(".img-cards-single-post-post-page")
  console.log(postImage)
  const modalImg = document.querySelector(".modal-img")

  postImage.addEventListener("click", () => {
    modalDiv.style.display = "flex";

    let largeImageUrl = post._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
    
  })
}