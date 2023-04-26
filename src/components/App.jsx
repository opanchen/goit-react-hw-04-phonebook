import { nanoid } from 'nanoid'
import { Component } from "react";
import { ContactForm, ContactList, Filter} from "components";
import css from './App.module.css'

const LS_KEY = 'contacts-array'

export class App extends Component {

  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts))
    }
  }

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem(LS_KEY))

    savedContacts && this.setState({contacts: savedContacts})

  }

  formSubmitHandler = ({name, number}) => {

    if (this.checkContactName(name)) {
      alert(`${name} is already in contacts.`)
      return
    }

    const id = nanoid();
    const newContact = {
      name,
      number,
      id,
    }
    this.setState(({contacts}) => ({contacts: [...contacts, newContact]}))
  }

  changeFilter = (e) => {
    this.setState({filter: e.currentTarget.value})
  }

  getVisibleContacts = () => {
    const {filter, contacts} = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({name}) => name.toLowerCase().includes(normalizedFilter));
    
  }

  deleteContact = (idToDelete) => {
    this.setState((prevState) => ({contacts: prevState.contacts.filter((item) => item.id !== idToDelete)}))
  }

  checkContactName = (query) => {
    const {contacts} = this.state;
    return contacts.some(({name}) => name.toLowerCase() === query.toLowerCase())

  }

  render() {
    const visibleContacts = this.getVisibleContacts()

    return (
      <div className={css.app}>
      <h1>Phonebook</h1>
      <ContactForm 
      onSubmit={this.formSubmitHandler}
      />

      <h2>Contacts</h2>
      <Filter
        value={this.state.filter}
        onChange={this.changeFilter}
      />
      <ContactList
      contactList={visibleContacts}
      handleDeleteContact={this.deleteContact}
      />
      </div>
    )
  }

}
