const express = require('express');
const router = express.Router();
var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '1001995',
  key: '39a0914e65feead5b9ed',
  secret: '52227f6cde00c06140c8',
  cluster: 'eu',
  encrypted: true
});

router.get('/', (req, res) => {
    res.send('k');
});

router.post('/', (req, res) => {
    pusher.trigger('os-poll', 'os-vote', {
        points: 1,
        os: req.body.os
    });
    return res.json({
        success: true,
        message: 'Thanks for voting.'
    })
});









module.exports = router;