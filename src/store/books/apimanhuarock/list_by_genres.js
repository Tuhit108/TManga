import axios from "axios";
import cheerio from "cheerio";


export const LIST_BY_GENRES = (url) =>
    axios.get(url)
        .then((res) => {
          const cheerio = require('cheerio');
          const $ = cheerio.load(res.data);
          let data = []
          const items = $('.page-item .bsx-item')
            .map((index, item) => {
              const id = $(item).find('.thumb-manga a').attr('href')
              const image = $(item).find('.thumb-manga a img').attr('data-src')
              const latest = $(item).find('.bigor-manga .list-chapter .chapter-item span a').first().text();
              const name = $(item).find('.bigor-manga h3 a').text()
              data.push(
                {
                  id : id,
                  bookImg : image,
                  title : name,
                  latest : latest
                }
              )
              console.log("img",latest);

              // // let image = item.childNodes[1].attribs['data-original'];
              // if(!image.includes('http')) image = 'http:'+image;
              // return {
              //   title: item.attribs.title.replace('Truyện tranh ',''),
              //   url: item.attribs.href,
              //   thumbnail: image,
              //   index: index
              // };
            });




          return data;
        }).catch(e => console.log('Error: '+e));

