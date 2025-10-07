import z from "zod";

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const ACCEPTED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const today = new Date();

const fileSchema = z
  .instanceof(File)
  .refine(
    (file) => ACCEPTED_MIME_TYPES.includes(file.type),
    "Only .jpg, .jpeg, and .png formats are supported."
  )
  .refine(
    (file) => file.size <= MAX_FILE_SIZE_BYTES,
    `File size must be less than ${MAX_FILE_SIZE_MB}MB.`
  )
  .optional();

export const basicInfoZodSchema = z.object({
  firstName: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "First name is required"
          : "First name must be a string",
    })
    .nonempty("First name can't be blank")
    .min(2, "First name must be at least 2 characters long.")
    .max(20, "First name can't be more than 20 characters."),
  lastName: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Last name is required"
          : "Last name must be a string",
    })
    .nonempty("Last name can't be blank")
    .min(2, "Last name must be at least 2 characters long.")
    .max(20, "Last name can't be more than 20 characters."),
  email: z.email("Invalid email address.").nonempty("Email can't be blank."),
  phone: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Phone number is required"
          : "Phone number must be a string",
    })
    .nonempty("Phone number can't be blank")
    .regex(
      /^(\+8801[3-9]\d{8}|01[3-9]\d{8})$/,
      "Invalid format for Bangladeshi phone number (+8801xxxxxxxxx or 01xxxxxxxxx)"
    ),
  altPhone: z
    .union([
      z.literal(""),
      z
        .string("Alternative phone number must be a string")
        .regex(
          /^(\+8801[3-9]\d{8}|01[3-9]\d{8})$/,
          "Invalid format for Bangladeshi phone number (+8801xxxxxxxxx or 01xxxxxxxxx)"
        ),
    ])
    .optional(),
  ssn: z.string("ssn must be a string").optional(),
  presentAddress: z
    .string("Present address must be a string")
    .max(200, "Present address can't be more than 200 characters.")
    .optional(),
  permanentAddress: z
    .string("Permanent address must be a string")
    .max(200, "Permanent address can't be more than 200 characters.")
    .optional(),
  state: z
    .string("State must be a string")
    .max(50, "State can't be more than 50 characters.")
    .optional(),
  city: z
    .string("City must be a string")
    .max(50, "City can't be more than 50 characters.")
    .optional(),
  zipCode: z.string("Zip code must be a string").optional(),
  picture: fileSchema,
});

export const eduInfoZodSchema = z.object({
  examName: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Exam name is required"
          : "Exam name must be a string",
    })
    .nonempty("Exam name can't be blank"),
  institution: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Institution is required"
          : "Institution must be a string",
    })
    .nonempty("Institution can't be blank")
    .min(2, "Institution must be at least 2 characters long."),
  roll: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Roll is required"
          : "Roll must be a string",
    })
    .nonempty("Roll can't be blank"),
  registrationNo: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Registration No is required"
          : "Registration No must be a string",
    })
    .nonempty("Registration No can't be blank"),
  result: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Result is required"
          : "Result must be a string",
    })
    .nonempty("Result can't be blank"),
  passingYear: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Passing year is required"
          : "Passing year must be a string",
    })
    .regex(/^\d{4}$/, "Must be a 4-digit year.")
    .refine(
      (year) =>
        parseInt(year, 10) >= 1900 && parseInt(year, 10) <= today.getFullYear(),
      `Passing year must be between 1900 and ${today.getFullYear()}.`
    ),
});

export const pastExpZodSchema = z.object({
  companyName: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Company name is required"
          : "Company name must be a string",
    })
    .nonempty("Company name can't be blank"),
  designation: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Designation is required"
          : "Designation must be a string",
    })
    .nonempty("Designation can't be blank")
    .min(2, "Designation must be at least 2 characters long."),
  joiningDate: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Joining date is required"
          : "Joining date must be a string",
    })
    .nonempty("Joining date can't be blank")
    .refine(
      (dateString) => !isNaN(new Date(dateString).getTime()),
      "Invalid date format."
    )
    .refine(
      (date) => !date || new Date(date) <= today,
      "Joining date cannot be in the future."
    ),
  expireDate: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Expire date is required"
          : "Expire date must be a string",
    })
    .nonempty("Expire date can't be blank")
    .refine(
      (dateString) => !isNaN(new Date(dateString).getTime()),
      "Invalid date format."
    ),
  yearsOfExp: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Years of experience is required"
          : "Years of experience must be a string",
    })
    .regex(/^\d+$/, "Years of experience must be a number.")
    .refine(
      (val) => Number(val) >= 0,
      "Years of experience cannot be negative."
    ),
});

export const shortlistCandidateZodSchema = z.object({
  candidate: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Candidate ID is required"
          : "Candidate ID must be a string",
    })
    .nonempty("Candidate ID can't be blank"),
  // .regex(
  //   /^[0-9a-fA-F]{24}$/,
  //   "Candidate ID must be a valid MongoDB ObjectId"
  // ),
  jobPosition: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Job Position is required"
          : "Job Position must be a string",
    })
    .nonempty("Job Position can't be blank")
    .min(2, "Job Position must be at least 2 characters long."),
  interviewDate: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Interview date is required"
          : "Interview date must be a string",
    })
    .nonempty("Interview date can't be blank")
    .refine(
      (dateString) => !isNaN(new Date(dateString).getTime()),
      "Invalid date format."
    )
    .refine(
      (date) => !date || new Date(date) >= today,
      "Joining date cannot be in the past."
    ),
});
