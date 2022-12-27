import { makeSutFormatDataInvoice } from "../../../makeSut";
import { dataInvoiceMockFormattedDate } from "../../../mock/data/invoices";

describe("formatDataInvoice", () => {
  it("should return the formatted date", () => {
    const { result } = makeSutFormatDataInvoice();

    expect(result).toEqual(dataInvoiceMockFormattedDate);
  });

  it("should return invalid date", () => {
    const { formatDataInvoiceSpy } = makeSutFormatDataInvoice();

    const result = formatDataInvoiceSpy.formatDataDefault("invoice_date");

    expect(result).toEqual("invalid date");
  });
});
