import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import NavBar from '../../components/NavBar/NavBar';
import { getUser } from '../../utilities/users-service';
import JournalEntryDetails from '../../components/JournalEntryDetails/JournalEntryDetails';
import JournalEntryEditForm from '../../components/JournalEntryForm/JournalEntryForm';
import CreateJournalEntry from '../../components/CreateJournalEntry/CreateJournalEntry';


export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              <Route path="/profile" element={<Profile/>} />
              <Route path="/home" element={<Home />} />
              <Route path="/entries/:id/edit" element={<JournalEntryEditForm />} />
              <Route path="/entries/:id/view" element={<JournalEntryDetails />} />
              <Route path="/entries/:id" element={<JournalEntryDetails />} />
              <Route path="/create-entry" element={<CreateJournalEntry />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}