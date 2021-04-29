# Human Rights First - Asylum - Back End

- This project is built with the Basic Node API Scaffold. To get started with the project, go [here](https://docs.labs.lambdaschool.com/labs-api-strarter/) and follow the instructions. Be sure to read the instructions carefully. We found it easiest to use ElephantSQL for setting up your local database.
- [Project deployed here](https://asylum-a-api.herokuapp.com/), using Heroku Postgres.
- [Corresponding Front-end Repository](https://github.com/Lambda-School-Labs/human-rights-first-asylum-fe-a)
- [Front-end deployment](https://a.humanrightsfirstasylum.dev/), using AWS Amplify.

### Dependencies

[All Dependencies](package.json)

### To get started:

- Create a local Postgres database/instance.
- Clone the repo locally to your machine
- Create an .env file on the top level of the repo, with the provided credentials.
- run: `npm install` to download all dependencies.
- run: `npm run knex migrate:latest` to migrate database.
- run: `npm run knex seed:run` to seed the database
- run: `npm run watch:dev` to start your local development server.

### Current Back-End Database Schema

![Asylum Case Analyzer - Database Schema](./reference/current_db_schema.png?raw=true)

- positive and negative tags tables removed.

## Labs 33

- Currently, some endpoints require authentication. In the future, auth will need to be added to all endpoints however it has not been done yet to make it easier for the entire team to work with the data.
- Authentication middleware `./middleware/authRequired.js` is fully functional need to be added to each endpoints which needs authentication.
- The `.env.sample` file contains all of the environment variables needed and where to find the values in order to run the project locally.
- There`s a API endpoint implemented by previous teams called [Swagger docs](https://asylum-a-api.herokuapp.com/api-docs/) API information in these documantation is not accurate. Swagger docs needs to be cleaned from code. Accurate and up-to-date API documantation please refer to [this readme file](api/APIDOC.md)

## Contributors

### Labs33

|                                                                                                                                 |                                                                                                                                     |                                                                                                                            |
| :-----------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------: |
|                                          [Senih Aydin](https://github.com/aydinsenih)                                           |                                          [Christina Melchor](https://github.com/c-melchor)                                          |                                         [Cameron Mirza](https://github.com/cmirza)                                         |
| [<img src="https://avatars.githubusercontent.com/u/35286437?v=4" width = "200" align="center"/>](https://github.com/aydinsenih) |   [<img src="https://avatars.githubusercontent.com/u/71955286?v=4" width = "200" align="center"/>](https://github.com/c-melchor)    | [<img src="https://avatars.githubusercontent.com/u/7876859?v=4" width = "200" align="center"/>](https://github.com/cmirza) |
|                                          [Rees Harper](https://github.com/reesharper)                                           |                                        [Matthew Justice](https://github.com/JusticeMatthew)                                         |
| [<img src="https://avatars.githubusercontent.com/u/70249966?v=4" width = "200" align="center"/>](https://github.com/reesharper) | [<img src="https://avatars.githubusercontent.com/u/72817096?v=4" width = "200" align="center"/>](https://github.com/JusticeMatthew) |

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
