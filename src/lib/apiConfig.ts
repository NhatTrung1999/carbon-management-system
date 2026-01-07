type apiConfigAttribute = {
  baseUrl: string;
};

const apiConfig: apiConfigAttribute = {
  baseUrl: import.meta.env.VITE_URLS,
};

const apiCmsConfig: apiConfigAttribute = {
  baseUrl: import.meta.env.VITE_CMS_API,
};

export { apiConfig, apiCmsConfig };
