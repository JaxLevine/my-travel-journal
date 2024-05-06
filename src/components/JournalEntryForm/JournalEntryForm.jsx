import React, { useState } from 'react';

export default function JournalEntryForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [images, setImages] = useState([]);

  function handleImageChange(e) {
    setImages(Array.from(e.target.files));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ title, content, date, images });
    setTitle('');
    setContent('');
    setDate('');
    setImages([]);
  }

  return (
    <div>
      <h2>Create a New Journal Entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
        <button type="submit">Create Entry</button>
      </form>
    </div>
  );
}
