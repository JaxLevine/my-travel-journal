import React, { useState, useEffect } from 'react';

export default function JournalEntryEditForm({ entry, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: '',
    images: []
  });

  useEffect(() => {
    setFormData({
      title: entry.title,
      content: entry.content,
      date: entry.date,
      images: [] // Reset the images array
    });
  }, [entry]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleImageChange(e) {
    setFormData({
      ...formData,
      images: Array.from(e.target.files)
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', formData.title);
    formData.append('content', formData.content);
    formData.append('date', formData.date);
    formData.images.forEach(image => formData.append('images', image));

    try {
      await fetch(`/api/journalEntries/${entry._id}`, {
        method: 'PUT',
        body: formData
      });
      onUpdate();
    } catch (error) {
      console.error('Error updating entry:', error);
    }
  }

  return (
    <div>
      <h2>Edit Journal Entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
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
        <div>
          <label>Images:</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
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