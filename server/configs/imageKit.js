// import ImageKit from '@imagekit/nodejs';

// const imageKit = new ImageKit({
//   privateKey: process.env['IMAGEKIT_PRIVATE_KEY']
// });// This is the default and can be omitted


// export default imageKit;


// import ImageKit from "@imagekit/nodejs";
import ImageKit from "imagekit";
const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export default imageKit;