/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSwimmingPool, faCalendarCheck, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const listOfIcons = {
  swim: faSwimmingPool,
  calendar: faCalendarCheck,
  question: faQuestionCircle
};

const Question = ({ data: { title, description, icon } }) => (
  <div className="col-4">
    <span className="image fit">
      <div className="image--block">
        <FontAwesomeIcon size="9x" icon={listOfIcons[icon]} />
      </div>
    </span>
    <h3>{title}</h3>
    <p dangerouslySetInnerHTML={{ __html: description }} />
  </div>
);

Question.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.string
  })

};

Question.defaultProps = {
  data: {
    title: '',
    description: '',
    icon: 'swim'
  }
};

export default Question;
