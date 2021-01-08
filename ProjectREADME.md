# Human Rights First Team A Back End

## Description

Backend built to support the HRF-Front End Team during Lambda Labs 29. Contains Endpoints and Data Tables for Judges, Cases, Keywords, Social Groups, and Protected Grounds. Interacts with Data Science AWS & will in the future connect to the DataScience PG Database.

## Installation

`npm install`

## Framework

- Node.js
- Express.js
- sqlite3

### Dependencies

[cacache](https://www.npmjs.com/package/cacache)
[cron](https://www.npmjs.com/package/cron)
[mime-types](https://www.npmjs.com/package/mime-types)
[json2csv](https://www.npmjs.com/package/json2csv)
[aws-sdk](https://www.npmjs.com/package/aws-sdk)

## API Reference

API is documented via Swagger.
After installing, host & view documentation.

## Recommendation

Install VSCode Extension "Better Comments" for more comment readability.

## Notes to the Next Dev Team

### Completed Tasks

- keywords - router & model complete
- profile - router & model complete
- tags - router & model complete

### Uncompleted Tasks

- cases - swagger docs needed for endpoints['/:id/view-pdf','/:id/download-pdf', '/:id/download-csv' ]
  -judges - swagger docs needed for endpoints ['/:name/csv']

- more tests

### Bugs

- judges - cache doesn't store CSV data properly at makeZipCache. You will need to investigate what's going on there. I suspect that there needs to be a conversion of each CSV individually OR you need to spend some more time drilling and figure out how to write a zip file to the cache.

### Improvements

- ds - unsure if code will properly post to datascience pg database. Datascience PG database was unavailable during the project.

- judges - fullJudgeData now takes a very long time to call. I recommend that the '/judges' call be made to 'findAll' and return ONLY the judges from the primary database. Additional information should be specifically requested by the front end during navigation to the JudgePage(front end).

- The database is set up to record each individual use of a keyword/tag. There are probably better/faster ways to keep track of this data.

- The update function written in middleware only works in theory. Once the DS server is up, it will need to be tested and tweaked.

- To minimize loading time, a CronJob could be added for each judge in the database to make a call to retreive their full data. This would speed up the user experience.

- Testing needs to be written more fully. The only tests that reliably pass are the profile tests.
