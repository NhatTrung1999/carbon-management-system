import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const countSlice = createSlice({
  name: 'count',
  initialState: { value: 0 },
  reducers: {
    setIncrease: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { setIncrease } = countSlice.actions;

export default countSlice.reducer;
