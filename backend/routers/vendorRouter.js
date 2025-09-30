import express from 'express';
import { Router } from 'express';
import Model from '../models/vendorModel.js';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import verifyToken from '../middlewares/auth.js';

const router = Router();

router.post('/add', (req, res) => {
    console.log(req.body);

    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);

            res.status(500).json(err);
        });

});

router.get('/getall', (req, res) => {
    Model.find()
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            console.log(err);

            res.status(500).json(err);


        });
});
//: denotes url parameter
router.get('/getbyemail/:email', (req, res) => {
    console.log(req.params.email);
    Model.find({ email: req.params.email })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(result);
        });

});
router.get('/getbyname/:name', (req, res) => {
    console.log(req.params.name);
    Model.find({ name: req.params.name })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(result);
        });

});

router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);

        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);


        });
});

router.get('/getvendor', verifyToken, (req, res) => {
    Model.findById(req.user._id)
        .then((result) => {
            res.status(200).json(result);

        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);


        });
});

router.get('/getbycity/:city', (req, res) => {
    Model.find(req.params.id)
        .then((result) => {
            res.status(200).json(result);

        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);


        });
});

router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);

        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);

        });
});

router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/authenticate', (req, res) => {
    console.log(req.body);
    Model.findOne(req.body)
        .then((result) => {

            if (result) {
                //generate token

                const { _id, name, email } = result;
                const payload = { _id, name, email };

                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' },
                    (err, token) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json(err);
                        } else {
                            res.status(200).json({ token, name, email });
                        }
                    }
                )
            } else {
                res.status(403).json({ message: 'login failed' });
            }


        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);


        });
});

export default router;