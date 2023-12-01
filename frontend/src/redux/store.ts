import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';
import { AppState, JobItem, SkillItem } from '../types';

// define initial application state
const initialState: AppState = {
  jobs: [],
  skills: [],
};

// create slice of Redux store using createSlice
const appSlice = createSlice({
  // name slice
  name: 'app',
  initialState,
  // define reducer functions used to manipulate state
  reducers: {
    addJob: (state: AppState, action: PayloadAction<JobItem>) => {
      state.jobs = [...state.jobs, action.payload];
    },
    resetJobs: (state: AppState) => {
      state.jobs = [];
    },
    setSkills: (state: AppState, action: PayloadAction<SkillItem[]>) => {
      state.skills = action.payload;
    },
    addSkill: (state: AppState, action: PayloadAction<SkillItem>) => {
      state.skills = [...state.skills, action.payload];
    },
    updateSkill: (state: AppState, action: PayloadAction<SkillItem>) => {
      // create copy of skills state
      const skillsCopy: SkillItem[] = [...state.skills];
      // find index where skill should be updated
      const index: number = skillsCopy.findIndex(
        skill => skill.skill === action.payload.skill
      );
      // update skill
      skillsCopy[index] = { ...action.payload };
      // reassign skills state to updated copy
      state.skills = skillsCopy;
    },
    deleteSkill: (state: AppState, action: PayloadAction<string>) => {
      // filter out skill that matches payload
      state.skills = [...state.skills].filter(
        skill => skill.skill !== action.payload
      );
    },
  },
});

// extract reducer functions from the slice
export const { addJob, resetJobs, addSkill, updateSkill, deleteSkill } =
  appSlice.actions;

// configure the Redux store using configureStore
export const store = configureStore({
  reducer: appSlice.reducer,
});
