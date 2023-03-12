import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {User} from '../types';

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setScoreState(state, action: PayloadAction<number>) {
      if (state.user) {
        state.user = {
          ...state.user,
          score: state.user.score + action.payload,
        };
      }
    },
    removeUser(state) {
      state.user = null;
    },
  },
});

export const {setUser, removeUser, setScoreState} = userSlice.actions;
export default userSlice.reducer;
