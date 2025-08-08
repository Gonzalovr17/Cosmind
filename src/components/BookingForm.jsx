import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, User, Mail, Phone, FileText, CheckCircle } from 'lucide-react';

const BookingForm = ({ doctor, onComplete, onBack }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    selectedDate: '',
    selectedTime: '',
    symptoms: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate available time slots
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  // Generate next 14 days excluding weekends for simplicity
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    let currentDate = new Date(today);
    currentDate.setDate(currentDate.getDate() + 1); // Start from tomorrow

    for (let i = 0; i < 21; i++) {
      const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
      if (doctor.availability.includes(dayName)) {
        dates.push({
          value: currentDate.toISOString().split('T')[0],
          label: currentDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        });
      }
      currentDate.setDate(currentDate.getDate() + 1);
      if (dates.length >= 10) break; // Limit to 10 available dates
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Full name is required';
    } else if (formData.patientName.trim().length < 2) {
      newErrors.patientName = 'Name must be at least 2 characters';
    }

    if (!formData.patientEmail.trim()) {
      newErrors.patientEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.patientEmail)) {
      newErrors.patientEmail = 'Please enter a valid email address';
    }

    if (!formData.patientPhone.trim()) {
      newErrors.patientPhone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.patientPhone.replace(/\s/g, ''))) {
      newErrors.patientPhone = 'Please enter a valid phone number';
    }

    if (!formData.selectedDate) {
      newErrors.selectedDate = 'Please select an appointment date';
    }

    if (!formData.selectedTime) {
      newErrors.selectedTime = 'Please select an appointment time';
    }

    if (!formData.symptoms.trim()) {
      newErrors.symptoms = 'Please describe your symptoms or concerns';
    } else if (formData.symptoms.trim().length < 10) {
      newErrors.symptoms = 'Please provide more detailed information (at least 10 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate processing time
    setTimeout(() => {
      const appointmentData = {
        doctor,
        ...formData
      };
      onComplete(appointmentData);
    }, 2000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-green-200 rounded-full animate-spin border-t-green-600 mx-auto"></div>
            <CheckCircle className="h-8 w-8 text-green-600 absolute inset-0 m-auto" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Your Appointment</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            We're confirming your appointment with {doctor.name}. Please wait a moment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Results</span>
            </button>
            <h1 className="font-semibold text-gray-900">Book Appointment</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Doctor Info Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-20 h-20 rounded-full object-cover mr-6"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{doctor.name}</h2>
              <p className="text-blue-600 font-medium mb-2">{doctor.specialization}</p>
              <div className="text-gray-600 text-sm space-y-1">
                <p>{doctor.hospital}</p>
                <p>{doctor.address}</p>
                <p>{doctor.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Appointment Details</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline h-4 w-4 mr-1" />
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) => handleInputChange('patientName', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.patientName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.patientName && (
                  <p className="mt-1 text-sm text-red-600">{errors.patientName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.patientEmail}
                  onChange={(e) => handleInputChange('patientEmail', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.patientEmail ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.patientEmail && (
                  <p className="mt-1 text-sm text-red-600">{errors.patientEmail}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="inline h-4 w-4 mr-1" />
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.patientPhone}
                onChange={(e) => handleInputChange('patientPhone', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.patientPhone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="+1 (555) 123-4567"
              />
              {errors.patientPhone && (
                <p className="mt-1 text-sm text-red-600">{errors.patientPhone}</p>
              )}
            </div>

            {/* Appointment Scheduling */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Preferred Date *
                </label>
                <select
                  value={formData.selectedDate}
                  onChange={(e) => handleInputChange('selectedDate', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.selectedDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a date</option>
                  {availableDates.map((date) => (
                    <option key={date.value} value={date.value}>
                      {date.label}
                    </option>
                  ))}
                </select>
                {errors.selectedDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.selectedDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Preferred Time *
                </label>
                <select
                  value={formData.selectedTime}
                  onChange={(e) => handleInputChange('selectedTime', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.selectedTime ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {errors.selectedTime && (
                  <p className="mt-1 text-sm text-red-600">{errors.selectedTime}</p>
                )}
              </div>
            </div>

            {/* Symptoms Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="inline h-4 w-4 mr-1" />
                Describe Your Symptoms or Concerns *
              </label>
              <textarea
                value={formData.symptoms}
                onChange={(e) => handleInputChange('symptoms', e.target.value)}
                rows={4}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                  errors.symptoms ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Please describe any symptoms, concerns, or specific issues you'd like to discuss during your appointment..."
              />
              {errors.symptoms && (
                <p className="mt-1 text-sm text-red-600">{errors.symptoms}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                This information helps the doctor prepare for your appointment and provide better care.
              </p>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-2">Important Notes:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Please arrive 15 minutes early for your appointment</li>
                <li>• Bring a valid ID and insurance card (if applicable)</li>
                <li>• Cancellations must be made at least 24 hours in advance</li>
                <li>• You will receive a confirmation email shortly</li>
              </ul>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
              >
                Confirm Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;