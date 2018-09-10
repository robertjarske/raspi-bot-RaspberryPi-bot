import _ from 'lodash';

// export const apiCall = async (url) => {
//   const response = await fetch(url, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   const data = await response.json();

//   return data;
// };

const apiCall = async (url, subUrl, request) => {
  const fetchUrl = subUrl ? `${url}/${subUrl}` : url;


  const response = await fetch(fetchUrl, request);
  const data = await response.json();

  if (!response.ok) {
    return Promise.reject(data);
  }

  return Promise.resolve(data);
};

export const curriedApiCall = _.curry(apiCall);
