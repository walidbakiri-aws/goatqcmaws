import { useLocation } from "react-router-dom";
import QuizBoard from "./QuizBoard";
import QuizBoardClinique from "./QuizBoardClinique";
import { useEffect, useState } from "react";

function QuizDashboard(props) {
  const backFromQuizClinique = false;
  const { state } = useLocation();
  const {
    moduleName,
    courId,
    selectMultipleCours,
    qcmType,
    minYearQcm,
    maxYearQcm,
    QcmSujetTypeSelected,
    moduleId,
    minMaxYearParSujets,
    minMaxYearParSujetsFinal,
    QuizQcmQclinique,
    SelectedSourceExmn,
    goFromQuizQuizToCLiniqueAllQcmCliniqueParSjt,
    backFromCliniqueAllQcmCliniqueprSujet,
    checkParSjtBiologieClinique,
    ExisteCasClinique,
    commingFrom,
    //historique states Qcm********************************************
    savePropositions,
    SaveClickSelectVerfieAll,
    SaveVerfieReponses,
    SaveQcmIsAnswer,
    SavePercentageAmount,
    //*************************************************************** */
    //historique states Cas Clinique********************************************
    savePropositionsClinique,
    saveClickSelectVerfieAllClinique,
    saveVerfieReponsesClinique,
    saveQcmIsAnswerClinique,
    savePercentageCliniqueAmount,
    //*************************************************************** */
    //****tous qcm casClinique*************************************** */
    DoneGetAllClinique,
    //*************************************************************** */
  } = state;
  const [QuizQcmIndex, setQuizQcmIndex] = useState("");
  useEffect(() => {
    console.log(moduleName);

    console.log(moduleId);
  }, []);
  function getQuizQcmIndex(indexLastQcm) {
    setQuizQcmIndex(indexLastQcm);
  }
  switch (qcmType) {
    case "Qcm":
      return (
        <QuizBoard
          moduleName={moduleName}
          courId={courId}
          selectMultipleCours={selectMultipleCours}
          qcmType={qcmType}
          minYearQcm={minYearQcm}
          maxYearQcm={maxYearQcm}
          QcmSujetTypeSelected={QcmSujetTypeSelected}
          moduleId={moduleId}
          SelectedSourceExmn={SelectedSourceExmn}
          ExisteCasClinique={ExisteCasClinique}
          minMaxYearParSujets={minMaxYearParSujets}
          minMaxYearParSujetsFinal={minMaxYearParSujetsFinal}
          QuizQcmQclinique={QuizQcmQclinique}
          checkParSjtBiologieClinique={checkParSjtBiologieClinique}
          //****save qcms ******************************************* */
          savePropositions={savePropositions}
          SaveClickSelectVerfieAll={SaveClickSelectVerfieAll}
          SaveVerfieReponses={SaveVerfieReponses}
          SaveQcmIsAnswer={SaveQcmIsAnswer}
          SavePercentageAmount={SavePercentageAmount}
          commingFrom={commingFrom}
        />
      );
    case "Cas Clinique":
      return (
        <QuizBoardClinique
          moduleName={moduleName}
          courId={courId}
          selectMultipleCours={selectMultipleCours}
          qcmType={qcmType}
          minYearQcm={minYearQcm}
          maxYearQcm={maxYearQcm}
          QcmSujetTypeSelected={QcmSujetTypeSelected}
          moduleId={moduleId}
          minMaxYearParSujets={minMaxYearParSujets}
          minMaxYearParSujetsFinal={minMaxYearParSujetsFinal}
          SelectedSourceExmn={SelectedSourceExmn}
          QuizQcmQclinique={QuizQcmQclinique}
          checkParSjtBiologieClinique={checkParSjtBiologieClinique}
          //****save qcms casclinique ******************************************* */
          savePropositionsClinique={savePropositionsClinique}
          SaveClickSelectVerfieAllClinique={saveClickSelectVerfieAllClinique}
          SaveVerfieReponsesClinique={saveVerfieReponsesClinique}
          SaveQcmIsAnswerClinique={saveQcmIsAnswerClinique}
          SavePercentageCliniqueAmount={savePercentageCliniqueAmount}
          commingFrom={commingFrom}
        />
      );
    case "Tous (Qcm,Cas Clinique)":
      return (
        <QuizBoard
          ExisteCasClinique={ExisteCasClinique}
          moduleName={moduleName}
          courId={courId}
          selectMultipleCours={selectMultipleCours}
          qcmType={qcmType}
          minYearQcm={minYearQcm}
          maxYearQcm={maxYearQcm}
          QcmSujetTypeSelected={QcmSujetTypeSelected}
          moduleId={moduleId}
          minMaxYearParSujets={minMaxYearParSujets}
          minMaxYearParSujetsFinal={minMaxYearParSujetsFinal}
          backFromQuizClinique={backFromQuizClinique}
          QuizQcmQclinique={QuizQcmQclinique}
          SelectedSourceExmn={SelectedSourceExmn}
          goFromQuizQuizToCLiniqueAllQcmCliniqueParSjt={
            goFromQuizQuizToCLiniqueAllQcmCliniqueParSjt
          }
          backFromCliniqueAllQcmCliniqueprSujet={
            backFromCliniqueAllQcmCliniqueprSujet
          }
          checkParSjtBiologieClinique={checkParSjtBiologieClinique}
          commingFrom={commingFrom}
          //****save qcms ******************************************* */
          savePropositions={savePropositions}
          SaveClickSelectVerfieAll={SaveClickSelectVerfieAll}
          SaveVerfieReponses={SaveVerfieReponses}
          SaveQcmIsAnswer={SaveQcmIsAnswer}
          SavePercentageAmount={SavePercentageAmount}
          //****save qcms casclinique ******************************************* */
          savePropositionsClinique={savePropositionsClinique}
          SaveClickSelectVerfieAllClinique={saveClickSelectVerfieAllClinique}
          SaveVerfieReponsesClinique={saveVerfieReponsesClinique}
          SaveQcmIsAnswerClinique={saveQcmIsAnswerClinique}
          SavePercentageCliniqueAmount={savePercentageCliniqueAmount}
          //********done upload all cas clinique*********************************** */
          doneGetAllClinique={DoneGetAllClinique}
        />
      );
  }
}

export default QuizDashboard;
