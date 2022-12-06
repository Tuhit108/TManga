import axios from "axios";

export const DETAIL_MANGA = (url) =>
    axios.get(url)
        .then((res) => {
            const cheerio = require('cheerio');
            const $ = cheerio.load(res.data);
            const name = $('h1.title-detail').text();
            let genres = [];
            $('.list-info .kind p a')
                .map((index, item) => {
                    genres.push(item.childNodes[0].data);
                });
            const status = $('.list-info .status .col-xs-8').text();
            const author = $('.list-info .author .col-xs-8').text();
            const views = $('.list-info .row .col-xs-8').last().text();
            let img = $('.detail-info .row .col-image img')[0].attribs.src;
            if(!img.includes('https')) img = 'https:'+img;
            const content = $('.detail-content').text().replace('Nội dung','').replace('Xem thêm','').trim();
            let chapter_list = [];
            $('.list-chapter nav ul li .chapter a')
                .map((index, item) => {
                    chapter_list.push({
                        chapter_name: item.children[0].data,
                        chapter_url: item.attribs.href
                    });
                });
            return {
                name, genres, status, author, img, content, chapter_list,views
            };
        }).catch(e => console.log('Error: '+e));
;
