import * as ReactSelect from '@radix-ui/react-select';
import React from 'react';
import { SelectItemProps } from './types';

const SelectItem = (
  {
    children,
    value
  }: SelectItemProps ) => {
  return (
    <ReactSelect.Item className='p-2 cursor-pointer' value={ String( value ) }>

      <ReactSelect.ItemText>{children}</ReactSelect.ItemText>
    </ReactSelect.Item>
  );
};

export default SelectItem;
