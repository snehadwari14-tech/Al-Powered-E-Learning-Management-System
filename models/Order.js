const mongoose = require("mongoose");

const orderSchema =
new mongoose.Schema(
{
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },

    amount:{
        type:Number
    },

    razorpayOrderId:{
        type:String
    },

    paymentId:{
        type:String
    },

    status:{
        type:String,
        default:"Pending"
    }

},
{
    timestamps:true
}
);

module.exports =
mongoose.model(
"Order",
orderSchema
);