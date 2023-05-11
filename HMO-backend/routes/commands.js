const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()


/************************************************/
/**********   API : get-customers   **********/
/************************************************/

router.post('/get-customers', async (req, res) => {
    try {
        let date = new Date(1999, 5, 1)

        console.log('API: get-customers');
        let result = await prisma.customer.findMany({
            include: {
                vaccinations: {
                    include: {
                        vaccineManufacturer: true
                    }
                },
                diseases: true
            }
        })

        res.send({ customers: result });
    } catch (ex) {
        log.error(ex.message);
        res.status(500).send(ex.message);
    }
});

/************************************************/
/**********   API : add-customer   **********/
/************************************************/

router.post('/add-customer', async (req, res) => {
    try {
        console.log('API: add-customer');
        let response = await prisma.customer.create({
            data: {
                fullName: req.body.fullName,
                id: req.body.id,
                address: req.body.address,
                dateOfBirthay: new Date(req.body.dateOfBirthay),
                phone: req.body.phone,
                mobilePhone: req.body.mobilePhone,
            }
        })
        res.send({ customer: response });
    } catch (ex) {
        log.error(ex.message);
        res.status(500).send(ex.message);
    }
});

/************************************************/
/**********   API : edit-custome-image   **********/
/************************************************/

router.post('/edit-custome-image', async (req, res) => {
    try {
        console.log('API: edit-custome-image');
        let response = await prisma.customer.update({
            data: {
                image: req.body.image
            },
            where: {
                customerIndex: req.body.customerIndex
            }
        })
        res.send({ customer: response });
    } catch (ex) {
        log.error(ex.message);
        res.status(500).send(ex.message);
    }
});

router.post('/get-new-point', async (req, res) => {
    try {
        console.log('API: get-new-point');
        if (req.body.datumPoint && req.body.ExposurDate &&
            req.body.RecoveryDate && req.body.IsolatedPeople.length > 0) {
            //check id
            res.send("valid").status(201);
        }
        else
            res.send("Invalid").status(400);

    } catch (ex) {
        log.error(ex.message);
        res.status(500).send(ex.message);
    }
});

router.post('/get-last-month-diseases', async (req, res) => {
    try {
        console.log('API: /get-last-month-diseases');
        let result = await prisma.diseases.findMany({
            where: {
                endDate: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1,),
                }

            }
        })
        res.send({ diseases: result });

    } catch (ex) {
        log.error(ex.message);
        res.status(500).send(ex.message);
    }
});

router.post('/get-vaccinations-sum', async (req, res) => {
    try {
        console.log('API: get-vaccinations-sum');
        let result = await prisma.customer.customer({

            where: {
                vaccinations

            }
        })
        res.send({ diseases: result });

    } catch (ex) {
        log.error(ex.message);
        res.status(500).send(ex.message);
    }
});

router.post('/create-isolation', async (req, res) => {
    try {
        console.log('API: create-isolation ', req.body);

        res.send({ result: true });

    } catch (ex) {
        log.error(ex.message);
        res.status(500).send(ex.message);
    }
});
module.exports.router = router;