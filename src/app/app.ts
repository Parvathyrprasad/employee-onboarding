
import { Component, signal } from '@angular/core';
import { StarRating } from './components/star-rating/star-rating';

import {
  form,
  FormField,
  required,
  email,
  minLength,
  maxLength,
  pattern,
  min,
  max,
  validate,
  validateHttp,
  applyEach
} from '@angular/forms/signals';

import type { Onboarding } from './models/onboarding.model';

function createInitialOnboarding(): Onboarding {
  return {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    employmentType: 'Full-time',
    department: '',
    designation: '',
    joiningDate: '',
    endDate: null,
    managerEmail: '',
    address: {
      line1: '',
      city: '',
      pin: ''
    },
    skills: [
      { name: '', rating: 1 },
      { name: '', rating: 1 }
    ]
  };
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormField, StarRating],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  onboardingModel = signal<Onboarding>(
    createInitialOnboarding()
  );

  onboardingForm = form(this.onboardingModel, (path) => {

    // --------------------------------
    // PERSONAL INFORMATION
    // --------------------------------

    required(path.firstName, {
      message: 'First name is required'
    });

    minLength(path.firstName, 2, {
      message: 'Minimum 2 characters required'
    });

    maxLength(path.firstName, 50, {
      message: 'Maximum 50 characters allowed'
    });

    pattern(path.firstName, /^(?=.*[A-Za-z])[A-Za-z ]+$/, {
      message: 'Only letters and spaces are allowed'
    });

    required(path.lastName, {
      message: 'Last name is required'
    });

    minLength(path.lastName, 2, {
      message: 'Minimum 2 characters required'
    });

    maxLength(path.lastName, 50, {
      message: 'Maximum 50 characters allowed'
    });

    pattern(path.lastName, /^(?=.*[A-Za-z])[A-Za-z ]+$/, {
      message: 'Only letters and spaces are allowed'
    });

    // Employee email
    required(path.email, {
      message: 'Email is required'
    });

    email(path.email, {
      message: 'Enter a valid email address'
    });

    // Fake HTTP email availability check
    validateHttp(path.email, {
      request: ({ value }) => {
        const emailValue = value().trim();

        return emailValue
          ? `/api/check-email?email=${encodeURIComponent(emailValue)}`
          : undefined;
      },

      onSuccess: (response: { exists: boolean }) => {
        return response.exists
          ? {
              kind: 'emailExists',
              message: 'This email is already registered'
            }
          : null;
      },

      onError: () => ({
        kind: 'emailCheckFailed',
        message: 'Unable to verify email availability'
      })
    });

    // Phone
    required(path.phone, {
      message: 'Phone number is required'
    });

    pattern(path.phone, /^[6-9]\d{9}$/, {
      message: 'Enter a valid 10-digit phone number'
    });

    // Date of birth
    required(path.dateOfBirth, {
      message: 'Date of birth is required'
    });

    // Minimum age 18 on joining date
    validate(path.dateOfBirth, ({ value, valueOf }) => {
      const dob = value();
      const joining = valueOf(path.joiningDate);

      if (!dob || !joining) {
        return null;
      }

      const birthDate = new Date(dob + 'T00:00:00');
      const joiningDate = new Date(joining + 'T00:00:00');

      if (
        Number.isNaN(birthDate.getTime()) ||
        Number.isNaN(joiningDate.getTime())
      ) {
        return null;
      }

      let age =
        joiningDate.getFullYear() - birthDate.getFullYear();

      const monthDifference =
        joiningDate.getMonth() - birthDate.getMonth();

      if (
        monthDifference < 0 ||
        (
          monthDifference === 0 &&
          joiningDate.getDate() < birthDate.getDate()
        )
      ) {
        age--;
      }

      return age >= 18
        ? null
        : {
            kind: 'minimumAge',
            message: 'Employee must be at least 18 years old on joining date'
          };
    });

    // --------------------------------
    // EMPLOYMENT DETAILS
    // --------------------------------

    required(path.employmentType, {
      message: 'Employment type is required'
    });

    required(path.department, {
      message: 'Department is required'
    });

    required(path.designation, {
      message: 'Designation is required'
    });

    // Designation must match the selected department
    validate(path.designation, ({ value, valueOf }) => {
      const department = valueOf(path.department);
      const designation = value();

      if (!department || !designation) {
        return null;
      }

      const designations: Record<string, string[]> = {
        Engineering: [
          'Frontend Developer',
          'Backend Developer',
          'QA Engineer'
        ],
        Design: [
          'UI Designer',
          'UX Researcher'
        ],
        HR: [
          'HR Executive',
          'Recruiter'
        ]
      };

      return designations[department]?.includes(designation)
        ? null
        : {
            kind: 'invalidDesignation',
            message: 'Select a valid designation for the department'
          };
    });

    required(path.joiningDate, {
      message: 'Joining date is required'
    });

    // End date required only for Contract and Intern
    required(path.endDate, {
      message: 'End date is required',
      when: ({ valueOf }) => {
        const type = valueOf(path.employmentType);
        return type === 'Contract' || type === 'Intern';
      }
    });

    // End date must be after joining date
    validate(path.endDate, ({ value, valueOf }) => {
      const employmentType = valueOf(path.employmentType);

      if (employmentType === 'Full-time') {
        return null;
      }

      const endDate = value();
      const joiningDate = valueOf(path.joiningDate);

      if (!endDate || !joiningDate) {
        return null;
      }

      return endDate > joiningDate
        ? null
        : {
            kind: 'invalidEndDate',
            message: 'End date must be after joining date'
          };
    });

    // Manager email
    required(path.managerEmail, {
      message: 'Manager email is required'
    });

    email(path.managerEmail, {
      message: 'Enter a valid manager email'
    });

    validate(path.managerEmail, ({ value, valueOf }) => {
      const managerEmail = value().trim().toLowerCase();
      const employeeEmail = valueOf(path.email).trim().toLowerCase();

      if (
        managerEmail &&
        employeeEmail &&
        managerEmail === employeeEmail
      ) {
        return {
          kind: 'sameEmail',
          message: 'Manager email cannot be the employee email'
        };
      }

      return null;
    });

    // --------------------------------
    // ADDRESS INFORMATION
    // --------------------------------

    required(path.address.line1, {
      message: 'Address is required'
    });

    required(path.address.city, {
      message: 'City is required'
    });

    required(path.address.pin, {
      message: 'PIN code is required'
    });

    pattern(path.address.pin, /^[1-9]\d{5}$/, {
      message: 'PIN must contain 6 digits and cannot start with 0'
    });

    // --------------------------------
    // SKILLS
    // --------------------------------

    minLength(path.skills, 2, {
      message: 'Add at least 2 skills'
    });

    maxLength(path.skills, 6, {
      message: 'Maximum 6 skills allowed'
    });

    applyEach(path.skills, (skill) => {
      required(skill.name, {
        message: 'Skill name is required'
      });

      validate(skill.name, ({ value }) => {
        return value().trim().length > 0
          ? null
          : {
              kind: 'emptySkill',
              message: 'Skill name cannot contain only spaces'
            };
      });

      min(skill.rating, 1, {
        message: 'Rating must be at least 1'
      });

      max(skill.rating, 5, {
        message: 'Rating cannot exceed 5'
      });
    });

    // Skill names must be unique, ignoring case
    validate(path.skills, ({ value }) => {
      const names = value()
        .map(skill => skill.name.trim().toLowerCase())
        .filter(name => name.length > 0);

      return new Set(names).size === names.length
        ? null
        : {
            kind: 'duplicateSkills',
            message: 'Skill names must be unique'
          };
    });

  });

  // --------------------------------
  // FORM STATE
  // --------------------------------

  submitAttempted = signal(false);

  successMessage = signal('');

  // --------------------------------
  // DEPARTMENT CHANGE
  // --------------------------------

  onDepartmentChange(): void {
    this.onboardingModel.update(model => ({
      ...model,
      designation: ''
    }));
  }

  // --------------------------------
  // ADD SKILL
  // --------------------------------

  addSkill(): void {
    if (this.onboardingModel().skills.length >= 6) {
      return;
    }

    this.onboardingModel.update(model => ({
      ...model,
      skills: [
        ...model.skills,
        { name: '', rating: 1 }
      ]
    }));
  }

  // --------------------------------
  // REMOVE SKILL
  // --------------------------------

  removeSkill(index: number): void {
    if (this.onboardingModel().skills.length <= 2) {
      return;
    }

    this.onboardingModel.update(model => ({
      ...model,
      skills: model.skills.filter((_, i) => i !== index)
    }));
  }

  // --------------------------------
  // SUBMIT FORM
  // --------------------------------

  onSubmit(event: Event): void {
    event.preventDefault();

    this.submitAttempted.set(true);
    this.successMessage.set('');

    const formState = this.onboardingForm();

    // Do not submit invalid or pending forms
    if (formState.invalid() || formState.pending()) {
      return;
    }

    const employee = this.onboardingModel();

    const fullName =
      `${employee.firstName.trim()} ${employee.lastName.trim()}`;

    this.successMessage.set(
      `${fullName} has been onboarded successfully!`
    );

    // Reset model and form interaction state
    this.onboardingModel.set(createInitialOnboarding());
    this.onboardingForm().reset();

    this.submitAttempted.set(false);
  }
}
