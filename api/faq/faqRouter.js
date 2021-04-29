const express = require('express');
const authRequired = require('../middleware/authRequired');
const FAQ = require('./faqModel');
const router = express.Router();
const nodemailer = require('nodemailer');

const contactEmail = nodemailer.createTransport({
  host: process.env.CONTACT_EMAIL_HOST,
  port: 587,
  auth: {
    user: process.env.CONTACT_EMAIL,
    pass: process.env.CONTACT_EMAIL_PASSWORD,
  },
});

router.get('/', authRequired, function (req, res) {
  FAQ.findAll()
    .then((faq) => {
      res.status(200).json(faq);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', authRequired, function (req, res) {
  const id = String(req.params.id);
  FAQ.findById(id)
    .then((faq) => {
      if (faq) {
        res.status(200).json(faq);
      } else {
        res.status(404).json({ error: 'faqNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', authRequired, async (req, res) => {
  const question = req.body;
  if (question) {
    try {
      FAQ.create(question).then((question) =>
        res
          .status(200)
          .json({ message: 'question created', question: question[0] })
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(404).json({ message: 'question missing' });
  }
});

router.put('/:id', authRequired, (req, res) => {
  FAQ.update(req.params.id, req.body)
    .then((updatedQuestion) => {
      res.status(200).json(updatedQuestion);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.delete('/:id', authRequired, (req, res) => {
  const id = req.params.id;
  try {
    FAQ.findById(id).then((faq) => {
      FAQ.remove(faq.id).then(() => {
        res.status(200).json({ message: `faq '${id}' was deleted.`, faq: faq });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete faq with ID: ${id}`,
      error: err.message,
    });
  }
});

router.post('/contact', authRequired, (req, res) => {
  const mail = {
    from: req.body.name,
    to: process.env.CONTACT_EMAIL,
    subject: 'Contact Form Message',
    html: `<p><strong>Name:</strong> ${req.body.name}</p><p><strong>Email:</strong> ${req.body.email}</p><p><strong>Message:</strong> ${req.body.message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: 'failed' });
    } else {
      res.json({ status: 'sent' });
    }
  });
});

module.exports = router;
