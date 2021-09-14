const express = require("express");
const ContentTopApi = require('../controller/ContentTopApi');

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send({ success: 'Yes success' });
});

router.get('/contentTop', function (req, res, next) {
  const contentTopLeft = [
    {
      imgSrc: 'images/550x330x1.jpg',
      link: 'pages/single.html',
      displayText: 'Sed luctus semper odio aliquam rhoncus'
    },
    {
      imgSrc: 'images/550x330x2.jpg',
      link: 'pages/single.html',
      displayText: 'Sed luctus semper odio aliquam rhoncus'
    },
    {
      imgSrc: 'images/550x330x3.jpg',
      link: 'pages/single.html',
      displayText: 'Sed luctus semper odio aliquam rhoncus'
    },
    {
      imgSrc: 'images/550x330x4.jpg',
      link: 'pages/single.html',
      displayText: 'Sed luctus semper odio aliquam rhoncus'
    }
  ];

  const contentTopRight = [
    {
      imgSrc: 'images/300x215x1.jpg',
      link: 'pages/single.html',
      displayText: 'Sed luctus semper odio aliquam rhoncus'
    },
    {
      imgSrc: 'images/300x215x2.jpg',
      link: 'pages/single.html',
      displayText: 'Sed luctus semper odio aliquam rhoncus'
    },
    {
      imgSrc: 'images/300x215x3.jpg',
      link: 'pages/single.html',
      displayText: 'Sed luctus semper odio aliquam rhoncus'
    },
    {
      imgSrc: 'images/300x215x4.jpg',
      link: 'pages/single.html',
      displayText: 'Sed luctus semper odio aliquam rhoncus'
    }
  ];
  res.send({ contentTopLeft, contentTopRight });
});

router.get('/getCurrentContentApi', async (req, res, next) => {
  try {
    await ContentTopApi.getCurrentPageData(req, res, req.query);
  } catch (e) {
    console.log('an error?', e);
  }
});

router.get('/getFileRoutes', async (req, res, next) => {
  try {
    await ContentTopApi.getFileRoutes(req, res);
  } catch (e) {
    console.log('an error?', e);
  }
});

router.get('/similarPostApi', async (req, res, next) => {
  try {
    await ContentTopApi.similarPost(req, res);
  } catch (e) {
    console.log('an error?', e);
  }
});

module.exports = router;
