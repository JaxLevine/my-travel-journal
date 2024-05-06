import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as journalEntriesAPI from '../../utilities/journalEntries-api';
import { getUser } from '../../utilities/users-service';

export default function JournalEntryDetails() {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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
          } else if (error.message === 'You are not authorized to view this entry') {
            setError('You are not authorized to view this entry');
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const isOwner = currentUser && entry.user._id === currentUser._id;

  return (
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
      {isOwner && (
        <div>
          <button>Edit Entry</button>
          <button>Delete Entry</button>
        </div>
      )}
    </div>
  );
}