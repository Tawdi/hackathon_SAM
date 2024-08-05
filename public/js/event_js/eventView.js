// views/eventView.js
document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://your-api-endpoint.com/events'; // Replace with your API endpoint
    const eventForm = document.getElementById('eventForm');
    const eventsList = document.getElementById('eventsList');
    const eventModel = new EventModel(apiUrl);
    
    // Fetch and display events
    const fetchEvents = async () => {
      const events = await eventModel.getAllEvents();
      eventsList.innerHTML = '';
      events.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.innerHTML = `
          <h2>${event.titre}</h2>
          <p>${event.apercu}</p>
          <p>${event.description}</p>
          <button onclick="editEvent(${event.id})">Edit</button>
          <button onclick="deleteEvent(${event.id})">Delete</button>
        `;
        eventsList.appendChild(eventDiv);
      });
    };
  
    // Add or update an event
    eventForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(eventForm);
      const eventId = formData.get('eventId');
      const eventData = {
        titre: formData.get('titre'),
        apercu: formData.get('apercu'),
        description: formData.get('description'),
        image_url: formData.get('image_url'),
        date_debut: formData.get('date_debut'),
        date_fin: formData.get('date_fin'),
        time: formData.get('time'),
        lieu: formData.get('lieu'),
        plan: formData.get('plan'),
        observations: formData.get('observations'),
        participation: formData.get('participation'),
        info_add: formData.get('info_add')
      };
  
      if (eventId) {
        await eventModel.updateEvent(eventId, eventData);
      } else {
        await eventModel.createEvent(eventData);
      }
      fetchEvents();
      eventForm.reset();
    });
  
    // Edit an event
    window.editEvent = async (id) => {
      const event = await eventModel.getEventById(id);
      document.getElementById('eventId').value = event.id;
      document.getElementById('titre').value = event.titre;
      document.getElementById('apercu').value = event.apercu;
      document.getElementById('description').value = event.description;
      document.getElementById('image_url').value = event.image_url;
      document.getElementById('date_debut').value = event.date_debut;
      document.getElementById('date_fin').value = event.date_fin;
      document.getElementById('time').value = event.time;
      document.getElementById('lieu').value = event.lieu;
      document.getElementById('plan').value = event.plan;
      document.getElementById('observations').value = event.observations;
      document.getElementById('participation').value = event.participation;
      document.getElementById('info_add').value = event.info_add;
    };
  
    // Delete an event
    window.deleteEvent = async (id) => {
      if (confirm('Are you sure you want to delete this event?')) {
        await eventModel.deleteEvent(id);
        fetchEvents();
      }
    };
  
    // Initial fetch
    fetchEvents();
  });
  