import React, {useState} from 'react';
import {ReactAccordion, ReactAccordionContent, ReactAccordionItem, ReactAccordionTrigger} from '../../../shadcn'
import {cn} from "../../../utils";
import {AccordionProps} from "./types";

const Accordion = ({value, list, handleModelChange, handleSetSkinColor}: AccordionProps) => {

    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <ReactAccordion type='multiple' className='min-w-[232px]'>
            <ReactAccordionItem value={value}>
                <ReactAccordionTrigger className='text-white'>
                    {value} model
                </ReactAccordionTrigger>
                <ReactAccordionContent>
                    <div className='grid grid-cols-5 gap-2'>{list.map((item, index) => {

                        const isSkin = value === 'skin'

                        return <div
                            key={index}
                            className={cn(`w-10 h-10 bg-red-100 rounded-lg cursor-pointer grid place-items-center text-[#eee]`,
                                activeIndex === index && 'border-2 border-white'
                            )}
                            onClick={() => {
                                if(isSkin) {
                                    handleSetSkinColor && handleSetSkinColor(item)
                                } else {
                                    handleModelChange(item)
                                }
                                setActiveIndex(index)
                            }}
                            style={{ background: isSkin ? item : '#12c795'}}
                        >
                            {!isSkin && item.replace(/\D/g, '')}
                        </div>
                    })}</div>
                </ReactAccordionContent>

            </ReactAccordionItem>
        </ReactAccordion>
    );
};

export default Accordion;