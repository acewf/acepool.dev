/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
import '~/assets/scss/faqs.scss';

const PoolData = ({ data: { title, description, questions } }) => (
  <section className="main style1 special faqs">
    <div className="grid-wrapper">
      <div className="col-12">
        <header className="major">
          <h2>{title}</h2>
        </header>
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      {questions.map((item) => <Question key={item.id} data={item} />)}
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
