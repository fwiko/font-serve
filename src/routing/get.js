const express = require('express')
const router = express.Router()
const path = require('path');
const fs = require('fs');

const publicDirectory = path.join(__dirname, '../../public');

router.get("/", (req, res) => {
    if (req.query.font) {
        res.sendFile(`fonts/${req.query.font}/stylesheet.css`, { root: publicDirectory });
    } else {
        res.render("index", {
            fonts: fs.readdirSync(path.join(publicDirectory, "fonts"))
        });
    }
});

module.exports = router;