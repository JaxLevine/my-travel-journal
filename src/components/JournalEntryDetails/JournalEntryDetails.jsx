import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as journalEntriesAPI from '../../utilities/journalEntries-api';
import JournalEntryEditForm from '../JournalEntryEditForm/JournalEntryEditForm';

export default function JournalEntryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    fetchEntry();
  }, [id]);

  async function fetchEntry() {
    try {
      const entryData = await journalEntriesAPI.getById(id);
      setEntry(entryData);
    } catch (error) {
      console.error('Error fetching entry:', error);
    }
  }

  async function handleDelete() {
    try {
      await journalEntriesAPI.deleteEntry(id);
      navigate('/profile');
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  }

  function handleEditClick() {
    setShowEditForm(true);
  }

  function handleEditClose() {
    setShowEditForm(false);
  }

  if (!entry) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{entry.title}</h1>
      <p>{entry.content}</p>
      <p>{entry.date}</p>
      {/* ... */}
      <div>
        <button onClick={handleEditClick}>Edit Entry</button>
        <button onClick={handleDelete}>Delete Entry</button>
      </div>
      {showEditForm && (
        <div className="popup">
          <div className="popup-content">
            <JournalEntryEditForm
              entry={entry}
              onClose={handleEditClose}
              onUpdate={() => {
                fetchEntry();
                handleEditClose();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}