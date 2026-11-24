export type EmploymentType = 'Full-time' | 'Contract' | 'Intern';

export interface Onboarding {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;

  employmentType: EmploymentType;
  department: string;
  designation: string;
  joiningDate: string;
  endDate: string | null;
  managerEmail: string;

  address: {
    line1: string;
    city: string;
    pin: string;
  };

  skills: {
    name: string;
    rating: number;
  }[];
}