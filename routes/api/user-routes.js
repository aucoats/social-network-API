const router = require('express').Router(); 
const { User, Thought } = require('../../models');

router.route('/').get((req, res) => {
    User.find({})
    .populate({
        path: 'thoughts',
    })
    .populate({
        path: 'friends',
    })
    .select('-__v')
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
})
.post((req, res) => {
    User.create(req.body)
    .then(dbUser => res.json(dbUser))
    .catch(err => res.status(400).json(err))
})

router.route('/:id').get((req, res) => {
    User.findOne({ _id: req.params.id })
    .populate({
        path: 'thoughts',
    })
    .populate({
        path: 'friends',
    })
    .select('-__v')
    .then(dbUserData => {
        if (!dbUserData) {
            res.json({ message: 'No user with this id' })
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
})
.put((req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true})
    .then(dbUser => {
        if (!dbUser) {
            res.status(404).json({ message: 'No user with this id' })
            return;
        }
        res.json(dbUser);
    })
    .catch(err => res.status(400).json(err));
})
.delete((req, res) => {
    User.findOneAndDelete({ _id: req.params.id})
    .then(dbUser => {
        if (!dbUser) {
            res.status(404).json({ message: 'No user with this id' })
            return;
        }
        res.json(dbUser);
    })
    .catch(err => res.status(400).json(err));
})

module.exports = router; 