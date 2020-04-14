 import React from 'react';
 import { render } from 'react-native-testing-library';

 import ResultItem from '../../ResultItem';

 test('ResultItem renders all inputs as expected', async () => {
   const { toJSON } = render(<ResultItem />);

   expect(toJSON()).toMatchSnapshot();
 });