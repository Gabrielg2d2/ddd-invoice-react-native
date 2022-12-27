import { ModelPostInvoice } from "../../../../../domain/layers/invoice/models/model-post-invoices";
import { PostProps } from "../../../../../domain/layers/invoice/usecases/post-invoices";
import { dataInvoiceMockFormattedDate } from "../../mock/data/invoices";
import { MainFilterInvoicesSpy } from "./mainSpy";

describe("Main integration - Invoice", () => {
  it("should return an object with status 200, test integration", async () => {
    const urlSpy = "http://localhost:3001/invoices";
    const bodyFilterSpy = {
      name: "name filter spy",
      numberInvoice: "123456",
      date: "2021-01-01",
    };

    async function methodPostSpy({
      url,
      bodyFilter,
    }: PostProps): Promise<ModelPostInvoice> {
      try {
        const response = await fetch(url);
        const data = await response.json();

        return {
          data,
          status: 200,
          error: null,
        };
      } catch (error) {
        return {
          data: [],
          status: 500,
          error,
        };
      }
    }

    const mainFilterInvoicesSpy = new MainFilterInvoicesSpy({
      url: urlSpy,
      bodyFilter: bodyFilterSpy,
      methodPost: methodPostSpy,
    });

    const responseMainFilterInvoicesSpy =
      await mainFilterInvoicesSpy.getInvoices();

    expect(responseMainFilterInvoicesSpy).toEqual({
      status: 200,
      data: dataInvoiceMockFormattedDate,
      error: null,
    });
  });
});
