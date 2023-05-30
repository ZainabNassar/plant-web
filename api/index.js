const express =require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User= require('./models/User.js');
const Place=require('./models/Place.js');
const Booking=require('./models/Booking.js');
const Order=require('./models/Order.js');

const Cart=require('./models/Cart.js');
const cookieParser= require('cookie-parser'); 
const imageDownloader=require('image-downloader');
const multer=require('multer');
const fs=require('fs');
// const { default: Orders } = require('../client/src/pages/Orders.jsx');


require('dotenv').config()
const app=express();

const bcryptSalt=bcrypt.genSaltSync(10);
const jwtSecret = 'fasefraw4r5r3wq45wdfqw34twdfq';

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
    credentials: true,
    origin:'http://127.0.0.1:5173',
    }));

    mongoose.connect('mongodb+srv://Saadeh:NAJDmGxHbRMRH94X@cluster0.gvbh6zu.mongodb.net/?retryWrites=true&w=majority');
    // process.env.MONGO_URL
    // console.log(process.env.MONGO_URL)
    function getUserDataFromReq(req){
        return new Promise((resolve, reject) => {
            jwt.verify(req.cookies.token , jwtSecret, {} , async (err, userData) => {
                if (err) throw err;
                resolve(userData)

        }); 
        })


    }

app.get('/test',(req,res) => {
    res.json('test ok');
});
app.post('/register', async (req,res) => {
    const {name, email, password} = req.body;

    try{
         const userDoc= await User.create({
        name,
        email,
        password:bcrypt.hashSync(password,bcryptSalt),
    }); res.json(userDoc);
    }catch(e){
        res.status(422);

    }
    });



// app.post('/login', async (req, res) => {
//     const {email, password} = req.body;
//     const userDoc = await User.findOne({email});
//     if (userDoc) {
//      const passOk= bcrypt.compareSync(password,userDoc.password);
    
//         if(passOk){
//             jwt.sign({email:userDoc.email, id:userDoc._id},jwtSecret, {},(err,token) => {
//                 if (err) throw err;
                
//             res.cookie('token',token).json(userDoc);
//             });  
           
//         }else{
//             res.status(422).json('pass not ok');
            
//         }
//     } else {
//     res.json('not found');
//     }});


// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     const userDoc = await User.findOne({ email });
    
//     if (userDoc) {
//         const passOk = bcrypt.compareSync(password, userDoc.password);
        
//         if (passOk) {
//             jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (err, token) => {
//                 if (err) throw err;
                
//                 res.cookie('token', token).json(userDoc);
//             });
//         } else {
//             res.status(422).json('Invalid password');
//         }
//     } else {
//         res.status(404).json('Email not found');
//     }
// });

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const userDoc = await User.findOne({ email });
  
      if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
  
        if (passOk) {
          jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (err, token) => {
            if (err) {
              console.error('Error signing JWT:', err);
              res.sendStatus(500); // Internal Server Error
            } else {
              res.cookie('token', token).json(userDoc);
            }
          });
        } else {
          res.sendStatus(401); // Unauthorized
        }
      } else {
        res.sendStatus(401); // Unauthorized
      }
    } catch (err) {
      console.error('Error during login:', err);
      res.sendStatus(500); // Internal Server Error
    }
  });
    app.get('/profile', (req, res) => {
        
        const {token} = req.cookies;
        if (token) {
        jwt.verify(token, jwtSecret, {} , async (err,userData) =>{
          if (err) throw err;
          const {name, email, _id}= await User.findById(userData.id);
          res.json({name,email,_id});  
        });
        } else {
        res.json(null);
        }
        })

        app.post('/logout', (req, res) => {
            res.clearCookie('token').json(true);
          });

        
        app.post('/upload-by-link', async (req,res) => {
            const {link} =req.body;
            const newName ='photo'+ Date.now() + '.jpg';
           await imageDownloader.image({
                url: link,
                dest: __dirname +'/uploads/' +newName,
            });
            res.json(newName);
        });

        const photosMiddleware=multer({dest:'uploads/'});
        app.post('/upload', photosMiddleware.array('photos',100), (req,res) => {
          const uploadedFiles=[];
            for(let i=0;i<req.files.length;i++){
            const {path,originalname}=req.files[i];
           const parts=originalname.split('.');
           const ext =parts[parts.length-1]; 
           const newPath=path +'.' + ext;
            fs.renameSync(path,newPath)
           uploadedFiles.push(newPath.replace('uploads\\',''));
        }
        
            res.json(uploadedFiles);
        });

            app.post('/VandE', (req,res) => {
            const {token} = req.cookies; 
            const {
                title, address,addedPhotos,description,
                 perks,extraInfo,price}=req.body;
            jwt.verify(token, jwtSecret, {} , async (err, userData) => {
                if (err) throw err;
                const placeDoc= await Place.create({
                    owner:userData.id,
                    title, address,
                        photos:addedPhotos,description, 
                        perks,extraInfo,price,
                });
                res.json(placeDoc);
              });
           
        });

        app.get('/user-VandE', (req,res) => {
            const {token} = req.cookies;
            jwt.verify(token, jwtSecret, {} , async (err, userData) => {
                const {id}=userData;
                res.json(await Place.find({owner:id}));
            });

        });

        app.get('/VandE/:id',async (req,res) => {
            const {id} =req.params;
        
            res.json(await Place.findById(id));
        });

        app.put('/VandE', async (req,res) => {
            const {token} = req.cookies; 
            const {
                id,title, address,addedPhotos,description,
                 perks,extraInfo,price}=req.body;
                 const placeDoc =await Place.findById(id);
                 jwt.verify(token, jwtSecret, {} , async (err, userData) => {
                    if (err) throw err;
                    const placeDoc =await Place.findById(id);
                    if (userData.id === placeDoc.owner.toString()){
                        placeDoc.set({
                       
                    title, address,
                        photos:addedPhotos,description, 
                        perks,extraInfo,price,
                        });
                      await  placeDoc.save();
                        res.json('ok')
                    }
                 });

        })
        app.get('/VandE', async (req,res) => {
                res.json(await Place.find());
            });



            app.post('/bookings',  async (req,res) => {
                const userData =await getUserDataFromReq(req);
                const {
                    place,name,quantity,
                    phone,price,address}=req.body;
                    Booking.create({
                        place,name,quantity,phone,price,address,
                        user:userData.id,
                    }).then((doc) => {
                        res.json(doc);
                    }).catch((err) => {
                        throw err;
                    });
                    });

                
                    app.get('/bookings', async (req,res) => {
                            const userData=await getUserDataFromReq(req);
                            res.json( await Booking.find({user:userData.id}).populate('place'))


                    })
                    app.get('/orders', async (req, res) => {
                        try {
                          const orders = await Booking.find().populate('place');
                          res.json(orders);
                        } catch (error) {
                          res.status(500).json({ error: 'Failed to retrieve orders' });
                        }
                      });


                  
                    //   app.post('/done',  async (req,res) => {
                    //     const userData =await getUserDataFromReq(req);
                    //     const {
                    //         booking,done}=req.body;
                    //         Order.create({
                    //             booking,done,
                              
                    //         }).then((doc) => {
                    //             res.json(doc);
                    //         }).catch((err) => {
                    //             throw err;
                    //         });
                    //         });

                    //         app.get('/getdone', async (req, res) => {
                    //             try {
                    //               const doneg = await Order.find().populate('booking');
                    //               res.json(doneg);
                    //             } catch (error) {
                    //               res.status(500).json({ error: 'Failed to retrieve orders' });
                    //             }
                    //           });







                     app.post('/cart',  async (req,res) => {
                        const userData =await getUserDataFromReq(req);
                        const {
                            place}=req.body;
                            Cart.create({
                                place,
                                user:userData.id,
                            }).then((doc) => {
                                res.json(doc);
                            }).catch((err) => {
                                throw err;
                            });
                            });
                    

                            app.get('/cart', async (req,res) => {
                                const userData=await getUserDataFromReq(req);
                                res.json( await Cart.find({user:userData.id}).populate('place'))})
   



                                // app.delete('/cart/:itemId', (req, res) => {
                                //     const itemId = req.params.itemId;
                                  
                                //     // Find and remove the item from the database
                                //     Cart.findByIdAndDelete({ _id: itemId }, (error) => {
                                //       if (error) {
                                //         console.log('Error removing item from cart:', error);
                                //         res.status(500).json({ error: 'Unable to remove item from cart' });
                                //       } else {
                                //         res.json({ message: 'Item removed from cart' });
                                //       }
                                //     });
                                //   });

                                app.delete('/cart/:id', async (req, res) => {
                                    const id = req.params.id;
                                  
                                    try {
                                      const deletedItem = await Cart.findByIdAndDelete(id);
                                      if (deletedItem) {
                                        res.sendStatus(204); // No Content
                                      } else {
                                        res.sendStatus(404); // Not Found
                                      }
                                    } catch (err) {
                                      console.error('Error deleting item:', err);
                                      res.sendStatus(500); // Internal Server Error
                                    }
                                  });
    app.listen(4000);