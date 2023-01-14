
export const makeRequest = async (route, method, body, authToken) => {
  const baseParams = {
    method,
    headers: {
      'Content-type': 'application/json',
    },
  };

  if (authToken !== undefined) {
    baseParams.headers.Authorization = `Bearer ${authToken}`;
  }

  if (body !== undefined) {
    baseParams.body = JSON.stringify(body)
  }

  const response = await fetch('http://localhost:5005/' + route, baseParams)

  return await response.json();
}

export function fileToDataUrl (file) {
  const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg']
  const valid = validFileTypes.find(type => type === file.type);
  // Bad data, let's walk away.
  if (!valid) {
    throw Error('provided file is not a png, jpg or jpeg image.');
  }
  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
}
