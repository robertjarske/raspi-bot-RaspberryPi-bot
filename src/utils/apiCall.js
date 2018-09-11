import _ from 'lodash';

const apiCall = async (url, subUrl, request) => {
  const fetchUrl = subUrl ? `${url}/${subUrl}` : url;


  const response = await fetch(fetchUrl, request);
  const data = await response.json();

  if (!response.ok) {
    return Promise.reject(data);
  }

  return data;
};

export const curriedApiCall = _.curry(apiCall);
