"use client";

import toast from "react-hot-toast";
import { useState } from "react";

import pdfMake, { vfs } from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.addVirtualFileSystem(pdfFonts);

const FormFakturka = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    generateInvoicePDF3();
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

  const generateInvoicePDF3 = () => {
    const docDefinition = {
      content: [
        { text: "Faktura VAT", style: "header" },

        { text: "Dane Sprzedawcy", style: "subheader" },
        { text: `Nazwa: ${nazwa_firmy}`, margin: [0, 2, 0, 2] },
        { text: `NIP: ${nip_firmy}`, margin: [0, 2, 0, 10] },

        { text: "Dane Kontrahenta", style: "subheader" },
        { text: `Nazwa: ${nazwa_kontrahenta}`, margin: [0, 2, 0, 2] },
        { text: `NIP: ${nip_kontrahenta}`, margin: [0, 2, 0, 10] },

        { text: "Szczegóły Faktury", style: "subheader" },
        { text: `Numer Faktury: ${numer_faktury}`, margin: [0, 2, 0, 2] },
        { text: `Data Wystawienia: ${data_faktury}`, margin: [0, 2, 0, 10] },

        {
          style: "tableExample",
          table: {
            widths: ["*", "auto", "auto", "auto"],
            body: [
              [
                { text: "Usługa", style: "tableHeader" },
                { text: "Kwota Netto", style: "tableHeader" },
                { text: "Stawka VAT", style: "tableHeader" },
                { text: "Kwota Brutto", style: "tableHeader" },
              ],
              [
                nazwa_uslugi,
                kwota_netto,
                `${parseFloat(stawka_vat) * 100}%`,
                (
                  parseFloat(kwota_netto) *
                  (1 + parseFloat(stawka_vat))
                ).toFixed(2), // Obliczona kwota brutto
              ],
            ],
          },
          layout: "lightHorizontalLines",
        },

        {
          text: "Dziękujemy za współpracę!",
          style: "footer",
          margin: [0, 20, 0, 0],
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          color: "white",
          fillColor: "#4CAF50",
          alignment: "center",
        },
        footer: {
          fontSize: 12,
          alignment: "center",
          italics: true,
        },
      },
    };

    pdfMake
      .createPdf(docDefinition)
      .download(`${nazwa_kontrahenta}_${numer_faktury}.pdf`);
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
