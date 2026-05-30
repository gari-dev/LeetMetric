document.addEventListener("DOMContentLoaded", function () {
 
   const searchButton =document.getElementById("search-btn");
   const usernameInput = document.getElementById("user-input");
   const statsContainer = document.querySelector(".stats-container");

   const essayProgressCircle = document.querySelector(".essay-progress");
   const mediumProgressCircle = document.querySelector(".medium-progress");
  const hardProgressCircle = document.querySelector(".hard-progress");

    const essayLabel = document.getElementById("essay-label");
   const mediumLabel = document.getElementById("medium-label");
   const hardLabel = document.getElementById("hard-label");

   const cardStatsContainer = document.querySelector(".stats-card");

  //retur  true or false based on a regex
  function validateUsername(username) {
    if (username.trim() === "") {
      alert("Username cannot be empty.");
      return false;
    }
   const regex = /^[a-zA-Z0-9_-]{3,15}$/;
    return regex.test(username);
  }

   
  async function fetchUserDetails (username){

//     const url = "https://leetcode.com/graphql";
 try{
  searchButton.textContent = "Searching...";
  searchButton.disabled = true;


//  const response = await fetch(url);
    
const target = "https://leetcode.com/graphql";
     const myHeaders = new Headers ();
     myHeaders.append("Content-Type", "application/json");

     const graphql = JSON. stringify({
     query: `\n query userSessionProgress ($username : String!) {\n allQuestionsCount {\n difficulty \n count\n}\n matchedUser (username: $username) {\n username\n submitStats {\n acSubmissionNum {\n difficulty \n count \n submissions \n}  totalSubmissions {\n dificulty\n count\n  submission\n }\n }'`,
    //  variables: {"username": `${username}` }
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: graphql,
        redirect: "follow"
      };

    const response =await  fetch(target,requestOptions);
  if (!response.ok) {
      throw new Error("Unable to fetch data");
  }
    const data = await response.json ();
  console.log("User data: ", data) ;
}
catch (error) {
  statsContainer.innerHTML= `<p> No data found </p>`;
}
finally {
  searchButton.textContent = "Search";
  searchButton.disabled =true;
    }
  }
searchButton.addEventListener(`click`,  function () {
    const username = usernameInput.value;
     console.log ("login username:",username);

    if (validateUsername(username)) {
      fetchUsername(username);
    }
    });
});
    