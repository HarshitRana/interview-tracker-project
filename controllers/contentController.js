const Topics = require("../models/topic");
const Questions = require("../models/question");
const mongoose = require("mongoose");

const topic_get = (req, res) => {
  Topics.find().then((result) => {
    res.render("topic", { title: "Topics", topics: result });
  });
};

const question_delete = (req, res) => {
  console.log("deleting initiated");
  var topic;
  const id = req.params.id;
  Questions.findById(id)
    .populate("topic")
    .then((question) => {
      topic = question.topic.name;
      Questions.findByIdAndDelete(id)
        .then((result) => {
          res.json({ redirect: "/topic/" + topic });
        })
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
    });
};

const question_get = (req, res) => {
  const name = req.params.name;
  Topics.findOne({ name: name }).then((result1) => {
    if (result1) {
      Questions.find({ topic: result1._id })
        .then((result) => {
          res.render("data", { questions: result, title: result1.name });
        })
        .catch((err) =>
          res.status(404).render("404", { title: "Page not found" })
        );
    } else res.status(404).render("404", { title: "Page not found" });
  });
};

const Ques_get = (req, res) => {
  Topics.find().then((result) => {
    res.render("addQuestion", { title: "New Question", topics: result });
  });
};

const Ques_post = (req, res) => {
  const question = new Questions(req.body);
  var topic;
  Topics.findById(req.body.topic).then((result) => {
    topic = result.name;
  });
  question
    .save()
    .then((result) => res.redirect("/topic"))
    .catch((err) => console.log(err));
};

module.exports = {
  topic_get,
  question_delete,
  question_get,
  Ques_get,
  Ques_post
};