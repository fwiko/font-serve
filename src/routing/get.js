const express = require('express')
const router = express.Router()
const path = require('path');
const fs = require('fs');

const publicDirectory = path.join(__dirname, '../../public');

function getAvailableFonts() {
    return fs.readdirSync(path.join(publicDirectory, "fonts"));
}

router.get("/", (req, res) => {
    if (req.query.font) {
        res.sendFile(`fonts/${req.query.font}/stylesheet.css`, { root: publicDirectory });
    } else {
        return res.render("index", {
            fonts: getAvailableFonts()
        });
    }
});

router.get("/preview", (req, res) => {
    if (req.query.font) {
        if (getAvailableFonts().includes(req.query.font)) {
            const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const lower = "abcdefghijklmnopqrstuvwxyz";
            const numbers = "1234567890"
            
            return res.render("preview", {
                font: req.query.font,
                upper_case: upper, 
                lower_case: lower,
                numbers: numbers
            })
        }
    }
    return res.redirect("/");
});


module.exports = router;