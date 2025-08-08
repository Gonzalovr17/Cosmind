import React, { useEffect, useState } from 'react';
import { ArrowLeft, Star, MapPin, Phone, Clock, User, RefreshCw } from 'lucide-react';

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    specialization: "Clinical Psychologist",
    hospital: "City Mental Health Center",
    address: "123 Wellness St, Downtown, NY 10001",
    phone: "+1-555-0101",
    experience: "12 years",
    rating: 4.9,
    image: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300",
    availability: ["Mon", "Wed", "Fri"]
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Psychiatrist",
    hospital: "Metropolitan Hospital",
    address: "456 Health Ave, Midtown, NY 10002",
    phone: "+1-555-0102",
    experience: "15 years",
    rating: 4.8,
    image: "https://images.pexels.com/photos/612807/pexels-photo-612807.jpeg?auto=compress&cs=tinysrgb&w=300",
    availability: ["Tue", "Thu", "Sat"]
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialization: "Anxiety Specialist",
    hospital: "Serenity Mental Health Clinic",
    address: "789 Calm Blvd, Uptown, NY 10003",
    phone: "+1-555-0103",
    experience: "10 years",
    rating: 4.7,
    image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300",
    availability: ["Mon", "Tue", "Thu"]
  },
  {
    id: 4,
    name: "Dr. Robert Wilson",
    specialization: "Depression & Mood Disorders",
    hospital: "Hope Recovery Center",
    address: "321 Recovery Rd, Suburbs, NY 10004",
    phone: "+1-555-0104",
    experience: "18 years",
    rating: 4.9,
    image: "https://images.pexels.com/photos/5327647/pexels-photo-5327647.jpeg?auto=compress&cs=tinysrgb&w=300",
    availability: ["Wed", "Fri", "Sat"]
  },
  {
    id: 5,
    name: "Dr. Lisa Thompson",
    specialization: "Stress Management Counselor",
    hospital: "Wellness Psychology Group",
    address: "567 Peaceful Lane, East Side, NY 10005",
    phone: "+1-555-0105",
    experience: "8 years",
    rating: 4.6,
    image: "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=300",
    availability: ["Mon", "Wed", "Fri"]
  },
  {
    id: 6,
    name: "Dr. James Park",
    specialization: "General Mental Health",
    hospital: "Community Health Partners",
    address: "890 Community Dr, West Side, NY 10006",
    phone: "+1-555-0106",
    experience: "14 years",
    rating: 4.8,
    image: "https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=300",
    availability: ["Tue", "Thu", "Sat"]
  }
];

const Results = ({ answers, onDoctorSelect, onRetake }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState(null);

  useEffect(() => {
    // Simulate processing time for better UX
    setTimeout(() => {
      const analysis = {
        anxiety: 0,
        depression: 0,
        stress: 0,
        general: 0
      };

      let totalScore = 0;
      
      answers.forEach(answer => {
        totalScore += answer.answer;
        // Map question IDs to categories for more detailed analysis
        if ([1, 2, 9].includes(answer.questionId)) {
          analysis.anxiety += answer.answer;
        } else if ([3, 4, 10].includes(answer.questionId)) {
          analysis.depression += answer.answer;
        } else if ([5, 6].includes(answer.questionId)) {
          analysis.stress += answer.answer;
        } else {
          analysis.general += answer.answer;
        }
      });

      let severityLevel = '';
      let recommendedDoctors = [];

      if (totalScore <= 7) {
        severityLevel = 'Minimal';
        recommendedDoctors = doctors.filter(d => 
          d.specialization.includes('General') || d.specialization.includes('Counselor')
        ).slice(0, 2);
      } else if (totalScore <= 14) {
        severityLevel = 'Mild';
        recommendedDoctors = doctors.filter(d => 
          d.specialization.includes('Psychologist') || d.specialization.includes('Counselor')
        ).slice(0, 3);
      } else if (totalScore <= 21) {
        severityLevel = 'Moderate';
        if (analysis.anxiety >= analysis.depression && analysis.anxiety >= analysis.stress) {
          recommendedDoctors = doctors.filter(d => d.specialization.includes('Anxiety')).slice(0, 2);
        } else if (analysis.depression >= analysis.stress) {
          recommendedDoctors = doctors.filter(d => d.specialization.includes('Depression')).slice(0, 2);
        } else {
          recommendedDoctors = doctors.filter(d => d.specialization.includes('Stress')).slice(0, 2);
        }
        recommendedDoctors = [...recommendedDoctors, ...doctors.filter(d => d.specialization.includes('Psychiatrist')).slice(0, 1)];
      } else {
        severityLevel = 'Severe';
        recommendedDoctors = doctors.filter(d => 
          d.specialization.includes('Psychiatrist') || d.specialization.includes('Clinical')
        ).slice(0, 4);
      }

      setResults({
        totalScore,
        severityLevel,
        recommendations: recommendedDoctors,
        analysis
      });
      setIsLoading(false);
    }, 2000);
  }, [answers]);

  const getSeverityColor = (level) => {
    switch (level) {
      case 'Minimal': return 'text-green-600 bg-green-100';
      case 'Mild': return 'text-yellow-600 bg-yellow-100';
      case 'Moderate': return 'text-orange-600 bg-orange-100';
      case 'Severe': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRecommendationText = (level) => {
    switch (level) {
      case 'Minimal':
        return "Your assessment indicates minimal symptoms. Consider general wellness counseling or stress management techniques to maintain your mental well-being.";
      case 'Mild':
        return "Your assessment indicates mild symptoms. Speaking with a mental health professional could be beneficial for developing coping strategies and preventing symptoms from worsening.";
      case 'Moderate':
        return "Your assessment indicates moderate symptoms that may be impacting your daily life. It's recommended to schedule an appointment with a mental health professional for proper evaluation and treatment.";
      case 'Severe':
        return "Your assessment indicates severe symptoms that likely require professional attention. Please consider scheduling an urgent appointment with a psychiatrist or mental health professional. If you're in crisis, please contact emergency services.";
      default:
        return "";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <User className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-2">Analyzing Your Responses</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            We're carefully evaluating your assessment to provide personalized recommendations and match you with the right healthcare professionals.
          </p>
        </div>
      </div>
    );
  }

  if (!results) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onRetake}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Retake Assessment</span>
            </button>
            <h1 className="font-semibold text-gray-900">Assessment Results</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Summary */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Assessment Results</h2>
            <div className="flex justify-center items-center space-x-4 mb-6">
              <span className="text-lg text-gray-600">Severity Level:</span>
              <span className={`px-4 py-2 rounded-full font-semibold ${getSeverityColor(results.severityLevel)}`}>
                {results.severityLevel}
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
              {getRecommendationText(results.severityLevel)}
            </p>
          </div>

          {/* Score Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-red-100 p-4 rounded-xl mb-2">
                <div className="text-2xl font-bold text-red-600">{results.analysis.anxiety}</div>
              </div>
              <div className="text-sm font-medium text-gray-700">Anxiety</div>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-xl mb-2">
                <div className="text-2xl font-bold text-blue-600">{results.analysis.depression}</div>
              </div>
              <div className="text-sm font-medium text-gray-700">Mood</div>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 p-4 rounded-xl mb-2">
                <div className="text-2xl font-bold text-yellow-600">{results.analysis.stress}</div>
              </div>
              <div className="text-sm font-medium text-gray-700">Stress</div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-xl mb-2">
                <div className="text-2xl font-bold text-green-600">{results.analysis.general}</div>
              </div>
              <div className="text-sm font-medium text-gray-700">General</div>
            </div>
          </div>
        </div>

        {/* Recommended Healthcare Professionals */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Recommended Healthcare Professionals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.recommendations.map((doctor, index) => (
              <div
                key={doctor.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">{doctor.name}</h4>
                      <p className="text-blue-600 font-medium">{doctor.specialization}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="font-medium mr-2">{doctor.hospital}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{doctor.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{doctor.experience} experience</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium text-gray-700">{doctor.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">(4.9)</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {doctor.availability.map((day) => (
                        <span key={day} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onDoctorSelect(doctor)}
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Crisis Resources */}
        {results.severityLevel === 'Severe' && (
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-xl">
            <h4 className="text-lg font-semibold text-red-800 mb-2">Important Crisis Resources</h4>
            <div className="text-red-700 space-y-2">
              <p><strong>National Suicide Prevention Lifeline:</strong> 988</p>
              <p><strong>Crisis Text Line:</strong> Text HOME to 741741</p>
              <p><strong>Emergency Services:</strong> 911</p>
              <p className="text-sm mt-4">If you're experiencing thoughts of self-harm or suicide, please reach out for immediate help.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;