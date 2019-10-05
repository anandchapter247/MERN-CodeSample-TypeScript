import classNames from 'classnames';
import React from 'react';
import './Loader.scss';

const FullPageLoader = () => {
  return (
    <div className={classNames('main-loader')}>
      <div className={classNames('loader')}>
        <svg className={classNames('circular-loader')} viewBox='25 25 50 50'>
          <circle
            className={classNames('loader-path')}
            cx='50'
            cy='50'
            r='20'
            fill='none'
            stroke='#4caa60'
            strokeWidth='2.5'
          />
        </svg>
      </div>
    </div>
  );
};

export default FullPageLoader;
