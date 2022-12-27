import { makeSutMainInvoice } from "../../makeSut";
import {
  dataInvoiceMock,
  dataInvoiceMockFormattedDate,
} from "../../mock/data/invoices";
import { MainFilterInvoicesSpy } from "./mainSpy";

describe("Main - Invoice", () => {
  it("should return an object with status 200, dataInvoiceMockFormattedDate and error null", async () => {
    const { responseMainFilterInvoicesSpy } = await makeSutMainInvoice({
      status: 200,
      error: null,
      data: dataInvoiceMock,
    });

    expect(responseMainFilterInvoicesSpy).toEqual({
      status: 200,
      data: dataInvoiceMockFormattedDate,
      error: null,
    });
  });

  it("should return an object with status 400, data with array empty and error 'error'", async () => {
    const { responseMainFilterInvoicesSpy } = await makeSutMainInvoice({
      status: 400,
      error: "error",
      data: [],
    });

    expect(responseMainFilterInvoicesSpy).toEqual({
      status: 400,
      data: [],
      error: "error",
    });
  });

  it("should return an object with status 500, data with array empty and error 'error'", async () => {
    const urlSpy = "http://localhost:3000/invoices";
    const bodyFilterSpy = {
      name: "name filter spy",
      numberInvoice: "123456",
      date: "2021-01-01",
    };

    const methodPostSpy = jest.fn().mockRejectedValue({
      status: 500,
      data: [],
      error: "error",
    });

    const mainFilterInvoicesSpy = new MainFilterInvoicesSpy({
      url: urlSpy,
      bodyFilter: bodyFilterSpy,
      methodPost: methodPostSpy,
    });

    const responseMainFilterInvoicesSpy =
      await mainFilterInvoicesSpy.getInvoices();

    expect(responseMainFilterInvoicesSpy).toEqual({
      status: 500,
      data: [],
      error: null,
    });
  });
});
