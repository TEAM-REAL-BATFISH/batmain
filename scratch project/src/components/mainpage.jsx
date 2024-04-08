import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function MainPage() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    event_title: '',
    event_description: '',
    location: '',
    date: ''
  })
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const response = await axios.post('/api/event/add', data);
        toast.success(response.data.message);
        navigate('/event');
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

  return (
    <div className="main-container">
      <div className="left-tab">
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
              <button type="submit">Add Event</button>
            </form>
          </div>
        </div>
      )}
      {/* Other content of the main page */}
    </div>
  )
}
