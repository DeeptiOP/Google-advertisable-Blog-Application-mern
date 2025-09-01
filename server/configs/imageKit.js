import ImageKit from "imagekit";

// or


let imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLICKEY,
    privateKey : process.env.IMAGEKIT_PRIVATEKEY,
    urlEndpoint :process.env.IMAGEKIT_URL_ENDPOINT
});

export default imagekit;