"use strict";
const glob = require("glob");
const path = require("path");
const fs = require("fs");

let assetsOutsideUrl = "https://manual-assets.gm-cn.top"
let export_directory = "../"

let default_css = fs.readFileSync(export_directory + "assets/css/default.css").toString()
let final_css = default_css.replaceAll('../Images/Icons', assetsOutsideUrl + '/Images/Icons')
fs.writeFileSync(path.normalize(export_directory + "assets/css/default.css"), final_css)

glob(export_directory + '**/*.htm', {}, (err, files) => {
    if (err) {
        console.log("错误：" + err)
    } else {
        for (let index = 0; index < files.length; index++) {
            let normalizeName = path.normalize(files[index])
            let fileHTML = fs.readFileSync(files[index]).toString()
            // console.log(json)
            let assetsImagesLocation = 'src="' + assetsOutsideUrl + '/assets/Images'
            let assetsVideosLocation = 'src="' + assetsOutsideUrl + '/assets/Videos'
            
            let final = fileHTML.replaceAll('src="assets/Images', assetsImagesLocation)
                                .replaceAll('src="../assets/Images', assetsImagesLocation)
                                .replaceAll('src="../../assets/Images', assetsImagesLocation)
                                .replaceAll('src="../../../assets/Images', assetsImagesLocation)
                                .replaceAll('src="../../../../assets/Images', assetsImagesLocation)
                                .replaceAll('src="../../../../../assets/Images', assetsImagesLocation)
                                .replaceAll('src="../../assets/Videos', assetsVideosLocation)
                                .replaceAll('src="../../../../../assets/Videos', assetsVideosLocation)
            
            fs.writeFileSync(normalizeName, final)
        }
    }
})
