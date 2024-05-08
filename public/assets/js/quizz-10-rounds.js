// De quizzNav elementen
const timeField = document.getElementById("timeField");
const scoreField = document.getElementById("scoreField");
const questionField = document.getElementById("questionField");

let movies = [];


//de quote zelf
const quoteField = document.getElementById('quoteField');


// de character radio's
const actorRadio = document.getElementsByClassName('actorRadio');
//de character labels:
const actorLabels = document.getElementsByClassName("actorLabel");

// de movie radio's:
const movieRadio = document.getElementsByClassName("movieRadio");
//de movie labels:
const movieLabel = document.getElementsByClassName("movieLabel")

const form = document.getElementById("quizzForm");

// Add event listener for form submission
form.addEventListener("submit", function (event) {
  // Select all actor radio buttons
  const actorRadios = document.querySelectorAll('input[name="actorRadio"]:checked');

  // Select all movie radio buttons
  const movieRadios = document.querySelectorAll('input[name="movieRadio"]:checked');

  // Check if at least one option is selected from each group
  if (actorRadios.length == 0 || movieRadios.length == 0) {
    // Prevent form submission if not all options are selected
    event.preventDefault();
    alert("Please select one option from each category before submitting.");
  }
});





async function fetchData() {
  //token
  const token = 'mIqYC2hqv_DXksfzJsvn ';
  const headers = {
    'Authorization': `Bearer ${token}`
  };

  //error handling voor quotes, chars en movies
  try {
    const dataQuotesTwoTowers = await fetch("https://the-one-api.dev/v2//movie/5cd95395de30eff6ebccde5b/quote", { headers });
    if (!dataQuotesTwoTowers.ok) {
      throw new Error(`Failed to fetch quotes: ${dataQuotesTwoTowers.statusText}`);
    }
    const responseData = await dataQuotesTwoTowers.json();
    const quotesTT = responseData.docs;


    const dataQuotesFellowShip = await fetch("https://the-one-api.dev/v2//movie/5cd95395de30eff6ebccde5c/quote", { headers });
    if (!dataQuotesFellowShip.ok) {
      throw new Error(`Failed to fetch quotes: ${dataQuotesFellowShip.statusText}`);
    }
    const responseDataFellowShip = await dataQuotesFellowShip.json();
    const quotesFS = responseDataFellowShip.docs;

    const dataQuotesReturnKing = await fetch("https://the-one-api.dev/v2//movie/5cd95395de30eff6ebccde5d/quote", { headers });
    if (!dataQuotesReturnKing.ok) {
      throw new Error(`Failed to fetch quotes: ${dataQuotesReturnKing.statusText}`);
    }
    const responseDataReturnKing = await dataQuotesReturnKing.json();
    const quotesRK = responseDataReturnKing.docs;



    const dataChars = await fetch("https://the-one-api.dev/v2/character", { headers });
    if (!dataChars.ok) {
      throw new Error(`Failed to fetch characters: ${dataChars.statusText}`);
    }
    const tempchar = await dataChars.json();
    const characters = tempchar.docs;
    console.log(characters)

    const dataMovies = await fetch("https://the-one-api.dev/v2/movie", { headers });
    if (!dataMovies.ok) {
      throw new Error(`Failed to fetch movies: ${dataMovies.statusText}`);
    }
    const temp = await dataMovies.json();
    const movies = temp.docs;
    //return van opgehaalde data
    return {
      quotesTT,
      quotesFS,
      quotesRK,
      characters,
      movies
    };

  } catch (error) {
    throw new Error(`Could not fetch data: ${error.message}`);
  }
}

const blButton = document.getElementById("blackListBtn");
const formBl = document.getElementById("reasonDropdown");

blButton.addEventListener("click", function () {
  if (formBl.style.visibility === "visible") {
    formBl.style.visibility = "hidden";
  } else {
    formBl.style.visibility = "visible";
  }
});