import { log } from 'console';
import cron from 'cron';
import https from 'https';

const URL = "https://recrave-backend.onrender.com";

const job = new cron.CronJob('*/10 * * * *', function () {
    https.get(URL, (res) => {
        if (res.statusCode === 200) {
            console.log('✅ Server is up and running');
        } else {
            console.log('❌ Server is down');
        }
    }).on('error', (e) => {
        console.log('❌ Server is down', e);
    });
});

export default job;