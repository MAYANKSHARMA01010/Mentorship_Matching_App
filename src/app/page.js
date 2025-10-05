"use client";

import HomePage from "./(pages)/HomePage";
import Onboarding from "./(pages)/Onboarding";
import MentorDashboard from "./(pages)/MentorDashboard"
import StudentDashboard from "./(pages)/StudentDashboard";

export default function OnboardingPage() {
  return (
    <div> 
    <HomePage />
    <Onboarding />
    <MentorDashboard />
    <StudentDashboard />
    </div>
  );
}