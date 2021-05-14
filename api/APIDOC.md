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
