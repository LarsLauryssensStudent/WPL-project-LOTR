import { DeleteResult, InsertManyResult, MongoClient, UpdateResult } from "mongodb";
import dotenv from "dotenv";
import { Character, Movie, Quote, User } from "./interfaces";
import { error } from "console";
dotenv.config();

export const port = process.env.PORT || 3000
export const client = new MongoClient(process.env.MONGO_URI!);

const db = client.db(process.env.DB_NAME);
const quoteCollection = db.collection<Quote>("quoteCollection");
const characterCollection = db.collection<Character>("characterCollection");
const movieCollection = db.collection<Movie>("movieCollection")
const users = db.collection<User>("users");


async function exit() {
    try {
        await client.close();
        console.log("Disconnected from database")
    } catch (error) {
        console.error(error)
    }

    process.exit(0);
}

export async function connect() {
    try {
        await client.connect();
        console.log("Connected to database")
        process.on("SIGINT", exit);
    } catch (error) {
        console.error(error)
    }
}


//totaalquotes 2375
//functie voor datafetchen naar MongoDb van de benodigde quotes
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
      const quotesTT: any[]  = responseData.docs;
      let correctQuotesTT : Quote[] = [];
      quotesTT.forEach(element => {
        let quote: Quote = {
            id: element._id,
            dialog:    element.dialog,
            movie:     element.movie,
            character: element.character,
            id2: element.id
        }
        correctQuotesTT.push(quote);
      });
  
  
      const dataQuotesFellowShip = await fetch("https://the-one-api.dev/v2//movie/5cd95395de30eff6ebccde5c/quote", { headers });
      if (!dataQuotesFellowShip.ok) {
        throw new Error(`Failed to fetch quotes: ${dataQuotesFellowShip.statusText}`);
      }
      const responseDataFellowShip = await dataQuotesFellowShip.json();
      const quotesFS: any[] = responseDataFellowShip.docs;
      let correctQuotesFS : Quote[] = [];
      quotesFS.forEach(element => {
        let quote: Quote = {
            id: element._id,
            dialog:    element.dialog,
            movie:     element.movie,
            character: element.character,
            id2: element.id
        }
        correctQuotesFS.push(quote);
      });


      const dataQuotesReturnKing = await fetch("https://the-one-api.dev/v2//movie/5cd95395de30eff6ebccde5d/quote", { headers });
      if (!dataQuotesReturnKing.ok) {
        throw new Error(`Failed to fetch quotes: ${dataQuotesReturnKing.statusText}`);
      }
      const responseDataReturnKing = await dataQuotesReturnKing.json();
      const quotesRK :any[] = responseDataReturnKing.docs;
      let correctQuotesRK : Quote[] = [];
      
      quotesRK.forEach(element => {
        let quote: Quote = {
            id: element._id,
            dialog:    element.dialog,
            movie:     element.movie,
            character: element.character,
            id2: element.id
        }
        correctQuotesRK.push(quote);
        
      });
  
  
      const dataChars = await fetch("https://the-one-api.dev/v2/character", { headers });
      if (!dataChars.ok) {
        throw new Error(`Failed to fetch characters: ${dataChars.statusText}`);
      }
      const tempchar = await dataChars.json();
      const characters : any[] = tempchar.docs;
      let correctCharacters : Character[] = [];
      characters.forEach(element => {
        let character = {
        id:     element._id,
        height:  element.height,
        race:    element.race,
        gender:  element.gender,
        birth:   element.birth,
        spouse:  element.spouse,
        death:   element.death,
        realm:   element.realm,
        hair:    element.hair,
        name:    element.name,
        wikiUrl: element.wikiUrl
        }
        correctCharacters.push(character);
      });
  
      const dataMovies = await fetch("https://the-one-api.dev/v2/movie", { headers });
      if (!dataMovies.ok) {
        throw new Error(`Failed to fetch movies: ${dataMovies.statusText}`);
      }
      const temp = await dataMovies.json();
      const movies :any[] = temp.docs;
      let correctMovies: Movie[] = [];
      movies.forEach(element => {
        let movie :Movie = {
            id:                         element._id,
            name:                       element.name,
            runtimeInMinutes:           element.runtimeInMinutes,
            budgetInMillions:           element.budgetInMillions,
            boxOfficeRevenueInMillions: element.boxOfficeRevenueInMillions,
            academyAwardNominations:    element.academyAwardNominations,
            academyAwardWins:           element.academyAwardWins,
            rottenTomatoesScore:        element.rottenTomatoesScore
        }
        correctMovies.push(movie);
      });
      //return van opgehaalde data
      return {
        correctQuotesTT,
        correctQuotesFS,
        correctQuotesRK,
        correctCharacters,
        correctMovies
      };
  
    } catch (error: any) {
      throw new Error(`Could not fetch data: ${error.message}`);
    }
  }

  function fullQuotes(array1: Quote[], array2: Quote[], array3: Quote[]): Quote[] {
    let quotes: Quote[] = [];
    for (let i: number = 0; i < array1.length; i++) {
      quotes.push(array1[i]);
  
    }
    for (let j: number = 0; j < array2.length; j++) {
      quotes.push(array2[j]);
  
    }
    for (let k: number = 0; k < array3.length; k++) {
      quotes.push(array3[k]);
  
    }
    console.log(quotes.length)
  
    return quotes;
  }
  
  export function trimCharacters(array: Character[], quotes: Quote[]): Character[] {
    const characterIds = [...new Set(quotes.map(quote => quote.character))];
    console.log(characterIds.length);
  
    const filteredCharacters = array.filter(character => characterIds.includes(character.id));
  
    return filteredCharacters;
  }

  export function trimMovies(array: Movie[], quotes: Quote[]): Movie[] {
    const movieIds = [...new Set(quotes.map(quote => quote.movie))];
    console.log(movieIds.length);
    console.log(movieIds);
  
    const filteredMovies = array.filter(movie => movieIds.includes(movie.id));
    return filteredMovies;
  }
  

  //functie voor de databank te populeren met de data 
  export async function checkData() {
    const countQuotes: number = await quoteCollection.countDocuments();
    const countChars: number = await characterCollection.countDocuments();
    const countMovies: number = await movieCollection.countDocuments();

    let quotes : Quote[] = [];
    let characters: Character[] = [];
    let movies :Movie[] = [];
    if (countQuotes !== 2375 || countChars !== 52 || countMovies !== 3) {
        try {
            let result: DeleteResult = await quoteCollection.deleteMany({});
            let result2: DeleteResult = await characterCollection.deleteMany({});
            let result3: DeleteResult = await movieCollection.deleteMany({});
            

            const data: any = await fetchData();
            console.log("Data gefetched");
            quotes = await fullQuotes(data.correctQuotesTT, data.correctQuotesFS, data.correctQuotesRK);
            console.log("Quotes gepulled");
            characters = await trimCharacters(data.correctCharacters, quotes);
            movies =  await trimMovies(data.correctMovies, quotes);

            let insertResult: InsertManyResult = await quoteCollection.insertMany(quotes);
            let insertResult2: InsertManyResult = await characterCollection.insertMany(characters);
            let insertResult3: InsertManyResult = await movieCollection.insertMany(movies);
            
            console.log("Done")
        } catch (error) {
            console.log("error: " +error);
        }
    } else {
        console.log("Data in orde!");
    }
  }

  export async function getCharacters() :Promise<Character[]> {
    let characters : Character[] = [];
    try {
       characters = await characterCollection.find({}).toArray() ;
    }
    catch (error) {
        console.log("Error bij ophalen characters: " + error);
    }
    return characters;
  }

  export async function getQuotes() :Promise<Quote[]> {
    let quotes: Quote[] = [];

    try {
        quotes = await quoteCollection.find({}).toArray();
    }
    catch (error) {
        console.log("Error bij ophalen quotes: " + error);
    }

    return quotes;
  }

  export async function getMovies(): Promise<Movie[]> {
    let movies :Movie[] = [];
    try {
        movies = await movieCollection.find({}).toArray();
    
    } catch (error) {
        console.log("Error bij ophalen films: " + error );
    }
    return movies;
}



export async function getScore() {

}

export async function getQuestion() {

}

export async function getBlacklist(userName: string) {
  try {
    const user: User | null = await users.findOne<User>({username: userName});
    if (user) {
      return user.blacklisted
    }
    else {
      throw new Error("Geen user gevonden");
    }
  }
  catch (error) {
    throw new Error("Kan blacklist niet krijgen: " + error);
  }
}

export async function getFavorites(userName: string) {
  try {
    const user: User | null = await users.findOne({username: userName});
    if (user) {
      return user.favorites
    }
    else {
      throw new Error("Geen user gevonden");
    }
  }
  catch (error) {
    throw new Error("Kan favorites niet krijgen: " + error);
  }
}

export async function addToBlacklist(currentQuote: Quote, userId: string) {
  try {
    let result = await users.findOneAndUpdate({username: userId}, {$push: {blacklisted: currentQuote}});
    console.log("Succesvol geblacklist: " + result);
  }
  catch (error) {
    throw new Error("De quote kon niet geblacklist worden: " + error)
  }
}

export async function removeFromBlacklist(currentQuote: Quote, userId: string) {

}
//deze is nog niet af, ik moet nog zien of deze in de array zit en dan eventueel verwijderen indien ja
export async function toggleFavorites(currentQuote: Quote, userId: string) {
  try {
    const favorites: Quote[] = await getFavorites(userId);
    const isQuoteInFavorites: boolean = favorites.some(quote => quote.id === currentQuote.id);

    if (isQuoteInFavorites) {
        // als de quote er al inzit gooien we deze eruit
        await users.updateOne(
            { username: userId },
            { $pull: { favorites: { id: currentQuote.id } } }
        );
        console.log("Quote removed from favorites");
    } else {
    
      let result = await users.findOneAndUpdate({username: userId}, {$push: {favorites: currentQuote}});
      console.log("Succesvol gefavorite: " + result);
    }
  }
  catch (error) {
    throw new Error("De quote kon niet gefavorite worden: " + error)
  }
}