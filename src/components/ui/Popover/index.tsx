import * as RadixPopover from '@radix-ui/react-popover'
import {useThree} from "@react-three/fiber";
import gsap from "gsap";
import React, {FC, useCallback, useMemo, useState} from 'react';
import {cn} from "../../../utils";
import {menuConfig} from "../../Character/constants";

export type AnnotationType = keyof typeof menuConfig

type PopoverProps = {
    type?: 'animation' | 'appearance'
    children: React.ReactNode
    annotationType: AnnotationType
    onClick: (key: string | number) => void
    cameraToDefault: () => void
}

const Popover: FC<PopoverProps> = ({children, annotationType, onClick, cameraToDefault}) => {
    const [searchValue, setSearchValue] = useState('')

    const filteredList = useMemo(() => {
        return menuConfig[annotationType]["thumbnailsPaths"].filter(item => item.toUpperCase().includes(searchValue.toUpperCase()))
    }, [searchValue])

    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <RadixPopover.Root>
            <RadixPopover.Trigger asChild>
                {children}
            </RadixPopover.Trigger>
            <RadixPopover.Portal>
                <RadixPopover.Content
                    // onInteractOutside={() => cameraToDefault()}
                    onEscapeKeyDown={cameraToDefault}
                    side={'right'}
                    align={'start'}
                    className="rounded  w-[200px] bg-white h-[345px]
                               shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)]
                               outline-none will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade
                               data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade
                               data-[state=open]:data-[side=left]:animate-slideRightAndFade menu-gradient"
                    sideOffset={5}
                >
                    <div className="flex flex-col gap-2.5 body-part-block">

                        <div className='p-3 pb-0'><h1 className='text-[#f8f8f8] text-sm'>{annotationType}</h1>

                            <input
                                value={searchValue}
                                type="text"
                                className=' bg-transparent py-3 border-b border-solid border-[rgba(248,248,248,0.15)] outline-none mt-2.5
                                placeholder:text-[rgba(248,248,248,0.35)] placeholder:italic text-[#f8f8f8]
                                hover:border-[rgba(248,248,248,0.25)] transition hover:placeholder:text-[rgba(248,248,248,0.55)]
                                placeholder:transition'
                                placeholder={'Search'}
                                onChange={(event) => setSearchValue(event.target.value)}
                            />
                        </div>

                        <div className='mx-2'>
                            <div className='grid grid-cols-2 gap-2 mt-2 overflow-y-scroll h-[205px] p-1'>
                                {filteredList.map((item, index) => (
                                    <div className={cn('h-24 cursor-pointer')} key={item}>
                                        <img
                                            src={item}
                                            onClick={() => {
                                                onClick(menuConfig[annotationType]["value"][index])
                                                setActiveIndex(index)
                                            }}
                                            alt={`${annotationType + index}`}
                                            className={cn('w-full object-cover rounded-sm h-20', activeIndex === index && 'ring-2 ring-blue-500'
                                            )}
                                        />
                                        <p className='text-xs text-[#c3c3c3] mt-1 pl-1'>{annotationType} {item.replace(/\D*/g, '')}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                    {/*<RadixPopover.Close*/}
                    {/*    className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 outline-none cursor-default"*/}
                    {/*    aria-label="Close"*/}
                    {/*>*/}

                    {/*</RadixPopover.Close>*/}
                    {/*<RadixPopover.Arrow className="fill-[#6F5CE7]" />*/}
                </RadixPopover.Content>
            </RadixPopover.Portal>
        </RadixPopover.Root>
    );
};

export default Popover;