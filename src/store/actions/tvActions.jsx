import axios from '../../utils/axios'
import {loadtv} from "../reducers/tvSlice"

// exporting {removetv} reducer from this place to stop someone reach to reducers 
export { removetv} from "../reducers/tvSlice"

export const asyncloadtv = (id) => async (dispatch, getState) => {
    try {
        const detail = await axios.get(`/tv/${id}`);
        const translations = await axios.get(`/tv/${id}/translations`);
        const externalid = await axios.get(`/tv/${id}/external_ids`);
        const recommendations = await axios.get(`/tv/${id}/recommendations`);
        const similar = await axios.get(`/tv/${id}/similar`);
        const videos = await axios.get(`/tv/${id}/videos`);
        const watchproviders = await axios.get(`/tv/${id}/watch/providers`);

        let allDetails = {
            detail : detail.data,
            externalid : externalid.data,
            recommendations : recommendations.data.results,
            similar : similar.data.results,
            watchproviders : watchproviders.data.results.IN,
            videos : videos.data.results.find((m) => m.type === "Trailer"),
            translations: translations.data.translations.map((t)=> t.english_name)
        }

        dispatch(loadtv(allDetails))

        console.log(allDetails)

    } catch (error) {
        console.log("Error: ", error)
    }
}


