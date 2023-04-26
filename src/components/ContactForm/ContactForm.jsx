import PropTypes from 'prop-types';
import { nanoid } from 'nanoid'
import { useState } from "react";
import css from './ContactForm.module.css'

export const ContactForm = ({onSubmit}) => {

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const nameInputId = nanoid();
    const numberInputId = nanoid();

   const handleChange = (e) => {
        const {name: inputName, value} = e.currentTarget;

        switch (inputName) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                console.log(`Error: there isn't ${name} input for value ${value}. Check form markup.`);
            return
        }
    }

   const handleSubmit = (e) => {
        e.preventDefault();
        
        onSubmit({name, number});
        reset();
    }

    const reset = () => {
        setName('');
        setNumber('');
    }

    return(
        <form className={css['contact-form']} autoComplete="off" onSubmit={handleSubmit}>

        <label htmlFor={nameInputId}>
          Name
        <input
          type="text"
          name="name"
          id={nameInputId}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
          value={name}
          />
        </label>
  
        <label htmlFor={numberInputId}>
          Number
        <input
          type="tel"
          name="number"
          id={numberInputId}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
          value={number}
        />
        </label>

        <button type="submit">Add contact</button>
        </form>
    )
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}