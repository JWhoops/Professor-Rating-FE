import React from 'react';
import { render } from 'react-native-testing-library';

import Comment from '../CommentItem';

test('CommentItem renders all inputs as expected', () => {
  const { toJSON } = render(<Comment />);

  expect(toJSON()).toMatchSnapshot();
});