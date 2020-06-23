const express=require('express')
const body_parser=require('body-parser')
const loadImage=require('blueimp-load-image');
var ExifImage = require('exif').ExifImage;
const app=express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true}))

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",'*');
    res.setHeader("Access-Control-Allow-Methods",'*');
    res.setHeader("Access-Control-Allow-Headers",'*');
    next();
})

// var request = require('request').defaults({ encoding: null });
// request.get('https://tinyjpg.com/images/social/website.jpg', function (err, res, body) {
//     //   console.log(body);
//     //   console.log(body);
//     try {
//         new ExifImage({ image :body }, function (error, exifData) {
//             if (error)
//                 console.log('Error: '+error.message);
//             else
//                 console.log(exifData); // Do something with your data!
//         });
//     } catch (error) {
//         console.log('Error: ' + error.message);
//     }
      
      
// });


const imageRouter=require('./Routes/ImageRouter');
app.use('/api',imageRouter);
app.listen(2000);