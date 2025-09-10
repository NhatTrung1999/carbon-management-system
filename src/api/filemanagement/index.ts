import axiosConfig from "../../lib/axiosConfig";

const fileManagementApi = {
  getData: ({ module, file_name }: { module: string; file_name: string }) => {
    const url = `filemanagement/get-data?Module=${module}&File_Name=${file_name}`;
    return axiosConfig.get(url);
  },
};

export default fileManagementApi;
