import { Router } from 'express';
export const router=Router()



router.get('/',(req,res)=>{ 

    res.status(200).render('Home')
})


router.get('/realtimeproducts',(req,res)=>{ 
   
    res.status(200).render('productos')
})
