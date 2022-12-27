import { dataInvoiceMock } from "../../../mock/data/invoices";
import { makeSutPostInvoice } from "../../../makeSut";

describe("PostInvoice", () => {
  it("should return an object with status 200, dataInvoiceMock and error null", async () => {
    const {
      urlSpy,
      bodyFilterSpy,
      methodPostSpy,
      postInvoiceNewSpy,
      responsePostInvoiceNewSpy,
    } = makeSutPostInvoice();

    expect(postInvoiceNewSpy.post).toBeTruthy();
    expect(methodPostSpy).toHaveBeenCalledWith({
      url: urlSpy,
      bodyFilter: bodyFilterSpy,
    });
    expect(responsePostInvoiceNewSpy).toEqual(
      Promise.resolve({
        status: 200,
        data: dataInvoiceMock,
        error: null,
      })
    );
  });

  it("must return a promise with status other than 400", async () => {
    const {
      urlSpy,
      bodyFilterSpy,
      methodPostSpy,
      postInvoiceNewSpy,
      responsePostInvoiceNewSpy,
    } = makeSutPostInvoice({
      status: 400,
      data: [],
      error: "error",
    });

    expect(postInvoiceNewSpy.post).toBeTruthy();
    expect(methodPostSpy).toHaveBeenCalledWith({
      url: urlSpy,
      bodyFilter: bodyFilterSpy,
    });
    expect(responsePostInvoiceNewSpy).toEqual(
      Promise.resolve({
        status: 400,
        data: [],
        error: "error",
      })
    );
  });
});
