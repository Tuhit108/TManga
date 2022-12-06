import axios  from "axios";


export const SEARCH_MANGA = (key) =>
  axios.get('https://www.nettruyentv.net/Comic/Services/SuggestSearch.ashx?q='+key)
    .then((res) => {
      const cheerio = require('cheerio');
      const $ = cheerio.load(res.data);
      let data = []
      const items = $('li')
        .map((index, item) => {
          const id = $(item).find('a').attr('href')
          const image = $(item).find('a img').attr('src')
          const latest = $(item).find('a h4 i').first().text();
          const name = $(item).find('a h3').text()
          console.log(items);
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

