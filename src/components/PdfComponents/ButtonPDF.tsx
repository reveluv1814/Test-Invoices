import { BlobProvider } from "@react-pdf/renderer";
import type { Invoice } from "../../types";
import Template from "./Template";
import "./ButtonPDF.css";

const ButtonPDF = ({ data }: { data: Invoice }) => {
  return (
    <>
      <BlobProvider document={<Template data={data} />}>
        {({ blob, loading }) => {
          const handleOpenPDF = () => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              window.open(url, "_blank");

              setTimeout(() => URL.revokeObjectURL(url), 100);
            }
          };

          return (
            <button
              className="btn-pdf"
              onClick={handleOpenPDF}
              disabled={loading}
            >
              <i className="ri-file-pdf-line" />
              {loading ? "Generando..." : "Ver PDF"}
            </button>
          );
        }}
      </BlobProvider>
    </>
  );
};

export default ButtonPDF;
