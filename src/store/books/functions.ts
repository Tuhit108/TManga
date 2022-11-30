import axios from "axios";

const HOT_BOOKS = () =>
  axios.get('http://truyennhanh1.com/truyen-hot')
    .then((res) => {
      const cheerio = require('cheerio');
      const $ = cheerio.load(res.data);
      let data = []
      const items = $('.item-medium ')
        .map((index, item) => {
          const id = $(item).find('a').first().attr('href')
          const image = $(item).find('a div img').attr('data-src')
          const name = $(item).find('a .item-title').text();;
          data.push(
            {
              id : id,
              bookImg : image,
              title : name
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

export default HOT_BOOKS;
