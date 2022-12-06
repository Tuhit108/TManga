import axios from "axios";


export const LIST_BY_GENRES = (url) =>
    axios.get(url)
        .then((res) => {
          const cheerio = require('cheerio');
          const $ = cheerio.load(res.data);
          let data = []
          const items = $('.item figure.clearfix')
            .map((index, item) => {
              const id = $(item).find(' div.image a').attr('href')
              const image = $(item).find(' div.image a img').attr('src')
              const latest = $(item).find('.comic-item .chapter a').first().text();
              const name = $(item).find(' div.image a').attr('title').replace('Truyện tranh ','');
              data.push(
                {
                  id : id,
                  bookImg : image,
                  title : name,
                  latest : latest
                }
              )

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

