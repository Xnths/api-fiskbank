const router = require('express').Router({ mergeParams: true })

router.get('/', (req, res, next) => {
    res.send(JSON.stringify('GET'))
})

module.exports = router;