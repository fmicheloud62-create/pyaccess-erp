export function getProducts() {
  if (typeof window === "undefined") return [];

  return JSON.parse(
    localStorage.getItem("products") || "[]"
  );
}

export function saveProducts(products) {
  localStorage.setItem(
    "products",
    JSON.stringify(products)
  );
}