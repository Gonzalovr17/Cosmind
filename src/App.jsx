// import React, { useState } from 'react';
// import { Brain, Heart, Users, Clock, MapPin, Phone } from 'lucide-react';
// import Quiz from './components/Quiz';
// import Results from './components/Results';
// import BookingForm from './components/BookingForm';
// import AppointmentSlip from './components/AppointmentSlip';
// import RiveHero from './components/RiveHero/RiveHero'
// import NumberPreloader from './components/NumberPreLoader/NumberPreLoader';
// import MentalHealthLanding from './components/MentalHealthLanding/MentalHeadingLanding';

// function App() {
//   const [startnow, setstartnow] = useState(false)
//   const [showRiveHero, setShowRiveHero] = useState(false);
//   const [currentState, setCurrentState] = useState('home');
//   const [quizAnswers, setQuizAnswers] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [appointmentData, setAppointmentData] = useState(null);

//   const resetApp = () => {
//     setCurrentState('home');
//     setQuizAnswers([]);
//     setSelectedDoctor(null);
//     setAppointmentData(null);
//   };

//   if (currentState === 'quiz') {
//     return (
//       <Quiz
//         onComplete={(answers) => {
//           setQuizAnswers(answers);
//           setCurrentState('results');
//         }}
//         onBack={() => setCurrentState('home')}
//       />
//     );
//   }

//   if (currentState === 'results') {
//     return (
//       <Results
//         answers={quizAnswers}
//         onDoctorSelect={(doctor) => {
//           setSelectedDoctor(doctor);
//           setCurrentState('booking');
//         }}
//         onRetake={() => setCurrentState('quiz')}
//       />
//     );
//   }

//   if (currentState === 'booking' && selectedDoctor) {
//     return (
//       <BookingForm
//         doctor={selectedDoctor}
//         onComplete={(data) => {
//           setAppointmentData(data);
//           setCurrentState('slip');
//         }}
//         onBack={() => setCurrentState('results')}
//       />
//     );
//   }

//   if (currentState === 'slip' && appointmentData) {
//     return (
//       <AppointmentSlip
//         appointmentData={appointmentData}
//         onHome={resetApp}
//       />
//     );
//   }

//   return (
//     <>
//       {!showRiveHero && <NumberPreloader onComplete={() => setShowRiveHero(true)} />}
//       {showRiveHero && (
//         !startnow ? (
//           <RiveHero setstartnow={setstartnow} />
//         ) : (
//           <MentalHealthLanding setCurrentState={setCurrentState}/>

//           // <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">

//           //   <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
//           //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           //       <div className="flex items-center justify-between">
//           //         <div className="flex items-center space-x-2">
//           //           <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl">
//           //             <Brain className="h-8 w-8 text-white" />
//           //           </div>
//           //           <div>
//           //             <h1 className="text-xl font-bold text-gray-900">MindCare</h1>
//           //             <p className="text-sm text-gray-600">Mental Health Assessment</p>
//           //           </div>
//           //         </div>
//           //         <div className="flex items-center space-x-4">
//           //           <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
//           //             <Phone className="h-4 w-4" />
//           //             <span>24/7 Support: +1-800-MINDCARE</span>
//           //           </div>
//           //         </div>
//           //       </div>
//           //     </div>
//           //   </header>


//           //   <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           //     <div className="text-center mb-16">
//           //       <div className="animate-fade-in">
//           //         <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
//           //           Take Care of Your
//           //           <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 block">
//           //             Mental Health
//           //           </span>
//           //         </h2>
//           //         <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
//           //           Complete our comprehensive mental health assessment to get personalized recommendations
//           //           and connect with qualified healthcare professionals.
//           //         </p>
//           //       </div>

//           //       <div className="animate-slide-up">
//           //         <button
//           //           onClick={() => setCurrentState('quiz')}
//           //           className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
//           //         >
//           //           Start Assessment
//           //         </button>
//           //       </div>
//           //     </div>


//           //     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
//           //       <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//           //         <div className="bg-blue-100 p-4 rounded-xl w-fit mx-auto mb-6">
//           //           <Heart className="h-8 w-8 text-blue-600" />
//           //         </div>
//           //         <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
//           //           Professional Assessment
//           //         </h3>
//           //         <p className="text-gray-600 text-center leading-relaxed">
//           //           Evidence-based mental health screening tools designed by licensed professionals to accurately assess your well-being.
//           //         </p>
//           //       </div>

//           //       <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//           //         <div className="bg-green-100 p-4 rounded-xl w-fit mx-auto mb-6">
//           //           <Users className="h-8 w-8 text-green-600" />
//           //         </div>
//           //         <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
//           //           Expert Matching
//           //         </h3>
//           //         <p className="text-gray-600 text-center leading-relaxed">
//           //           Get matched with qualified psychiatrists, psychologists, and counselors based on your specific needs and location.
//           //         </p>
//           //       </div>

//           //       <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//           //         <div className="bg-purple-100 p-4 rounded-xl w-fit mx-auto mb-6">
//           //           <Clock className="h-8 w-8 text-purple-600" />
//           //         </div>
//           //         <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
//           //           Quick Booking
//           //         </h3>
//           //         <p className="text-gray-600 text-center leading-relaxed">
//           //           Schedule appointments seamlessly and receive digital appointment slips for easy check-in at healthcare facilities.
//           //         </p>
//           //       </div>
//           //     </div>


//           //     <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
//           //       <div className="text-center">
//           //         <h3 className="text-2xl font-bold text-gray-900 mb-4">
//           //           Your Mental Health Matters
//           //         </h3>
//           //         <p className="text-gray-600 leading-relaxed max-w-4xl mx-auto">
//           //           Mental health is just as important as physical health. Our assessment takes about 10-15 minutes
//           //           and covers areas like mood, anxiety, stress, and overall well-being. All information is kept strictly
//           //           confidential and is used only to provide you with the best possible care recommendations.
//           //         </p>
//           //         <div className="mt-8 flex flex-wrap justify-center gap-4">
//           //           <div className="flex items-center space-x-2 text-sm text-gray-600">
//           //             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//           //             <span>Confidential & Secure</span>
//           //           </div>
//           //           <div className="flex items-center space-x-2 text-sm text-gray-600">
//           //             <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//           //             <span>Professional Network</span>
//           //           </div>
//           //           <div className="flex items-center space-x-2 text-sm text-gray-600">
//           //             <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//           //             <span>24/7 Support Available</span>
//           //           </div>
//           //         </div>
//           //       </div>
//           //     </div>
//           //   </main>


//           //   <footer className="bg-gray-900 text-white mt-20">
//           //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           //       <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           //         <div className="col-span-1">
//           //           <div className="flex items-center space-x-2 mb-4">
//           //             <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl">
//           //               <Brain className="h-6 w-6 text-white" />
//           //             </div>
//           //             <span className="font-bold text-lg">MindCare</span>
//           //           </div>
//           //           <p className="text-gray-400 text-sm leading-relaxed">
//           //             Connecting you with mental health professionals for better well-being.
//           //           </p>
//           //         </div>
//           //         <div>
//           //           <h4 className="font-semibold mb-4">Quick Links</h4>
//           //           <ul className="space-y-2 text-sm text-gray-400">
//           //             <li><a href="#" className="hover:text-white transition-colors">Mental Health Resources</a></li>
//           //             <li><a href="#" className="hover:text-white transition-colors">Find a Therapist</a></li>
//           //             <li><a href="#" className="hover:text-white transition-colors">Crisis Support</a></li>
//           //             <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
//           //           </ul>
//           //         </div>
//           //         <div>
//           //           <h4 className="font-semibold mb-4">Support</h4>
//           //           <ul className="space-y-2 text-sm text-gray-400">
//           //             <li><a href="#" className="hover:text-white transition-colors">24/7 Helpline</a></li>
//           //             <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
//           //             <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
//           //             <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
//           //           </ul>
//           //         </div>
//           //         <div>
//           //           <h4 className="font-semibold mb-4">Emergency</h4>
//           //           <div className="text-sm text-gray-400 space-y-2">
//           //             <p>Crisis Hotline: <br />
//           //               <span className="text-white font-semibold">988</span>
//           //             </p>
//           //             <p>Emergency: <br />
//           //               <span className="text-white font-semibold">911</span>
//           //             </p>
//           //           </div>
//           //         </div>
//           //       </div>
//           //       <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
//           //         <p>&copy; 2024 MindCare. All rights reserved. Your mental health is our priority.</p>
//           //       </div>
//           //     </div>
//           //   </footer>
//           // </div>
//         )
//       )}

//       {/* {!startnow ? <RiveHero setstartnow={setstartnow} /> :
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">

//           <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-2">
//                   <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl">
//                     <Brain className="h-8 w-8 text-white" />
//                   </div>
//                   <div>
//                     <h1 className="text-xl font-bold text-gray-900">MindCare</h1>
//                     <p className="text-sm text-gray-600">Mental Health Assessment</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
//                     <Phone className="h-4 w-4" />
//                     <span>24/7 Support: +1-800-MINDCARE</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </header>


//           <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//             <div className="text-center mb-16">
//               <div className="animate-fade-in">
//                 <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
//                   Take Care of Your
//                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 block">
//                     Mental Health
//                   </span>
//                 </h2>
//                 <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
//                   Complete our comprehensive mental health assessment to get personalized recommendations
//                   and connect with qualified healthcare professionals.
//                 </p>
//               </div>

//               <div className="animate-slide-up">
//                 <button
//                   onClick={() => setCurrentState('quiz')}
//                   className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
//                 >
//                   Start Assessment
//                 </button>
//               </div>
//             </div>


//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
//               <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//                 <div className="bg-blue-100 p-4 rounded-xl w-fit mx-auto mb-6">
//                   <Heart className="h-8 w-8 text-blue-600" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
//                   Professional Assessment
//                 </h3>
//                 <p className="text-gray-600 text-center leading-relaxed">
//                   Evidence-based mental health screening tools designed by licensed professionals to accurately assess your well-being.
//                 </p>
//               </div>

//               <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//                 <div className="bg-green-100 p-4 rounded-xl w-fit mx-auto mb-6">
//                   <Users className="h-8 w-8 text-green-600" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
//                   Expert Matching
//                 </h3>
//                 <p className="text-gray-600 text-center leading-relaxed">
//                   Get matched with qualified psychiatrists, psychologists, and counselors based on your specific needs and location.
//                 </p>
//               </div>

//               <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//                 <div className="bg-purple-100 p-4 rounded-xl w-fit mx-auto mb-6">
//                   <Clock className="h-8 w-8 text-purple-600" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
//                   Quick Booking
//                 </h3>
//                 <p className="text-gray-600 text-center leading-relaxed">
//                   Schedule appointments seamlessly and receive digital appointment slips for easy check-in at healthcare facilities.
//                 </p>
//               </div>
//             </div>


//             <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
//               <div className="text-center">
//                 <h3 className="text-2xl font-bold text-gray-900 mb-4">
//                   Your Mental Health Matters
//                 </h3>
//                 <p className="text-gray-600 leading-relaxed max-w-4xl mx-auto">
//                   Mental health is just as important as physical health. Our assessment takes about 10-15 minutes
//                   and covers areas like mood, anxiety, stress, and overall well-being. All information is kept strictly
//                   confidential and is used only to provide you with the best possible care recommendations.
//                 </p>
//                 <div className="mt-8 flex flex-wrap justify-center gap-4">
//                   <div className="flex items-center space-x-2 text-sm text-gray-600">
//                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                     <span>Confidential & Secure</span>
//                   </div>
//                   <div className="flex items-center space-x-2 text-sm text-gray-600">
//                     <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                     <span>Professional Network</span>
//                   </div>
//                   <div className="flex items-center space-x-2 text-sm text-gray-600">
//                     <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                     <span>24/7 Support Available</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </main>


//           <footer className="bg-gray-900 text-white mt-20">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//                 <div className="col-span-1">
//                   <div className="flex items-center space-x-2 mb-4">
//                     <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl">
//                       <Brain className="h-6 w-6 text-white" />
//                     </div>
//                     <span className="font-bold text-lg">MindCare</span>
//                   </div>
//                   <p className="text-gray-400 text-sm leading-relaxed">
//                     Connecting you with mental health professionals for better well-being.
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold mb-4">Quick Links</h4>
//                   <ul className="space-y-2 text-sm text-gray-400">
//                     <li><a href="#" className="hover:text-white transition-colors">Mental Health Resources</a></li>
//                     <li><a href="#" className="hover:text-white transition-colors">Find a Therapist</a></li>
//                     <li><a href="#" className="hover:text-white transition-colors">Crisis Support</a></li>
//                     <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
//                   </ul>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold mb-4">Support</h4>
//                   <ul className="space-y-2 text-sm text-gray-400">
//                     <li><a href="#" className="hover:text-white transition-colors">24/7 Helpline</a></li>
//                     <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
//                     <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
//                     <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
//                   </ul>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold mb-4">Emergency</h4>
//                   <div className="text-sm text-gray-400 space-y-2">
//                     <p>Crisis Hotline: <br />
//                       <span className="text-white font-semibold">988</span>
//                     </p>
//                     <p>Emergency: <br />
//                       <span className="text-white font-semibold">911</span>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
//                 <p>&copy; 2024 MindCare. All rights reserved. Your mental health is our priority.</p>
//               </div>
//             </div>
//           </footer>
//         </div>
//       } */}
//     </>
//   );
// }

// export default App;



import React, { useEffect, useState } from 'react';
import { Brain, Heart, Users, Clock, MapPin, Phone } from 'lucide-react';
import RiveHero from './components/RiveHero/RiveHero'
import NumberPreloader from './components/NumberPreLoader/NumberPreLoader';
import MentalHealthLanding from './components/MentalHealthLanding/MentalHeadingLanding';
import QuizComponent from './components/QuizComponent'
import ResultsScreen from './components/ResultsScreen'
import VideoSection from './components/VideoSection'
import { quizzes } from '../src/data/quizzes';

function App() {
  const [startnow, setstartnow] = useState(false)
  const [showRiveHero, setShowRiveHero] = useState(false);
  const [currentState, setCurrentState] = useState('home');
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [mixedQuiz, setMixedQuiz] = useState(null);
  const [results, setResults] = useState([]);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 700);



   useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 700);
    }

    window.addEventListener("resize", handleResize);

    // Clean up listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    createMixedQuiz()
    // console.log(results[0]?.categoryScores || {})
  }, [currentState])


  const createMixedQuiz = () => {
    // Get all questions from all quizzes
    const allQuestions = [];
    quizzes.forEach(quiz => {
      quiz.questions.forEach(question => {
        allQuestions.push({
          ...question,
          sourceQuiz: quiz.id,
          sourceQuizTitle: quiz.title,
          sourceQuizIcon: quiz.icon,
          sourceQuizColor: quiz.color
        });
      });
    });

    // Shuffle and take 10 questions
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 10);

    // Create mixed quiz object
    const mixed = {
      id: 'mixed',
      title: 'Mixed Mental Health Assessment',
      description: 'A comprehensive 10-question assessment covering multiple areas',
      icon: 'brain',
      color: 'purple',
      questions: selectedQuestions
    };

    setMixedQuiz(mixed);
    // setCurrentState('quiz');
  };

  const handleQuizComplete = (result) => {
    setResults([result]);
    setCurrentState('results');
  };

  const handleBackToWelcome = () => {
    setMixedQuiz(null);
    setCurrentState('home');
  };

  const handleStartOver = () => {
    setMixedQuiz(null);
    setResults([]);
    setCurrentState('home');
  };

  const resetApp = () => {
    setCurrentState('home');
    setQuizAnswers([]);
    setSelectedDoctor(null);
    setAppointmentData(null);
  };

  if (currentState === 'quiz') {
    return (
      <QuizComponent
        quiz={mixedQuiz}
        onComplete={handleQuizComplete}
        onBack={handleBackToWelcome}
      />
    );
  }

  if (currentState === 'welcome') {
    return (
      <MentalHealthLanding 
      setCurrentState={setCurrentState}
      />
    );
  }

  if (currentState === 'results') {
    return (
      <ResultsScreen
        results={results}
        scoreData={results[0]?.categoryScores || {}}
        onBack={setCurrentState}
        onStartOver={handleStartOver}
      />
    );
  }
  if (currentState === 'videos') {
    return (
      <VideoSection 
      onBack={setCurrentState}
      />
    );
  }

  if (currentState === 'booking' && selectedDoctor) {
    return (
      <BookingForm
        doctor={selectedDoctor}
        onComplete={(data) => {
          setAppointmentData(data);
          setCurrentState('slip');
        }}
        onBack={() => setCurrentState('results')}
      />
    );
  }

  if (currentState === 'slip' && appointmentData) {
    return (
      <AppointmentSlip
        appointmentData={appointmentData}
        onHome={resetApp}
      />
    );
  }

  return (
    <>
      {!showRiveHero && <NumberPreloader onComplete={() => setShowRiveHero(true)} />}
      {showRiveHero && (
        isDesktop
          ? (!startnow ? (
              <RiveHero setstartnow={setstartnow} />
            ) : (
              <MentalHealthLanding setCurrentState={setCurrentState} />
            ))
          : (
            <MentalHealthLanding setCurrentState={setCurrentState} />
          )
      )}
    </>
  );
}

export default App;