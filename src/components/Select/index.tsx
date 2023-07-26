import {Listbox, Transition} from '@headlessui/react'
import React, {Fragment} from 'react';
import {SelectProps} from "./types";

export const Select = (
    {
        list,
        selected,
        setSelected,
        type
    }: SelectProps) => {
    return (
        <>

            <div className="w-72">
                <Listbox value={selected} onChange={setSelected}>
                    <div className="relative mt-1 z-500">
                        <Listbox.Button
                            className="relative z-50 w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block truncate"><span className='first-letter:uppercase'>{type}</span> model #{selected.replace(/\D/g, '')}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"/>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options
                                className="absolute z-[9999] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {list.map((path, index) => (
                                    <Listbox.Option
                                        key={index}
                                        className={({active}) =>
                                            `relative cursor-pointer select-none py-2 pl-4 pr-4 ${
                                                active ? 'bg-[#93d5ba] text-black' : 'text-gray-900'
                                            }`
                                        }
                                        value={path}
                                    >
                                        {({selected}) => (
                                            <>
                                          <span
                                              className={`block truncate ${
                                                  selected ? 'font-medium' : 'font-normal'
                                              }`}
                                          >
                                            Model #{path.replace(/\D/g, '')}
                                          </span>
                                                {selected ? (
                                                    <span
                                                        className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"/>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            </div>
        </>
    );
};