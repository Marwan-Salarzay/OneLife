import express from 'express';
const router = express.Router();
import supabase from '../models/database.js';
import sendOrderEmail from '../public/sendmail.js'

router.get('/users', async (req, res) => {
  try {
    
    const { data, error } = await supabase
      .from('users')
      .select('*');
    
    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send(error.message);
  }
});
router.get('/Products', async (req, res) => {
  try {
    
    const { data, error } = await supabase
      .from('products')
      .select('*');
    
    if (error) throw error;
    
    res.json(data);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send(error.message);
  }
});

router.post('/email',async (req,res)=>{
  try {
    const { orderData } = req.body
    if (!orderData) {
      return res.status(400).json({
        success: false,
        message: "Invalid order data. Please provide complete order information.",
      })
    }
    const emailSent = await sendOrderEmail(orderData.email, orderData)
    res.status(201).json({
      success: true,
      message: "Order processed successfully",
      emailStatus: emailSent ? "Email sent successfully" : "Failed to send email",
    })

  }
   catch (error) {
    console.error("Error processing order:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
})

router.post('/shippingInfo',async (req,res)=>{

  try {
    const { orderData } = req.body
    if (!orderData) {
      return res.status(400).json({
        success: false,
        message: "Invalid order data. Please provide complete order information.",
      })
    }

    const { data, error } = await supabase
  .from('orders')
  .insert([
    { orderid: `${orderData.orderNo}`,
      fullname: `${orderData.firstName} ${orderData.lastName}`,
      email: `${orderData.email}`,
      phone_no: `${orderData.phone}`,
      user_address: `${orderData.address}`,
      city: `${orderData.city}`,
      postalcode:`${orderData.zip}`
    }
  ]);

if (error) {
  console.error('Insert error:', error);
} else {
  console.log('Inserted data:', data);
}

  }
   catch (error) {
    console.error("Error processing order:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
})

// router.post('/cart',async (req,res)=>{

//   try {
//     const { orderData } = req.body
//     if (!orderData) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid order data. Please provide complete order information.",
//       })
//     }

//     const { data, error } = await supabase
//   .from('orders')
//   .insert([
//     { orderid: '',
//       fullname: 'John Doe',
//       email: 123,
//       quantity: 2,
//       total_price: 450,
//       status: 'pending',
//     }
//   ]);

// if (error) {
//   console.error('Insert error:', error);
// } else {
//   console.log('Inserted data:', data);
// }



//   }
//    catch (error) {
//     console.error("Error processing order:", error)
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message,
//     })
//   }
// })


export default router;