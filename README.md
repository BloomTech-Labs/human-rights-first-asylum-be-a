# Human Rights First - Asylum

## Product Mission and Goals

Human Rights First (HRF) is a non-profit, nonpartisan, 501(c)(3), international human rights organization based in New York, Washington D.C., Houston, and Los Angeles. HRF works to link immigration attorneys and advocates with asylum seekers and provide those attorneys with resources to best represent their clients. Our application leverages historical data to better inform advocates of a judge’s past decisions. The hope is that advocates for asylum seekers can use our tools to tailor their arguments before a particular judge and maximize their client's chances of receiving asylum.

## Getting Started
The base technologies are JavaScript, HTML and CSS. The frontend leverages [React](https://reactjs.org/), the backend uses [Express](https://expressjs.com/) and [PostgreSQL](https://www.postgresql.org/), the server runs on [Heroku](heroku.com), and the authentication workflow runs on [Okta](https://developer.okta.com/okta-sdk-nodejs/jsdocs/). Frontend is hosted on [AWS](https://aws.amazon.com/).
Style guide/wireframe located on [Figma](https://www.figma.com/file/V2XbE5rpvqrNLOXs3m82k8/HRF-Asylum-Labs34-A)

### Developer Instructions
1. Clone both the [front-end](https://github.com/Lambda-School-Labs/human-rights-first-asylum-fe-a) and [back-end](https://github.com/Lambda-School-Labs/human-rights-first-asylum-be-a) repositories to your machine. DO NOT FORK.
1. From the backend directory, in your terminal:
    1. Create an environment file (.env) based on the [sample .env](https://github.com/Lambda-School-Labs/human-rights-first-asylum-fe-a/blob/main/.env.sample) and populate the environment variables (Migrate/Seed your local database)
    1. Make sure the `.env` is in your `.gitignore`
    1. Download the server dependencies by running `npm install`
    1. Migrate your tables by running `npm run knex migrate:latest`
    1. Seed your tables by running `npm run knex seed:run`
    1. Start up the server by running `npm run watch:dev`
1. From the frontend directory in your terminal:
    1. Download the frontend dependencies by running `npm install`
    1. Start up the app by running `npm start`

# Endpoints

## Status

| Method | Endpoint | Request Body | Returns                    |
| ------ | -------- | ------------ | -------------------------- |
| GET    | `/`      | -            | `{ api: "up", timestamp }` |

## Cases

###### Referance case schema:

    {
        "case_id": "2ff54195-ce30-456c-be63-2a6c765bdce2",
        "user_id": "00ulzdrizE2yzxToH5d6",
        "case_url": "https://hrf-asylum-cases.s3.amazonaws.com/2ff54195-ce30-456c-be63-2a6c765bdce2.pdf",
        "case_number": "A094-216-526",
        "date": "1-24-2013",
        "judge": "1",
        "case_outcome": "Denied",
        "country_of_origin": "Mexico",
        "protected_grounds": "Social Group",
        "application_type": "initial",
        "case_origin_city": "Baltimore",
        "case_origin_state": "MD",
        "gender": "Male",
        "applicant_language": "Spanish",
        "indigenous_group": "Not Applicable",
        "type_of_violence": "Not Applicable",
        "appellate": false,
        "filed_in_one_year": false,
        "credible": true,
        "status": "approved",
        "uploaded": "1",
        "judge_name": "David W. Crosland"
    }

| Method | Endpoint                  | Request Body     | Returns                          |
| ------ | ------------------------- | ---------------- | -------------------------------- |
| GET    | `/cases`                  | -                | `Referance case`                 |
| GET    | `/cases/:id`              | -                | `Referance case`                 |
| GET    | `/cases/:id/view-pdf`     | -                | `PDF file of the case`           |
| GET    | `/cases/:id/download-pdf` | -                | `PDF file of the case`           |
| GET    | `/cases/:id/download-csv` | -                | `case information as CSV format` |
| PUT    | `/cases/:id`              | `Referance case` | `updatedCase`                    |

## Data

| Method | Endpoint                | Request Body | Returns                                               |
| ------ | ----------------------- | ------------ | ----------------------------------------------------- |
| GET    | `/data/viz/{stateCode}` | -            | `A plotly result object.`                             |
| GET    | `/data/form`            | -            | `{judge_names, social_group_type, protected_grounds}` |
| GET    | `/data/upload`          | -            | -                                                     |

## Judges

###### Referance judge schema:

    {
        "judge_id": "1",
        "name": "David W. Crosland",
        "judge_county": "Baltimore",
        "judge_image": "https://s3.amazonaws.com/uifaces/faces/twitter/bfrohs/128.jpg",
        "date_appointed": "May 1997",
        "birth_date": "(unavailable)",
        "biography": "https://www.justice.gov/eoir/BaltimoreNatzCer03072012",
        "denial_rate": 51.8,
        "approval_rate": 48.2,
        "appointed_by": "Janet Reno"
    }

| Method | Endpoint            | Request Body | Returns                                                                                 |
| ------ | ------------------- | ------------ | --------------------------------------------------------------------------------------- |
| GET    | `/judges`           | -            | `[Referance judge]`                                                                     |
| GET    | `/judges/:name`     | -            | `{Referance judge, appointed_by, social_data, grounds_data, country_data, case_data}`   |
| GET    | `/judges/all`       | -            | `[{Referance judge, appointed_by, social_data, grounds_data, country_data, case_data}]` |
| GET    | `/judges/:name/csv` | -            | `judge information as CSV format`                                                       |

## Profile

###### Referance profile schema:

    {
        "id": "00ulzfj6nX72gu3Nh4d6",
        "email": "email@email.mail",
        "name": "username",
        "avatarUrl": null,
        "role": "user",
        "created_at": "2021-04-21T18:47:18.712Z",
        "updated_at": "2021-04-21T18:47:18.712Z"
    }

| Method | Endpoint                      | Request Body        | Returns                      |
| ------ | ----------------------------- | ------------------- | ---------------------------- |
| GET    | `/profiles`                   | -                   | `[Referance profile]`        |
| GET    | `/profiles/:id`               | -                   | `Referance profile`          |
| GET    | `/profiles/pending`           | -                   | `[Referance profile]`        |
| GET    | `/profiles/pending/:id`       | -                   | `Referance profile`          |
| POST   | `/profiles`                   | `Referance profile` | `{created profile}`          |
| POST   | `/profiles/pending`           | `Referance profile` | `{created profile}`          |
| PUT    | `/profiles/:id`               | `Referance profile` | `{updated profile}`          |
| DELETE | `/profiles/:id`               | -                   | `{deleted profile}`          |
| DELETE | `/profiles/pending/:id`       | -                   | `{deleted profile}`          |
| POST   | `/profiles/:id/judge/:name`   | -                   | `{message, judge_bookmarks}` |
| DELETE | `/profiles/:id/judge/:name`   | -                   | `{message}`                  |
| POST   | `/profiles/:id/case/:case_id` | -                   | `{message, case_bookmarks}`  |
| DELETE | `/profiles/:id/case/:case_id` | -                   | `{message}`                  |

## Tags

| Method | Endpoint        | Request Body | Returns |
| ------ | --------------- | ------------ | ------- |
| GET    | `/tags/grounds` | -            | `[]`    |
| GET    | `/tags/social`  | -            | `[]`    |

## NewCase

#### Deprecated!!!

###### Referance newcase schema:

    {
        "primary_key": "150",
        "user_id": "00ulzdrizE2yzxToH5d6",
        "case_id": "A094-216-526",
        "initial_or_appellate": false,
        "hearing_date": "",
        "judge": "3",
        "case_origin": "",
        "case_filed_within_one_year": true,
        "application_type": "initial",
        "protected_ground": "Not Applicable",
        "case_outcome": "",
        "nation_of_origin": "Mexico",
        "applicant_gender": "Male",
        "type_of_violence_experienced": "Not Applicable",
        "applicant_indigenous_group": "Not Applicable",
        "applicant_language": "Spanish",
        "applicant_access_to_interpreter": true,
        "applicant_perceived_credibility": false
    }

| Method | Endpoint           | Request Body        | Returns               |
| ------ | ------------------ | ------------------- | --------------------- |
| GET    | `/newcase`         | -                   | `[referance newcase]` |
| POST   | `/newcase`         | `Referance newcase` | `{created_case}`      |
| POST   | `/newcase/approve` | `{id}`              | `{approved_case}`     |
| DELETE | `/newcase/:id`     | -                   | `{message}`           |


### About

- The Front End of the application allows Administrators to invite users and assign them as either an Administrator role or a Refugee Representative role. This application uses [Okta](https://www.okta.com/) to handle third-party authentication for user sign up/login. (FUTURE DEVS: This can be checked in the back-end repo, look to the ProfileRouter for more information. For front-end, look to the 'HomeContainer' component.)
- Administrators are able to oversee user management such as inviting users, editing any user's role, and deleting users. They may also perform all other tasks available to Administrators or Refugee Representatives.
- Administrators are able to approve, deny, or edit uploaded asylum case data, as well as perform all other tasks available to Refugee Representatives.
- Refugee Representatives, or standard users, are able to look up information on judges, look up information on previous asylum cases, upload case file information in bulk on asylum case rulings, and see accurate data visualizations.

### Key Features

- Added new home page which displays visualizations meant to showcase the current state of the database and, eventually, the state of asylum cases across the nation
- Swapped many Material UI components to use ANT D instead
- Moved many features to use modals to prevent from UX being disrupted by unnecessary page-hopping (Case Upload, add/edit a user, edit/add a faq, case details/edit case, and support contact form)
- Combined related features in the sidebar, making for a smoother user experience
- Style improvements all around

### Still Needs Work

- All alerts need to be swapped to ANT D notifications to match the case upload notifications
- Change the accordions on the 'Manage Users' page to a table to account for a larger userbase and facilitate searching for admins/our stakeholders
- All of the reloading pages (Occurs on any delete, update, or add functionality) should be switched to simply update the state rather than starting a full reload
- The stakeholders have mentioned possibly wanting an alert system to be implemented, either within the app itself and/or as customizable email notifications. This could be added to the account settings as an option so users can toggle as they please
- Stakeholders have also mentioned users might want to be able to favorite/subscribe to specific judges so they can watch for new cases to be added that might be most relevant to them
- Add a comment when you deny or reject a case describing your decision (Add/reject case functionality still needs to be built out on 'Manage Cases')
- The new hub page could use some more fine-tuning/additional visualizations
- The back-end repo has a lot of unused functions that may need to be cleaned up
- The swapping from Material UI components to ANT D components still needs to be completed
- Sort out where the support contact form goes (Check backend ENV credentials)
- The ability to request to join the app still needs work
- The PDF view for the my_cases table still needs work
- Much discourse was had regarding judge ids and how to present them, this may need to be looked at deeper
- May need to add a bridge table for protected_grounds
- May need to reevaluate table relationships in handling judge to case relationships