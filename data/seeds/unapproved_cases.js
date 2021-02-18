exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('unapproved_cases')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('unapproved_cases').insert([
        {
          id: 'A094-216-526',
          case_url:
            'pdf/125708363-Ferino-Sanchez-Seltik-A094-216-526-BIA-Jan-14-2013.pdf',
          judge_name: '',
          court_type: 'Appellate',
          hearing_type: 'Termination',
          refugee_origin: 'Mexico',
          hearing_location: '',
          hearing_date: '',
          decision_date: '',
          credibility_of_refugee: '',
          case_status: '',
          judge_decision: '',
        },
        {
          id: 'A057-056-1193',
          case_url:
            'pdf/125722233-Noe-Cesar-Hernandez-Avila-A079-531-484-BIA-Aug-30-2012.pdf',
          judge_name: '',
          court_type: 'Appellate',
          hearing_type: 'Reopening',
          refugee_origin: '',
          hearing_location: 'Imperial, CA',
          hearing_date: '',
          decision_date: '',
          credibility_of_refugee: '',
          case_status: '',
          judge_decision: '',
        },
        {
          id: 'A071-996-819',
          case_url:
            'pdf/127030786-Joao-Silva-Laudelino-A088-268-610-BIA-Dec-14-2012.pdf',
          judge_name: '',
          court_type: 'Appellate',
          hearing_type: 'Appeal',
          refugee_origin: 'Mexico',
          hearing_location: '',
          hearing_date: '',
          decision_date: '',
          credibility_of_refugee: '',
          case_status: '',
          judge_decision: '',
        },
      ]);
    });
};
