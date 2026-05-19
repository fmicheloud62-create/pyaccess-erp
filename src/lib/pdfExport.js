import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

export function exportSalePDF(
  sale
) {

  const doc = new jsPDF();

  doc.setFontSize(22);

  doc.text(
    "PyAccess ERP",
    14,
    20
  );

  doc.setFontSize(12);

  doc.text(
    `Ticket #${sale.id}`,
    14,
    30
  );

  doc.text(
    `Fecha: ${sale.date}`,
    14,
    38
  );

  autoTable(doc, {

    startY: 50,

    head: [
      [
        "Producto",
        "Cantidad",
        "Precio",
      ],
    ],

    body: sale.items.map(
      (item) => [
        item.name,
        item.quantity,
        `$${item.price}`,
      ]
    ),
  });

  doc.text(
    `TOTAL: $${sale.total}`,
    14,
    doc.lastAutoTable.finalY + 20
  );

  doc.save(
    `ticket-${sale.id}.pdf`
  );
}