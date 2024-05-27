"use strict";
const glob = require("glob");
const path = require("path");
const fs = require("fs");

let assetsOutsideUrl = "https://manual-assets.gm-cn.top"
let export_directory = "../"

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
            
            let final = fileHTML.replace('src="assets/Images', assetsImagesLocation)
                                .replace('src="../assets/Images', assetsImagesLocation)
                                .replace('src="../../assets/Images', assetsImagesLocation)
                                .replace('src="../../../assets/Images', assetsImagesLocation)
                                .replace('src="../../../../assets/Images', assetsImagesLocation)
                                .replace('src="../../../../../assets/Images', assetsImagesLocation)
                                .replace('src="../../assets/Videos', assetsVideosLocation)
                                .replace('src="../../../../../assets/Videos', assetsVideosLocation)
            
            fs.writeFileSync(normalizeName, final)
        }
    }
})
