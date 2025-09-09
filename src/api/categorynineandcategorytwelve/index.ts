import axiosConfig from "../../lib/axiosConfig";

const categoryNineAndCategoryTwelveApi = {
  getData: ({ module, file_name }: any) => {
    const url = "category-nine-and-category-twelve/get-data";
    return axiosConfig.post(url, {
      module,
      file_name,
    });
  },
};

export default categoryNineAndCategoryTwelveApi;
