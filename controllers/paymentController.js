const Razorpay =
  require("razorpay");

const Order =
  require("../models/Order");

const Course =
  require("../models/Course");


// Razorpay Instance
const razorpay =
  new Razorpay({

    key_id:
      process.env.RAZORPAY_KEY_ID,

    key_secret:
      process.env.RAZORPAY_KEY_SECRET

  });


// Create Order
const createOrder =
  async (req, res) => {

    try {

      const {
        courseId
      } = req.body;


      // Find Course
      const course =
        await Course.findById(
          courseId
        );

      if (!course) {

        return res.status(404).json({

          message:
            "Course not found"

        });

      }


      // Razorpay Order
      const options = {

        amount:
          course.price * 100,

        currency:
          "INR"

      };


      const razorpayOrder =
        await razorpay.orders.create(
          options
        );


      // Save Order in MongoDB
      const order =
        await Order.create({

          student:
            req.user._id,

          course:
            course._id,

          amount:
            course.price,

          razorpayOrderId:
            razorpayOrder.id,

          status:
            "Pending"

        });


      res.status(200).json({

        success: true,

        key:
          process.env.RAZORPAY_KEY_ID,

        order

      });

    }

    catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };



// Verify Payment
const verifyPayment =
  async (req, res) => {

    try {

      const {

        razorpay_payment_id,

        razorpay_order_id

      } = req.body;


      // Find Order
      const order =
        await Order.findOne({

          razorpayOrderId:
            razorpay_order_id

        });


      if (!order) {

        return res.status(404).json({

          message:
            "Order not found"

        });

      }


      // Update Order
      order.paymentId =
        razorpay_payment_id;

      order.status =
        "Success";

      await order.save();


      res.status(200).json({

        message:
          "Payment Successful"

      });

    }

    catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };



module.exports = {

  createOrder,

  verifyPayment

};