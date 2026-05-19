export function getCashMovements() {

  if (typeof window === "undefined")
    return [];

  return JSON.parse(
    localStorage.getItem("cash") || "[]"
  );
}

export function saveCashMovements(
  movements
) {

  localStorage.setItem(
    "cash",
    JSON.stringify(movements)
  );
}