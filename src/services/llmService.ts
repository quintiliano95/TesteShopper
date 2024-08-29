import axios from 'axios';

export const llmService = {
    getMeasureFromImage: async (base64Image: string) => {
        const response = await axios.post('https://gemini.api/recognize', {
            image: base64Image
        });

        return {
            image_url: response.data.image_url,
            value: response.data.value
        };
    }
};
