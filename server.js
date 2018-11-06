// server.js
const next = require('next');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const cors = require('cors');
const uuid = require('uuid').v4;
const Pusher = require('pusher');
const logger = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

const isDev = process.env.NODE_ENV !== 'production';
const app = next({ dev: isDev });
const handler = routes.getRequestHandler(app);

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  encrypted: true,
});

const initializePeople = ({ lat, lng }) => {
  const randomInRange = num => (width = 0.01) =>
    Math.random() * width * 2 + num - width;

  const randomLat = randomInRange(lat);
  const randomLng = randomInRange(lng);

  const people = [
    'Stephanie',
    'John',
    'Steve',
    'Anna',
    'Margaret',
    'Felix',
    'Chris',
    'Jamie',
    'Rose',
    'Bob',
    'Vanessa',
    '9lad',
    'Bridget',
    'Sebastian',
    'Richard',
  ];

  return people.map(name => ({
    name,
    id: uuid(),
    position: { lat: randomLat(0.0075), lng: randomLng(0.02) },
    online: false,
  }));
};

// With express
const express = require('express');
const port = isDev ? 3000 : 80;
app
  .prepare()
  .then(() => {
    const server = express();

    const referencePosition = { lat: 6.4311415, lng: 3.4625833 };

    const people = initializePeople(referencePosition);

    server
      .use(cors())
      .use(logger('dev'))
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }));

    server.get('/people', (req, res, next) => {
      res.json({ status: 'success', people });
    });

    server.post('/transit/:id', (req, res, next) => {
      const id = req.params.id;
      const { lat, lng } = req.body;

      people.forEach((person, index) => {
        if (person.id === id) {
          people[index] = { ...person, position: { lat, lng } };
          return pusher.trigger('map-geofencing', 'transit', {
            person: people[index],
            people,
          });
        }
      });
    });

    server.post('/:presence/:id', (req, res, next) => {
      const id = req.params.id;
      const presence = req.params.presence;

      if (['online', 'offline'].includes(presence)) {
        people.forEach((person, index) => {
          if (person.id === id) {
            return (people[index] = {
              ...person,
              online: presence === 'online',
            });
          }
        });
      }
    });

    server.get('*', (req, res) => {
      return handler(req, res);
    });

    server
      .use(handler)
      .use(cookieParser())
      .listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
      });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
