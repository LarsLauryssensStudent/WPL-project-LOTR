//Jordy Van Den Kieboom

probeer allemaal op dezelfde manier code te schrijve (ik heb ocd), default tab space is 4 (word het vaakste gebruikt in de programmeer wereld), en zie gewoon naar elkaars code en probeer dat dan ook ongeveer op die manier te formatteren.



ik heb routes gemaakt maar deze zulle nog ni werken, de render zal moete aangepast worden res.render(en de correcte file).
indien er zelf routes worden gemaakt, zie naar hoe ik deze heb gemaakt en probeer het op die manier te doen, dit is ook de manier da uit de curses komt, 

- dus er word een functie gemaakt export default function.. hierin word de router gemaakt const router = express.Router();
deze router worde op het einde van de functie ge returned, return router;

- plaats van app.get word het nu router.get en de path word nu altijd ("/") omdat deze in de index word gemaakt.

- dus in de index importeren we eerste de router met: import naam from "./routers/voorbeeld";
daarna gebruiken we hem en zette we de path met app.use("/pathname", naam()); de naam is dus de zelf gekozen naam bij het importeren,
nu zal elke / in de router deze pathname hebben, dus ("/:id") word localhost:3000/pathname/id.



1 opmerking over hoofdletter gebruik, in coderen gebruiken we pascal of camelcase maar als we bestanden of mappen aanmaken, doe aub geen hoofdletters en hou het kort en simpel, indien er een spatie is kan het met een -, dus liefst niet quizzBodySD enzovoort..



ik heb ook css opmaak verbeterd, probeer dus in de main.scss te werken en niet de main.css, main.scss is de css die we zelf hebben geschreven en deze word automatisch gecompiled naar main.css, update/download wel de sas compiler voor node,
nog een kleine opmerking over css, probeer niet algemene dinge te verandere zoals een bootstrap class of een h1, p, beide ik en steff gebruiken de cards van bootstrap en hadde card-title aangepast waardoor de css van mij werd overgeschreve door die van steff, ik heb card-title veranderd in landing-card-title, selection-card-title.



last but not least, ik heb een utils.ts map, hierin kan gewoon code komen zodat de index niet word gespammed, bv ik zou in utils een functie kunnen maken voor data te fetchen, deze is bv van webontwikkeling:

export const fetchData = async (url: string) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        return await response.json();
    } catch (error: any) {
        throw new Error(`Could not fetch data: ${error.message}`);
    }
};

export const getData = async (endpoint: string) => {
    const url = `https://raw.githubusercontent.com/vandenkieboom/hosting/main/${endpoint}.json`;
    return await fetchData(url);
};

in de route van bv selection zou ik dan import { getData } from "../utils"; kunnen doen en in de route functie kan ik dan deze data fetchen door const data = await getData("voorbeeld") te doen.


update -> ik heb fetchdata functie gemaakt me errorhandling in de utils.ts en deze word of kan dan gebruikt worde in de routes etc.. voor de variabele heb ik locals gebruikt, ik snap hier zelf niet enorm veel van, komt deels uit curses en chatgpt, ge zou ook variabele kunne meegeven in parameters of gwn importeren.. ik weet niet wat de correcte manier is.. het zelfde me de keuze tussen utils.ts of middleware.ts, ik ben niet enorm goe weg me de term "middelware", ik schrijf meestal functies zoals fetchdata of zet andere rommel in aparte utils map die ik kan exporteer.


edit --Lars
extra routers aangemaakt. 
alles van variabelen en verdere quizz werking klaargezet
Achtergrond Array gemaakt zodat we deze kunnen meegeven met de paginas, fetchData functie aangepast voor betere werking en betere verwerking van data. (headers zaten nog mee in de data arrays)
trimMovie functie om ons te beperken tot de films die we moeten hebben
trim characters idem deze functie zorgt ervoor dat enkel characters waarvan we een quote hebben word bijgehouden.
fullQuotes. zet de quotes van film 1, 2 en 3 in een enkele array voor gemakkelijke werking

interfaces zijn afgemaakt en klaar voor gebruik. 
10rounds quizz is volledig operationeel
sudden death moet ik morgen verder doen maar dat gaat vooruit gaan. 

de views en partials verder af gewerkt. morgen gooi ik eruit wat we niet meer nodig hebben.

wat rest ons nu nog? de databank koppelen en blacklists en favorites afmaken.


