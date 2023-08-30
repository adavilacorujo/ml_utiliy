// Function to check if conenction can be made to the ES server
const handleFetcher = async() => {

  let data = await fetch('api/verifyConnection', {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => data)
  .catch((error) => {
    console.log("Error getting the connection", error);
    return false;
  })
  return data;
}

export const VerifyElasticsearch = () => {
    const result = handleFetcher()
    .then((data) => {
        // Add option to options array
        if (data === true) {
          return true;
        }
        else { 
          return false; 
        }
    })
    return result;
}