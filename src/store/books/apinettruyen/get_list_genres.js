import axios from "axios";

export const LIST_GENRES = () =>
    axios.get('https://www.nettruyentv.net/tim-truyen')
        .then((res) => {
            const cheerio = require('cheerio');
            const $ = cheerio.load(res.data);
            const genres = [];
            $('.dropdown-genres .form-control option')
                .map((i, e) => {
                    const name = e.childNodes[0].data;
                    const url = e.attribs.value;
                    genres.push({
                        name, url
                    });
                });
            return genres;
        }).catch(e => console.log('Error: '+e));


