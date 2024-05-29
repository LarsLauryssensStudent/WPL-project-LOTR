import { name } from "ejs";
import { characters } from ".";
import { Character, Movie, Quote } from "./interfaces";
import fs from "fs"
import { getBlacklist, getCharacters, getFavorites } from "./database";
import path from "path";
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
  const correctCharacter = shuffledCharacters.find(character => character.id === correctCharacterId);
  if (!correctCharacter) {
    throw new Error("Correct character not found");
  }
  // en dan 2 randoms
  const otherCharacters = shuffledCharacters.filter(character => character.id !== correctCharacterId).slice(0, 2);
  //samenvoegen
  const possibleAnswers = [correctCharacter, ...otherCharacters];

  //en terugduwen
  return shuffleArray(possibleAnswers);
}

export async function printFavoritesAndBlacklists(username: string): Promise<string> {
  const filename: string = "Favs-and-Blacklisted.txt";
  const filePath = path.join(__dirname, filename); // Use __dirname to ensure the correct directory
  let userName: string = username;
  let characters: Character[] = await getCharacters();

  let favorites: Quote[] = await getFavorites(userName);
  let blacklist: Quote[] = await getBlacklist(userName);

  // Create a write stream
  const file = fs.createWriteStream(filePath);

  file.on('error', function(err) { 
    console.error("Error writing to file:", err);
  });

  // Write favorites
  file.write("Favorites:\n");
  for (let i: number = 0; i < favorites.length; i++) {
      let character: Character | undefined = characters.find(character => favorites[i].character === character.id);
      if (!character) {
          throw new Error("Geen character gevonden, er ging iets fout.");
      } else {
          file.write(`${i + 1}. "${favorites[i].dialog}" - ${character.name} \n`);
      }
  }

  // een tussenseparator gebruiken voor de text file, beter overzicht op deze manier
  file.write("\nBlacklisted:\n");
  for (let i: number = 0; i < blacklist.length; i++) {
      let character: Character | undefined = characters.find(character => blacklist[i].character === character.id);
      if (!character) {
          throw new Error("Geen character gevonden, er ging iets fout.");
      } else {
          file.write(`${i + 1}. "${blacklist[i].dialog}" - ${character.name} - Reason: ${blacklist[i].reason}\n`);
      }
  }

  // Close the file
  file.end();

  return new Promise((resolve, reject) => {
      file.on('finish', () => resolve(filePath));
      file.on('error', reject);
  });
}
