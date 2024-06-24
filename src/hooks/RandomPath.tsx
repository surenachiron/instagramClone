const RandomPath = (path: string) => {
  const fileExt = path.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;
  return filePath;
};

export default RandomPath;
