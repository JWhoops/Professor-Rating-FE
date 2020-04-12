import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import RateScreen from '../RateScreen';


test('RateScreen renders all inputs as expected', () => {
    const createTestProps = (props) => ({
        navigation: {
          state: { params: {
            course_name: 'COMP SCI 506', 
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTdmMWE1Y2RkNjdlMTE5ZTM2MDU1NGQiLCJpYXQiOjE1ODY0NzA1MTd9.wymnro8wu4OD9K5FLZJlCX6zXMJxUI5qg4CJ3kqKJFY',
            id: 'testing id'
          } },
          navigate: jest.fn(),
        },
        ...props
      });
    
      let props = createTestProps();
      const { toJSON } = render(<RateScreen {...props}/>);

  expect(toJSON()).toMatchSnapshot();
});
