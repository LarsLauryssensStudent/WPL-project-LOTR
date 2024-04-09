export async function fetchData() {
    //token
    const token = 'mIqYC2hqv_DXksfzJsvn ';
    const headers = {
      'Authorization': `Bearer ${token}`
    };
  
    //error handling voor quotes, chars en movies
    try {
      const dataQuotes = await fetch("https://the-one-api.dev/v2/quote", { headers });
      if (!dataQuotes.ok) {
        throw new Error(`Failed to fetch quotes: ${dataQuotes.statusText}`);
      }
      const quotes = await dataQuotes.json();
  
      const dataChars = await fetch("https://the-one-api.dev/v2/character", { headers });
      if (!dataChars.ok) {
        throw new Error(`Failed to fetch characters: ${dataChars.statusText}`);
      }
      const characters = await dataChars.json();
  
      const dataMovies = await fetch("https://the-one-api.dev/v2/movie", { headers });
      if (!dataMovies.ok) {
        throw new Error(`Failed to fetch movies: ${dataMovies.statusText}`);
      }
      const movies = await dataMovies.json();
      
      //return van opgehaalde data
      return {
        quotes,
        characters,
        movies
      };

    } catch (error: any) {
      throw new Error(`Could not fetch data: ${error.message}`);
    }
  }