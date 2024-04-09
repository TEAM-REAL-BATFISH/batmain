import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import GlobalEvent from './GlobalEvent';
import LocalEvent from './LocalEvent';


export default function MainPage() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    event_title: '',
    event_description: '',
    location: '',
    date: '',
    time: ''
  })
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [arrOfGlobalEventsComponents, setArrOfGlobalEventsComponents] = useState([]);
  const [arrOfLocalEventsComponents, setArrOfLocalEventsComponents] = useState([]);

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const response = await axios.post('/event/add', data);
        toast.success(response.data.message);
    } catch (error) {
        toast.error('Error adding event');
        console.error('Error adding event:', error)
    }
  };

  const handleAddEventClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const { data } = await axios.get('/event');
        const arrOfGlobalEventsFromSql = data.map((event) => (
          <GlobalEvent
            key={event.id}
            event_id={event.id}
            event_title={event.event_title}
            location={event.location}
            date={event.date}
          />
        ));
        setArrOfGlobalEventsComponents(arrOfGlobalEventsFromSql);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    getAllEvents();
  }, []);

  useEffect(() => {
    const getLocalEvents = async () => {
      try {
        const { data } = await axios.get('/event/upcomingevents');
        const arrOfLocalEventsFromSql = data.map((event) => (
          <LocalEvent
            key={event.id}
            event_title={event.event_title}
            location={event.location}
            date={event.date}
            onCancel={() => handleCancelEvent(event.id)} //
          />
        ));
        setArrOfLocalEventsComponents(arrOfLocalEventsFromSql);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    getLocalEvents();
  }, []);

  /////// unattend functionality
  const handleCancelEvent = async (eventId) => {
    try {
      // Sending a request to your backend
      await axios.post('/event/unattend', { event_id: eventId });
      toast.success('Event cancelled successfully.');
  
      // Refreshing local events to reflect the cancellation
      getLocalEvents();
    } catch (error) {
      toast.error('Error cancelling event');
      console.error('Error cancelling event:', error);
    }
  };

 const getLocalEvents = async () => {
    try {
      const { data } = await axios.get('/event/upcomingevents');
      const arrOfLocalEventsFromSql = data.map((event) => (
        <LocalEvent
          key={event.id}
          event_title={event.event_title}
          location={event.location}
          date={event.date}
          onCancel={() => handleCancelEvent(event.id)} // Pass the handler here
        />
      ));
      setArrOfLocalEventsComponents(arrOfLocalEventsFromSql);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
  ////////

  return (
    <div className = "main-container">
      <div className="upper-container">  
        <div className="add-event-container">
          <button onClick={handleAddEventClick}>Add Event</button>
          </div>
          {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleCloseModal}>&times;</span>
              <h2>Add Event</h2>
              <form onSubmit={handleSubmit}>
                <input type="text" name="event_title" value={data.event_title} onChange={handleInputChange} placeholder="Event Title" />
                <input type="text" name="event_description" value={data.event_description} onChange={handleInputChange} placeholder="Event Description" />
                <input type="text" name="location" value={data.location} onChange={handleInputChange} placeholder="Location" />
                <input type="date" name="date" value={data.date} onChange={handleInputChange} />
                <input type="time" name="time" value={data.time} onChange={handleInputChange} placeholder="Time" />
                <button type="submit">Add Event</button>
              </form>
            </div>
          </div>
          )}
        
         <div className="lower-container">
          <div className="global-event-container">
            <h3>All Events</h3>
            {arrOfGlobalEventsComponents}
         </div>
         <div className="local-event-container">
          <h3>Upcoming Events</h3>
            {arrOfLocalEventsComponents}
         </div>           
        </div>
      </div>
    </div>
  )
}
