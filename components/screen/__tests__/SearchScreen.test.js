import React from 'react';
import { render } from 'react-native-testing-library';

import SearchScreen from '../SearchScreen';

test('SearchScreen renders all inputs as expected', async () => {
  const { toJSON } = render(<SearchScreen />);

  expect(toJSON()).toMatchSnapshot();
});