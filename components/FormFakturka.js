"use client";

import toast from "react-hot-toast";
import { useState } from "react";

import pdfMake, { vfs } from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { endOfMonth, subMonths, getISOWeek, format } from "date-fns";

pdfMake.addVirtualFileSystem(pdfFonts);

// 11:17

const FormFakturka = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Robimy to ...");
    generateInvoicePDF();
    toast.success("💵💵💵 Udało się! 💵💵💵");
  };

  const handleFillLagrima = (event) => {
    const weekNumber = getISOWeek(new Date());
    const lastMonthDate = endOfMonth(subMonths(new Date(), 1));
    setFormData({
      ...formData,
      nip_kontrahenta: "8381741305",
      nazwa_kontrahenta: "Lagrima Sp. z o. o.",
      nazwa_uslugi:
        "Software Management - HubSpot, websites, internal processes",
      kwota_netto: 4000,
      stawka_vat: 0.23,
      data_faktury: format(lastMonthDate, "yyyy-MM-dd"),
      nip_firmy: "9671438426",
      nazwa_firmy: "Artur Lazoryk Business Advisory",
      numer_faktury: `2025/${weekNumber}/1`,
    });
  };

  const [formData, setFormData] = useState({
    nip_kontrahenta: "",
    nazwa_kontrahenta: "",
    nazwa_uslugi: "",
    kwota_netto: "",
    stawka_vat: "",
    data_faktury: "",
    nip_firmy: "",
    nazwa_firmy: "",
    numer_faktury: "",
  });

  const handleRealChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const generateInvoicePDF = () => {
    const docDefinition = {
      content: [
        { text: `Faktura VAT ${formData.numer_faktury}`, style: "header" },

        { text: "Dane Sprzedawcy", style: "subheader" },
        { text: `Nazwa: ${formData.nazwa_firmy}`, margin: [0, 2, 0, 2] },
        { text: `NIP: ${formData.nip_firmy}`, margin: [0, 2, 0, 10] },

        { text: "Dane Kontrahenta", style: "subheader" },
        { text: `Nazwa: ${formData.nazwa_kontrahenta}`, margin: [0, 2, 0, 2] },
        { text: `NIP: ${formData.nip_kontrahenta}`, margin: [0, 2, 0, 10] },

        { text: "Szczegóły Faktury", style: "subheader" },
        {
          text: `Numer Faktury: ${formData.numer_faktury}`,
          margin: [0, 2, 0, 2],
        },
        {
          text: `Data Wystawienia: ${formData.data_faktury}`,
          margin: [0, 2, 0, 10],
        },

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
                formData.nazwa_uslugi,
                formData.kwota_netto,
                `${parseFloat(formData.stawka_vat) * 100}%`,
                (
                  parseFloat(formData.kwota_netto) *
                  (1 + parseFloat(formData.stawka_vat))
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
    console.log("Generating PDF...");

    pdfMake
      .createPdf(docDefinition)
      .download(`${formData.nazwa_kontrahenta}_${formData.numer_faktury}.pdf`);
  };

  return (
    <div className="lg:flex space-y-5 gap-3">
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
                name="nip_firmy"
                value={formData.nip_firmy}
                onChange={handleRealChange}
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
                name="nazwa_firmy"
                value={formData.nazwa_firmy}
                onChange={handleRealChange}
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
                name="nip_kontrahenta"
                value={formData.nip_kontrahenta}
                onChange={handleRealChange}
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
                name="nazwa_kontrahenta"
                value={formData.nazwa_kontrahenta}
                onChange={handleRealChange}
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
                name="nazwa_uslugi"
                value={formData.nazwa_uslugi}
                onChange={handleRealChange}
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
                name="numer_faktury"
                value={formData.numer_faktury}
                onChange={handleRealChange}
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
                name="kwota_netto"
                value={formData.kwota_netto}
                onChange={handleRealChange}
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
                name="stawka_vat"
                value={formData.stawka_vat}
                onChange={handleRealChange}
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
                name="data_faktury"
                value={formData.data_faktury}
                onChange={handleRealChange}
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
      <button onClick={handleFillLagrima} className="btn btn-secondary">
        Fill Lagrima
      </button>
    </div>
  );
};

export default FormFakturka;
