import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as journalEntriesAPI from '../../utilities/journalEntries-api';
import { getUser } from '../../utilities/users-service';
import JournalEntryEditForm from '../JournalEntryEditForm/JournalEntryEditForm';
import './JournalEntryDetails.css';

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
  ) : (
    <div className="entry-details-container">
      <div className="entry-details">
        <h1 className="entry-title">{entry.title}</h1>
        <p className="entry-author">By: {entry.user.name}</p>
        <p className="entry-date">{new Date(entry.date).toLocaleDateString()}</p>
        <div className="entry-content">
          <p>{entry.content}</p>
        </div>
        <div className="entry-images">
          {(entry.mediaUrls ?? []).map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Image ${index + 1}`}
              className="entry-image"
            />
          ))}
        </div>
        {isOwner && (
          <div className="entry-actions">
            <button onClick={handleEdit} className="btn btn-primary">
              Edit Entry
            </button>
            <button onClick={handleDelete} className="btn btn-danger">
              Delete Entry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}