export const logger = (file?: string, method?: string, message?: any) => {
  const payload = {
    file: file,
    function: method,
    message: message,
  };

  console.debug(payload);
};
