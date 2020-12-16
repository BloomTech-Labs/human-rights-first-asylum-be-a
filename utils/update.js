/* 

const CronJob = require('cron').CronJob;
const cacache = require('cacache')
const axios = require('axios');
const Judge = require('../api/judges/judgeModel');
const Case = require('../api/cases/caseModel');

 TODO uncomment code when DS gets a server running

 * update automatically updates the server - cron is persistant across server updates

 * '0 0 * * *' => Runs Daily at Midnight - PST
 * '0 0 * * sun' => Runs Weekly, Midnight Sunday - PST
 ! If DS changes when their backend updates, change cron appropriately
const update = new CronJob(
  '0 0 * * *',
  function () {
    let new_data = [];
    axios
      .get(process.env.DS_API_URL)
      .then((res) => {
        // ! for postman testing
        new_data = res.data;
        res.send(200).json(new_data);
      })
      .catch((err) => {
        res.send(500).json(err.message);
      })
      .finally(async () => {
        // * judge data & case data
        const judge_data = new_data.judge_data;
        // * for judge in judge_data, check if name returns a value
        for (const judge in judge_data) {
          Judge.findByName(judge[name])
            .then((found_judge) => {
              if (found_judge.length > 0) {
                // * update judge
                Judge.update(found_judge.name)
                  // * on success continue
                  .then()
                  .catch((err) => console.log(err.message));
              } else {
                // * add judge
                Judge.add(judge)
                  // * on success continue
                  .then()
                  .catch((err) => console.log(err.message));
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }

        const case_data = new_data.case_data;
        // * for case in case data, check if case_id returns a value
        for (const ref_case in case_data) {
          Case.findById(ref_case[id])
            .then((ret_case) => {
              if (!ret_case.length) {
                Case.add(ref_case)
                  // * continue
                  .then()
                  .catch((err) => console.log(err.message));
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  },
  null,
  true,
  'America/Los_Angeles'
);

* runs at 00:30 daily
* '0 0 * * sun' => Runs Weekly, 00:30 Sunday - PST

const clearCache = new CronJob(
  '0 30 * * *',
  function () {
cacache.rm.all(cachePath).then(() => {
  console.log('THE APOCALYPSE IS UPON US 😱')
})
},
  null,
  true,
  'America/Los_Angeles' );

update.start();
clearCache.start();

*/
