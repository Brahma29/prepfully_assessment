import { useState, useEffect } from "react";

export const useFetchAvailableSlots = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(false);
    const [reValidate, setReValidate] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/appointments');
                const jsonData = await response.json();

                setData(jsonData.slots);
                setLoading(false);
                setMessage(jsonData.message);
                setSuccess(jsonData.success);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchData();
    }, [reValidate]);

    return { data, loading, message, success, setReValidate };
};
