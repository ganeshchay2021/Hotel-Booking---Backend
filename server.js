import dns from 'node:dns/promises';

dns.setServers(["1.1.1.1", "8.8.8.8"]);

import app from './src/app.js';
import config from './src/Config/config.js';
import dbConnection from './src/Services/database.servives.js';

dbConnection();

app.listen(3000, () => {
    console.log(`The Server is running on port no ${config.PORT}`);
});