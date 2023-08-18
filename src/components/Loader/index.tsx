/// #12c795
import { motion, AnimatePresence } from "framer-motion";
import create from "zustand";

interface LoaderStore {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useLoaderStore = create<LoaderStore>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));

const Loader = () => {
  const loading = useLoaderStore((state) => state.loading);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          style={{
            background: '#eee',
    
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,

            zIndex: 9999,

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
    
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1 }}
        >
          <div
            style={{
              width: '386px',
              // height: '4px',
              // background: '#12c795',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                color: '#12c795',
                fontSize: '40px',
                paddingBottom: '16px',
              }}
            >Loading</div>
            <div
              style={{
                width: '386px',
                height: '4px',
              }}
            >
              <div className="indeterminate"/>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Loader;