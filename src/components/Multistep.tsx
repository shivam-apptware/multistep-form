import React, { useState } from 'react';
import InputField from './InputField';
import { Stepper, Step, StepLabel} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import './MultiStepForm.css';
const steps = ['User Profile', 'User Education Details', 'Review and Acceptance'];
const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userMobile: '',
    gender: '',
    userEmployment: '',
    userHighestQualification: '',
    userPercentage: '',
    userSpecialization: '',
    userAchievement: '',
    userProcessReview: '',
    userReviewAgreement: false
  });
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };
  function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z]+$/; 
    return usernameRegex.test(username);
  }
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  function validateMobile(mobile) {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
  }
  function validateHighestQualification(qualification) {
    qualification = qualification.trim();
    const qualificationRegex = /^[a-zA-Z\s]+$/;
    return qualificationRegex.test(qualification);
  }
  function validatePercentage(percentage) {
    percentage = percentage.trim();
    if (isNaN(percentage)) {
      return false;
    }
    percentage = parseFloat(percentage);
    return percentage >= 0 && percentage <= 100;
  }

  function validateSpecialization(specialization) {
    specialization = specialization.trim();
    const specializationRegex = /^[a-zA-Z0-9]+$/;
    return specializationRegex.test(specialization);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted', formData);
    if (!validateUsername(formData.userName)) {
        alert("Please enter a valid username.");
        return;
      }
      if (!validateEmail(formData.userEmail)) {
        alert("Please enter a valid email address.");
        return;
      }
    
      if (!validateMobile(formData.userMobile)) {
        alert("Please enter a valid user number.");
        return;
      }
      if (!formData.gender) {
        alert("Please enter a user gender.");
        return;
      }
      if (!formData.userEmployment) {
        alert("Please enter a user Employment.");
        return;
      }
      if (!validateHighestQualification(formData.userHighestQualification)) {
        alert("Please enter a valid user Highest qualification.");
        return;
      }
      if (!validatePercentage(formData.userPercentage)) {
        alert("Please enter a user Percentage range between 0 to 100.");
        return;
      }
      if (!validateSpecialization(formData.userSpecialization)) {
        alert("Please enter a valid user specialization.");
        return;
      }
      if (!formData.userAchievement) {
        alert("Please enter a user Achievement.");
        return;
      }
      if (!formData.userProcessReview) {
        alert("Please enter a user process Review.");
        return;
      }
      if (!formData.userReviewAgreement) {
        alert("Please check a user Review and Agreement.");
        return;
      }
   
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="step1-container">
            <h2>User Profile</h2>
            <form>
              <InputField label="User Name" name="userName" type="text" value={formData.userName} onChange={handleInputChange} />
              <InputField label="User Email" name="userEmail" type="email" value={formData.userEmail} onChange={handleInputChange} />
              <InputField label="User Mobile" name="userMobile" type="text" value={formData.userMobile} onChange={handleInputChange} />
              <div>
                <label>Gender:</label>
                <label><input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleInputChange} /> Male</label>
                <label><input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleInputChange} /> Female</label>
              </div>
              <label>User Employment:</label>
              <select name="userEmployment" value={formData.userEmployment} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="Contract">Contract</option>
                <option value="Intern">Intern</option>
                <option value="Permanent">Permanent</option>
              </select>
            </form>
            <button onClick={nextStep}>Next</button>
          </div>
        );
      case 1:
        return (
          <div className="step2-container">
            <h2>User Education Details</h2>
            <form>
              <InputField label="User Highest Qualification" name="userHighestQualification" type="text" value={formData.userHighestQualification} onChange={handleInputChange} />
              <InputField label="User Percentage" name="userPercentage" type="number" value={formData.userPercentage} onChange={handleInputChange} />
              <InputField label="User Specialization" name="userSpecialization" type="text" value={formData.userSpecialization} onChange={handleInputChange} />
              <InputField label="User Achievement" name="userAchievement" type="text" value={formData.userAchievement} onChange={handleInputChange} />
            </form>
            <div className="button-container">
  <button className="preview-btn" onClick={prevStep}>Previous</button>
  <button onClick={nextStep}>Next</button>
</div>
          </div>
        );
      case 2:
        return (
          <div className="step3-container">
            <h2>Review and Acceptance</h2>
            <form>
              <InputField label="User Process Review" name="userProcessReview" type="textarea" value={formData.userProcessReview} onChange={handleInputChange} />
              <label>
                <input type="checkbox" name="userReviewAgreement" checked={formData.userReviewAgreement} onChange={handleInputChange} />
                User Review and submit the form
              </label>
            </form>
            <button onClick={prevStep}>Previous</button>
            <button disabled={!formData.userReviewAgreement} onClick={handleSubmit}>Submit</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
    <Stepper className="stepper-buttons-container" activeStep={step} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
    {renderStepContent()}
  </div>
  );
};

export default MultiStepForm;
