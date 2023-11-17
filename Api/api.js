import axios from 'axios';
import { Dimensions } from 'react-native';

export const {width,height} = Dimensions.get('window');
// console.log(width,height);
export const baseUrl = `https://api.themoviedb.org/3/movie/`;
export const imageUrl = `https://image.tmdb.org/t/p/w500`;

const pRes = async (res) => {
    // console.log('res in api:', res);
    if (res.status === 200) {
        const contentType = res.headers['content-type'];
        if (contentType && contentType.includes('application/json')) {
            const jsonRes = res.data;
            return {
                status: res.status,
                resData: jsonRes,
            };
        } else {
            const textRes = res.data;
            return {
                status: res.status,
                resData: textRes,
            };
        }
    } else {
        return {
            status: res.status,
        };
    }
};

export const getMovies = async () => {
    try {
        const res = await axios.get(`${baseUrl}popular`, {
            params: {
                api_key: '5416306a2735604945fd08b4cbfcb5fb',
            },
        });
        return pRes(res);
    } catch (error) {
        console.log('error in api movie:', error);
    }
};

export const getMovieDetails = async mId => {
    try {
        const res = await axios.get(`${baseUrl}${mId}`, {
            params: {
                api_key: '5416306a2735604945fd08b4cbfcb5fb',
            },
        });
        return pRes(res);
    } catch (error) {
        console.log('error in api movie:', error);
    }
};

export const getMovieImages = async mId => {
    try {
        const res = await axios.get(`${baseUrl}${mId}/images`, {
            params: {
                api_key: '5416306a2735604945fd08b4cbfcb5fb',
            },
        });
        return pRes(res);
    } catch (error) {
        console.log('error in api movie:', error);
    }
};

export const getMovieCast = async mId => {
    try {
        const res = await axios.get(`${baseUrl}${mId}/credits`, {
            params: {
                api_key: '5416306a2735604945fd08b4cbfcb5fb',
            },
        });
        return pRes(res);
    } catch (error) {
        console.log('error in api movie:', error);
    }
};
