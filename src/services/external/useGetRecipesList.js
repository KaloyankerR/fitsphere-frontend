import { useState, useEffect } from 'react';
import axios from 'axios';
import useErrorHandler from "../config/useErrorHandler";

const useGetRecipes = () => {
    const [data, setData] = useState({ recipes: [], isLoading: true, error: null });
    const { handleErrors } = useErrorHandler();

    useEffect(() => {
        const cachedRecipes = localStorage.getItem('recipes');
        if (cachedRecipes) {
            setData({ recipes: JSON.parse(cachedRecipes), isLoading: false, error: null });
        } else {
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        try {
            const options = {
                method: 'GET',
                url: 'https://tasty.p.rapidapi.com/recipes/list',
                params: { from: '0', size: '20', tags: 'under_30_minutes' },
                headers: {
                    'X-RapidAPI-Key': '6492da3bd5mshf069992a9a3da3bp1d36b1jsn3d15f50c1022',
                    'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
                },
                timeout: 30000
            };

            const response = await axios.request(options);
            setData({ recipes: response.data.results, isLoading: false, error: null });
            localStorage.setItem('recipes', JSON.stringify(response.data.results));
        } catch (error) {
            handleErrors(error);
            setData({ recipes: [], isLoading: false, error: new Error(error) });
        }
    };

    return data;
};

export default useGetRecipes;
