/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
import '~/assets/scss/faqs.scss';

const PoolData = ({ data: { title, description, questions } }) => (
  <section className="main style1 special faqs">
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

PoolData.propTypes = {
  data: PropTypes.object
};

PoolData.defaultProps = {
  data: {}
};

export default PoolData;
