import { db } from '../models/models.js';

const eventsController = {};

eventsController.getAllEvents = async (req, res, next) => {
  try {
    const currentDate = Date.now();
    const values = [new Date(currentDate)];

    const query = `SELECT * 
             FROM events
             WHERE date >= $1
             ORDER BY date ASC`
    
    const response = await db(query, values);
    res.locals.events = response.rows;
    return next();
  } catch(error) {
    next({
      log: 'Error retrieving events',
      message: {error: 'Error retrieving events'}
    });
  }
}


// need to add host_id param to addEvent
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

//delete events from events_attending table as well
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