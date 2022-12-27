import { useEffect, useState } from "react";
import { MainFilterInvoices } from "../../../../data/layers/invoices/usecases/filter-invoices/main";
import { BodyFilterProps } from "../../../../domain/layers/invoice/usecases/filter-Invoices";
import { DataFormatFormatted } from "../../../../domain/layers/invoice/usecases/format-data-invoices";
import { methodPost } from "../services/postInvoices";

export const useHome = () => {
  const [invoices, setInvoices] = useState<DataFormatFormatted[]>([]);
  const [bodyFilter] = useState<BodyFilterProps>({
    name: "",
    numberInvoice: "",
    date: "",
  });

  const mainFilterInvoices = new MainFilterInvoices({
    url: "http://localhost:3334/invoices",
    bodyFilter,
    methodPost,
  });

  useEffect(() => {
    (async () => {
      const response = await mainFilterInvoices.getInvoices();

      setInvoices(response.data);
    })();
  }, []);

  return {
    invoices,
  };
};
