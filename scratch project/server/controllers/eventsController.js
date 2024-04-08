import { db } from '../models/models.js';

const eventsController = {};

eventsController.addEvent = async (res, req, next) => {
  
  const { event_title, event_description, location, date} = req.body;

  if (!event_title || !event_description, !location || !date) {
    res.locals.invalidEvent = true;
    return next({
      log: 'invalid inputs on addEvent method',
      message: {err: 'invalid inputs for adding event'}
    })
  }

  try {
    const values = [event_title, event_description, location, date];

    const query = `INSERT INTO events (event_title, event_description, location, date)
                   VALUES ($1, $2, $3, $4)`;

    const result = await db(query, values);
    res.locals.newEvent = result;
    return next();
  } catch (error) {
    next({
      log: 'error at eventsController.addEvent',
      message: {error: 'error at eventsController.addEvent'}
    });
  }
}

eventsController.deleteEvent = async (req, res, next) => {
  const { id } = req.body;

  try {
    const values = [id];
    
    const query = `DELETE FROM events
                   WHERE id = $1`;
    
    const result = await db(query, values);
    res.locals.deletedEvent = result;
    return next();
    } catch (error) {
      next({
        log: 'error at eventsController.addEvent',
        message: {error: 'error at eventsController.addEvent'}
        });
    }
}

eventsController.updateEvent = async (req, res, next) => {
  const { id, event_title, event_description, location, date } = req.body;
  const values = [id, event_title, event_description, location, date];

  try {
    const query = `UPDATE events
                   SET event_title = $2, event_description = $3, location = $4, date = $5
                   WHERE id = $1`
    
    const result = await db(query, values);
    res.locals.updatedEvent = result;
    return next();
  } catch (error) {
    next({
      log: 'error at eventsController.addEvent',
      message: {error: 'error at eventsController.addEvent'}
    });
  }
}

export default eventsController;