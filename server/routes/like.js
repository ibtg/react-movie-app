const express = require('express');
const router = express.Router();
const { Like } = require('../models/Like');

// how many people like this movie
router.post('/likeNumber', (req, res) => {
  req.body.id;

  Like.find({ id: req.body.id }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, likeNumber: info.length });
  });
});

// whether i like this movie
router.post('/liked', (req, res) => {
  Like.find({
    id: req.body.id,
    userFrom: req.body.userFrom,
  }).exec((err, info) => {
    if (err) return res.status(400).send(err);

    let result = false;

    // if liked movie
    if (info.length !== 0) {
      result = true;
    }
    res.status(200).json({ success: true, liked: result });
  });
});

router.post('/removeFromLiked', (req, res) => {
  Like.findOneAndDelete({
    id: req.body.id,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, doc });
  });
});

router.post('/addToLike', (req, res) => {
  const like = new Like(req.body);
  like.save((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

// get movies that i liked
router.post('/getLikedMovie', (req, res) => {
  Like.find({ userFrom: req.body.userFrom }).exec((err, likes) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, likes });
  });
});

// remove movies that i like
router.post('/removeFromLike', (req, res) => {
  Like.findOneAndDelete({
    id: req.body.id,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, doc });
  });
});

module.exports = router;
