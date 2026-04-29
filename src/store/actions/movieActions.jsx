import axios from '../../utils/axios'
import {loadmovie} from "../reducers/movieSlice"

// exporting {removeMovie} reducer from this place to stop someone reach to reducers 
export { removemovie} from "../reducers/movieSlice"

export const asyncloadmovie = (id) => async (dispatch) => {
    try {
        const detail = await axios.get(`/movie/${id}`);
        const translations = await axios.get(`/movie/${id}/translations`);
        const externalid = await axios.get(`/movie/${id}/external_ids`);
        const recommendations = await axios.get(`/movie/${id}/recommendations`);
        const similar = await axios.get(`/movie/${id}/similar`);
        const videos = await axios.get(`/movie/${id}/videos`);
        const watchproviders = await axios.get(`/movie/${id}/watch/providers`);

        let allDetails = {
            detail : detail.data,
            externalid : externalid.data,
            recommendations : recommendations.data.results,
            similar : similar.data.results,
            videos : videos.data.results.find(m => m.type === "Trailer"),
            watchproviders : watchproviders.data.results.IN,
            translations: translations.data.translations.map((t)=> t.english_name)
        }

        dispatch(loadmovie(allDetails))

    } catch (error) {
        console.log("Error: ", error)
    }
}


