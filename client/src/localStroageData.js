export function setLocalData(data) {
  localStorage.setItem("FormData", JSON.stringify(data));
}

export function getLocalData() {
  const forms = localStorage.getItem("FormData");
  if (forms) {
    try {
      return JSON.parse(forms); // Parse and return the data
    } catch {
      return [];
    }
  }
  return [];
}
