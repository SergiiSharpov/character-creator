/// #12c795
import {AnimatePresence, motion} from "framer-motion";
import {useLoaderStore} from "../../store";

const Loader = () => {
    const loading = useLoaderStore((state) => state.loading);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    className='bg-[#eee] fixed inset-0 z-[9999] flex justify-center items-center'
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{delay: 1}}
                >
                    <div className='w-[386px] flex flex-col items-center'>
                        <div className='text-[#12c795] text-[40px] pb-4'>Loading
                        </div>
                        <div className='w-[386px] h-1'>
                            <div className="indeterminate"/>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Loader;