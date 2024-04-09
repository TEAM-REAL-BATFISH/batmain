import React from 'react';

const HostEvent = props => {
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteHostEvent = (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/event/add', data);
      toast.success(response.data.message);
  } catch (error) {
      toast.error('Error adding event');
      console.error('Error adding event:', error)
  }
};
  }

  return(
    <div className="HostEventBox">
      <p>{props.event_title}</p>
      <p>Location: {props.location}</p>
      <p>Date: {props.date}</p>
      <div>
        <button id="update" onclick="">Update</button>
      <div>
        <button id="delete" onclick="">Delete</button>
      </div>
    </div>
  );
};

export default HostEvent;