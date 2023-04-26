import { nanoid } from 'nanoid'
import { useState, useEffect } from "react";
import { ContactForm, ContactList, Filter} from "components";
import { defaultContacts } from 'data';
import css from './App.module.css'

const LS_KEY = 'contacts-array'

export const App = () => {

  const [contacts, setContacts] = useState(() => (JSON.parse(localStorage.getItem(LS_KEY)) ?? defaultContacts))

  const [filter, setFilter] = useState('')

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts))
  }, [contacts])

  const formSubmitHandler = ({name, number}) => {

    if (checkContactName(name)) {
      alert(`${name} is already in contacts.`)
      return
    }

    const id = nanoid();
    const newContact = {
      name,
      number,
      id,
    }

    setContacts((prevState) => ([...prevState, newContact]))
  }

  const changeFilter = (e) => {
   setFilter(e.currentTarget.value)
  }

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter( contact => contact.name.toLowerCase().includes(normalizedFilter));
  }

  const deleteContact = (idToDelete) => {
    setContacts((prevState) => (prevState.filter((item) => item.id !== idToDelete)))
  }

  const checkContactName = (query) => {
    return contacts.some(({name}) => name.toLowerCase() === query.toLowerCase())
  }

  const visibleContacts = getVisibleContacts()

  return (
    <div className={css.app}>
    <h1>Phonebook</h1>
    <ContactForm 
    onSubmit={formSubmitHandler}
    />

    <h2>Contacts</h2>
    <Filter
      value={filter}
      onChange={changeFilter}
    />
    <ContactList
    contactList={visibleContacts}
    handleDeleteContact={deleteContact}
    />
    </div>
  )
}
