import axios from "axios";
import * as cheerio  from "cheerio"
import Cheerio = cheerio.Cheerio;

const url = 'https://www.premierleague.com/stats/top/players/goals?se=418'; // url to scraping
const axiosInstance =  axios.create();

// structure of the player data we receive
interface PlayerData {
    rank: number;
    name: string;
    nationality: string;
    goals: number;
}

//send an async HTTP GET request to the url
axiosInstance.get(url)
    .then( // One we have data returned
        response => {
            const html = response.data; // Get the html from de HTTP
            const $ = cheerio.load(html) // load the html string into cheerio
            const statsTable: Cheerio = $('.statsTableContainer > tr')
            const topScorers : PlayerData[] = [];

            statsTable.each((i, elem) => {
                const rank: number = parseInt($(elem).find('.rank > strong').text());
                const name: string = ($(elem).find('.playerName > strong').text());
                const nationality: string = ($(elem).find('.info > .playerCountry').text());
                const goals: number = parseInt($(elem).find( '.mainStat').text());
                topScorers.push({
                    rank,
                    name,
                    nationality,
                    goals
                })
            })

            console.log(topScorers);
        }
    ).catch(console.error); //Error handling

