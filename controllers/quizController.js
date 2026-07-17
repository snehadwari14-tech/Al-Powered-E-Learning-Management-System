const Quiz =
require("../models/Quiz");

const QuizResult =
require("../models/QuizResult");

// Create Quiz
const createQuiz =
async (req, res) => {


try {

  const {
    title,
    course,
    questions
  } = req.body;


  let quiz =
    await Quiz.findOne({
      course
    });


  if (quiz) {

    // Add new questions to existing quiz
    quiz.questions.push(
      ...questions
    );

    await quiz.save();

  }

  else {

    // Create new quiz
    quiz =
      await Quiz.create({

        title,

        course,

        questions

      });

  }


  res.status(201).json(
    quiz
  );

}

catch (error) {

  res.status(500).json({

    message:
      error.message

  });

}


};

// Get Quiz By Course ID
const getQuiz =
async (req, res) => {


try {

  const quiz =
    await Quiz.findOne({

      course:
        req.params.id

    });

  if (!quiz) {

    return res.status(404).json({

      message:
        "Quiz not found"

    });

  }

  res.status(200).json(
    quiz
  );

}

catch (error) {

  res.status(500).json({

    message:
      error.message

  });

}


};

// Submit Quiz
const submitQuiz =
async (req, res) => {


try {

  const {

    quizId,

    answers

  } = req.body;

  const quiz =
    await Quiz.findById(
      quizId
    );

  if (!quiz) {

    return res.status(404).json({

      message:
        "Quiz not found"

    });

  }

  let score = 0;

  quiz.questions.forEach(

    (
      question,
      index
    ) => {

      if (

        answers[index] ===
        question.correctAnswer

      ) {

        score++;

      }

    }

  );

  const percentage =

    (
      score /
      quiz.questions.length
    ) * 100;


  await QuizResult.create({

    student:
      req.user._id,

    quiz:
      quiz._id,

    course:
      quiz.course,

    score,

    totalQuestions:
      quiz.questions.length,

    percentage

  });


  res.status(200).json({

    score,

    total:
      quiz.questions.length,

    percentage

  });

}

catch (error) {

  res.status(500).json({

    message:
      error.message

  });

}


};

// Get Quiz Results By Course ID
const getQuizResults =
async (req, res) => {


try {

  const results =
    await QuizResult.find({

      course:
        req.params.courseId

    })

    .populate(
      "student",
      "name email"
    );

  res.status(200).json(
    results
  );

}

catch (error) {

  res.status(500).json({

    message:
      error.message

  });

}


};

module.exports = {

createQuiz,

getQuiz,

submitQuiz,

getQuizResults

};