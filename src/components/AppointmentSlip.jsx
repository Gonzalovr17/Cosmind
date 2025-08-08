import React from 'react';
import { Calendar, Clock, MapPin, Phone, User, FileText, CheckCircle, Download, Home } from 'lucide-react';

const AppointmentSlip = ({ appointmentData, onHome }) => {
  const { doctor, patientName, patientEmail, patientPhone, selectedDate, selectedTime } = appointmentData;

  // Generate appointment ID
  const appointmentId = `MH${Date.now().toString().slice(-6)}`;
  
  // Format date for display
  const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a simple text version for download
    const slipContent = `
MINDCARE - APPOINTMENT CONFIRMATION
================================

Appointment ID: ${appointmentId}
Date: ${formattedDate}
Time: ${selectedTime}

PATIENT INFORMATION:
Name: ${patientName}
Email: ${patientEmail}
Phone: ${patientPhone}

DOCTOR INFORMATION:
${doctor.name}
${doctor.specialization}

LOCATION:
${doctor.hospital}
${doctor.address}
Phone: ${doctor.phone}

IMPORTANT REMINDERS:
- Please arrive 15 minutes early
- Bring a valid ID and insurance card
- Present this slip at reception

For any questions, call: ${doctor.phone}
    `;

    const blob = new Blob([slipContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `appointment-${appointmentId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 py-8 print:py-0 print:bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="text-center mb-8 print:hidden">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 animate-bounce">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h1>
          <p className="text-gray-600">Your mental health appointment has been successfully booked.</p>
        </div>

        {/* Appointment Slip */}
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-8 print:bg-gray-900">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">MINDCARE</h2>
              <p className="text-blue-100">Mental Health Appointment Slip</p>
              <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-lg p-3 inline-block">
                <p className="text-sm">Appointment ID</p>
                <p className="text-xl font-bold">{appointmentId}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Date and Time */}
            <div className="text-center mb-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-center space-x-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="text-lg font-semibold text-gray-900">{formattedDate}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedTime}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Information */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Patient Information
              </h3>
              <div className="bg-gray-50 rounded-xl p-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-semibold text-gray-900">{patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-semibold text-gray-900">{patientEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-semibold text-gray-900">{patientPhone}</span>
                </div>
              </div>
            </div>

            {/* Doctor Information */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-green-600" />
                Healthcare Professional
              </h3>
              <div className="flex items-center bg-gray-50 rounded-xl p-6">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900">{doctor.name}</h4>
                  <p className="text-blue-600 font-medium">{doctor.specialization}</p>
                  <p className="text-gray-600 text-sm">{doctor.experience} experience</p>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-purple-600" />
                Location Details
              </h3>
              <div className="bg-gray-50 rounded-xl p-6 space-y-3">
                <div>
                  <p className="font-semibold text-gray-900">{doctor.hospital}</p>
                  <p className="text-gray-600">{doctor.address}</p>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{doctor.phone}</span>
                </div>
              </div>
            </div>

            {/* QR Code Placeholder */}
            <div className="text-center mb-8">
              <div className="inline-block bg-gray-100 p-6 rounded-xl">
                <div className="w-32 h-32 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center mb-2">
                  <div className="text-xs text-gray-600 text-center">
                    <div className="w-24 h-24 border-2 border-gray-500 rounded grid grid-cols-8 gap-0.5 p-1">
                      {Array.from({ length: 36 }).map((_, i) => (
                        <div key={i} className={`w-full h-full ${Math.random() > 0.5 ? 'bg-gray-600' : 'bg-gray-300'} rounded-sm`} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600">Scan at reception for quick check-in</p>
              </div>
            </div>

            {/* Important Reminders */}
            <div className="mb-8 p-6 border-2 border-dashed border-gray-300 rounded-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Important Reminders:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Please arrive 15 minutes early for check-in and paperwork
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Bring a valid government-issued ID and insurance card (if applicable)
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Present this slip at the reception desk
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Cancellations require 24-hour advance notice
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  For emergencies, call 911 or visit the nearest emergency room
                </li>
              </ul>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-gray-500 border-t pt-6">
              <p>MindCare Mental Health Services</p>
              <p>24/7 Support: +1-800-MINDCARE | www.mindcare.com</p>
              <p className="mt-2">Generated on {new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4 print:hidden">
          <button
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
          >
            <Download className="h-5 w-5" />
            <span>Print Slip</span>
          </button>
          <button
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
          >
            <Download className="h-5 w-5" />
            <span>Download</span>
          </button>
          <button
            onClick={onHome}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSlip;