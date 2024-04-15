import { name } from "ejs";
import { characters } from ".";
import { Character, Movie, Quote } from "./interfaces";

export async function fetchData() {
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

    } catch (error: any) {
      throw new Error(`Could not fetch data: ${error.message}`);
    }
  }

export function fullQuotes (array1: Quote[], array2: Quote[], array3: Quote[]): Quote[] {
  let quotes :Quote[]= [];
  console.log(array1.length)
  console.log(array2.length)
  console.log(array3.length)

  for(let i: number = 0; i < array1.length ; i++) {
    quotes.push(array1[i]);
 
  }
  for(let j: number = 0; j < array2.length ; j++) {
    quotes.push(array2[j]);
    
  }
  for(let k: number = 0; k < array3.length ; k++) {
    quotes.push(array3[k]);

  }
  console.log(quotes.length)

  return quotes;
}

export function trimCharacters (array: Character[], quotes :Quote[]) :Character[] {
  const characterIds = [...new Set(quotes.map(quote => quote.character))];
  console.log(characterIds.length);

  const filteredCharacters = array.filter(character => characterIds.includes(character._id));

  return filteredCharacters;
}

export function trimMovies (array : Movie[], quotes :Quote[]) :Movie[] {
  const movieIds = [...new Set(quotes.map(quote => quote.movie))];
  console.log(movieIds.length);

  const filteredMovies = array.filter(movie => movieIds.includes(movie._id));
  return filteredMovies;
}

// shuffle algoritme van fisher yates
export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//functie voor characters te selecteren, wat lang voor in de get
export function generatePossibleAnswers(quote: Quote, array: Character[]): Character[] {
  // Shuffle wuffle wettewel
  const shuffledCharacters = shuffleArray(array);
  //character ID opzoeken
  const correctCharacterId = quote.character;

  //de juiste zoeken
  const correctCharacter = shuffledCharacters.find(character => character._id === correctCharacterId);
  if (!correctCharacter) {
    throw new Error("Correct character not found");
}
  // en dan 2 randoms
  const otherCharacters = shuffledCharacters.filter(character => character._id !== correctCharacterId).slice(0, 2);
  //samenvoegen
  const possibleAnswers = [correctCharacter, ...otherCharacters];

  //en terugduwen
  return shuffleArray(possibleAnswers);
}

export function linkQuotes(quotes: Quote[], char: Character[]): Character[]{
  let character:Character[] = [];
  quotes.forEach(q => {
   const linked = char.find(c => c._id === q._id);
    if(linked !== undefined){
      character.push(linked);
    }
  });
  return character;
}