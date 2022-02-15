const nedb = require('nedb-promise');
const database = new nedb({
  filename: 'tickets.db',
  autoload: true
});

// List of events

const conserts = {
  "type": "consert-list",
  "conserts": [{
      "type": "ticket",
      "verified": false,
      "title": "Lasse-Stefanz",
      "location": "Kjell Härnqvistalen",
      "date": "21 MAR",
      "timeStart": "19.00",
      "timeStop": "21.00",
      "price": 350,
      "available": 15
    },
    {
      "type": "ticket",
      "verified": false,
      "title": "Pelle trubadur",
      "location": "pubelipuben",
      "date": "29 MPR",
      "timeStart": "22.00",
      "timeStop": "00.00",
      "price": 110,
      "available": 4
    },
    {
      "type": "ticket",
      "verified": false,
      "title": "Kajsas Kör",
      "location": "Götaplatsen",
      "date": "10 APR",
      "timeStart": "15.00",
      "timeStop": "16.00",
      "price": 99,
      "available": 15
    },
    {
      "type": "ticket",
      "verified": false,
      "title": "Klubb Untz",
      "location": "Din favoritkvällare",
      "date": "17 APR",
      "timeStart": "22.00",
      "timeStop": "00.00",
      "price": 150,
      "available": 10
    }
  ]
}


function saveAccount(account) {
  account.type = "account";
  database.insert(account);
}
async function getAccountByUsername(username) {
  const account = await database.find({
    username: username
  });
  return account;
}
async function getTicketById(id) {
  const account = await database.find({
    id: id
  });
  return account;
}

function createTicket(ticket) {
  database.insert(ticket);
}

async function getTicketByCookie(cookie) {
  const account = await database.find({
    cookie: parseInt(cookie)
  });
  return account;
}

function updateCookieOnTicket(ticketId, cookie) {
  database.update({
    id: ticketId
  }, {
    $set: {
      cookie: cookie
    }
  });
}

async function updateVerified(id) {
  database.update({
    id: id
  }, {
    $set: {
      verified: true
    }
  });
}

function newTicketId() {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 6; i++) {
    result += characters.charAt(Math.random() * 36);
  }

  return result;
}

function newTicketCookie() {
  const cookie = Math.round(Math.random() * 10000)
  return cookie;
}

function saveConserts() {
  database.insert(conserts);
}

async function getConserts() {
  const conserts = await database.find({
    type: 'consert-list'
  });
  return conserts;
}

async function getAvailabilityByTitle(consertName) {
  let available = await database.find({

    title: consertName

  });
  return available;
}

module.exports = {
  saveAccount,
  getAccountByUsername,
  getTicketById,
  createTicket,
  getTicketByCookie,
  updateCookieOnTicket,
  updateVerified,
  newTicketId,
  newTicketCookie,
  saveConserts,
  getConserts,
  getAvailabilityByTitle
}
