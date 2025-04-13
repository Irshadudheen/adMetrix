import {Request, Response, Router} from 'express'

import { createAdValidate } from '../../validators/createAdValidate'
import { validateRequest } from '../../middlewares/validateRequest'
import { Advertise } from '../../models/advertise'
import { BadRequestError } from '../../errors/bad-request-error'
import { instance } from '../../payment_gateway/razorpay'
import { Order } from '../../models/order'
const router =Router()
router.post('/api/advertise',createAdValidate,validateRequest,
    async (req:Request,res:Response)=>{
        const {userId,
        companyName,
        companyWebsite,
        contactName,contactEmail,
        contactPhone,adDescription,adImage,
        targetAudience,advertisPlan} = req.body
        // const existingAdvertiseCount = await Advertise.countDocuments(); 
        // if(existingAdvertiseCount >100) {
        //    throw new BadRequestError('Advertise limit reached')
        // }
        const order = Order.build({userId,orderData:req.body,totalPrice:4000,createAt:new Date,status:'pending'})
        await order.save()
        // const advertise = Advertise.build({
        //     userId,
        //     companyName,
        //     companyWebsite,
        //     contactName,
        //     contactEmail,
        //     contactPhone,
        //     adDescription,
        //     adImage,
        //     targetAudience,
        //     advertisPlan,
        //     clicks:0,
        //     createdAt:new Date,
        //     expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now,,
        // })
       
        // await advertise.save()
       const razorpayOrder=await instance.orders.create({
            amount:4000,
            currency:"INR",
            receipt:order.id
        })
        res.status(201).send(razorpayOrder)
    }
)
export { router as createAdvertiseRouter}