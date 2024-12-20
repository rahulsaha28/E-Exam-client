import React from "react";
import PdfModal from "../../components/PdfModal/PdfModal";
import { useMobileMenuActive } from "../../Store/Store";

const Pdf = () => {
  const { mobileMenuActive } = useMobileMenuActive((state) => state);
  return (
    <div
      className={`h-screen ${mobileMenuActive ? "pt-56" : "pt-20"}  md:pt-20`}
    >
      <PdfModal />
    </div>
  );
};

export default Pdf;
