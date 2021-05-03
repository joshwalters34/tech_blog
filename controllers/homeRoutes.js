const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();

    const posts = postData.map((data) => data.get({ plain: true }))
    .map(val => {
      return {
        ...val,
        logged_in: req.session.logged_in,
      }
    })

    res.render('homepage', {
      posts,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signup', async (req, res) => {
   res.render('signup');
});

router.get('/post', async (req, res) => {
  res.render('post', {
    logged_in: req.session.logged_in,
  });
});

router.get('/dashboard', async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  
  try {
    const postData = await Post.findAll({
      where: {user_id:req.session.user_id}
    }
    );
    // console.log(req.session.user_id)
    const posts = postData.map((data) => data.get({ plain: true }))
    console.log(posts);

    res.render('dashboard', {
      posts,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
