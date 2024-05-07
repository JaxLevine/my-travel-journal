import React from 'react';
import JournalEntryForm from '../../components/JournalEntryForm/JournalEntryForm';
import * as journalEntriesAPI from '../../utilities/journalEntries-api';

export default function CreateJournalEntry() {
  async function handleCreateEntry(newEntry) {
    try {
      await journalEntriesAPI.create({
        ...newEntry,
        user: null
      });
      window.location.href = '/profile';
    } catch (error) {
      console.error('Error creating entry:', error);
    }
  }

  return (
    <div>
      <h1>Create Journal Entry</h1>
      <JournalEntryForm onSubmit={handleCreateEntry} />
    </div>
  );
}