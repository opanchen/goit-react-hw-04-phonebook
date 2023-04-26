import PropTypes from 'prop-types';
import { nanoid } from 'nanoid'
import { Component } from "react";
import css from './ContactForm.module.css'

export class ContactForm extends Component {
    
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    }

    state = {
        name: '',
        number: '',
    }

    nameInputId = nanoid();
    numberInputId = nanoid();


    handleChange = (e) => {
        const {name, value} = e.currentTarget
        this.setState({[name]: value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        this.props.onSubmit(this.state)
        this.reset()
    }

    reset = () => {
        this.setState({
            name: '',
            number: '',
        })
    }

    render() {
        return(
            <form className={css['contact-form']} autoComplete="off" onSubmit={this.handleSubmit}>

            <label htmlFor={this.nameInputId}>
              Name
            <input
              type="text"
              name="name"
              id={this.nameInputId}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={this.handleChange}
              value={this.state.name}
              />
            </label>
      
            <label htmlFor={this.numberInputId}>
              Number
            <input
              type="tel"
              name="number"
              id={this.numberInputId}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={this.handleChange}
              value={this.state.number}
            />
            </label>

            <button type="submit">Add contact</button>
            </form>
        )
    }
}