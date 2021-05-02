const router = require('express').Router();
const { Post, User} = require('../../models');
const withAuth = require('../../utils/auth');

// router.post('/:id', withAuth, async (req, res) => {
//   try {
//     const newPost = await Post.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newPost);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

router.post('/:id', (req, res) => {
  Post.create({
      ...req.body,
      post_id: req.params.id,
      user_id: req.session.user_id,
      created_at: req.session.created_at
  })
      .then((post) => {
          res.json(post);
         
});
})

// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const projectData = await Project.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!projectData) {
//       res.status(404).json({ message: 'No project found with this id!' });
//       return;
//     }

//     res.status(200).json(projectData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
