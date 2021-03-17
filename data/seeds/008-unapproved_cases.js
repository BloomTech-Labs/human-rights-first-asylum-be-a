exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('unapproved_cases')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('unapproved_cases').insert([
        {
          case_id: 'A094-216-526',
          case_url:
            'pdf/125708363-Ferino-Sanchez-Seltik-A094-216-526-BIA-Jan-14-2013.pdf',
          judge: '',
          initial_or_appellate: false,
          // hearing_type: 'Termination', pending approval by stakeholder
          nation_of_origin: 'Mexico',
          case_origin: '',
          hearing_date: '',
          // decision_date: '', pending approval by stakeholder
          applicant_perceived_credibility: false,
          applicant_access_to_interpreter: true,
          applicant_indigenous_group: 'Not Applicable',
          applicant_language: 'Spanish',
          case_filed_within_one_year: true,
          // case_status: '', pending approval by stakeholder
          case_outcome: '',
          // submissionStatus: 'pending', pending approval by stakeholder
          application_type: 'initial',
          protected_ground: 'Not Applicable',
          applicant_sex: 'Male',
          type_of_violence_experienced: 'Not Applicable',
        },
        {
          case_id: 'A057-056-1193',
          case_url:
            'pdf/125722233-Noe-Cesar-Hernandez-Avila-A079-531-484-BIA-Aug-30-2012.pdf',
          judge: '',
          initial_or_appellate: true,
          // hearing_type: 'Reopening',
          nation_of_origin: 'Mexico',
          case_origin: 'Imperial, CA',
          hearing_date: '',
          // decision_date: '',
          applicant_perceived_credibility: false,
          applicant_access_to_interpreter: true,
          applicant_indigenous_group: 'Not Applicable',
          applicant_language: 'English',
          case_filed_within_one_year: false,
          // case_status: '',
          case_outcome: '',
          // submissionStatus: 'submitted',
          application_type: 'initial',
          protected_ground: 'Not Applicable',
          applicant_sex: 'Male',
          type_of_violence_experienced: 'Not Applicable',
        },
        {
          case_id: 'A071-996-819',
          case_url:
            'pdf/127030786-Joao-Silva-Laudelino-A088-268-610-BIA-Dec-14-2012.pdf',
          judge: '',
          initial_or_appellate: true,
          // hearing_type: 'Appeal',
          nation_of_origin: 'Mexico',
          case_origin: '',
          hearing_date: '',
          // decision_date: '',
          applicant_perceived_credibility: true,
          applicant_access_to_interpreter: true,
          applicant_indigenous_group: 'Not Applicable',
          applicant_language: 'Spanish',
          case_filed_within_one_year: true,
          // case_status: '',
          case_outcome: '',
          // submissionStatus: 'pending',
          application_type: 'initial',
          protected_ground: 'Not Applicable',
          applicant_sex: 'Male',
          type_of_violence_experienced: 'Not Applicable',
        },
      ]);
    });
};
