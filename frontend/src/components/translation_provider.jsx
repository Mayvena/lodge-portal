import { useEffect } from "react";
import axios from "../api/axios"
import config from '../config/config';

export var Messages = {};

const FetchTranslations = async (lang) => {
    const langURL = config.TRANSLATIONS_URL + "/" + lang;
    try {
        const response = await axios.get(
            langURL,
            config.HEADERS
        );
        
        if (response.data){
            let dataObject = []
            // for (var id in response.data){
            //     dataObject.push({
            //         id: id,
            //         book: response.data[id].name,
            //         url: response.data[id].url
            //     })
            // }
            // setBooks(dataObject);
            console.log(response.data)

            for (var id in response.data.language) {
                // Messages.lang 
                console.log(`response.data.language[${id}]:`);
                console.log(response.data.language[id]);
                Messages[response.data.language[id].msgKey] = response.data.language[id].message;
            }

            console.log(Messages)
        }
    } catch(err) {
        // TODO - catch errors
    }
}

const Translator = () => {
    useEffect(()=>{
        FetchTranslations('bg');
    })
}

// module.exports = { FetchTranslations, Messages }
// module.exports = Messages;
// export default Messages
export default Translator