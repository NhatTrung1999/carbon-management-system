import axiosConfig from '../../lib/axiosConfig';

const fileManagementApi = {
  getData: async ({
    module,
    file_name,
  }: {
    module: string;
    file_name: string;
  }) => {
    const url = `filemanagement/get-data?Module=${module}&File_Name=${file_name}`;
    const res = await axiosConfig.get(url);
    return res.data;
  },
  downloadFile: async (id: string) => {
    const url = `filemanagement/download/${id}`;
    const res = await axiosConfig.get(url, { responseType: 'blob' });
    return res.data;
  },
};

export default fileManagementApi;
