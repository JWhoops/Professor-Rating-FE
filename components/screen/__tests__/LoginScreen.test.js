import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import LoginScreen from '../user/LoginScreen';

import { Button, TextInput } from 'react-native-paper';


test('LoginScreen renders all inputs as expected', async () => {
  const { toJSON } = render(<LoginScreen />);

  expect(toJSON()).toMatchSnapshot();
});

//test('renders the passed label', () => {
//  const { getByText, queryByText } = render(<TextInput label="Test Label" />);

//  expect(getByText('Test Label')).not.toBeNull();
//  expect(queryByText('ASDF')).toBeNull();
//});

// test('forwards remaining props to the underlying TextInput', () => {
//   const onChangeTextMock = jest.fn();

//   const { getByTestId } = render(
//     <TextInput
//       onChangeText={onChangeTextMock}
//     />
//   );

// //   expect(getByTestId('Comment.TextInput').props).toEqual(
// //     expect.objectContaining({
// //       passedProp: 'yes',
// //     })
// //   );
//   fireEvent.changeText(getByTestId('LoginScreen.TextInput'), 'testing!');
//   expect(onChangeTextMock).toHaveBeenCalled();
//   expect(onChangeTextMock).toHaveBeenCalledWith('testing!');
//   expect(onChangeTextMock).not.toHaveBeenCalledWith('no!');

// });