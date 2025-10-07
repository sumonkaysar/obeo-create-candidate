import type { TCreateCandidateForm } from "@/Features/Candidate/types/candidate.type";
import type { RootState } from "@/Redux/store";
import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "sonner";

const initialState: TCreateCandidateForm = {
  basicInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    altPhone: "",
    ssn: "",
    presentAddress: "",
    permanentAddress: "",
    state: "",
    city: "",
    zipCode: "",
    picture: undefined,
  },
  eduInfo: {
    examName: "",
    institution: "",
    roll: "",
    registrationNo: "",
    result: "",
    passingYear: "",
  },
  pastExp: {
    companyName: "",
    designation: "",
    joiningDate: "",
    expireDate: "",
    yearsOfExp: "",
  },
};

export const candidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {
    addBasicInfo: (state, action) => {
      state.basicInfo = { ...state.basicInfo, ...action.payload };
    },
    addEduInfo: (state, action) => {
      state.eduInfo = { ...state.eduInfo, ...action.payload };
    },
    addPastExp: (state, action) => {
      state.pastExp = { ...state.pastExp, ...action.payload };
    },
    createCandidate: (state) => {
      toast.success("Candidate created succesfully");
      console.log(current(state));
    },
  },
});

export const { addBasicInfo, addEduInfo, addPastExp, createCandidate } =
  candidateSlice.actions;

export const selectCandidateData = (state: RootState) => state.candidate;

export default candidateSlice.reducer;
