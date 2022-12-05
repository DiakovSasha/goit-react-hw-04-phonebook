import { useState, useEffect } from 'react';
import { Report } from 'notiflix/build/notiflix-report-aio';

import ContactsForm from './ConactsForm/ContactsForm';
import Filter from './Filter/Filter';
import ContactsList from './ContactsList/ContactsList';
import css from './App.module.css';
// import ContactsForm from './ConactsForm/ContactsForm';
const CONTACTS = 'contacts'

const lSContacts = localStorage.getItem(CONTACTS);
const parseContacts = JSON.parse(lSContacts);

export default function App() {
  const [contacts, setContacts] = useState(
    parseContacts || [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    if (
      contacts.find(
        ({ name }) => data.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return Report.failure(`${data.name} is already in contacts`);
    }
    setContacts(prev => [...prev, data]);
  };

  const onFilter = event => {
    setFilter(event.currentTarget.value);
  };
  const addFilterContacts = () => {
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().trim().includes(normalizedFilter)
    );
  };
  const filteredContacts = addFilterContacts();

  const deleteContact = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  return (
    <div className={css.wrapper}>
      <h1 className={css.mainTitle}>Phonebook</h1>
      <ContactsForm addContact={addContact} />
      <h2 className={css.secondTitle}>Contacts</h2>
      <Filter value={filter} filter={onFilter} />
      <ContactsList contacts={filteredContacts} onDelete={deleteContact} />
    </div>
  );
}
