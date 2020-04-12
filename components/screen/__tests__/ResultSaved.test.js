import React from 'react';
import { render } from 'react-native-testing-library';

import ResultSaved from '../../ResultSaved';

test('ResultSaved renders all inputs as expected', () => {
    global.fetch = require('node-fetch');
  const createTestProps = (props) => ({
    navigation: {
      state: { params: {
        url: 'http://172.220.7.76:8080', 
        course_id: '5e7f12300b0e027580738658',
      } },
      navigate: jest.fn(),
    },
    ...props
  });

  let props = createTestProps();
  const { toJSON } = render(<ResultSaved {...props}/>);

  expect(toJSON()).toMatchSnapshot();
});