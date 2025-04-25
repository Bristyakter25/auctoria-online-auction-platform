import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
  name: "report",
  initialState: {
    reports: [],
  },
  reducers: {
    addReport: (state, action) => {
      state.reports.push(action.payload);
    },
    removeReport: (state, action) => {
      state.reports = state.reports.filter(r => r.id !== action.payload);
    },
  },
});

export const { addReport, removeReport } = reportSlice.actions;
export default reportSlice.reducer;
