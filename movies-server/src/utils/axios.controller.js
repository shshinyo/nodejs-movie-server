const axios = require ("axios");


 const  ConsumeServiceApi=  async  (method, url, body, headers) => {
    try {
        if (!headers) {
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        let res = await axios.request({
            method: method,
            url: url, headers: headers,
            data: body
        });

        return res.data?.result ? res.data?.result : res.data;

    } catch (ex) {
        console.error(ex.message);
    }

}

module.exports = {
    ConsumeServiceApi
}