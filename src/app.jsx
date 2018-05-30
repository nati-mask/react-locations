import React from 'react';
import { render } from 'react-dom';

const Root = require('./components/Root.jsx');

module.exports = render(<Root />, document.getElementById('root'));