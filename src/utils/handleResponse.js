export const handleResponse = async (response) => {
  const jsonResponse = await response.json();

  return !response.ok ? Promise.reject(jsonResponse) : jsonResponse;
};
