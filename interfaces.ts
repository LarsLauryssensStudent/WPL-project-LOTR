import { ObjectId } from "mongodb";

export interface Character {
    _id?: ObjectId;
    id: string;
    height: string;
    race: string;
    gender: string;
    birth: string;
    spouse: string;
    death: string;
    realm: string;
    hair: string;
    name: string;
    wikiUrl: string;
}

export interface Movie {
    _id?: ObjectId;
    id: string;
    name: string;
    runtimeInMinutes: number;
    budgetInMillions: number;
    boxOfficeRevenueInMillions: number;
    academyAwardNominations: number;
    academyAwardWins: number;
    rottenTomatoesScore: number;
}

export interface Quote {
    _id?: ObjectId;
    id: string;
    dialog: string;
    movie: string;
    character: string;
    id2: string;
    reason?: string;
}

export interface User {
    _id?: ObjectId,
    username: string,
    email: string,
    password: string,
    registered: Date,
    favorites: Quote[],
    blacklisted: Quote[],
    highScore?: number,
    lastGames?: GameResult[]
}

export interface GameResult {
    _id?: ObjectId,
    lastQuotes: Quote[],
    lastCharacters: string[],
    lastMovies: string[],
    score?: number
}