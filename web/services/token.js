const getToken = () => {
  let token = localStorage.getItem("ecoMarket");
  if(token) return JSON.parse(token)
  return null
};
const setToken = (token) => {
  localStorage.ecoMarket = JSON.stringify(token);
};
const clearToken = () => {
  localStorage.clear();
};

export { getToken, setToken, clearToken };
