import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../utilities/users-service';

const JournalEntryCard = ({ entry }) => {
  const currentUser = getUser();
  const isOwner = currentUser && entry.user._id === currentUser._id;

  return (
    <Link
      to={isOwner ? `/entries/${entry._id}` : `/entries/${entry._id}/view`}
      className="entry-link"
    >
      {entry.mediaUrls && entry.mediaUrls.length > 0 && (
        <img className="entry-image" src={entry.mediaUrls[0]} alt={entry.title} />
      )}
      <div className="entry-content">
        <h3 className="entry-title">{entry.title}</h3>
        <p className="entry-date">{new Date(entry.date).toLocaleDateString()}</p>
        <p className="entry-excerpt">{entry.content.slice(0, 100)}...</p>
      </div>
    </Link>
  );
};

export default JournalEntryCard;