"use client";

import toast from "react-hot-toast";
import { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const FormFakturka = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    generateInvoicePDF();
    toast.success("Udało się!");
  };

  // Declare state for all the form fields
  const [nip_kontrahenta, setNip] = useState("");
  const [nazwa_kontrahenta, setNazwaKontrahenta] = useState("");
  const [nazwa_uslugi, setNazwaUslugi] = useState("");
  const [kwota_netto, setKwotaNetto] = useState("");
  const [stawka_vat, setStawkaVat] = useState("");
  const [data_faktury, setDataFaktury] = useState("");
  const [nip_firmy, setNipFirmy] = useState(""); // "Mój NIP"
  const [nazwa_firmy, setNazwaFirmy] = useState(""); // "Nazwa firmy"
  const [numer_faktury, setNumerFaktury] = useState("");

  // Handle input changes for all fields
  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

  // Generate PDF after form submission
  const generateInvoicePDF = () => {
    const doc = new jsPDF();

    // Add the title with a larger font
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text(`Faktura VAT nr. ${numer_faktury}`, 105, 20, null, null, "center");

    // Add some space
    doc.setFontSize(14);
    doc.text(
      "------------------------------------------------------------",
      14,
      30
    );

    // Header Section: Your company details
    doc.setFont("helvetica", "normal");
    doc.text(`NIP firmy: ${nip_firmy}`, 14, 40);
    doc.text(`Nazwa firmy: ${nazwa_firmy}`, 14, 50);

    // Contractor's details section
    doc.text(`NIP kontrahenta: ${nip_kontrahenta}`, 14, 65);
    doc.text(`Nazwa kontrahenta: ${nazwa_kontrahenta}`, 14, 75);

    // Invoice details section
    doc.text(
      "------------------------------------------------------------",
      14,
      90
    );
    doc.text("Dane faktury:", 14, 100);

    // Use a table format for better readability of items (like a service)
    doc.autoTable({
      startY: 110,
      head: [["Nazwa serwisu", "Kwota netto", "Stawka VAT", "Kwota brutto"]],
      body: [
        [
          nazwa_uslugi,
          `${kwota_netto} PLN`,
          `${(stawka_vat * 100).toFixed(2)}%`,
          `${(parseFloat(kwota_netto) * (1 + parseFloat(stawka_vat))).toFixed(
            2
          )} PLN`,
        ],
      ],
      theme: "grid",
      headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255] },
      bodyStyles: { textColor: [50, 50, 50] },
      margin: { top: 30, left: 14, right: 14 },
    });

    // Calculate gross total
    const totalGross = (
      parseFloat(kwota_netto) *
      (1 + parseFloat(stawka_vat))
    ).toFixed(2);

    // Add total value
    doc.text(
      "------------------------------------------------------------",
      14,
      doc.lastAutoTable.finalY + 10
    );
    doc.text(
      `Suma brutto: ${totalGross} PLN`,
      14,
      doc.lastAutoTable.finalY + 20
    );

    // Footer Section (Invoice date)
    doc.text(
      "------------------------------------------------------------",
      14,
      doc.lastAutoTable.finalY + 30
    );
    doc.text(
      `Data faktury: ${data_faktury}`,
      14,
      doc.lastAutoTable.finalY + 40
    );

    // Add page number at the bottom (if required)
    doc.text(`Page ${doc.internal.getNumberOfPages()}`, 200, 290);

    // Save the generated PDF
    doc.save("invoice.pdf");
  };

  const generateInvoicePDF2 = () => {
    // Initialize the PDF document
    const doc = new jsPDF();

    // Common styling elements
    const margins = {
      left: 20,
      top: 20,
    };
    const lineHeight = 10;

    // Helper function to add text with consistent positioning
    const addTextLine = (text, lineNumber, fontSize = 12, isBold = false) => {
      doc.setFontSize(fontSize);
      if (isBold) doc.setFont(undefined, "bold");
      else doc.setFont(undefined, "normal");
      doc.text(text, margins.left, margins.top + lineNumber * lineHeight);
    };

    // Generate invoice number based on date if not provided
    const invoiceNumber = `INV/${new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "")}/1`;

    // Calculate totals - ensure numeric values
    const numericKwotaNetto = parseFloat(kwota_netto) || 0;
    const numericStawkaVat = parseFloat(stawka_vat) || 0;
    const vatAmount = numericKwotaNetto * numericStawkaVat;
    const grossAmount = numericKwotaNetto + vatAmount;

    // Title and header
    addTextLine("FAKTURA VAT", 0, 22, true);
    addTextLine(`Nr: ${invoiceNumber}`, 2, 14);
    addTextLine(
      `Data wystawienia: ${
        data_faktury || new Date().toISOString().slice(0, 10)
      }`,
      3,
      14
    );

    // Seller details
    addTextLine("Sprzedawca:", 5, 14, true);
    addTextLine(`${nazwa_firmy || ""}`, 6);
    addTextLine(`NIP: ${nip_firmy || ""}`, 7);
    addTextLine(`Adres: ul. Przykładowa 1, 00-000 Warszawa`, 8); // Placeholder address

    // Buyer details
    addTextLine("Nabywca:", 10, 14, true);
    addTextLine(`${nazwa_kontrahenta || ""}`, 11);
    addTextLine(`NIP: ${nip_kontrahenta || ""}`, 12);
    addTextLine(`Adres: ul. Odbiorcza 2, 00-000 Warszawa`, 13); // Placeholder address

    // Service details
    addTextLine("Szczegóły usługi:", 15, 14, true);
    addTextLine(`Nazwa usługi: ${nazwa_uslugi || ""}`, 16);

    // Financial details with formatting
    addTextLine("Podsumowanie:", 18, 14, true);
    addTextLine(`Kwota netto: ${numericKwotaNetto.toFixed(2)} PLN`, 19);
    addTextLine(`Stawka VAT: ${(numericStawkaVat * 100).toFixed(0)}%`, 20);
    addTextLine(`Kwota VAT: ${vatAmount.toFixed(2)} PLN`, 21);
    addTextLine(`Suma brutto: ${grossAmount.toFixed(2)} PLN`, 22, 14, true);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(
      `Wygenerowano: ${new Date().toLocaleDateString()}`,
      margins.left,
      doc.internal.pageSize.height - 10
    );

    // Add payment details
    addTextLine("Forma płatności: Przelew bankowy", 24, 12);
    addTextLine(`Termin płatności: 14 dni od daty wystawienia`, 25, 12);

    // Save the PDF
    doc.save("faktura.pdf");
  };

  return (
    <form
      className="bg-base-300 p-8 rounded-3xl space-y-8 max-w-2xl mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-center gap-7">
        <div className="space-y-4">
          {/* Mój NIP */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Mój NIP</span>
            </div>
            <input
              required
              type="text"
              placeholder="967-92-38-136"
              className="input input-bordered w-full max-w-xs"
              value={nip_firmy}
              onChange={(event) => handleChange(event, setNipFirmy)}
            />
          </label>

          {/* Nazwa firmy */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Nazwa firmy</span>
            </div>
            <input
              required
              type="text"
              placeholder="Moja Firma Sp. z o.o."
              className="input input-bordered w-full max-w-xs"
              value={nazwa_firmy}
              onChange={(event) => handleChange(event, setNazwaFirmy)}
            />
          </label>

          {/* NIP kontrahenta */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">NIP kontrahenta</span>
            </div>
            <input
              required
              type="text"
              placeholder="967-92-38-136"
              className="input input-bordered w-full max-w-xs"
              value={nip_kontrahenta}
              onChange={(event) => handleChange(event, setNip)}
            />
          </label>

          {/* Nazwa kontrahenta */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Nazwa kontrahenta</span>
            </div>
            <input
              required
              type="text"
              placeholder="Kowalski Big Biznes Sp. z o. o."
              className="input input-bordered w-full max-w-xs"
              value={nazwa_kontrahenta}
              onChange={(event) => handleChange(event, setNazwaKontrahenta)}
            />
          </label>

          {/* Nazwa usługi */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Nazwa usługi</span>
            </div>
            <input
              required
              type="text"
              placeholder="Sprzedaż oprogramowania"
              className="input input-bordered w-full max-w-xs"
              value={nazwa_uslugi}
              onChange={(event) => handleChange(event, setNazwaUslugi)}
            />
          </label>
        </div>

        <div className="space-y-4">
          {/* Numer faktury */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Numer faktury</span>
            </div>
            <input
              required
              type="text"
              placeholder="2025/5/1"
              className="input input-bordered w-full max-w-xs"
              value={numer_faktury}
              onChange={(event) => handleChange(event, setNumerFaktury)}
            />
          </label>
          {/* Kwota netto */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Kwota netto</span>
            </div>
            <input
              required
              type="number"
              placeholder="1000.50"
              step="0.01"
              min="0"
              className="input input-bordered w-full max-w-xs"
              value={kwota_netto}
              onChange={(event) => handleChange(event, setKwotaNetto)}
            />
          </label>

          {/* Stawka VAT */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Stawka % VAT</span>
            </div>
            <input
              required
              type="number"
              placeholder="0.23"
              step="0.01"
              min="0"
              max="1"
              className="input input-bordered w-full max-w-xs"
              value={stawka_vat}
              onChange={(event) => handleChange(event, setStawkaVat)}
            />
          </label>

          {/* Data na fakturze */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Data na fakturze</span>
            </div>
            <input
              required
              type="date"
              className="input input-bordered w-full max-w-xs"
              value={data_faktury}
              onChange={(event) => handleChange(event, setDataFaktury)}
            />
          </label>
        </div>
      </div>

      <button className="btn btn-primary mt-6 w-full" type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
        Pobierz PDF
      </button>
    </form>
  );
};

export default FormFakturka;
