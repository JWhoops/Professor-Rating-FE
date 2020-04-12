import React from 'react';
import { render } from 'react-native-testing-library';

import SavedScreen from '../SavedScreen';

test('SavedScreen renders all inputs as expected', () => {
    global.fetch = require('node-fetch');
  const createTestProps = (props) => ({
    navigation: {
      state: { params: {
        url: 'http://172.220.7.76:8080', 
        email: 'example@yahoo.com',
      } },
      navigate: jest.fn(),
    },
    ...props
  });

  let props = createTestProps();
  const { toJSON } = render(<SavedScreen {...props}/>);

  expect(toJSON()).toMatchSnapshot();
});