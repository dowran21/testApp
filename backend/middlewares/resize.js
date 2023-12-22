const moment = require('moment')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const resize_image  = async (req, res, next) =>{
    console.log(req.files)
    let i=0;
    const {id} = req.params
    const user_id = req.user.id
    // const user_id = 45
    if (req.files.length){
        let dir = `./uploads/images/products/${user_id}/${id}`
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir , { recursive: true });
        } 
        for (i =0; i<req.files.length; i++){
            const date = moment().format('DDMMYYYY-HHmmss_SSS');
            // const name = req.files[i].originalname.replace(' ', '').split('.')[0];
            const name = ""
            req.files[i].path = `uploads/images/products/${user_id}/${id}/${date}-${name}`
            sharp.cache({files:0});
            const metaData = await sharp(`./uploads/${req.files[i].filename}`).metadata()
            // console.log(metaData)
            let image = await sharp(`./uploads/${req.files[i].filename}`)
                    .resize(metaData.width > metaData.height ? metaData.height : metaData.width
                        , metaData.width > metaData.height ? metaData.height : metaData.width, {
                            fit:"cover"
                        })
                    .toBuffer();
            const mini_image = await sharp(image)
                .resize(60, 60, {
                    fit: 'inside',
                })
                .toFormat("webp", {quality:60})
                .toBuffer()
            const miniImageMetadata = await sharp(mini_image).metadata()
            const big_image = await sharp(image)
                .resize(metaData.width, 315, {
                    fit: 'inside',
                })
                .toFormat("webp", {quality:60})
                .toBuffer()
            const bigImageMetadata = await sharp(big_image).metadata()
            const image1 = await sharp("./uploads/watermark.png").resize(miniImageMetadata.width, miniImageMetadata.height).toBuffer()
            const image2 = await sharp("./uploads/watermark.png").resize(bigImageMetadata.width, bigImageMetadata.height).toBuffer()
            const image3 = await sharp("./uploads/watermark.png").resize(metaData.width, metaData.height).toBuffer()
            await sharp(mini_image)
                // .resize(60, 60, {
                //     fit: 'fill',
                // })
                // .toFormat("webp", {quality:60})
                . composite([
                    {
                        input:image1,
                        gravity:"center",
                        top: 0, left: 0, blend: 'over'
                    }
                ])
                .toFile(`./uploads/images/products/${user_id}/${id}/${date}-${name}-mini.webp`)

            await sharp(big_image)
                // .resize(metaData.width, 315, {
                //     fit: 'fill',
                // })
                // .toFormat("webp", {quality:60})
                . composite([
                    {
                        input:image2,
                        gravity:"center",
                        top: 0, left: 0, blend: 'over'
                    }
                ])
                .toFile(`./uploads/images/products/${user_id}/${id}/${date}-${name}-big.webp`)

            await sharp(`./uploads/${req.files[i].filename}`)
                .toFormat("webp")
                . composite([
                    {
                        input:image3,
                        gravity:"center",
                        top: 0, left: 0, blend: 'over'
                    }
                ])
                .toFile(`./uploads/images/products/${user_id}/${id}/${date}-${name}-large.webp`)
            
            fs.unlinkSync(`./uploads/${req.files[i].filename}`)
        }        
    }else{
        next()
    }
    next()
}

const resize_page_images = async (req, res, next) =>{
    let dir = `./uploads/page-images`
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir)
    }
    if(req.file){
        const date = moment().format('DDMMYYYY-HHmmss_SSS');
        const name = req.file.originalname.replace(' ', '');
        req.file.path = `uploads/page-images/${date}-${name}`
        await sharp(`./uploads/${req.file.filename}`)
            .toFile(`./uploads/page-images/${date}-${name}`)
        
        fs.unlinkSync(`./uploads/${req.file.filename}`)
        next()
    }else{
        return res.status(402).send(false)
    }
}

const resize_profile = async (req, res, next) =>{
    console.log("hello")
    let dir = `./uploads/images/profiles`
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir)
    }
    if(req.file){
        const date = moment().format('DDMMYYYY-HHmmss_SSS');
        const name = req.file.originalname.replaceAll(' ', '');
        req.file.path = `uploads/images/profiles/${date}-${name}`
        await sharp(`./uploads/${req.file.filename}`)
        .resize(164, 164, {
            fit: 'fill',
        })
        .toFormat("webp")
        .toFile(`./uploads/images/profiles/${date}-${name}`)
        
        fs.unlinkSync(`./uploads/${req.file.filename}`)
        next()
    }else{
        return res.status(402).send(false)
    }
}

const resize_profile_banners = async (req, res, next) =>{
    const {id} = req.user;
    let dir = `./uploads/profile_banners/${id}`
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true })
    }
    if(req.files?.length){
        for(let i=0; i<req.files.length; i++ ){
            const date = moment().format('DDMMYYYY-HHmmss_SSS');
            const name = req.files[i].originalname.replaceAll(' ', '');
            req.files[i].path = `uploads/profile_banners/${id}/${date}-${name}`
            await sharp(`./uploads/${req.files[i].filename}`)
                .toFile(`./uploads/profile_banners/${id}/${date}-${name}`)
            
            fs.unlinkSync(`./uploads/${req.files[i].filename}`)
        }
        
        next()
    }else{
        return res.status(402).send(false)
    }
}

const resize_banners = async (req, res, next) =>{
    let dir = `./uploads/banner`
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true })
    }
    console.log(req.file, "helloooooo")
    if(req.file){
        // for(let i=0; i<req.files.length; i++ ){
            const date = moment().format('DDMMYYYY-HHmmss_SSS');
            const name = req.file.originalname.replaceAll(' ', '');
            req.file.path = `uploads/banner/${date}-${name}`
            await sharp(`./uploads/${req.file.filename}`)
                .toFile(`./uploads/banner/${date}-${name}`)
            
            fs.unlinkSync(`./uploads/${req.file.filename}`)
        // }
        
        next()
    }else{
        // return res.status(402).send(false)
        next()
    }
}

module.exports = {
    resize_image,
    resize_page_images,
    resize_profile_banners,
    resize_profile,
    resize_banners
    }