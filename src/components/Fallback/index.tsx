import {useEffect} from "react";
import {useLoaderStore} from "../../store";

const Fallback = () => {
    const setLoading = useLoaderStore((state) => state.setLoading);

    useEffect(() => {
        setLoading(true);

        return () => {
            setLoading(false);
        }
    }, [setLoading])

    return null;
}

export default Fallback;