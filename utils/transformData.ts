import commit from "../models/commit";
import transformedData from "../models/transformedData";

const transformData = (data: commit): transformedData => {
  const newData = {
    author: data.commit.author.name,
    date: new Date(data.commit.author.date),
    message: data.commit.message,
  };

  return newData;
};

export default transformData;
