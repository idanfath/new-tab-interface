/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleJsonFileImport = async (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result;
        if (typeof content !== "string") {
          throw new Error("Invalid file content");
        }
        const data = JSON.parse(content);
        if (typeof data !== "object" || data === null) {
          throw new Error("Invalid file content");
        }
        Object.entries(data).forEach(([key, value]) => {
          if (typeof value === "string") {
            try {
              const parsedValue = JSON.parse(value);
              data[key] = parsedValue;
            } catch {
              data[key] = value;
            }
          }
        });
        resolve(data);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error("Error reading file"));
    reader.readAsText(file);
  });
};

export const exportToJson = (data: any, filename: string) => {
  const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(data, null, 2)
  )}`;
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", filename);
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};
