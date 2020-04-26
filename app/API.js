export default {
    async get(action, params = {}) {
        let paramsStr = '';
        if (params.length > 0) {
            paramsStr += '?' + new URLSearchParams(params).toString();
        }
        const url = "http://127.0.0.1:8000/" + action + paramsStr;
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