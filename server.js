const express =
  require("express");

const cors =
  require("cors");

const dotenv =
  require("dotenv");

const path =
  require("path");

dotenv.config();

const authRoutes =
  require("./routes/authRoutes");

const courseRoutes =
  require("./routes/courseRoutes");

const lessonRoutes =
  require("./routes/lessonRoutes");

const enrollmentRoutes =
  require("./routes/enrollmentRoutes");

const progressRoutes =
  require("./routes/progressRoutes");

const quizRoutes =
  require("./routes/quizRoutes");

const assignmentRoutes =
  require("./routes/assignmentRoutes");

const aiRoutes =
  require("./routes/aiRoutes");

const cartRoutes =
  require("./routes/cartRoutes");

const paymentRoutes =
  require("./routes/paymentRoutes");

const connectdb =
  require("./config/db");

const app =
  express();

connectdb();

app.use(cors());

app.use(express.json());


// Make uploads folder public
app.use(

  "/uploads",

  express.static(

    path.join(
      __dirname,
      "uploads"
    )

  )

);


// Routes
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/courses",
  courseRoutes
);

app.use(
  "/api/lessons",
  lessonRoutes
);

app.use(
  "/api/enrollments",
  enrollmentRoutes
);

app.use(
  "/api/progress",
  progressRoutes
);

app.use(
  "/api/quizzes",
  quizRoutes
);

app.use(
  "/api/assignments",
  assignmentRoutes
);

app.use(
  "/api/ai",
  aiRoutes
);

app.use(
  "/api/cart",
  cartRoutes
);

app.use(
  "/api/payment",
  paymentRoutes
);


// Home Route
app.get(

  "/",

  (req, res) => {

    res.send(
      "API is working"
    );

  }

);


const port =
  process.env.PORT || 5000;


app.listen(

  port,

  () => {

    console.log(

      `Server is running on port ${port}`

    );

  }

);