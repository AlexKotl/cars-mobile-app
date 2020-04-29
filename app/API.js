export default {
    async get(action, params = {}) {
        let paramsStr = '';
        if (Object.keys(params).length > 0) {
            const query = new URLSearchParams(params);
            paramsStr = '?' + query;

        }
        const url = "http://127.0.0.1:8000/" + action + paramsStr;
        //const url = "http://api.dillishcars.com/" + action + paramsStr;
        console.log('Calling API:', url);
        try {
            const res = await fetch(url);
        } catch(e) {
            throw new Error("Failed to fetch " + url);
        }

        try {
            const data = await res.json();

        } catch(e) {
            throw new Error("Failed to parse JSON");
        }
        return data;
    }
}