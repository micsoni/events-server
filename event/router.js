const { Router } = require("express");
const Event = require("./model");

const router = new Router();

router.get("/events", (req, res, next) => {
  Event.findAll()
    .then(event => {
      res.send(event);
    })
    .catch(next);
});

router.post("/events", (req, res, next) => {
  Event.create(req.body)
    .then(event => {
      res.status(201).send(event);
    })
    .catch(next);
});

router.get("/events/:eventId", (req, res, next) => {
  Event.findByPk(req.params.eventId)
    .then(event => {
      if (!event) {
        res.status(404).end();
      } else {
        res.send(event);
      }
    })
    .catch(next);
});

router.put("/events/:eventId", (req, res, next) => {
  Event.findByPk(req.params.eventId)
    .then(event => {
      if (!event) {
        res.status(404).end();
      } else {
        event.update(req.body).then(event => res.send(event));
      }
    })
    .catch(next);
});

router.delete("/events/:eventId", (req, res, next) => {
  Event.destroy({ where: { id: req.params.eventId } })
    .then(number => {
      if (number === 0) {
        res.status(404).end();
      } else {
        // had to use json and not send because number is not an json object (could have used send({number}))
        res.status(202).json(number);
      }
    })
    .catch(next);
});

module.exports = router;
