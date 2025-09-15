import React, { useEffect, useState, useRef } from "react";
import NavigationBar from "../compenent/layout/NavigationBar";
import Sidebar from "./Sidebar";
import classes from "./ShowPdfResidanat.module.css";
import { useMediaQuery } from "react-responsive";
import { Document, Page } from "react-pdf";
import useLocalStorage from "use-local-storage";
import { useLocation, useNavigate } from "react-router-dom";
import sjtresidanat_2010 from "../compenent/layout/pdf/2010.pdf";
import sjtresidanat_2011 from "../compenent/layout/pdf/2011.pdf";
import sjtresidanat_2013 from "../compenent/layout/pdf/2013.pdf";
import sjtresidanat_2015 from "../compenent/layout/pdf/2015.pdf";
import sjtresidanat_2016 from "../compenent/layout/pdf/2016.pdf";
import sjtresidanat_2017 from "../compenent/layout/pdf/2017.pdf";
import sjtresidanat_2018 from "../compenent/layout/pdf/2018.pdf";
import sjtresidanat_2019 from "../compenent/layout/pdf/2019.pdf";
import sjtresidanat_2020 from "../compenent/layout/pdf/2020.pdf";
import sjtresidanat_2021 from "../compenent/layout/pdf/2021.pdf";
import sjtresidanat_2022 from "../compenent/layout/pdf/2022.pdf";
import sjtresidanat_2023 from "../compenent/layout/pdf/2023.pdf";
import sjtresidanat_2024 from "../compenent/layout/pdf/2024.pdf";
import fondamentaux from "../compenent/layout/pdf/fondamentaux.pdf";
import clinique from "../compenent/layout/pdf/clinique.pdf";
import epide from "../compenent/layout/pdf/epide.pdf";
import gygy2025 from "../compenent/layout/pdf/gygy2025.pdf";
import infect2025 from "../compenent/layout/pdf/infect2025.pdf";
import hemato2025 from "../compenent/layout/pdf/hemato2025.pdf";
import cardio2025 from "../compenent/layout/pdf/cardio2025.pdf";
import uronephro2025 from "../compenent/layout/pdf/uronephro2025.pdf";
import microbio from "../compenent/layout/pdf/microbio.pdf";
import u12025 from "../compenent/layout/pdf/u12025.pdf";
import u22025 from "../compenent/layout/pdf/u22025.pdf";
import u12eme2025 from "../compenent/layout/pdf/u12eme2025.pdf";
import u22eme2025 from "../compenent/layout/pdf/u22eme2025.pdf";
const pdfMap = {
  2010: sjtresidanat_2010,
  2011: sjtresidanat_2011,
  2013: sjtresidanat_2013,
  2015: sjtresidanat_2015,
  2016: sjtresidanat_2016,
  2017: sjtresidanat_2017,
  2018: sjtresidanat_2018,
  2019: sjtresidanat_2019,
  2020: sjtresidanat_2020,
  2021: sjtresidanat_2021,
  2022: sjtresidanat_2022,
  2023: sjtresidanat_2023,
  2024: sjtresidanat_2024,
  fondamentaux: fondamentaux,
  clinique: clinique,
  epidemio: epide,
  Rattrapage_gynéco: gygy2025,
  Rattrapage_infect: infect2025,
  Rattrapage_hemato: hemato2025,
  Rattrapage_cardio: cardio2025,
   Rattrapage_uronephro: uronephro2025,
    Rattrapage_microbio: microbio,
  Rattrapage_unite_01_3émeAnnée: u12025,
  Rattrapage_unite_02_3émeAnnée: u22025,
  Rattrapage_unite_01_2émeAnnée: u12eme2025,
  Rattrapage_unite_02_2émeAnnée: u22eme2025,
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
