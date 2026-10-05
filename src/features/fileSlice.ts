import { createSlice } from '@reduxjs/toolkit';
import fileManagementApi from '../api/filemanagement';
import type { IFileManagement } from '../types/filemanagement';
import { addLoadingMatchers, createApiThunk } from './helpers';

/** Backend reply for actions that only report success or failure. */
type StatusResponse = { statusCode: number; message: string };

type GenerateExcelArgs = Parameters<
  typeof fileManagementApi.generateFileExcel
>[0];
type PreviewPayloadArgs = Parameters<
  typeof fileManagementApi.previewPayload
>[0];

interface FileState {
  file: IFileManagement[];
  loading: boolean;
  error: string | null;
}

const initialState: FileState = {
  file: [],
  loading: false,
  error: null,
};

export const getData = createApiThunk<
  { data: IFileManagement[] },
  Parameters<typeof fileManagementApi.getData>[0]
>('file/get-data', fileManagementApi.getData);

/** Queues an Excel export on the server; the file appears in File Management when ready. */
export const generateFileExcel = createApiThunk<
  StatusResponse,
  GenerateExcelArgs
>('file/generate-file-excel', fileManagementApi.generateFileExcel);

export const previewPayload = createApiThunk<
  StatusResponse,
  PreviewPayloadArgs
>('file/preview-payload', fileManagementApi.previewPayload);

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.file = action.payload.data;
    });

    addLoadingMatchers(builder, getData);
  },
});

export default fileSlice.reducer;
