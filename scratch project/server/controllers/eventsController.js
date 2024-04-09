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

eventsController.getHostEvents = async (req, res, next) => {
  try {
    const user_id = req.cookies.ssid;
    const values = [user_id];
    const query = `SELECT *
                   FROM events
                   WHERE host_id = $1`
    
    const response = await db(query, values);
    res.locals.hostEvents = response.rows;
    return next();
  } catch(error) {
    next({
      log: 'Error retrieving host events',
      message: {error: 'Error retrieving host events'}
    })
  }
}

eventsController.getAttendingEvents = async (req, res, next) => {
  try {
    const user_id = req.cookies.ssid;
    const values = [user_id];
    const query = `SELECT *
                   FROM events_attending
                   LEFT JOIN events ON events.id = events_attending.event_id
                   WHERE user_id = $1`

    const response = await db(query, values);
    res.locals.attendingEvents = response.rows
    return next();
  } catch(error) {
    next({
      log: 'Error retrieving events that user will attend',
      message: {error: 'Error retrieving events that user will attend'}
    })
  }
}

eventsController.markGoing = async (req, res, next) => {
  
  const { event_id } = req.body;
  const user_id = req.cookies.ssid;
  const values = [user_id, event_id]

  try {
    const query = `INSERT INTO events_attending (user_id, event_id)
                   VALUES ($1, $2)`
    await db(query, values);
    return next();
  } catch (error) {
      next({
        log: 'Error rsvpsing',
        message: {error: 'Error rsvping'}
      })
  }
}

eventsController.markNotGoing = async (req, res, next) => {
  
  const {event_id} = req.body;
  const user_id = req.cookies.ssid;
  const values = [user_id, event_id]

  try {
    const query = `DELETE FROM events_attending
                   WHERE event_id = $2 AND user_id = $1`
    await db(query, values);
    return next();
  } catch (error) {
    next({
      log: 'Error un-rsvpsing',
      message: {error: 'Error un-rsvping'}
    })
  }
}

// need to add host_id param to addEvent
eventsController.addEvent = async (req, res, next) => {
  
  const { event_title, event_description, location, date, time} = req.body;
  const user_id = req.cookies.ssid;

  // Concatenate date and time strings and create Date object
  const dateTimeString = `${date} ${time}`;
  const dateTimeObject = new Date(dateTimeString);

  if (!event_title || !event_description || !location || !date) {
    res.locals.invalidEvent = true;
    return next({
      log: 'invalid inputs on addEvent method',
      message: {err: 'invalid inputs for adding event'}
    })
  }

  try {
    const values = [event_title, event_description, location, dateTimeObject, user_id];

    const query = `INSERT INTO events (event_title, event_description, location, date, host_id)
                   VALUES ($1, $2, $3, $4, $5)
                   RETURNING id`;    
    const result = await db(query, values);
    res.locals.newEvent = result.rows[0].id;

    const values2 = [user_id, res.locals.newEvent];
    const query2 = `INSERT INTO events_attending (user_id, event_id)
                    VALUES ($1, $2)`;           
    await db(query2, values2);

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

    const query2 = `DELETE FROM events_attending
                    WHERE event_id = $1`
    
    const result = await db(query, values);
    await db(query2, values);

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