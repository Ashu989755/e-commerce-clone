import * as yup from "yup";

export const signupValidation = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password length should be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

export const loginValidator = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Enter valid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password length should be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  })
  .required();

export const otpValidator = yup
  .object({
    otp: yup
      .array()
      .length(6, "OTP must be exactly 6 characters")
      .test("is-valid-numbers", "OTP must be exactly 6 characters", (value) => {
        return value?.every((num) => /^\d+$/.test(num));
      })
      .required("OTP is required"),
  })
  .required();

export const registerProfileValidator = yup.object({
  phone: yup
    .string()
    .min(10)
    .max(16)
    // .matches(/^1 \(\d{3}\) \d{3}-\d{4}$/, "Invalid Mobile Number format")
    .matches(
      /^(\+91|91|0)?[6789]\d{9}$|^(\+1|1)?\s?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/,
      "Invalid Mobile Number format"
    )
    .required("Phone number is required"),

  profileImage: yup.mixed().required("Please upload profile image"),

  firstName: yup.string().required("First Name is required"),

  lastName: yup.string().required("Last Name is required"),
});

export const EditProfileValidator = yup.object({
  phone: yup.string(),
  // .matches(/^1 \(\d{3}\) \d{3}-\d{4}$/, "Invalid Mobile Number format")
  profileImage: yup.mixed(),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
});

export const customerForgotPasswordValidator = yup.object({
  email: yup.string().required("Email is required"),
});

export const contactUsValidator = yup
  .object({
    email: yup.string().required("Email is required"),

    message: yup.string().required("Plese write a message"),

    subject: yup.string().required("Subject is required"),
  })
  .required();

export const addAddressValidator = yup
  .object({
    zipCode: yup
      .string()
      .required("Zip Code is required")
      .max(Infinity, "Price cannot be negative")
      .test("non-negative", "Price cannot be negative", (value) => value >= 0),
    country: yup.string().required("Country is required"),
    state: yup.string().required("State is required"),
    city: yup.string().required("city is required"),
  })
  .required();

export const changePasswordValidator = yup
  .object({
    oldPassword: yup
      .string()
      .required("Old Password is required")
      .min(8, " Old Password length should be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),

    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password length should be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password")], "Passwords do not match"),
  })
  .required();

export const addAddress = yup.object({
  city: yup.string(),
  state: yup.string(),

  zipCode: yup
    .number()
    .typeError("Zipcode must be a number")
    .positive("Zipcode must be a positive number")
    .integer("Invaild Format"),

  address2: yup.string(),
});

export const resetPasswordValidator = yup
  .object({
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password length should be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords do not match"),
  })
  .required();

// export const personalInfoValidator = yup.object().shape({
//   profileImage: yup.object().required("Profile Image is required"),
//   firstName: yup.string().required("First name is required"),
//   lastName: yup.string().required("Last name is required"),
//   phone: yup
//   .string()
//   .min(10)
//   .max(16)
//   // .matches(/^1 \(\d{3}\) \d{3}-\d{4}$/, "Invalid Mobile Number format")
//   .matches(
//     /^(\+91|91|0)?[6789]\d{9}$|^(\+1|1)?\s?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/,
//     "Invalid Mobile Number format"
//   )
//   .required("Phone number is required"),

//   bio: yup.string().required("Bio is required"),
//   experience: yup.string().required("experience is required"),
//   driversLicense: yup.string().required("driversLicense is required"),

//  pricePerHour: yup
//     .number()
//     .when("pricing", {
//       is: "Per Hour",
//       then: yup
//         .number()
//         .typeError("Price must be a valid number")
//         .required("Price per hour is required")
//         .min(1, "Price must be at least 1"),
//     }),

// });

export const personalInfoValidator = yup.object().shape({
  profileImage: yup.mixed().required("Please upload profile image"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phone: yup
    .string()
    .min(10)
    .max(16)
    // .matches(/^1 \(\d{3}\) \d{3}-\d{4}$/, "Invalid Mobile Number format")
    .matches(
      /^(\+91|91|0)?[6789]\d{9}$|^(\+1|1)?\s?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/,
      "Invalid Mobile Number format"
    )
    .required("Phone number is required"),
  pricePerHour: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .when("pricing", {
      is: "Per Hour",
      then: yup
        .number()
        .typeError("Price must be a valid number")
        .required("Price per hour is required")
        .min(1, "Price must be at least 1")
        .max(Infinity, "Price cannot be negative")
        .test(
          "non-negative",
          "Price cannot be negative",
          (value) => value >= 0
        ),
    }),
  experience: yup.string().required("Experience is required"),
  driversLicense: yup.string().required("Driving license status is required"),
  bio: yup.string().required("Bio is required"),
});
export const personalInfoValidatorr = yup.object().shape({
  profileImage: yup.mixed().required("Please upload profile image"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phone: yup.string().required("Phone number is required"),
  pricePerHour: yup
    .number()
    .nullable() // Allow null values
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .typeError("Price must be a valid number")
    .min(1, "Price must be at least 1"),
  experience: yup.string().required("Experience is required"),
  driversLicense: yup.string().required("Driving license status is required"),
  bio: yup.string().required("Bio is required"),
});

export const linksValidation = yup.object().shape({
  facebookUrl: yup.string().url("Must be a valid URL"),
  instaUrl: yup.string().url("Must be a valid URL"),
  youtubeUrl: yup.string().url("Must be a valid URL"),
  tiktokUrl: yup.string().url("Must be a valid URL"),
  websiteUrl: yup.string().url("Must be a valid URL"),
});

export const addReviewValidator = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  //  rating: yup.string().required("Description"),
});

export const addAvailabilityValidator = yup.object().shape({
  days: yup.object().shape({
    Monday: yup.object({
      checked: yup.boolean(),
      startTime: yup.string().when("checked", {
        is: true,
        then: yup
          .string()
          .required("Start time is required when Monday is selected")
          .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid start time format"),
      }),
      endTime: yup.string().when("checked", {
        is: true,
        then: yup
          .string()
          .required("End time is required when Monday is selected")
          .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid end time format"),
      }),
    }),
    Tuesday: yup.object({
      checked: yup.boolean(),
      startTime: yup.string().when("checked", {
        is: true,
        then: yup
          .string()
          .required("Start time is required when Tuesday is selected")
          .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid start time format"),
      }),
      endTime: yup.string().when("checked", {
        is: true,
        then: yup
          .string()
          .required("End time is required when Tuesday is selected")
          .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid end time format"),
      }),
    }),
    Wednesday: yup.object({
      checked: yup.boolean(),
      startTime: yup.string().when("checked", {
        is: true,
        then: yup
          .string()
          .required("Start time is required when Wednesday is selected")
          .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid start time format"),
      }),
      endTime: yup.string().when("checked", {
        is: true,
        then: yup
          .string()
          .required("End time is required when Wednesday is selected")
          .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid end time format"),
      }),
    }),
    Thursday: yup.object({
      checked: yup.boolean(),
      startTime: yup.string().when("checked", {
        is: true,
        then: yup
          .string()
          .required("Start time is required when Thursday is selected")
          .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid start time format"),
      }),
      endTime: yup.string().when("checked", {
        is: true,
        then: yup
          .string()
          .required("End time is required when Thursday is selected")
          .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid end time format"),
      }),
    }),
    Friday: yup.object({
      checked: yup.boolean(),
      startTime: yup.string().when("checked", {
        is: true,
        then: yup
          .string()
          .required("Start time is required when Friday is selected")
          .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid start time format"),
      }),
      endTime: yup.string().when("checked", {
        is: true,
        then: yup
          .string()
          .required("End time is required when Friday is selected")
          .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid end time format"),
      }),
    }),
    Saturday: yup.object({
      checked: yup.boolean(),
      startTime: yup.string().when("checked", {
        is: true,
        then: yup
          .string()
          .required("Start time is required when Saturday is selected")
          .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid start time format"),
      }),
      endTime: yup.string().when("checked", {
        is: true,
        then: yup
          .string()
          .required("End time is required when Saturday is selected")
          .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid end time format"),
      }),
    }),
    Sunday: yup.object({
      checked: yup.boolean(),
      startTime: yup.string().when("checked", {
        is: true,
        then: yup
          .string()
          .required("Start time is required when Sunday is selected")
          .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid start time format"),
      }),
      endTime: yup.string().when("checked", {
        is: true,
        then: yup
          .string()
          .required("End time is required when Sunday is selected")
          .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid end time format"),
      }),
    }),
  }),
});

export const bookAppointmentValidator = yup.object().shape({
  profileImage: yup.mixed().required("Please upload profile image"),
  startTime: yup.string().required("Start time is required"),
  endTime: yup
    .string()
    .required("End time is required")
    .test(
      "is-after-start",
      "End time must be after start time",
      function (value) {
        const { startTime } = this.parent;
        return startTime && value && startTime < value; // Ensure endTime is after startTime
      }
    ),
  services: yup.array().min(1, "At least one service must be selected"),
});

export const bookConsultationValidator = yup.object().shape({
  startTime: yup.string().required("Time is required"),
  description: yup.string().required("Description is required"),
});

export const addBankValidation = yup.object().shape({
  bankName: yup.string().required("Bank Name is required"),
  accountHolderName: yup.string().required("Account Holder Name is required"),
  accountNumber: yup
    .string()
    .required("Account Number is required")
    .matches(
      /^\d{12,16}$/,
      "Account Number must be a number and have between 12 to 16 digits"
    )
    .typeError("Account Number must be a number"),
  routingNumber: yup
    .string()
    .required("Routing Number is required")
    .matches(/^\d{9}$/, "Routing Number must be 9 digits"),
  dateOfBirth: yup.string().required("Date of Birth is required"),
  address1: yup.string().required("Address 1 is required"),
  address2: yup.string().required("Address 2 is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  postalCode: yup
    .string()
    .required("Postal Code is required")
    .matches(/^\d{1,6}$/, "Postal Code must be up to 6 digits"),
  country: yup.string().required("Country is required"),
  ssnLast4: yup
    .number()
    .typeError("SSN Last 4 must be a number")
    .required("SSN Last 4 is required")
    .min(1000, "SSN must be at least 4 digits")
    .max(9999, "SSN Last 4 can be at most 4 digits"),
  idNumber: yup
    .string() // Change from number to string for length validation
    .transform((value) => value.replace(/\D/g, "")) // Remove non-digit characters
    .length(9, "ID Number must be exactly 9 digits") // Ensure it's exactly 9 digits
    .matches(/^\d{9}$/, "ID Number must be 9 digits") // Validate it contains only digits
    .required("ID Number is required"),
});

export const rejectReasonValidator = yup.object().shape({
  description: yup.string().required("Write Something"),
});

export const sendEstimateValidator = yup.object().shape({
  businessName: yup
    .string()
    .required("Business Name is required")
    .min(2, "Business Name must be at least 2 characters"),
  startTime: yup.string().required("Start time is required"),
  // endTime: yup.string().required('End time is required'),
  profileImage: yup.mixed().required("Profile Image is required"),
  laborPrice: yup
    .string()
    .required("Labor Price is required")
    .min(0.01, "Labor Price must be greater than 0")
    .typeError("Labor Price must be a valid number"),
  selectLabor: yup
    .string()
    .required("Please select the labor")
    .min(1, "At least 1 labor must be selected"),
  // totalHours: yup.string().required("Total Hours are required"),
  // totalPrice: yup.string().required('Total Hours are required'),
});

export const addItemsValidator = yup.object().shape({
  itemName: yup.string().required("Item Name is required"),
  itemPrice: yup
    .number()
    .positive("Price must be a positive number")
    .required("Item Price is required"),
  quantity: yup.string().required("Quantity is required"),
});

export const AddCustomerValidator = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last Name is required"),
  phone: yup
    .string()
    .min(10)
    .max(16)
    .matches(
      /^(\+91|91|0)?[6789]\d{9}$|^(\+1|1)?\s?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/,
      "Invalid Mobile Number format"
    )
    .required("Phone number is required"),
});
