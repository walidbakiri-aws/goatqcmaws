import React, { useEffect, useState, useRef } from "react";
import NavigationBar from "../compenent/layout/NavigationBar";
import Sidebar from "./Sidebar";
import classes from "./ShowPdfResidanat.module.css";
import { useMediaQuery } from "react-responsive";

import { Document, Page } from "react-pdf";
import useLocalStorage from "use-local-storage";
import { useLocation, useNavigate } from "react-router-dom";
import Sujet_Résidanat_Clinique from "../compenent/layout/pdf/Sujet_Résidanat_Clinique.pdf";
import Sujet_Résidanat_Fondamentaux from "../compenent/layout/pdf/Sujet_Résidanat_Fondamentaux.pdf";
import Sujet_Externat_Partie_01 from "../compenent/layout/pdf/Sujet_Externat_Partie_01.pdf";
import Sujet_Externat_Partie_02 from "../compenent/layout/pdf/Sujet_Externat_Partie_02.pdf";
import Sujet_Résidanat_2010_2024 from "../compenent/layout/pdf/Sujet_Résidanat_2010_2024.pdf";
import Sujet_Résidanat_2015_2024 from "../compenent/layout/pdf/Sujet_Résidanat_2015_2024.pdf";
import Sujet_Rattrapage from "../compenent/layout/pdf/Sujet_Rattrapage.pdf";

const pdfMap = {
  Sujet_Résidanat_Clinique: Sujet_Résidanat_Clinique,
  Sujet_Résidanat_Fondamentaux: Sujet_Résidanat_Fondamentaux,
  Sujet_Externat_Partie_01: Sujet_Externat_Partie_01,
  Sujet_Externat_Partie_02: Sujet_Externat_Partie_02,
  Sujet_Résidanat_2010_2024: Sujet_Résidanat_2010_2024,
  Sujet_Résidanat_2015_2024: Sujet_Résidanat_2015_2024,
  Sujet_Rattrapage: Sujet_Rattrapage,
};

function ShowPdfResidanat() {
  const [startWithRattrapage, setStartWithRattrapage] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [sjtresidanat, setSjtresidanat] = useState(null);
  const [isDark] = useLocalStorage("isDark", false);
  const [ShowSideBare, setShowSideBare] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const pdfContainerRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  //************************************************************* */
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  /******************************************************************* */

  // Handle missing state
  useEffect(() => {
    if (!state?.sjetResidant) {
      navigate("/");
      return;
    }

    const pdfPath = pdfMap[state.sjetResidant];

    if (state.sjetResidant?.startsWith("Rattrapage")) {
      setStartWithRattrapage(true);
    } else {
      setStartWithRattrapage(false);
    }

    if (pdfPath) {
      setSjtresidanat(pdfPath);
    } else {
      console.error("PDF not found for:", state.sjetResidant);
    }
  }, [state, navigate]);

  // Disable context menu and text selection
  useEffect(() => {
    const disableContextMenu = (e) => {
      e.preventDefault();
    };

    const disableTextSelection = (e) => {
      if (e.target.closest(`.${classes.pdfPage}`)) {
        e.preventDefault();
      }
    };

    const container = pdfContainerRef.current;
    if (container) {
      container.addEventListener("contextmenu", disableContextMenu);
      container.addEventListener("selectstart", disableTextSelection);
    }

    return () => {
      if (container) {
        container.removeEventListener("contextmenu", disableContextMenu);
        container.removeEventListener("selectstart", disableTextSelection);
      }
    };
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setIsLoading(false);
  };

  const changePage = (offset) => {
    setPageNumber((prev) => Math.max(1, Math.min(prev + offset, numPages)));
  };

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));
  const resetZoom = () => setZoom(1);

  // Sidebar handler
  const etatsidebare = (etat) => {
    setShowSideBare(etat);
  };

  return (
    <>
      {isDesktopOrLaptop && !startWithRattrapage && (
        <div
          className={classes.container}
          data-theme={isDark ? "dark" : "light"}
        >
          <NavigationBar changeetatsidebar={etatsidebare} />

          <div className={classes.contentContainer}>
            {ShowSideBare && (
              <div className={classes.sidebar}>
                <Sidebar />
              </div>
            )}

            <div className={classes.mainContent}>
              {!sjtresidanat ? (
                <div className={classes.loading}>Loading document...</div>
              ) : (
                <div className={classes.pdfViewerWrapper} ref={pdfContainerRef}>
                  {/* Watermark overlay */}
                  <div className={classes.watermark}>
                    Confidential - Do Not Distribute
                  </div>

                  {/* Transparent overlay to intercept events */}
                  <div className={classes.pdfProtectionOverlay}></div>

                  <div className={classes.pdfControls}>
                    <div className={classes.pageControls}>
                      <button
                        onClick={() => changePage(-1)}
                        disabled={pageNumber <= 1}
                        className={classes.controlBtn}
                      >
                        &larr; Prev
                      </button>

                      <span className={classes.pageInfo}>
                        Page {pageNumber} of {numPages || "--"}
                      </span>

                      <button
                        onClick={() => changePage(1)}
                        disabled={pageNumber >= (numPages || 0)}
                        className={classes.controlBtn}
                      >
                        Next &rarr;
                      </button>
                    </div>

                    <div className={classes.zoomControls}>
                      <button
                        className={classes.zoomBtn}
                        onClick={zoomOut}
                        disabled={zoom <= 0.5}
                      >
                        -
                      </button>
                      <button className={classes.zoomBtn} onClick={resetZoom}>
                        {Math.round(zoom * 100)}%
                      </button>
                      <button
                        className={classes.zoomBtn}
                        onClick={zoomIn}
                        disabled={zoom >= 2}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className={classes.pdfContainer}>
                    {isLoading && (
                      <div className={classes.loading}>Loading page...</div>
                    )}

                    <Document
                      file={sjtresidanat}
                      onLoadSuccess={onDocumentLoadSuccess}
                      loading={
                        <div className={classes.loading}>
                          Loading document...
                        </div>
                      }
                    >
                      <Page
                        className={classes.pdfPage}
                        pageNumber={pageNumber}
                        width={isDesktopOrLaptop ? 800 * zoom : 300 * zoom}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                    </Document>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {isDesktopOrLaptop && startWithRattrapage && (
        <div
          className={classes.container}
          data-theme={isDark ? "dark" : "light"}
        >
          <NavigationBar changeetatsidebar={etatsidebare} />

          <div className={classes.contentContainer}>
            {ShowSideBare && (
              <div className={classes.sidebar}>
                <Sidebar />
              </div>
            )}

            <div className={classes.mainContent}>
              {!sjtresidanat ? (
                <div className={classes.loading}>Loading document...</div>
              ) : (
                <div className={classes.pdfViewerWrapper} ref={pdfContainerRef}>
                  {/* Watermark overlay */}
                  <div className={classes.watermark}>
                    Confidential - Do Not Distribute
                  </div>

                  {/* Transparent overlay to intercept events */}
                  <div className={classes.pdfProtectionOverlay}></div>

                  <div className={classes.pdfControls}>
                    <div className={classes.pageControls}>
                      <button
                        onClick={() => changePage(-1)}
                        disabled={pageNumber <= 1}
                        className={classes.controlBtn}
                      >
                        &larr; Prev
                      </button>

                      <span className={classes.pageInfo}>
                        Page {pageNumber} of {numPages || "--"}
                      </span>

                      <button
                        onClick={() => changePage(1)}
                        disabled={pageNumber >= (numPages || 0)}
                        className={classes.controlBtn}
                      >
                        Next &rarr;
                      </button>
                    </div>

                    <div className={classes.zoomControls}>
                      <button
                        className={classes.zoomBtn}
                        onClick={zoomOut}
                        disabled={zoom <= 0.5}
                      >
                        -
                      </button>
                      <button className={classes.zoomBtn} onClick={resetZoom}>
                        {Math.round(zoom * 100)}%
                      </button>
                      <button
                        className={classes.zoomBtn}
                        onClick={zoomIn}
                        disabled={zoom >= 2}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className={classes.pdfContainer_startrattra}>
                    {isLoading && (
                      <div className={classes.loading}>Loading page...</div>
                    )}

                    <Document
                      file={sjtresidanat}
                      onLoadSuccess={onDocumentLoadSuccess}
                      loading={
                        <div className={classes.loading}>
                          Loading document...
                        </div>
                      }
                    >
                      <Page
                        className={classes.pdfPage_startrattra}
                        pageNumber={pageNumber}
                        width={isDesktopOrLaptop ? 800 * zoom : 300 * zoom}
                        height={isDesktopOrLaptop ? 500 * zoom : 300 * zoom}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                    </Document>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {isTabletOrMobile && !startWithRattrapage && (
        <>
          <NavigationBar changeetatsidebar={etatsidebare} />
          <div className={classes.contentContainer}>
            {ShowSideBare && (
              <div className={classes.sidebar}>
                <Sidebar />
              </div>
            )}
          </div>
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
        </>
      )}{" "}
      {isTabletOrMobile && startWithRattrapage && (
        <>
          <NavigationBar changeetatsidebar={etatsidebare} />
          <div className={classes.contentContainer}>
            {ShowSideBare && (
              <div className={classes.sidebar}>
                <Sidebar />
              </div>
            )}
          </div>
          <div
            className={classes.contanerspace_phone}
            data-theme={isDark ? "dark" : "light"}
          >
            <div className={classes.documentdivratrra_phone}>
              <div>
                <Document
                  file={sjtresidanat}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <div className={classes.documentpageratrra_phone}>
                    {Array.apply(null, Array(numPages))
                      .map((x, i) => i + 1)
                      .map((page) => {
                        return (
                          <Page
                            width={320}
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
        </>
      )}
    </>
  );
}

export default ShowPdfResidanat;
