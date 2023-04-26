import PropTypes from 'prop-types';
import css from './ContactList.module.css'

export const ContactList = ({contactList, handleDeleteContact}) => {
    return (
        <ul className={css['contact-list']}>
            {contactList.map((contact) => {
            const {name, number, id} = contact;
            return (

            <li className={css['contact-item']} key={id}>
              <p className={css['contact-text']}><span className={css['contact-name']}>{name}:</span> {number}</p>
              <button className={css['delete-btn']} type="button" 
              onClick={() => handleDeleteContact(id)}
              >Delete</button>
            </li>

          )}
          )}
        </ul>

    )
}

ContactList.propTypes = {
    contactList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired,).isRequired,
    handleDeleteContact: PropTypes.func.isRequired,
}