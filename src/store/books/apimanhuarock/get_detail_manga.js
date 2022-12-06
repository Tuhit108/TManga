import axios from "axios";

export const DETAIL_MANGA = (url) =>
  axios.get(url)
    .then((res) => {
      const cheerio = require('cheerio');
      const $ = cheerio.load(res.data);
      const name = $('.post-title h1').text();
      let genres = [];
      $('.genres-content a')
        .map((index, item) => {
          genres.push(item.childNodes[0].data);
        });
      const item = $('.post-status .post-content_item');
      const views = $(item).find('.summary-content').last().text()
      const status =  $('.post-status .post-content_item:nth-child(2)').find('.summary-content').text()
      const author = $('.author-content a').text();
      let img = $('.summary_image a img').attr('data-src');
      const content = $('.panel-story-description .dsct p').text()
      let chapter_list = [];
      $('.panel-manga-chapter .row-content-chapter  li')
        .map((index, item) => {

          chapter_list.push({
            chapter_name: $(item).find('a').text(),
            chapter_url: $(item).find('a').attr('data-chapter-id')
          });
        });
      console.log("status",chapter_list)
      return {
        name, genres, status, author, img, content, chapter_list,views
      };
    }).catch(e => console.log('Error: '+e));
