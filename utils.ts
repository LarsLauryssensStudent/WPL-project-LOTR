import { name } from "ejs";
import { characters } from ".";
import { Character, Movie, Quote } from "./interfaces";


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

