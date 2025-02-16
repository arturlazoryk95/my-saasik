"use client";

import jsPDF from "jspdf";
import "jspdf-autotable";

const generateInvoicePDF = () => {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.width; // Get page width

  // Title (Centered)
  doc.setFontSize(18);
  doc.text("Invoice", pageWidth / 2, 20, { align: "center" });

  // Invoice Number (Centered)
  doc.setFontSize(12);
  const invoiceText = "Invoice #: 12345";
  const textWidth = doc.getTextWidth(invoiceText); // Get text width
  doc.text(invoiceText, (pageWidth - textWidth) / 2, 30); // Centered

  // Invoice Details (Left-aligned)
  doc.text("Date: 2024-02-16", 14, 40);
  doc.text("Customer: John Doe", 14, 50);

  // Table Data
  const tableColumn = ["Item", "Quantity", "Price", "Total"];
  const tableRows = [
    ["Product 1", "2", "$50", "$100"],
    ["Product 2", "1", "$75", "$75"],
    ["Product 3", "3", "$20", "$60"],
  ];

  // Adding table
  doc.autoTable({
    startY: 60,
    head: [tableColumn],
    body: tableRows,
  });

  // Total Amount
  doc.setFontSize(14);
  doc.text("Total: $235", 14, doc.lastAutoTable.finalY + 10);

  // Save PDF
  doc.save("invoice.pdf");
};

const ButtonSavePdf = () => {
  return (
    <button className="btn btn-error" onClick={generateInvoicePDF}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="size-5"
      >
        <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
        <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
      </svg>
      Save PDF
    </button>
  );
};

export default ButtonSavePdf;
