exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('faq')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('faq').insert([
        {
          faq_id: 100,
          question: 'How do I upload a case?',
          answer:
            'Please navigate to the "Upload Case" page via the menu to the left of your screen to upload your case files. Once your files are successfully uploaded, our system will comb through them and extract the necessary information to then populate the form to the right of the screen on the case upload page for your final approval before completing your submission.',
        },
        {
          faq_id: 101,
          question: 'Where does your data come from?',
          answer:
            'We aggregate data that you, the user, provide. We scrape the data from case files asylum attorneys upload from all over the country and display it for you in a neat, easily digestible package.',
        },
        {
          faq_id: 102,
          question: 'How often is the data updated?',
          answer:
            'The data is updated with every new case file uploaded which is vetted before being added to the database.',
        },
        {
          faq_id: 103,
          question:
            'I know other attorneys that could benefit from this application, how can they gain access?',
          answer:
            'Currently, the application is invite only. Please contact the administrator in order to invite fellow attorneys.',
        },
        {
          faq_id: 104,
          question: 'How secure is your application?',
          answer:
            'Both incoming data and new users are vetted manually by an administrator ensuring that both the data and user base remain reliable.',
        },
      ]);
    });
};
