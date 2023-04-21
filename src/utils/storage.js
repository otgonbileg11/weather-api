export function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getData(key) {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return undefined;
}

export function deleteData(key) {
  localStorage.removeItem(key);
}
