import axios from 'axios'
import { z } from 'zod'
import { object, number, string, parse } from 'valibot'
import { SearchType, Weather } from '../types'
import { useMemo, useState } from 'react'
export default function useWeather() {

    const initialState: Weather = {
        name: '',
        main: {
            temp: 0,
            temp_min: 0,
            temp_max: 0
        }
    };

    const [weather, setWeather] = useState<Weather>(initialState);
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [imagen, setImagen] = useState('');

    // ZOD
    const ImageSchema = z.object({
        results: z.array(
            z.object({
                urls: z.object({
                    small: z.string()
                })
            })
        )
    });
    type Image = z.infer<typeof ImageSchema>

    // valibot
    const WeatherSchema = object({
        name: string(),
        main: object({
            temp: number(),
            temp_min: number(),
            temp_max: number(),
        })
    });

    const hasWeatherData = useMemo(() => weather.name, [weather])

    const fetchWeather = async (search: SearchType) => {
        const appId = import.meta.env.VITE_API_KEY;
        setWeather(initialState)
        setLoading(true);
        setNotFound(false);

        try {
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search.city},${search.country}&appid=${appId}`;
            const { data: weaterResult } = await axios(weatherUrl);

            const result = parse(WeatherSchema, weaterResult);
            if (result) {
                setWeather(result);
            } else {
                console.error('wrong response...!');
            }
        } catch (error) {
            setNotFound(true);
            // console.error('error :', error);

        } finally {
            setLoading(false);
            fetchImage(search.city);
        }
    }

    const fetchImage = async (city: SearchType['city']) => {
        setImagen('');
        try {
            const apiId = import.meta.env.VITE_IMAGE_KEY
            const urlImage = `https://api.unsplash.com/search/photos?query=${city}%20city&client_id=${apiId}`;

            const { data: imageResult } = await axios(urlImage);

            const result = ImageSchema.safeParse(imageResult);
            if (result.success) {
                const imgResponse: Image = result.data;
                const randomNumber = Math.floor(Math.random() * 10);
                setImagen(imgResponse.results[randomNumber].urls.small);
            } else {
                console.error('wrong response...!');
            }
        } catch (error) {
            console.log('error :', error);
        }
    }
    return {
        weather,
        loading,
        imagen,
        notFound,
        fetchWeather,
        hasWeatherData
    }
}