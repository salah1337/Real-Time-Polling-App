const express = require('express');
const router = express.Router();
var Pusher = require('pusher');

var Vote = require('../models/Vote')

var pusher = new Pusher({
  appId: '1001995',
  key: '39a0914e65feead5b9ed',
  secret: '52227f6cde00c06140c8',
  cluster: 'eu',
  useTLS: true
});

router.get('/', (req, res) => {
    Vote.find().then(votes => res.json({
        success: true,
        votes: votes
    }))
});

router.post('/', (req, res) => {
    const newVote = {
        os: req.body.os,
        points: 1
    }

    new Vote(newVote).save().then(vote => {

        pusher.trigger('os-poll', 'os-vote', {
            points: parseInt(vote.points),
            os: vote.os
        });
        return res.json({
            success: true,
            message: 'Thanks for voting.'
        })

    })

    
});









module.exports = router;