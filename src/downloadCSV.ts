const downloadCSV = (data: any[], filename = "customers.csv") => {
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(","), // header row
    ...data.map(row => headers.map(field => JSON.stringify(row[field] ?? "")).join(","))
  ].join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
