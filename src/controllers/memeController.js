const axios = require("axios")

let getmemes = async function (req, res) {
    try {
        let options = {
            method: "get",
            url: "http://api.imgflip.com/get_memes"
        }
        let result = await axios(options);
        console.log(result)
        res.status(200).send({data:result.data})
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ msg: err.message });
    }

}

let postmeme = async function (req, res) {
    try {
        let memeid = req.query.template_id;
        let text0 = req.query.text0;
        let text1 = req.query.text1;
        let username = req.query.username;
        let password = req.query.password;
        let options = {
            method: "post",
            url: `https://api.imgflip.com/caption_image?template_id=${memeid}&text0=${text0}&text1=${text1}&username=${username}&password=${password}`
        }
        let result = await axios(options)
        res.status(201).send({ data: result.data.data })
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ msg: err.message });
    }
}

module.exports.getmemes = getmemes
module.exports.postmeme = postmeme