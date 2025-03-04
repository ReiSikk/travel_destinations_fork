import { base64ToImage } from "./utils/base64toImg.js";
import deleteEntry from "./delete.js";


window.addEventListener("load", async () => {
//check if token still valid
  const token = localStorage.getItem("token");
  const expirationTime = localStorage.getItem("expirationTime");
  //call function to check log in status
  showLoginInfo();


  if (token && expirationTime && new Date().getTime() < expirationTime) {
    // Token is still valid
    console.log("Token is still valid");
  } else {
    // Token has expired or is not present
    console.log("Token has expired or is not present");
    localStorage.removeItem("token");
  }


  const response = await fetch("http://localhost:4000/destinations/", {
   method: "GET",
   headers: {
     "Content-type": "application/json",
   },
  })
  const body = await response.json()
  const base64value = Object.values(body)[0].image;
  const imageElement = base64ToImage(base64value);
  transform(body);
})



function transform(data) {
  //clear existing content 
  const container = document.querySelector(".destinations-container");
  container.innerHTML = "";
  const elements = data?.map((x) => {
    console.log(x, "x");
      const clone = cloneTemplate();
      clone.querySelector(".destination-card").id = x._id;
      clone.querySelector(".country").innerText = x.country;
      clone.querySelector(".location").innerText = x.title;
      clone.querySelector(".description").innerText = x.description;
      clone.querySelector(".arrival-date").innerText = dayjs(x.arrival_date).format('DD MMMM, YYYY');
      clone.querySelector(".leave-date").innerText = dayjs(x.departure_date).format('DD MMMM, YYYY');
      clone.querySelector(".destination_img").src = x.image;
      clone.querySelector("#delete-button").addEventListener("click", deleteEntry)
      if(localStorage.getItem("token")) {
      clone.querySelector("#delete-button").style.display = "block";
      } else {
        clone.querySelector("#delete-button").style.display = "none";
      }
           // Loop through each button and show/hide based on authentication status

      if (x.link === "") {
        clone.querySelector(".google-maps").remove();
      } else {
        clone.querySelector(".google-maps").href = x.link;
      }
     // Set the data-id attribute to the object's ID
    clone.querySelector(".destination-card").id = x._id;

      return clone;
    });
  
    document.querySelector(".destinations-container").append(...elements)
  }
  
  function cloneTemplate() {
    const template = document.querySelector(".ui-card");
    const clone = document.importNode(template.content, true);
    return clone;
  }


  const container = document.querySelector(".destinations-container");

container.addEventListener("click", (e) => {
  console.log(e.target, "e.target");
    if (e.target.classList.contains("update-button")) {
        console.log("update button clicked");
        //get the parent destination card id 
        const cardId = e.target.parentElement.id;


         //Construct the URL with the object's ID as a query parameter
         const url = `./form_update.html?id=${cardId}`;


         // Set the href attribute of the link element
          window.location.href = url; 
    }

})

    const deleteButtons = document.querySelectorAll("#delete-button");
    deleteButtons.forEach(button => {
      button.addEventListener("click", async () => {
        deleteEntry()
      });
    })

    export default transform
  


  