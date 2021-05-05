
const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const log = log4js.getLogger();
log.level = 'all';
const { saveTopic } = require('../business/pubsub/topic');
const { getSusbcription } = require('../business/pubsub/subscription');


router.post('/api/v1/pubsub',async (req, res) => {
    try {
        let body = req.body;
        let response = await saveTopic(body);
        log.info("idPubSub: ",response);
        res.status(200).json({idPubSub: response});
    } catch (err) {
        log.error(err);
        res.status(400).json("error en llamada del servicio");
    }
});

router.get('/api/v1/pubsub',async (req, res) => {
    try {
        let message = await getSusbcription();
        res.status(200).json(message);
    } catch (err) {
        log.error(err);
        res.status(400).json("error en llamada del servicio");
    }
});

module.exports = router;
