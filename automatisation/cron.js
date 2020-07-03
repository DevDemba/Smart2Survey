const CronJob = require('cron').CronJob;

console.log('Before job instantiation');
const job = new CronJob('*/30 * 11-18 * * *', () => {
  console.log('Running Function');
  task.runFunction();
});
console.log('After job instantiation');
job.start();
