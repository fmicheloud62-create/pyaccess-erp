export function getSales() {
  if (typeof window === "undefined") return [];

  return JSON.parse(
    localStorage.getItem("sales") || "[]"
  );
}

export function saveSales(sales) {
  localStorage.setItem(
    "sales",
    JSON.stringify(sales)
  );
}