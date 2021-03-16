// * This data was mocked by manually "scraping" PDFs that were provided to us.

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('cases')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('cases').insert([
        {
          case_id: 'A094-216-526',
          case_url:
            'pdf/125708363-Ferino-Sanchez-Seltik-A094-216-526-BIA-Jan-14-2013.pdf',
          hearing_date: '1-24-2013',
          judge: 'David W. Crosland',
          initial_or_appellate: false,
          // hearing_type: 'Termination' These fields are pending review by stakeholder,
          case_origin: 'Baltimore, MD',
          case_filed_within_one_year: false,
          application_type: 'initial',
          protected_ground: 'true',
          case_outcome: 'Denied',
          nation_of_origin: 'Mexico',
          applicant_sex: 'Male',
          type_of_violence_experienced: 'Not Applicable',
          applicant_indigenous_group: 'Not Applicable',
          applicant_language: 'Spanish',
          applicant_access_to_interpreter: false,
          applicant_perceived_credibility: true,
          // case_status: 'Closed' These fields are pending review by stakeholder,
        },
        {
          case_id: 'A079-531-484',
          case_url:
            'pdf/125722233-Noe-Cesar-Hernandez-Avila-A079-531-484-BIA-Aug-30-2012.pdf',
          hearing_date: '8-30-2012',
          judge: 'Patricia A. Cole',
          initial_or_appellate: false,
          // hearing_type: 'Termination' These fields are pending review by stakeholder,
          case_origin: 'Los Angeles, CA',
          case_filed_within_one_year: true,
          application_type: 'initial',
          protected_ground: 'true',
          case_outcome: 'Granted',
          nation_of_origin: 'El Salvador',
          applicant_sex: 'Female',
          type_of_violence_experienced: 'Not Applicable',
          applicant_indigenous_group: 'Not Applicable',
          applicant_language: 'English',
          applicant_access_to_interpreter: true,
          applicant_perceived_credibility: false,
          // case_status: 'Closed' These fields are pending review by stakeholder,
        },
        {
          case_id: 'A043-400-049',
          case_url:
            'pdf/127028716-Patrick-Anthony-Brown-A043-400-049-BIA-Dec-18-2012.pdf',
          hearing_date: '12-18-2012',
          judge: 'David B. Holmes',
          initial_or_appellate: false,
          // hearing_type: 'Motion' These fields are pending review by stakeholder,
          case_origin: 'New York, NY',
          case_filed_within_one_year: false,
          application_type: 'initial',
          protected_ground: 'true',
          case_outcome: 'Denied',
          nation_of_origin: 'Jamaica',
          applicant_sex: 'Female',
          type_of_violence_experienced: 'Not Applicable',
          applicant_perceived_credibility: true,
          applicant_access_to_interpreter: true,
          applicant_indigenous_group: 'Not Applicable',
          applicant_language: 'English',
          // case_status: 'Closed' These fields are pending review by stakeholder,
        },
        {
          case_id: 'A088-268-610',
          case_url:
            'pdf/127030786-Joao-Silva-Laudelino-A088-268-610-BIA-Dec-14-2012.pdf',
          judge: 'Neil P. Miller',
          initial_or_appellate: false,
          // hearing_type: 'Reinstatement of proceedings' These fields are pending review by stakeholder,
          nation_of_origin: 'Jamaica',
          case_origin: 'Boston, MA',
          hearing_date: '12-14-2012',
          applicant_perceived_credibility: false,
          applicant_access_to_interpreter: false,
          applicant_indigenous_group: 'Not Applicable',
          applicant_language: 'English',
          case_filed_within_one_year: false,
          // case_status: 'Closed' These fields are pending review by stakeholder,
          case_outcome: 'Denied',
          applicant_sex: 'Female',
          type_of_violence_experienced: 'Not Applicable',
          application_type: 'initial',
          protected_ground: 'true',
        },
        {
          case_id: 'A057-056-1193',
          case_url:
            'pdf/127445747-Nowel-Q-Dela-Cruz-A057-056-093-BIA-Feb-8-2013.pdf',
          judge: 'David B. Holmes',
          initial_or_appellate: false,
          // hearing_type: 'Reopening' These fields are pending review by stakeholder,
          nation_of_origin: 'Mexico',
          case_origin: 'Imperial, CA',
          hearing_date: '2-8-2013',
          applicant_perceived_credibility: false,
          applicant_access_to_interpreter: true,
          applicant_indigenous_group: 'Not Applicable',
          applicant_language: 'Spanish',
          case_filed_within_one_year: false,
          // case_status: 'Closed' These fields are pending review by stakeholder,
          case_outcome: 'Denied',
          applicant_sex: 'Female',
          type_of_violence_experienced: 'Not Applicable',
          application_type: 'initial',
          protected_ground: 'true',
        },
        {
          case_id: 'A071-996-819',
          case_url:
            'pdf/130578801-Fowobi-George-A071-996-819-BIA-Sept-14-2012.pdf',
          judge: 'David B. Holmes',
          initial_or_appellate: false,
          // hearing_type: 'Appeal',
          nation_of_origin: 'Mexico',
          case_origin: 'Chicago, IL',
          hearing_date: '9-14-2012',
          applicant_perceived_credibility: false,
          applicant_access_to_interpreter: true,
          applicant_indigenous_group: 'Not Applicable',
          applicant_language: 'Spanish',
          case_filed_within_one_year: true,
          // case_status: 'Closed' These fields are pending review by stakeholder,
          case_outcome: 'Remanded',
          applicant_sex: 'Female',
          type_of_violence_experienced: 'Not Applicable',
          application_type: 'initial',
          protected_ground: 'true',
        },
        {
          case_id: 'A093-138-113',
          case_url:
            'pdf/133809871-Maria-de-Jesus-Ortiz-Mejia-A093-138-113-BIA-Mar-7-2013.pdf',
          judge: 'Linda S. Wendtland',
          initial_or_appellate: false,
          // hearing_type: 'Suppression; termination',
          nation_of_origin: 'Guatemala',
          case_origin: 'Imperial, CA',
          hearing_date: '3-07-2013',
          applicant_perceived_credibility: true,
          applicant_access_to_interpreter: true,
          applicant_indigenous_group: 'Not Applicable',
          applicant_language: 'Spanish',
          case_filed_within_one_year: false,
          // case_outcome: 'Closed',
          case_outcome: 'Remanded',
          applicant_sex: 'Female',
          type_of_violence_experienced: 'Not Applicable',
          application_type: 'initial',
          protected_ground: 'true',
        },
        {
          case_id: 'A027-392-198',
          case_url:
            'pdf/135034041-Dong-Van-Nguyen-A027-392-198-BIA-Jun-12-2012.pdf',
          judge: 'Neil P. Miller',
          initial_or_appellate: false,
          // hearing_type: 'Reopening; termination of proceedings',
          nation_of_origin: 'Mexico',
          case_origin: 'Seattle, WA',
          hearing_date: '6-12-2012',
          applicant_perceived_credibility: false,
          applicant_access_to_interpreter: true,
          applicant_indigenous_group: 'Not Applicable',
          applicant_language: 'Spanish',
          case_filed_within_one_year: false,
          // case_status: 'Closed',
          case_outcome: 'Remanded',
          applicant_sex: 'Female',
          type_of_violence_experienced: 'Not Applicable',
          application_type: 'initial',
          protected_ground: true,
        },
        {
          case_id: 'A028-803-028',
          case_url:
            'pdf/135169606-Javier-Torres-Ponce-A028-803-028-BIA-Apr-3-2012.pdf',
          judge: 'Neil P. Miller',
          initial_or_appellate: false,
          // hearing_type:
          //   'Waiver of inadmissibility under section 212(h) of the Act',
          nation_of_origin: 'El Salvador',
          case_origin: 'San Francisco, CA',
          hearing_date: '4-3-2012',
          applicant_perceived_credibility: false,
          applicant_access_to_interpreter: true,
          applicant_indigenous_group: 'Not Applicable',
          applicant_language: 'English',
          case_filed_within_one_year: true,
          // case_status: 'Closed',
          case_outcome: 'Denied',
          applicant_sex: 'Female',
          type_of_violence_experienced: 'Not Applicable',
          application_type: 'initial',
          protected_ground: 'true',
        },
        {
          case_id: 'A089-207-04',
          case_url:
            'pdf/135613749-Marcelo-Alejandro-Cao-A089-207-044-BIA-Jan-31-2012.pdf',
          judge: 'Patricia A. Cole',
          initial_or_appellate: false,
          // hearing_type: 'Appeal',
          nation_of_origin: 'Honduras',
          case_origin: 'Imperial, CA',
          hearing_date: '1-31-2012',
          applicant_perceived_credibility: false,
          applicant_access_to_interpreter: false,
          applicant_indigenous_group: 'Not Applicable',
          applicant_language: 'Spanish',
          case_filed_within_one_year: false,
          // case_status: 'Closed',
          case_outcome: 'Sustained',
          applicant_sex: 'Female',
          type_of_violence_experienced: 'Not Applicable',
          application_type: 'initial',
          protected_ground: 'true',
        },
        {
          case_id: 'A044-857-956',
          case_url:
            'pdf/137815992-Christopher-Charles-Kerr-A044-857-956-BIA-Dec-15-2011.pdf',
          judge: 'Patricia A. Cole',
          initial_or_appellate: false,
          // hearing_type: 'Reopening',
          nation_of_origin: 'Mexico',
          case_origin: 'San Antonio, TX',
          hearing_date: '12-15-2011',
          applicant_perceived_credibility: false,
          applicant_access_to_interpreter: true,
          applicant_indigenous_group: 'Not Applicable',
          applicant_language: 'Spanish',
          case_filed_within_one_year: false,
          // case_status: 'Closed',
          case_outcome: 'Terminated',
          applicant_sex: 'Female',
          type_of_violence_experienced: 'Not Applicable',
          application_type: 'initial',
          protected_ground: 'true',
        },
        {
          case_id: 'A095-094-694 ',
          case_url:
            'pdf/139810918-Rony-Rene-Anariba-A095-094-694-BIA-Nov-16-2012.pdf',
          judge_name: 'Charles K. Adkins-Blanch',
          initial_or_appellate: false,
          // hearing_type: 'Reopening',
          nation_of_origin: 'Jamaica',
          case_origin: 'Orlando, FL',
          hearing_date: '11-16-2012',
          applicant_perceived_credibility: false,
          applicant_access_to_interpreter: true,
          applicant_indigenous_group: 'Not Applicable',
          applicant_language: 'English',
          case_filed_within_one_year: false,
          // case_status: 'Closed',
          case_outcome: 'Denied',
          applicant_sex: 'Female',
          type_of_violence_experienced: 'Not Applicable',
          application_type: 'initial',
          protected_ground: 'true',
        },
        {
          case_id: 'A076-593-027',
          case_url:
            'pdf/144068181-Eduardo-Yanez-A076-593-027-BIA-Oct-18-2012.pdf',
          judge: 'Gary D. Malphrus',
          initial_or_appellate: true,
          // hearing_type: 'Termination',
          nation_of_origin: 'Mexico',
          case_origin: 'Arlington, VA',
          hearing_date: '12-14-2012',
          applicant_perceived_credibility: false,
          applicant_access_to_interpreter: true,
          applicant_indigenous_group: 'Not Applicable',
          applicant_language: 'Spanish',
          case_filed_within_one_year: false,
          // case_status: 'Closed',
          case_outcome: 'Remanded',
          applicant_sex: 'Female',
          type_of_violence_experienced: 'Not Applicable',
          application_type: 'initial',
          protected_ground: 'true',
        },
        {
          case_id: 'A027-824-163',
          case_url:
            'pdf/145869741-Dung-Tuan-Pham-A027-824-163-BIA-May-30-2013.pdf',
          judge: 'John Guendelsberger',
          initial_or_appellate: true,
          // hearing_type: 'Termination',
          nation_of_origin: 'Jamaica',
          case_origin: 'New Orleans, LA',
          hearing_date: '5-30-2013',
          applicant_perceived_credibility: true,
          applicant_access_to_interpreter: true,
          applicant_indigenous_group: 'Not Applicable',
          applicant_language: 'English',
          case_filed_within_one_year: false,
          // case_status: 'Closed',
          case_outcome: 'Remanded',
          applicant_sex: 'Female',
          type_of_violence_experienced: 'Not Applicable',
          application_type: 'initial',
          protected_ground: 'true',
        },
        {
          case_id: 'A074-787-749',
          case_url:
            'pdf/130265170-Servando-Pinon-Ramos-A074-787-749-BIA-Feb-28-2013.pdf',
          judge: 'David B. Holmes',
          initial_or_appellate: true,
          // hearing_type: 'Reopening',
          nation_of_origin: 'Mexico',
          case_origin: 'Phoenix, AZ',
          hearing_date: '2-28-2013',
          applicant_perceived_credibility: false,
          applicant_access_to_interpreter: true,
          applicant_indigenous_group: 'Not Applicable',
          applicant_language: 'English',
          case_filed_within_one_year: true,
          // case_status: 'Closed',
          case_outcome: 'Remanded',
          applicant_sex: 'Female',
          type_of_violence_experienced: 'Not Applicable',
          application_type: 'initial',
          protected_ground: 'true',
        },
      ]);
    });
};
