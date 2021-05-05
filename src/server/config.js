const app = require('../app');
const {port} = require('../server/environment');
const log4js = require('log4js');
const log = log4js.getLogger();
log.level = 'all';


app.listen(port, () => {
    log.info(`Server running on port ${port}`);
});

module.exports = app;
