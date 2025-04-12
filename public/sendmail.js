import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const sendOrderEmail = async (customerEmail, orderData) => {
  const orderSummaryHtml = generateOrderSummaryHtml(orderData)

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: customerEmail,
    subject: "Order Confirmation - Your Order has been Placed!",
    html: orderSummaryHtml,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log("Email sent successfully!")
    return true
  } catch (error) {
    console.error("Error sending email:", error)
    return false
  }
}

function generateOrderSummaryHtml(orderData) {


  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Summary</title>
</head>
<body style="background-color: #f5f7fa; font-family: 'Poppins', 'Segoe UI', sans-serif; color: #333; padding: 30px;">

  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); overflow: hidden;">
    
    <!-- Header -->
    <div style="background-color: #007BFF; color: white; padding: 20px 30px; text-align: center;">
      <h2 style="margin: 0; font-weight: 600;">Order Confirmation</h2>
      <p style="margin: 5px 0 0; font-size: 14px;">Thank you for your purchase!</p>
    </div>

    <!-- Order Summary -->
    <div style="padding: 30px;">
      <h3 style="margin-top: 0; margin-bottom: 20px; color: #007BFF;">Order Summary</h3>

      <div style="display: flex; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px;">
        <strong>Order Number:</strong>
        <span>${orderData.orderNo}</span>
      </div>

      <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
        <strong>Order Date:</strong>
        <span>${orderData.orderDate}</span>
      </div>

      <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
        <strong>Estimated Delivery:</strong>
        <span>${orderData.newDate}</span>
      </div>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 25px 0;">

      <h3 style="margin-top: 0; margin-bottom: 20px; color: #007BFF;">Customer Details</h3>

      <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
        <strong>Full Name:</strong>
        <span>${orderData.firstName} ${orderData.lastName}</span>
      </div>

      <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
        <strong>Email:</strong>
        <span>${orderData.email}</span>
      </div>

      <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
        <strong>Phone No:</strong>
        <span>${orderData.phone}</span>
      </div>

      <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
        <strong>Shipping Address:</strong>
        <span>${orderData.city}, ${orderData.address}</span>
      </div>

      <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
        <strong>Postal Code:</strong>
        <span>${orderData.zip}</span>
      </div>

      <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
        <strong>Payment Method:</strong>
        <span>${orderData.shippingMethod}</span>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #f0f4f8; padding: 15px 30px; text-align: center; font-size: 12px; color: #777;">
      If you have any questions, contact us at support@example.com
    </div>

  </div>

</body>
</html>
`
}

export default sendOrderEmail