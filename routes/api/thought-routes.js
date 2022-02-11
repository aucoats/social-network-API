const router = require('express').Router(); 
const { User, Thought } = require('../../models');

router.route('/').get((req, res) => {
    Thought.find({})
    .then(dbThought => res.json(dbThought))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
})
.post((req, res) => {
    Thought.create(
    {   
        thoughtText: req.body.thoughtText,
        username: req.body.username 
    })  
    .then(({ _id }) => {
        return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: _id }},
            { new: true }
        )
    })
    .then(dbThought => res.json(dbThought))
    .catch(err => res.json(err));
})

router.route('/:id').get((req, res) => {
    Thought.findOne({ _id: req.params.id })
    .then(dbThought => {
        if (!dbThought) {
            res.json(404).json({ message: 'No thought with this id' })
            return;
        }
        res.json(dbThought);
    })
    .catch(err => {
        console.log(err);
        res.json(400).json(err);
    })
})
.put((req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.id },
        req.body, 
        { new: true }
    )
    .then(dbThought => {
        if (!dbThought) {
            res.json(404).json({ message: 'No thought with this id' })
            return;
        }
        res.json(dbThought);
    })
    .catch(err => {
        console.log(err);
        res.json(400).json(err);
    })
})
.delete((req, res) => {
    Thought.findOneAndDelete({ _id: req.params.id })
    .then(dbThought => {
        if (!dbThought) {
            res.json(404).json({ message: 'No thought with this id '})
            return;
        }
        res.json(dbThought);
    })
    .catch(err => {
        console.log(err);
        res.json(400).json(err);
    })
})

router.route('/:thoughtId/reactions').post((req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId }, 
        { $push: { reactions: req.body }},
        { new: true }
    )
    .then(dbThought => {
        if (!dbThought) {
            res.status(404).json({ message: 'No thought with this id' })
            return; 
        }
        res.json(dbThought);
    })
    .catch(err => res.json(err));
})
.delete((req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.body.reactionId }}},
        { new: true }
    )
    .then(dbThought => res.json(dbThought))
    .catch(err => res.json(err));
})

module.exports = router; 