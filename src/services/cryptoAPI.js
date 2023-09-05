import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const cryptoApiheaders = {
    'X-RapidAPI-Key': '8022751355mshc50e37ae535aa75p1c792ajsn6e1f7f478a91',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'

}

const createRequest = (url) => ({url,headers: cryptoApiheaders}) 


export const cryptoApi = createApi({
  reducerPath: "crypto",
  baseQuery: fetchBaseQuery({ baseUrl: 'https://coinranking1.p.rapidapi.com' }),

  endpoints: (builder) => ({
    getCrypto: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query:(coinId) => createRequest(`/coin/${coinId}`),

    }),
    getCryptoHistory: builder.query({
      query:({coinId,timeperiod}) => createRequest(`/coin/${coinId}/history/?timeperiod=${timeperiod}`),

    }),
    getCryptoExchangeDetails: builder.query({
      query:({coinId,count}) => createRequest(`/coin/${coinId}/exchanges`),

    }),
  }),
});

export const {  useGetCryptoQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery,useGetCryptoExchangeDetailsQuery} = cryptoApi;




// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// const cryptoApiheaders = {
//     'X-RapidAPI-Key': '8022751355mshc50e37ae535aa75p1c792ajsn6e1f7f478a91',
//     'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'

// }

// const baseUrl = 'https://coinranking1.p.rapidapi.com'
// const createRequest = (url) => ({url,headers: cryptoApiheaders}) 

// export const cryptoApi = createApi({

//     reducerPath:'crypto',
//     baseQuery : fetchBaseQuery({baseUrl}),
//     endpoints: (builder) => ({
//         getCrypto : builder.query({
//             query: () => createRequest('/coins')
//         })

//     }),
// });

// export const{ useGetCryptosQuery} = cryptoApi;

// // const options = {
// //   method: 'GET',
// //   url: 'https://coinranking1.p.rapidapi.com/coins',
// //   params: {
// //     referenceCurrencyUuid: 'yhjMzLPhuIDl',
// //     timePeriod: '24h',
// //     'tiers[0]': '1',
// //     orderBy: 'marketCap',
// //     orderDirection: 'desc',
// //     limit: '50',
// //     offset: '0'
// //   },
// //   headers: {
// //     'X-RapidAPI-Key': '8022751355mshc50e37ae535aa75p1c792ajsn6e1f7f478a91',
// //     'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
// //   }
// // };
