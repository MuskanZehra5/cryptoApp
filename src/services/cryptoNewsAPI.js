import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const cryptoNewsApiheaders = {
  'X-BingApis-SDK': 'true',
  'X-RapidAPI-Key': '8022751355mshc50e37ae535aa75p1c792ajsn6e1f7f478a91',
  'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'

}

const createRequest = (url) => ({url,headers: cryptoNewsApiheaders}) 


export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNews",
  baseQuery: fetchBaseQuery({ baseUrl:'https://bing-news-search1.p.rapidapi.com' }),

  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({newsCategory,count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
    }),
    
  }),
});

export const {  useGetCryptoNewsQuery } = cryptoNewsApi;



