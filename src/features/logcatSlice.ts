import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { ILogCat5Payload, ILoggingCat5Data } from '../types/loggingcat5';
import logcatApi from '../api/logcat';
import type { ILoggingCat1AndCat4Data } from '../types/loggingcat1and4';
import type { ILoggingCat6Data } from '../types/loggingcat6';
import type { ILogCat7Payload, ILoggingCat7Data } from '../types/loggingcat7';
import type {
  ILogCat9AndCat12Payload,
  ILoggingCat9AndCat12Data,
} from '../types/loggingcat9and12';
import type { ILogCat1AndCat4Payload } from '../types/cat1andcat4';

interface LogcatState {
  logcat1and4: ILoggingCat1AndCat4Data[];
  logcat5: ILoggingCat5Data[];
  loggingcat6: ILoggingCat6Data[];
  logcat7: ILoggingCat7Data[];
  logcat9and12: ILoggingCat9AndCat12Data[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  hasMore: boolean;
}

const initialState: LogcatState = {
  logcat1and4: [],
  logcat5: [],
  loggingcat6: [],
  logcat7: [],
  logcat9and12: [],
  loading: false,
  error: null,
  page: 1,
  limit: 20,
  hasMore: true,
};

export const createLogCat1AndCat4 = createAsyncThunk(
  'logcat/create-log-cat1-and-cat4',
  async (data: ILogCat1AndCat4Payload, { rejectWithValue }) => {
    try {
      const res = await logcatApi.createLogCat1AndCat4(data);
      return res;
    } catch (error) {
      return rejectWithValue(error || 'Error!');
    }
  }
);

export const fetchLogCat1AndCat4 = createAsyncThunk(
  'logcat/fetch-log-cat1-and-cat4',
  async (
    {
      dateFrom,
      dateTo,
      factory,
      page,
      sortField,
      sortOrder,
    }: {
      dateFrom: string;
      dateTo: string;
      factory: string;
      page: number;
      sortField: string;
      sortOrder: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await logcatApi.fetchLogCat1AndCat4(
        dateFrom,
        dateTo,
        factory,
        page,
        sortField,
        sortOrder
      );
      return res as {
        data: ILoggingCat1AndCat4Data[];
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
      };
    } catch (error: any) {
      return rejectWithValue(error || '');
    }
  }
);

export const createLogCat5 = createAsyncThunk(
  'logcat/create-log-cat5',
  async (data: ILogCat5Payload, { rejectWithValue }) => {
    try {
      const res = await logcatApi.createLogCat5(data);
      return res;
    } catch (error) {
      return rejectWithValue(error || 'Error!');
    }
  }
);

export const fetchLogCat5 = createAsyncThunk(
  'logcat/fetch-log-cat5',
  async (
    {
      dateFrom,
      dateTo,
      factory,
      page,
      sortField,
      sortOrder,
    }: {
      dateFrom: string;
      dateTo: string;
      factory: string;
      page: number;
      sortField: string;
      sortOrder: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await logcatApi.fetchLogCat5(
        dateFrom,
        dateTo,
        factory,
        page,
        sortField,
        sortOrder
      );
      return res as {
        data: ILoggingCat5Data[];
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
      };
    } catch (error: any) {
      return rejectWithValue(error || '');
    }
  }
);

export const createLogCat7 = createAsyncThunk(
  'logcat/create-log-cat7',
  async (data: ILogCat7Payload, { rejectWithValue }) => {
    try {
      const res = await logcatApi.createLogCat7(data);
      return res;
    } catch (error) {
      return rejectWithValue(error || 'Error!');
    }
  }
);

export const fetchLogCat7 = createAsyncThunk(
  'logcat/fetch-log-cat7',
  async (
    {
      dateFrom,
      dateTo,
      factory,
      page,
      sortField,
      sortOrder,
    }: {
      dateFrom: string;
      dateTo: string;
      factory: string;
      page: number;
      sortField: string;
      sortOrder: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await logcatApi.fetchLogCat7(
        dateFrom,
        dateTo,
        factory,
        page,
        sortField,
        sortOrder
      );
      return res as {
        data: ILoggingCat7Data[];
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
      };
    } catch (error: any) {
      return rejectWithValue(error || '');
    }
  }
);

export const createLogCat9AndCat12 = createAsyncThunk(
  'logcat/create-log-cat9-and-cat12',
  async (data: ILogCat9AndCat12Payload, { rejectWithValue }) => {
    try {
      const res = await logcatApi.createLogCat9AndCat12(data);
      return res;
    } catch (error) {
      return rejectWithValue(error || 'Error!');
    }
  }
);

export const fetchLogCat9AndCat12 = createAsyncThunk(
  'logcat/fetch-log-cat9-and-cat12',
  async (
    {
      dateFrom,
      dateTo,
      factory,
      page,
      sortField,
      sortOrder,
    }: {
      dateFrom: string;
      dateTo: string;
      factory: string;
      page: number;
      sortField: string;
      sortOrder: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await logcatApi.fetchLogCat9AndCat12(
        dateFrom,
        dateTo,
        factory,
        page,
        sortField,
        sortOrder
      );
      return res as {
        data: ILoggingCat9AndCat12Data[];
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
      };
    } catch (error: any) {
      return rejectWithValue(error || '');
    }
  }
);

const logcatSlice = createSlice({
  name: 'logcat',
  initialState,
  reducers: {
    resetLogCat1And4: (state) => {
      state.logcat1and4 = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
    resetLogCat5: (state) => {
      state.logcat5 = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
    resetLogCat7: (state) => {
      state.logcat7 = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
    resetLogCat9And12: (state) => {
      state.logcat9and12 = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogCat1AndCat4.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogCat1AndCat4.fulfilled, (state, action) => {
        state.loading = false;
        state.logcat1and4.push(...action.payload.data);
        state.page += 1;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchLogCat1AndCat4.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchLogCat5.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogCat5.fulfilled, (state, action) => {
        state.loading = false;
        state.logcat5.push(...action.payload.data);
        state.page += 1;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchLogCat5.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    
      builder
        .addCase(fetchLogCat7.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchLogCat7.fulfilled, (state, action) => {
          state.loading = false;
          state.logcat7.push(...action.payload.data);
          state.page += 1;
          state.hasMore = action.payload.hasMore;
        })
        .addCase(fetchLogCat7.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });

    builder
      .addCase(fetchLogCat9AndCat12.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogCat9AndCat12.fulfilled, (state, action) => {
        state.loading = false;
        state.logcat9and12.push(...action.payload.data);
        state.page += 1;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchLogCat9AndCat12.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  resetLogCat1And4,
  resetLogCat5,
  resetLogCat7,
  resetLogCat9And12,
} = logcatSlice.actions;

export default logcatSlice.reducer;
