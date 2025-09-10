import axiosConfig from "../../lib/axiosConfig";

const categoryNineAndCategoryTwelveApi = {
  getData: ({ date }: { date: string }) => {
    const url = `category-nine-and-category-twelve/get-data?Date=${date}`;
    return axiosConfig.get(url);
  },
};

export default categoryNineAndCategoryTwelveApi;
