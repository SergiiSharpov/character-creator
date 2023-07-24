import {Listbox} from '@headlessui/react'
import React from 'react';
import {SelectProps} from "./types";

export const Select = ({
                           list,
                           selected,
                           setSelected
                       }: SelectProps) => {
    return (
        <Listbox value={selected} onChange={setSelected}>
            <Listbox.Button>{selected}</Listbox.Button>
            <Listbox.Options>
                {list.map((item, index) => (
                    <Listbox.Option
                        key={index}
                        value={item}
                    >
                        {item}
                    </Listbox.Option>
                ))}
            </Listbox.Options>
        </Listbox>
    );
};