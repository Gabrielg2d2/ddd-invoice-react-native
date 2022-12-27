import { dataInvoiceMock } from "../mock/data/invoices";
import { FormatDataInvoiceSpy } from "../usecases/filter-invoices/format-data-invoice/formatDataInvoiceSpy";
import { MainFilterInvoicesSpy } from "../usecases/filter-invoices/mainSpy";
import { PostInvoiceSpy } from "../usecases/filter-invoices/post-invoices/postInvoiceSpy";

type SutMainInvoiceProps = {
  data?: Array<any> | [];
  status?: number;
  error?: any;
};

const makeSutMainInvoice = async (props: SutMainInvoiceProps) => {
  const data = props.data ?? [];
  const status = props.status ?? 200;
  const error = props.error ?? null;

  const urlSpy = "http://localhost:8888/invoices";
  const bodyFilterSpy = {
    name: "name filter spy",
    numberInvoice: "123456",
    date: "2021-01-01",
  };

  const methodPostSpy = jest.fn().mockResolvedValue({
    status,
    data,
    error,
  });

  const mainFilterInvoicesSpy = new MainFilterInvoicesSpy({
    url: urlSpy,
    bodyFilter: bodyFilterSpy,
    methodPost: methodPostSpy,
  });

  const responseMainFilterInvoicesSpy =
    await mainFilterInvoicesSpy.getInvoices();

  return {
    urlSpy,
    bodyFilterSpy,
    methodPostSpy,
    data,
    status,
    error,
    responseMainFilterInvoicesSpy,
  };
};

type SutPostInvoiceProps = {
  status: number;
  data: any;
  error: any;
};

const makeSutPostInvoice = (props?: SutPostInvoiceProps) => {
  const status = props?.status ?? 200;
  const data = props?.data ?? dataInvoiceMock;
  const error = props?.error ?? null;

  const urlSpy = "http://localhost:8888/invoices";
  const bodyFilterSpy = {
    name: "name filter spy",
    numberInvoice: "123456",
    date: "2021-01-01",
  };

  const methodPostSpy = jest.fn().mockResolvedValue({
    status,
    data,
    error,
  });

  const postInvoiceNewSpy = new PostInvoiceSpy();

  const responsePostInvoiceNewSpy = postInvoiceNewSpy.post({
    url: urlSpy,
    bodyFilter: bodyFilterSpy,
    methodPost: methodPostSpy,
  });

  return {
    urlSpy,
    bodyFilterSpy,
    methodPostSpy,
    postInvoiceNewSpy,
    responsePostInvoiceNewSpy,
    statusSpy: status,
    dataSpy: data,
    errorSpy: null,
  };
};

const makeSutFormatDataInvoice = () => {
  const formatDataInvoiceSpy = new FormatDataInvoiceSpy();

  const result = formatDataInvoiceSpy.execute(dataInvoiceMock);

  return {
    formatDataInvoiceSpy,
    result,
  };
};

export { makeSutMainInvoice, makeSutPostInvoice, makeSutFormatDataInvoice };
