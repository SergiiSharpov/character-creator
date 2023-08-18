import * as ReactSelect from '@radix-ui/react-select';
import React from 'react';
import SelectItem from './components/SelectItem';
import {SelectProps} from './types';


const Select = ({
                     list,
                     selected,
                     setSelected,
                     type
                 }: SelectProps) => {


    return (
        <>
            <div className="w-72">
                <ReactSelect.Root value={selected} onValueChange={setSelected}>
                    <div className="relative mt-1 z-500">
                        <ReactSelect.Trigger
                            className="relative z-50 w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            {type} model #{selected.replace(/\D/g, '')}
                        </ReactSelect.Trigger>

                        <ReactSelect.Portal>
                            <ReactSelect.Content position='popper' sideOffset={5}
                                                 className='bg-white w-[286px] rounded-lg shadow-2xl my-2 '>
                                <ReactSelect.Viewport>
                                    <ReactSelect.Group className='overflow-y-scroll select__inner-group p-2'>
                                        <div className='h-[200px]'>
                                            <div className='select__inner-group'>
                                                {list.map((item, index) => (
                                                        <SelectItem key={index} value={item}>
                                                            {item}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </ReactSelect.Group>
                                </ReactSelect.Viewport>
                            </ReactSelect.Content>
                        </ReactSelect.Portal>

                    </div>
                </ReactSelect.Root>
            </div>
        </>
    );
};


export default Select;
