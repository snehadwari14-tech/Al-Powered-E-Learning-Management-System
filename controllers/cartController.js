const Cart =
  require("../models/Cart");



// Add Course To Cart
const addToCart =
  async (req, res) => {

    try {

      const {
        courseId
      } = req.body;

      let cart =
        await Cart.findOne({

          student:
            req.user._id

        });


      // Create cart if it doesn't exist
      if (!cart) {

        cart =
          await Cart.create({

            student:
              req.user._id,

            courses:
              [courseId]

          });

      }

      else {

        // Fix old cart documents
        if (!cart.courses) {

          cart.courses = [];

        }

        // Prevent duplicates
        if (

          !cart.courses.some(

            (course) =>

              course.toString() ===
              courseId

          )

        ) {

          cart.courses.push(
            courseId
          );

          await cart.save();

        }

      }

      res.status(200).json({

        message:
          "Course added to cart"

      });

    }

    catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };



// View Cart
const getCart =
  async (req, res) => {

    try {

      const cart =
        await Cart.findOne({

          student:
            req.user._id

        })

        .populate("courses");


      if (

        !cart ||

        !cart.courses ||

        cart.courses.length === 0

      ) {

        return res.status(200).json([]);

      }

      res.status(200).json(
        cart.courses
      );

    }

    catch (error) {

      res.status(500).json({

        message:
          error.message

      });

    }

  };



// Remove Course From Cart
const removeFromCart =
  async (req, res) => {

    try {

      const cart =
        await Cart.findOne({

          student:
            req.user._id

        });


      if (

        !cart ||

        !cart.courses

      ) {

        return res.status(404).json({

          message:
            "Cart not found"

        });

      }


      cart.courses =
        cart.courses.filter(

          (course) =>

            course.toString()

            !==

            req.params.id

        );


      await cart.save();


      res.status(200).json({

        message:
          "Course removed from cart"

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

  addToCart,

  getCart,

  removeFromCart

};