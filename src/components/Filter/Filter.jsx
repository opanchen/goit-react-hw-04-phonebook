import css from './Filter.module.css'
import PropTypes from 'prop-types';


export const Filter = ({value, onChange}) => {
    return(
        <label className={css.filter}>
        Find contact by name
          <input 
          type="text" 
          value={value}
          onChange={onChange}
          />
        </label>
    )
}

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}