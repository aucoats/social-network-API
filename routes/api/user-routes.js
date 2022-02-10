const router = require('express').Router(); 

router.route('/').get( (req, res) => {
    console.log(req);
})

module.exports = router; 