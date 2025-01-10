import NavigationBar from "../compenent/layout/NavigationBar";
import Sidebar from "./Sidebar";
import React, { useEffect, useState } from "react";
import classes from "./ShowPdfResidanat.module.css";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { Document, Page } from "react-pdf";
import useLocalStorage from "use-local-storage";
import sjtresidanat from "../compenent/layout/pdf/sjtresidanat.pdf";

/* This is required only if the project file is located 
inside the app. Otherwise you can use the external link of the pdf file*/
function ShowPdfResidanat(props) {
  const [isDark, setIsDark] = useLocalStorage("isDark", false);
  //******SideBare Change************************************* */
  const [ShowSideBare, setShowSideBare] = useState(false);
  function etatsidebare(etat) {
    setShowSideBare(etat);
  }
  //************************************************************* */
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  /******************************************************************* */
  //************************************************************************ */
  const disableCopyPaste = (e) => {
    e.preventDefault();
  };
  //*********************************************************************** */
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  useEffect(() => {}, []);

  const prevPage = () => {
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);
  };
  const nextPage = () => {
    setPageNumber(pageNumber + 1 >= numPages ? pageNumber : pageNumber + 1);
  };

  return (
    <>
      <NavigationBar changeetatsidebar={etatsidebare} />
      <div className={classes.addingdiv}>
        <div className={classes.sidebare}>{ShowSideBare && <Sidebar />}</div>
        {isDesktopOrLaptop && (
          <div
            className={classes.contanerspace}
            data-theme={isDark ? "dark" : "light"}
          >
            <div className="d-flex align-items-center justify-content-center flex-column">
              <div className={classes.documentdiv}>
                <Document
                  file={sjtresidanat}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <div className={classes.documentpage}>
                    {Array.apply(null, Array(numPages))
                      .map((x, i) => i + 1)
                      .map((page) => {
                        return (
                          <Page
                            width={1000}
                            pageNumber={page}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                          />
                        );
                      })}
                  </div>
                </Document>
              </div>
            </div>
          </div>
        )}
        {isTabletOrMobile && (
          <div
            className={classes.contanerspace_phone}
            data-theme={isDark ? "dark" : "light"}
          >
            <div className="d-flex align-items-center justify-content-center flex-column">
              <div className={classes.documentdiv_phone}>
                <Document
                  file={sjtresidanat}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <div className={classes.documentpage_phone}>
                    {Array.apply(null, Array(numPages))
                      .map((x, i) => i + 1)
                      .map((page) => {
                        return (
                          <Page
                            width={300}
                            pageNumber={page}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                          />
                        );
                      })}
                  </div>
                </Document>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default ShowPdfResidanat;
