import React, { useState, useEffect } from 'react';

export default function JournalEntryEditForm({ entry, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: '',
    mediaUrls: []
  });

  useEffect(() => {
    setFormData({
      title: entry.title,
      content: entry.content,
      date: entry.date,
      mediaUrls: entry.mediaUrls || []
    });
  }, [entry]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await onUpdate(formData);
    } catch (error) {
      console.error('Error updating entry:', error);
    }
  }

  return (
    <div>
      <h2>Edit Journal Entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Post Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Entry</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}