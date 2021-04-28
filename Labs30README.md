# Human Rights First - Asylum - Back End

- This project is built with the Basic Node API Scaffold. To get started with the project, go [here](https://docs.labs.lambdaschool.com/labs-api-strarter/) and follow the instructions. Be sure to read the instructions carefully. We found it easiest to use ElephantSQL for setting up your local database.
- [Project deployed here](https://asylum-a-api.herokuapp.com/), using Heroku Postgres.
- [View the Swagger docs](https://asylum-a-api.herokuapp.com/api-docs/) (backend endpoint visualization)
- [Corresponding Front-end Repository](https://github.com/Lambda-School-Labs/human-rights-first-asylum-fe-a)
- [Front-end deployment](https://a.humanrightsfirstasylum.dev/), using AWS Amplify.

### Dependencies

[cacache](https://www.npmjs.com/package/cacache)
[cron](https://www.npmjs.com/package/cron)
[json2csv](https://www.npmjs.com/package/json2csv)
[aws-sdk](https://www.npmjs.com/package/aws-sdk)

### To get started:

- Create a local Postgres database/instance.
- Clone the repo locally to your machine
- Create an .env file on the top level of the repo, with the provided credentials.
- run: `npm install` to download all dependencies.
- run: `npm run watch:dev` to start your local development server.

### Current Back-End Database Schema

![Asylum Case Analyzer - Database Schema](./reference/current_db_schema.png?raw=true)

## Labs30 Notes

- There are several comments throughout the code that are in place for the Swagger docs, these comments should remain untouched unless the endpoints change.
- Once there is an actionable API from DS, this backend will use AWS to connect to the API and update our database. This `update` function can be found in `./utils/update.js`
- Currently, there is a function to clear this cache every 30 days (located in `./utils/update.js`), but it is currently commented out. We are still waiting for a working DS model before we uncomment that file.
- As we near the end of labs, we are learning of some potential changes from the stakeholder regarding judge types, the stakeholder now wants to keep track of Board of Immigration Appeals (BIA) judges that are assigned to cases as well as the Immigration Judge (IJ) assigned. This could mean that the database as it stands will need to be redone and new queries will need to be written in the `judgeModel`. If this new information is confirmed, there will be a lot of work to be done. We have drawn up a proposed database schema in the event that a rework of the database is necessary. Both the current database schema and the proposed database schema can be found in `./reference`.
- Currently, only the `/profile` endpoints require authentication. In the future, auth will need to be added to all endpoints however it has not been done yet to make it easier for the entire team to work with the data.
- Adding profiles was not in scope for this iteration, but there is an endpoint created for it. Because of the Okta integration, we were told that adding profiles was not something we would be doing.
- The `.env.sample` file contains all of the environment variables needed and where to find the values in order to run the project locally.
- It is encouraged that you install the "Better Comments" extension for VSCode, there are several comments that were written with this extension in mind.

### Proposed Back-End Database Schema with BIA Judges

![Asylum Case Analyzer - Database Schema](./reference/proposed_db_schema.jpg?raw=true)

### Bugs

- No known bugs!

### Uncompleted Tasks

- Add auth to various endpoints
- Add an edit case endpoint

### Improvements

- Better mock seed data. Currently, only user profiles, cases, and judges are seeded. Future seeding:
  - Protected Grounds: Race, Religion, Nationality, Political Opinion, Protected Social Group
  - Protected Social Groups
  - All Join tables
- DS - Code has not been tested whether it will properly post to datascience Postgres database. Datascience PG database was unavailable during the project.
- The update function written in middleware only works in theory. Once the DS server is up, it will need to be tested and tweaked.
- Testing needs to be written more fully. The only tests that reliably pass are the profile tests.
- Some Case PDFs have the case ID's redacted. If it is not provided by the DS db, we need to generate an (autoincremented) ID

## Contributors

### Labs29 - Team A

|                                                                                                                                          |                                                                                                                                         |                                                                                                                                              |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------: |
|                                               [Ava Wingfield](https://github.com/avawing)                                                |                                                 [Tom Bauer](https://github.com/TBau23)                                                  |                                                  [Ryan Lee](https://github.com/SassyFatCat)                                                  |
| [<img src="https://ca.slack-edge.com/ESZCHB482-W014G4L7R1P-5e90ae004407-512" width = "200" align="center"/>](https://github.com/avawing) | [<img src="https://ca.slack-edge.com/ESZCHB482-W015P694SUV-84c590ba765c-512" width = "200" align="center"/>](https://github.com/TBau23) | [<img src="https://ca.slack-edge.com/ESZCHB482-W014G4N2FEV-9b9fece7a4af-512" width = "200" align="center"/>](https://github.com/SassyFatCat) |
|                                          [Linkedin](https://www.linkedin.com/in/avawingfield/)                                           |                                           [Linkedin](https://www.linkedin.com/in/tombauer11/)                                           |                                             [Linkedin](https://www.linkedin.com/in/sassyfatcat/)                                             |

<br />

### Labs30 - Team A

|                                                                                                                                                                               |                                                                                                                                                                              |                                                                                                                                                                                   |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                [Tzong-Lian Tsay](https://github.com/tzonglian)                                                                |                                                               [Trevor Beadle](https://github.com/TrevorBeadle)                                                               |                                                                [Reuben Palumbo](https://github.com/reubenPalumbo)                                                                 |
| [<img src="https://avatars.githubusercontent.com/u/68922354?s=460&u=93ce3bbc5de94dd89246239b70828545b5dcac5e&v=4" width = "200" align="center"/>](https://github.com/avawing) | [<img src="https://avatars.githubusercontent.com/u/66217015?s=460&u=bc4a490d18d80167985a032f5ca86b9193124a6c&v=4" width = "200" align="center"/>](https://github.com/TBau23) | [<img src="https://avatars.githubusercontent.com/u/68444266?s=460&u=ff38ccc9dcb83047c2134ce9852e0dfef1fae8fb&v=4" width = "200" align="center"/>](https://github.com/SassyFatCat) |
|                                                                [Linkedin](https://www.linkedin.com/in/tltsay/)                                                                |                                                       [Linkedin](https://www.linkedin.com/in/trevor-beadle-1850481b6/)                                                       |                                                              [Linkedin](https://www.linkedin.com/in/reuben-palumbo/)                                                              |
|                                                                                                                                                                               |                                                                                                                                                                              |                                                                                                                                                                                   |
|                                                                [Anna Brander](https://github.com/aelise17264)                                                                 |                                                              [Maycie Morris](https://github.com/maycie-morris)                                                               |                                                                   [Lynda Santiago](https://github.com/lyntechi)                                                                   |
| [<img src="https://avatars.githubusercontent.com/u/66019108?s=460&u=b98ac38b13155691c2189b10914cff7a092ab5a5&v=4" width = "200" align="center"/>](https://github.com/avawing) | [<img src="https://avatars.githubusercontent.com/u/67204638?s=460&u=57c9c3585fd3326f80ce34c02cbb7939a3ddc0fa&v=4" width = "200" align="center"/>](https://github.com/TBau23) | [<img src="https://avatars.githubusercontent.com/u/64440403?s=460&u=ebd52037cfa31421477942f041a43a6ef88267ca&v=4" width = "200" align="center"/>](https://github.com/SassyFatCat) |
|                                                             [Linkedin](https://www.linkedin.com/in/aelise17264/)                                                              |                                                            [Linkedin](https://www.linkedin.com/in/mayciemorris/)                                                             |                                                         [Linkedin](https://www.linkedin.com/in/lynda-santiago-7b58221b4/)                                                         |
