import cheerio from 'cheerio';
import opn from 'opn';
import request from 'request';

const URL_BASE = 'https://www.ticketswap.nl';

function loadDocument(url) {
  return new Promise((resolve, reject) => {
    request(url, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        resolve(html);
      } else {
        reject('Failed to load document');
      }
    });
  });
}

function scrapeDocument($, url) {
  const listings = $('.listings-item:not(.listings-item--not-for-sale)');
  if (listings.length) {
    console.log('WOOP WOOP BUY THOSE TICKETS WOOP');
    const ticketUrl = $(listings[0]).find('a').attr('href');
    opn(`${URL_BASE}${ticketUrl}`);
    process.exit();
  }

  const items = $('listings-item');
  if (!items) {
    console.log('somethings wrong... cptcha?', url);
    opn(url);
  }

  console.log('no tickets :(');
}

export function findTicket(url) {
  return setInterval(() => {
    loadDocument(url)
      .then(html => cheerio.load(html))
      .then($ => scrapeDocument($, url));
  }, 500);
}
