document.addEventListener("DOMContentLoaded", function () {

  const searchButton = document.getElementById("search-btn");
  const usernameInput = document.getElementById("user-input");
  const statsContainer = document.querySelector(".stats-container");

  const easyProgressCircle = document.querySelector(".easy-progress");
  const mediumProgressCircle = document.querySelector(".medium-progress");
  const hardProgressCircle = document.querySelector(".hard-progress");

  const easyLabel = document.getElementById("easy-label");
  const mediumLabel = document.getElementById("medium-label");
  const hardLabel = document.getElementById("hard-label");

  const cardStatsContainer = document.querySelector(".stats-card");

  // ✅ Validate username
  function validateUsername(username) {
    if (username.trim() === "") {
      alert("Username cannot be empty.");
      return false;
    }

    const regex = /^[a-zA-Z0-9_-]{3,15}$/;
    return regex.test(username);
  }

  // ✅ Fetch user details
  async function fetchUserDetails(username) {

  try {
     console.log("Fetching started..."); 
      //  Disable button
      searchButton.textContent = "Searching...";
      searchButton.disabled = true;


    const url = `https://leetcode-api-faisalshohag.vercel.app/${username}`;
     console.log("URL:", url);


     const response = await fetch (url);

    

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("User Data:", data);
    
       displayUserData(data);

    }
     catch (error) {
      console.error("ERROR:", error); 
      statsContainer.innerHTML = "<p>No data found</p>";
    } finally {
      // 🔥 Enable button again
      searchButton.textContent = "Search";
      searchButton.disabled = false;
    }
  }

  function updateProgress( solved,total,label,circle ){
    const percent = total ? (solved / total) * 100 : 0;
   const degree = percent * 3.6;

    circle.style.setProperty("--progress-degree",`${degree}deg`);
     label.textContent = `${Math.round(percent)}%`;
  
     console.log("Update:",percent);
    console.log({ solved, total, percent });
  }


function displayUserData(data) {

  const totalEasy = data.totalEasy;
  const totalMedium = data.totalMedium;
  const totalHard = data.totalHard;

  const solvedEasy = data.easySolved;
  const solvedMedium = data.mediumSolved;
  const solvedHard = data.hardSolved;

  updateProgress(solvedEasy, totalEasy, easyLabel, easyProgressCircle);
  updateProgress(solvedMedium, totalMedium, mediumLabel, mediumProgressCircle);
  updateProgress(solvedHard, totalHard, hardLabel, hardProgressCircle);


   const cardData = [
  {
    label: "Total Solved",
    value: data.totalSolved
  },
  {
    label: "Easy Solved",
    value: data.easySolved
  },
  {
    label: "Medium Solved",
    value: data.mediumSolved
  },
  {
    label: "Hard Solved",
    value: data.hardSolved
  }
];


 console.log("Card Data:", cardData); 

 cardStatsContainer.innerHTML = cardData.map(
  data => {
      return `
    <div class ="card">
      <h3>${data.label}</h3>
      <p>${data.value}</p>
    </div>
    `;
  }).join("") 

}


// ✅ Click event
  searchButton.addEventListener("click", function () {
    const username = usernameInput.value;
     console.log ("login username:",username);

   if (validateUsername(username)) {
      fetchUserDetails(username); // ✅ correct function call
    }
  });
});
