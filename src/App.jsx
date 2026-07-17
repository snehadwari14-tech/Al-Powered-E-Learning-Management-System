import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Courses from "./components/Courses";
import CourseDetails from "./components/CourseDetails";
import ViewCourses from "./components/ViewCourses";
import AddCourses from "./components/AddCourses";
import LessonPage from "./components/LessonPage";
import AddLesson from "./components/AddLesson";
import MyCourses from "./components/MyCourses";
import Progress from "./components/Progress";
import AddQuiz from "./components/AddQuiz";
import QuizPage from "./components/QuizPage";
import AddAssignment from "./components/AddAssignment";
import AssignmentPage from "./components/AssignmentPage";
import ViewSubmissions from "./components/ViewSubmissions";
import QuizResults from "./components/QuizResults";
import AITutor from "./components/AITutor";
import Cart from "./components/Cart";


const App = () => {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
       <Route path="/dashboard" element={<Dashboard />}></Route>
       <Route path="/profile" element={<Profile />}></Route>
       <Route path="/courses" element={<Courses />}></Route>
       <Route path="/course/:id" element={<CourseDetails />}></Route>
       <Route path="/view-courses" element={<ViewCourses />}></Route>
       <Route path="/add-courses" element={<AddCourses />}></Route>
        <Route path="/lesson-page/:courseId" element={<LessonPage />}></Route>
        <Route path="/add-lesson/:courseId" element={<AddLesson />}></Route>
        <Route path="/my-courses" element={<MyCourses />}></Route>
        <Route path="/progress/:courseId" element={<Progress />}></Route>
        <Route path="/add-quiz/:courseId" element={<AddQuiz/>}></Route>
        <Route path="/quiz/:courseId" element={<QuizPage />}></Route>
        <Route path="/add-assignment/:courseId" element={<AddAssignment />}></Route>
        <Route path="/assignment/:courseId" element={<AssignmentPage />}></Route>
        <Route path="/submissions/:assignmentId" element={<ViewSubmissions />}></Route>
        <Route path="/quiz-results/:courseId" element={<QuizResults />}></Route>
        <Route path="/ai-tutor" element={<AITutor />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
       
       
      </Routes>

      <Footer />

    </BrowserRouter>
  );
};

export default App;