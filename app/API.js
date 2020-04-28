export default {
    async get(action, params = {}) {
        let paramsStr = '';
        if (Object.keys(params).length > 0) {
            const query = new URLSearchParams(params);
            paramsStr = '?' + query;

        }
        const url = "http://127.0.0.1:8000/" + action + paramsStr;
        console.log('Calling API:', url);
        const res = await fetch(url);
        try {
            const data = await res.json();
            return data;
        } catch(e) {
            console.error("JSON Parse Error on URL " + url);
            return false;
        }
    }
}