import axios from "axios";

const READING_CHAPTER = (url) =>
  axios.get(url)
    .then((res) => {
      const cheerio = require('cheerio');
      const $ = cheerio.load(res.data.html);
      let data = [];
      $('.image-placeholder img').map((index, item) => {
        let img = $(item).attr('data-src');

        data.push(img);
      });
      console.log("data",data);
      return data;
    }).catch(e => console.log('Error: ' + e));

export default READING_CHAPTER;
