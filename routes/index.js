const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => res.send('Incorrect route! Use /api!')); // Returns an error message when not using /api

module.exports = router;