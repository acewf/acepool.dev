import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDigitalOcean, faUbuntu } from '@fortawesome/free-brands-svg-icons';
import { faEye, faCode, faTerminal, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import '~/assets/scss/tech.scss';

const listOfIcons = {
  cloud: faDigitalOcean,
  ubuntu: faUbuntu,
  supervisor: faEye,
  shell: faTerminal,
  node: faCode
};

const TechStake = ({ data: { title, info } }) => (
  <section className="main style2 tech">
    <div className="wrapper">
      <div className="tech__container">
        <header className="major">
          <h2>
            {title}
          </h2>
        </header>
        <ul>
          {info.map(({ copy, icon, id }) => (
            <li key={id}>
              <FontAwesomeIcon size="1x" icon={listOfIcons[icon]} />
              <span>{copy}</span>
            </li>
          ))
          }
        </ul>
      </div>
      <div className="centered--flex">
        <FontAwesomeIcon size="6x" icon={faLayerGroup} />
      </div>
    </div>
  </section>
);

TechStake.propTypes = {
  data: PropTypes.object
};

TechStake.defaultProps = {
  data: {
    title: '',
    info: []
  }
};

export default TechStake;
