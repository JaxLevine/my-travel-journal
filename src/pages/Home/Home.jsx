import React, { useEffect, useState } from 'react';
import * as journalEntriesAPI from '../../utilities/journalEntries-api';
import JournalEntryCard from '../../components/JournalEntryCard';

function Home() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function fetchEntries() {
      try {
        const entriesData = await journalEntriesAPI.getAll();
        setEntries(entriesData);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    }
    fetchEntries();
  }, []);

  return (
    <div>
      <h1>Welcome to JourneyLog</h1>
      <p>Start documenting your travel adventures!</p>
      <div>
        <h2>Home Feed</h2>
        {entries.length === 0 ? (
          <p>No entries found.</p>
        ) : (
          <div className="journal-entries">
            {entries.map((entry) => (
              <JournalEntryCard key={entry._id} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;