// JournalEntryDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as journalEntriesAPI from '../../utilities/journalEntries-api';
import { getUser } from '../../utilities/users-service';
import JournalEntryEditForm from '../JournalEntryEditForm/JournalEntryEditForm';

export default function JournalEntryDetails() {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const currentUser = getUser();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    async function fetchEntry() {
      try {
        const entryData = await journalEntriesAPI.getById(id);
        if (isMounted) {
          setEntry(entryData);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching entry:', error);
          if (error.message === 'Journal entry not found') {
            setError('Journal entry not found');
            setIsLoading(false);
          } else {
            navigate('/home');
          }
        }
      }
    }

    fetchEntry();

    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await journalEntriesAPI.deleteEntry(id);
      navigate('/profile');
    } catch (error) {
      console.error('Error deleting entry:', error);
      setError('Failed to delete journal entry. Please try again.');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async (updatedEntry) => {
    try {
      const updatedData = await journalEntriesAPI.update(id, updatedEntry);
      setEntry(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating entry:', error);
      setError('Failed to update journal entry. Please try again.');
    }
  };

  const isOwner = currentUser && entry && entry.user._id === currentUser._id;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return isEditing ? (
    <JournalEntryEditForm
      entry={entry}
      onClose={() => setIsEditing(false)}
      onUpdate={handleUpdate}
    />
  ) : isOwner ? (
    <div>
      <h1>{entry.title}</h1>
      <p>By: {entry.user.name}</p>
      <p>{entry.content}</p>
      <p>{new Date(entry.date).toLocaleDateString()}</p>
      <div>
        {(entry.mediaUrls ?? []).map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Image ${index + 1}`} />
        ))}
      </div>
      <div>
        <button onClick={handleEdit}>Edit Entry</button>
        <button onClick={handleDelete}>Delete Entry</button>
      </div>
    </div>
  ) : (
    <div>
      <h1>{entry.title}</h1>
      <p>By: {entry.user.name}</p>
      <p>{entry.content}</p>
      <p>{new Date(entry.date).toLocaleDateString()}</p>
      <div>
        {(entry.mediaUrls ?? []).map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Image ${index + 1}`} />
        ))}
      </div>
    </div>
  );
}