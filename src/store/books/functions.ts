import axios from "axios";
import { syncAllBooks } from "@/store/books/index";
import cheerio from "cheerio";
export const HOT_BOOKS = () =>
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


export const LIST_BOOKS = (id) =>
  axios.get('https://truyennhanh1.com'+id)
    .then((res) => {
      const cheerio = require('cheerio');
      const $ = cheerio.load(res.data);
      let data = []
      const items = $('.item-medium ')
        .map((index, item) => {
          const id = $(item).find('a').first().attr('href')
          const image = $(item).find('a div img').attr('data-src')
          const name = $(item).find('a .item-title').text();
          const view = $(item).find('a div span').text();
          data.push(
            {
              id : id,
              bookImg : image,
              title : name,
              view : view
            }
          )
        });
      syncAllBooks(data)
      console.log("data",data);
      return data;

    }).catch(e => console.log('Error: '+e));

export const DETAIL_BOOKS = (id) =>
  axios.get('https://truyennhanh1.com'+ id)
    .then((res) => {
      const cheerio = require('cheerio');
      const $ = cheerio.load(res.data);
      let data = []
      const name = $('.manga-title').text();
      const img = $('.manga-thumbnail img').attr('data-src');;
      const author = $('.manga-author span').text();
      const status = $('.manga-status span').text();
      const latest = $('.manga-latest span a').text().replace('chap ','');
      const views= $('.manga-views span').text()
      const content= $('.manga-content').text().replace('TruyenTranh24: ','');

      console.log(data ={
        name : name,
        img : img,
        author : author,
        status : status,
        latest : latest,
        views : views,
        content : content});


      return (data ={
        name : name,
        img : img,
        author : author,
        status : status,
        latest : latest,
        views : views,
        content : content
      })



    }).catch(e => console.log('Error: '+e));



