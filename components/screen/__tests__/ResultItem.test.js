 import React from 'react';
 import { render, fireEvent } from 'react-native-testing-library';

 import ResultItem from '../../ResultItem';
 import { View, Text, TouchableOpacity } from 'react-native';
 import { Button } from 'react-native-paper';

 test('ResultItem renders all inputs as expected', async () => {
   const { toJSON } = render(<ResultItem />);

   expect(toJSON()).toMatchSnapshot();
 });

 const onPressMock = jest.fn();

 const { getByTestId } = render(
   <View>
     <TouchableOpacity onPress={onPressMock} testID="ResultItem.Button">
       <Text>Press me</Text>
     </TouchableOpacity>
   </View>
 );
 
 fireEvent.press(getByTestId('ResultItem.Button'));