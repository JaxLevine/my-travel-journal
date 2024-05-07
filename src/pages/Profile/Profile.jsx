import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as journalEntriesAPI from '../../utilities/journalEntries-api';
import { getUser } from '../../utilities/users-service';

export default function Profile() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const user = getUser();

  useEffect(() => {
    async function fetchEntries() {
      try {
        const entriesData = await journalEntriesAPI.getByUser(user._id);
        setEntries(entriesData);
      } catch (error) {
        console.error('Error fetching entries:', error);
        setError('Failed to fetch journal entries. Please try again.');
      }
    }
    fetchEntries();
  }, [user._id]);

  return (
    <div>
      <h1>My Profile</h1>
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
                  {entry.images && entry.images.length > 0 && (
                    <img
                      className="entry-image"
                      src={entry.images[0]}
                      alt={entry.title}
                    />
                  )}
                  <div className="entry-content">
                    <h3 className="entry-title">{entry.title}</h3>
                    <p className="entry-date">{new Date(entry.date).toLocaleDateString()}</p>
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