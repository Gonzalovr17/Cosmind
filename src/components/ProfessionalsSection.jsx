import React, { useState } from 'react';
import { Star, MapPin, Clock, DollarSign, Calendar, User, Award, Languages, ChevronRight } from 'lucide-react';
import { healthcareProfessionals } from '../data/professionals';
import BookingModal from './BookingModal';

const ProfessionalsSection = ({relevantDoctors}) => {
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  const handleBookAppointment = (professional) => {
    setSelectedProfessional(professional);
    setShowBooking(true);
  };

  const handleCloseBooking = () => {
    setShowBooking(false);
    setSelectedProfessional(null);
  };

  // return (
  //   <div className="relative py-16 px-4 overflow-hidden">
  //     {/* Professionals Section Container */}
  //     <div className="relative py-16 px-4 overflow-hidden">
  //       <div className="max-w-6xl mx-auto">

  //         {/* Header */}
  //         <div className="text-center mb-12 animate-fade-in relative z-10">
  //           <h2 className="text-4xl md:text-5xl font-bold text-gray-200 mb-4 drop-shadow-md">
  //             Recommended Healthcare Professionals
  //           </h2>
  //           <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
  //             Connect with qualified mental health professionals who can provide personalized support and guidance on your wellness journey.
  //           </p>
  //         </div>

  //         {/* Professionals Grid */}
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
  //           {healthcareProfessionals.map((professional, index) => (
  //             <div
  //               key={professional.id}
  //               className="bg-gray-900/80 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 overflow-hidden animate-slide-up border border-gray-700"
  //               style={{ animationDelay: `${index * 200}ms` }}
  //             >
  //               {/* Card Header */}
  //               <div className="relative p-6 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-gray-100">
  //                 {/* Decorative circles */}
  //                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
  //                 <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

  //                 <div className="relative z-10 flex items-start space-x-4">
  //                   <img
  //                     src={professional.image}
  //                     alt={professional.name}
  //                     className="w-20 h-20 rounded-2xl object-cover border-4 border-white/20 shadow-lg"
  //                   />
  //                   <div className="flex-1 min-w-0">
  //                     <h3 className="text-2xl font-bold text-gray-200 mb-1">{professional.name}</h3>
  //                     <p className="text-gray-400 font-semibold mb-2">{professional.title}</p>
  //                     <div className="flex items-center space-x-4 text-sm">
  //                       <div className="flex items-center space-x-1">
  //                         <Star className="w-4 h-4 text-yellow-300 fill-current" />
  //                         <span className="font-semibold">{professional.rating}</span>
  //                         <span className="text-gray-400">({professional.reviews} reviews)</span>
  //                       </div>
  //                       <div className="flex items-center space-x-1">
  //                         <Award className="w-4 h-4 text-gray-400" />
  //                         <span>{professional.experience}</span>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>

  //               {/* Card Body */}
  //               <div className="p-6">
  //                 {/* Specialization */}
  //                 <div className="mb-4">
  //                   <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 mb-3 border border-gray-700">
  //                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-gentle-pulse"></div>
  //                     <span className="text-gray-300 font-semibold text-sm">{professional.specialization}</span>
  //                   </div>
  //                   <p className="text-gray-400 leading-relaxed">{professional.bio}</p>
  //                 </div>

  //                 {/* Info Grid */}
  //                 <div className="grid grid-cols-2 gap-4 mb-6">
  //                   <div className="bg-gray-800/60 rounded-2xl p-4 border border-gray-700">
  //                     <div className="flex items-center space-x-2 mb-2">
  //                       <DollarSign className="w-5 h-5 text-gray-300" />
  //                       <span className="font-semibold text-gray-200">Consultation</span>
  //                     </div>
  //                     <p className="text-gray-100 font-bold text-lg">${professional.consultationFee}</p>
  //                   </div>

  //                   <div className="bg-gray-800/60 rounded-2xl p-4 border border-gray-700">
  //                     <div className="flex items-center space-x-2 mb-2">
  //                       <MapPin className="w-5 h-5 text-gray-300" />
  //                       <span className="font-semibold text-gray-200">Location</span>
  //                     </div>
  //                     <p className="text-gray-400 text-sm font-medium">{professional.location}</p>
  //                   </div>
  //                 </div>

  //                 {/* Languages */}
  //                 <div className="mb-6">
  //                   <div className="flex items-center space-x-2 mb-2">
  //                     <Languages className="w-5 h-5 text-gray-300" />
  //                     <span className="font-semibold text-gray-200">Languages</span>
  //                   </div>
  //                   <div className="flex flex-wrap gap-2">
  //                     {professional.languages.map((language, idx) => (
  //                       <span
  //                         key={idx}
  //                         className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-sm font-medium border border-gray-700"
  //                       >
  //                         {language}
  //                       </span>
  //                     ))}
  //                   </div>
  //                 </div>

  //                 {/* Credentials */}
  //                 <div className="mb-6">
  //                   <h4 className="font-semibold text-gray-200 mb-2 flex items-center space-x-2">
  //                     <Award className="w-5 h-5 text-gray-300" />
  //                     <span>Credentials</span>
  //                   </h4>
  //                   <div className="space-y-1">
  //                     {professional.credentials.map((credential, idx) => (
  //                       <div key={idx} className="flex items-center space-x-2">
  //                         <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
  //                         <span className="text-gray-400 text-sm">{credential}</span>
  //                       </div>
  //                     ))}
  //                   </div>
  //                 </div>

  //                 {/* Book Appointment */}
  //                 <button
  //                   onClick={() => handleBookAppointment(professional)}
  //                   className="w-full bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 animate-soft-glow"
  //                 >
  //                   <Calendar className="w-5 h-5" />
  //                   <span>Book Appointment</span>
  //                   <ChevronRight className="w-5 h-5" />
  //                 </button>
  //               </div>
  //             </div>
  //           ))}
  //         </div>

  //         {/* Additional Info */}
  //         <div className="mt-12 text-center animate-fade-in relative z-10">
  //           <div className="bg-gray-900/60 backdrop-blur-md border-l-4 border-gray-700 rounded-2xl p-6 max-w-4xl mx-auto shadow-lg">
  //             <div className="flex items-start">
  //               <div className="bg-gray-700 rounded-full p-2 mr-4 mt-1 flex-shrink-0">
  //                 <User className="w-6 h-6 text-gray-200" />
  //               </div>
  //               <div className="text-left">
  //                 <h3 className="font-bold text-gray-200 mb-2 text-lg">Professional Support Available</h3>
  //                 <p className="text-gray-400 leading-relaxed">
  //                   All listed professionals are licensed and experienced in their respective fields.
  //                   Appointments are available both in-person and via telehealth. Insurance coverage may apply —
  //                   please check with your provider and the professional's office for details.
  //                 </p>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Booking Modal */}
  //     {showBooking && selectedProfessional && (
  //       <BookingModal
  //         professional={selectedProfessional}
  //         onClose={handleCloseBooking}
  //       />
  //     )}
  //   </div>
  // );

  return (
    <div className="relative py-16 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12 animate-fade-in relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-200 mb-4 drop-shadow-md">
            Recommended Healthcare Professionals
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Connect with qualified mental health professionals who can provide personalized support and guidance on your wellness journey.
          </p>
        </div>

        {/* Professionals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {relevantDoctors.map((professional, index) => (
            <div
              key={professional.id}
              className="bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-400 transform hover:scale-105 overflow-hidden border border-gray-700"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Card Header */}
              <div className="relative p-4 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-gray-100">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>

                <div className="relative z-10 flex items-start space-x-3">
                  <img
                    src={professional.image}
                    alt={professional.name}
                    className="w-16 h-16 rounded-xl object-cover border-4 border-white/20 shadow-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-200 mb-1">{professional.name}</h3>
                    <p className="text-gray-400 text-sm font-semibold mb-1">{professional.title}</p>
                    <div className="flex items-center space-x-3 text-xs">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3.5 h-3.5 text-yellow-300 fill-current" />
                        <span className="font-semibold">{professional.rating}</span>
                        <span className="text-gray-400">({professional.reviews})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Award className="w-3.5 h-3.5 text-gray-400" />
                        <span>{professional.experience}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4">
                {/* Specialization */}
                <div className="mb-3">
                  <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1 mb-2 border border-gray-700">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-gentle-pulse"></div>
                    <span className="text-gray-300 font-semibold text-xs">{professional.specialization}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{professional.bio}</p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-800/60 rounded-xl p-3 border border-gray-700">
                    <div className="flex items-center space-x-2 mb-1">
                      <DollarSign className="w-4 h-4 text-gray-300" />
                      <span className="font-semibold text-gray-200 text-sm">Consultation</span>
                    </div>
                    <p className="text-gray-100 font-bold text-sm">${professional.consultationFee}</p>
                  </div>

                  <div className="bg-gray-800/60 rounded-xl p-3 border border-gray-700">
                    <div className="flex items-center space-x-2 mb-1">
                      <MapPin className="w-4 h-4 text-gray-300" />
                      <span className="font-semibold text-gray-200 text-sm">Location</span>
                    </div>
                    <p className="text-gray-400 text-xs font-medium">{professional.location}</p>
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <Languages className="w-4 h-4 text-gray-300" />
                    <span className="font-semibold text-gray-200 text-sm">Languages</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {professional.languages.map((language, idx) => (
                      <span
                        key={idx}
                        className="bg-white/10 text-gray-300 px-2 py-0.5 rounded-full text-xs font-medium border border-gray-700"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Credentials */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-200 mb-1 text-sm flex items-center space-x-2">
                    <Award className="w-4 h-4 text-gray-300" />
                    <span>Credentials</span>
                  </h4>
                  <div className="space-y-0.5">
                    {professional.credentials.map((credential, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                        <span className="text-gray-400 text-xs">{credential}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Book Appointment */}
                <button
                  onClick={() => handleBookAppointment(professional)}
                  className="w-full bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 text-white font-bold py-2.5 px-4 rounded-xl transition-all duration-400 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 animate-soft-glow text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="w-full px-4 md:px-0 mt-12 animate-fade-in relative z-10">
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-l-4 border-gray-600 rounded-xl p-4 shadow-md max-w-full mx-auto">
            <div className="flex items-start">
              <div className="bg-gray-700 rounded-full p-1.5 mr-3 mt-0.5 flex-shrink-0">
                <User className="w-5 h-5 text-gray-200 drop-shadow-sm" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-300 mb-2 text-base drop-shadow-sm">
                  Professional Support Available
                </h3>
                <p className="text-gray-400 text-sm leading-snug drop-shadow-sm">
                  All listed professionals are licensed and experienced in their respective fields.
                  Appointments are available both in-person and via telehealth. Insurance coverage may apply —
                  please check with your provider and the professional's office for details.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Booking Modal */}
      {showBooking && selectedProfessional && (
        <BookingModal
          professional={selectedProfessional}
          onClose={handleCloseBooking}
        />
      )}
    </div>
  );

};

export default ProfessionalsSection;