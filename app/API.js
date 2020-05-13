export default {
    apiUrl: "https://api.dillishcars.com/",
    //apiUrl: "http://127.0.0.1:8000/",

    async get(action, params = {}) {
        let paramsStr = '';
        if (Object.keys(params).length > 0) {
            const query = new URLSearchParams(params);
            paramsStr = '?' + query;

        }

        const url = this.apiUrl + action + paramsStr;

        console.log('Calling API:', url);
        try {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        } catch(e) {
            console.error(e);
            throw new Error("Failed to fetch " + url);
        }

    },

    async post(action, params = {}) {
        const url = this.apiUrl + action;
        console.log('Calling API POST:', url);
        try {
            const res = await fetch(url, {
                method: 'POST',
                //mode: 'cors', // no-cors, *cors, same-origin
                //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                //credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                },
                //redirect: 'follow', // manual, *follow, error
                //referrerPolicy: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(params)
            });
            return await res.json();
        } catch(e) {
            console.error(e);
            throw new Error("Failed to post data to " + url);
        }


    }
}