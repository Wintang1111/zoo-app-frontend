import * as axiosClient from '~/utils/axiosClient';

export const getHabitat = async () => {
    try {
        const res = await axiosClient.get('habitat')
        return res.data;
    } catch (error) {
        console.log(error);
    }
}