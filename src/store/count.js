import { createSlice } from '@reduxjs/toolkit';

const countSlice = createSlice({
  name: 'count',
  initialState: {
    introvert: 0,
    extrovert: 0,
  },
  reducers: {
    incrementIntrovert: (state, action) => {
      state.introvert += action.payload;
    },
    incrementExtrovert: (state, action) => {
      state.extrovert += action.payload;
    },
  },
});

export const { incrementIntrovert, incrementExtrovert } = countSlice.actions;

export default countSlice.reducer;
