/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
import '~/assets/scss/whyus.scss';
import '~/assets/scss/shared.scss';

const WhyUS = ({ data: { title, description, questions } }) => (
  <section className="listwrapper whyus">
    <div className="wrapper">
      <div className="title__wrapper">
        <header className="major">
          <h2>{title}</h2>
        </header>
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      <div className="questions__wrapper">
        {questions.map((item) => <Question key={item.id} data={item} />)}
      </div>
    </div>
  </section>
);

WhyUS.propTypes = {
  data: PropTypes.object
};

WhyUS.defaultProps = {
  data: {}
};

export default WhyUS;
