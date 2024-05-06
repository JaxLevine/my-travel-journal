import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import JournalEntryForm from '../../components/JournalEntryForm/JournalEntryForm';
import * as journalEntriesAPI from '../../utilities/journalEntries-api';

export default function Profile() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEntries() {
      try {
        const entriesData = await journalEntriesAPI.getAll();
        setEntries(entriesData);
      } catch (error) {
        console.error('Error fetching entries:', error);
        setError('Failed to fetch journal entries. Please try again.');
      }
    }
    fetchEntries();
  }, []);

  async function handleCreateEntry(newEntry) {
    try {
      console.log('Creating entry with data:', newEntry);
      const createdEntry = await journalEntriesAPI.create({
        ...newEntry,
        user: null // Add user field
      });
      setEntries((prevEntries) => [...prevEntries, createdEntry]);
    } catch (error) {
      console.error('Error creating entry:', error);
      setError('Failed to create journal entry. Please try again.');
    }
  }

  return (
    <div>
      <h1>My Profile</h1>
      <div>
        <JournalEntryForm onSubmit={handleCreateEntry} />
      </div>
      <div>
        <h2>My Journal Entries</h2>
        {error && <p className="error-message">{error}</p>}
        {entries.length === 0 ? (
          <p>No entries found.</p>
        ) : (
          <div className="journal-entries">
            {entries.map((entry) => (
              <Link
                key={entry._id}
                to={`/entries/${entry._id}`}
                className="entry-link"
              >
                <div className="entry">
                  <img className="entry-image" src={entry.image} alt={entry.title} />
                  <div className="entry-content">
                    <h3 className="entry-title">{entry.title}</h3>
                    <p className="entry-date">{entry.date}</p>
                    <p className="entry-excerpt">{entry.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}