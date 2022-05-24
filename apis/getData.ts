import axios from "axios";

const baseURL = "https://api.github.com/repos";

const getData = async function (user: string, repoName: string) {
  const response = await axios.get(
    `${baseURL}/${user}/${repoName}/commits`
  );
  return response.data;
};

export default getData;
