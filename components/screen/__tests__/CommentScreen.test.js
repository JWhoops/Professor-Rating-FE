import React from 'react';
import { render } from 'react-native-testing-library';
import * as navigation from "react-navigation";

import CommentScreen from '../CommentScreen';

test('CommentScreen renders all inputs as expected', async () => {
  global.fetch = require('node-fetch');
  const createTestProps = (props) => ({
    navigation: {
      state: { params: {
        url: 'http://172.220.7.76:8080', 
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTdmMWE1Y2RkNjdlMTE5ZTM2MDU1NGQiLCJpYXQiOjE1ODY0NzA1MTd9.wymnro8wu4OD9K5FLZJlCX6zXMJxUI5qg4CJ3kqKJFY',
        course_id: '5e7f12300b0e027580738658'
      } },
      navigate: jest.fn(),
    },
    ...props
  });
  const fetch= jest.fn();

  let props = createTestProps();
  const { toJSON } = render(<CommentScreen {...props} />);

  expect(toJSON()).toMatchSnapshot();
});