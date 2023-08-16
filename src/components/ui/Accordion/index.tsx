import React from 'react';
import {ReactAccordion, ReactAccordionContent, ReactAccordionItem, ReactAccordionTrigger} from '../../../shadcn'
import {AccordionProps} from "./types";

const Accordion = ({value, list, handleModelChange}: AccordionProps) => {
    return (
        <ReactAccordion type='multiple' className='min-w-[232px]'>
            <ReactAccordionItem value={value}>
                <ReactAccordionTrigger className='text-white'>
                    {value} model
                </ReactAccordionTrigger>
                <ReactAccordionContent>
                    <div className='grid grid-cols-5 gap-2'>{list.map((item, index) => {
                        return <div
                            key={index}
                            className='w-10 h-10 bg-red-100 rounded-lg cursor-pointer grid place-items-center'
                            onClick={() => handleModelChange(item)}
                        >
                            {item.replace(/\D/g, '')}
                        </div>
                    })}</div>
                </ReactAccordionContent>

            </ReactAccordionItem>
        </ReactAccordion>
    );
};

export default Accordion;