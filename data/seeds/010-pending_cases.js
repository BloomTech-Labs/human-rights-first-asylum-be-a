exports.seed = function (knex) {
  return knex('pending_cases')
    .del()
    .then(function () {
      return knex('pending_cases').insert([
        {
          // Done
          pending_case_id: '2ff54195-ce30-456c-be63-2a6c765bdce3',
          user_id: '00ulzdrizE2yzxToH5d6',
          case_url:
            'https://hrf-asylum-cases.s3.amazonaws.com/2ff54195-ce30-456c-be63-2a6c765bdce3.pdf',
          file_name: 'Asylum Case',
          case_date: '1-24-2014',
          judge_id: 1,
          case_outcome: 'Denied',
          country_of_origin: 'Mexico',
          protected_grounds: 'Social Group',
          application_type: 'initial',
          case_origin_city: 'Baltimore',
          case_origin_state: 'MD',
          gender: 'Male',
          applicant_language: 'Spanish',
          indigenous_group: 'Not Applicable',
          type_of_violence: 'Not Applicable',
          appellate: false,
          filed_in_one_year: false,
          credible: true,
          status: 'Review',
          uploaded: '05-10-2050',
        },
        {
          pending_case_id: '2ff54195-ce30-456c-be63-2a6c765bdce4',
          user_id: '00ulzdrizE2yzxToH5d6',
          case_url:
            'https://hrf-asylum-cases.s3.amazonaws.com/2ff54195-ce30-456c-be63-2a6c765bdce4.pdf',
          file_name: 'Asylum Case 2',
          case_date: '1-24-2014',
          judge_id: 1,
          case_outcome: 'Denied',
          country_of_origin: 'Mexico',
          protected_grounds: 'Social Group',
          application_type: 'initial',
          case_origin_city: 'Baltimore',
          case_origin_state: 'MD',
          gender: 'Male',
          applicant_language: 'Spanish',
          indigenous_group: 'Not Applicable',
          type_of_violence: 'Not Applicable',
          appellate: false,
          filed_in_one_year: false,
          credible: true,
          status: 'Pending',
          uploaded: '05-10-2050',
        },
        {
          // Done
          pending_case_id: '2ff54195-ce30-456c-be63-2a6c765bdce5',
          user_id: '00ulzdrizE2yzxToH5d6',
          case_url:
            'https://hrf-asylum-cases.s3.amazonaws.com/2ff54195-ce30-456c-be63-2a6c765bdce5.pdf',
          file_name: 'Asylum Case 3',
          case_date: '1-24-2014',
          judge_id: 1,
          case_outcome: 'Denied',
          country_of_origin: 'Mexico',
          protected_grounds: 'Social Group',
          application_type: 'initial',
          case_origin_city: 'Baltimore',
          case_origin_state: 'MD',
          gender: 'Male',
          applicant_language: 'Spanish',
          indigenous_group: 'Not Applicable',
          type_of_violence: 'Not Applicable',
          appellate: false,
          filed_in_one_year: false,
          credible: true,
          status: 'Error',
          uploaded: '05-10-2050',
        },
      ]);
    });
};
