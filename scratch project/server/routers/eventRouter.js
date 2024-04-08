import express from 'express'

import eventsController from '../controllers/eventsController.js'

const eventRouter = express.Router();

eventRouter.get('/', eventsController.getAllEvents, (req, res) => {
    res.status(200).json(res.locals.events);
})

eventRouter.post('/add', eventsController.addEvent, (req, res) => {
    res.status(200).json(res.locals.newEvent);
});

eventRouter.delete('/delete', eventsController.deleteEvent, (req, res) => {
    res.status(200).json(res.locals.deletedEvent);
});

eventRouter.patch('/update', eventsController.updateEvent, (req, res) => {
    res.status(200).json(res.locals.updatedEvent);
});

export default eventRouter;

//add cookieController to make sure that user is logged in
//for update and delete, make sure that the user is host

//add myevents
//add 