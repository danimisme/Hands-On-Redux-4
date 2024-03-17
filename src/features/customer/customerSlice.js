import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
  isLoading: false,
};

export const fetchCustomer = createAsyncThunk(
  "customer/fetchCustomer",
  async (payload, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch("https://dummyjson.com/users/1");
      const data = await res.json();
      const customerData = {
        fullName: `${data.firstName} ${data.lastName}`,
        nationalId: data.id,
        createdAt: new Date().toISOString(),
      };

      return customerData;
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState: initialStateCustomer,
  reducers: {
    createCustomer: (state, action) => {
      console.log(action.payload);
      state.fullName = action.payload.fullName;
      state.nationalId = action.payload.nationalId;
      state.createdAt = action.payload.createdAt;
    },
    updateName: (state, action) => {
      state.fullName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCustomer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fullName = action.payload.fullName;
      state.nationalId = action.payload.nationalId;
      state.createdAt = action.payload.createdAt;
    });
    builder.addCase(fetchCustomer.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCustomer.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default customerSlice.reducer;
export const { createCustomer, updateName } = customerSlice.actions;
