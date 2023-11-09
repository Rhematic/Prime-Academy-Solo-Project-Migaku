import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SESSION_VIEW } from "../../utils/constants";
import LoadingView from "../LoadingView/LoadingView";

import SessionCardFront from "./SessionCardFront/SessionCardFront";
import SessionCardBack from "./SessionCardBack/SessionCardBack";
import SessionSummaryView from "./SessionSummaryView/SessionSummaryView";
import SessionResultView from "./SessionResultView/SessionResultView";

const SessionMain = () => {
  const session = useSelector((state) => state.session.tricks);
  const trickDetail = useSelector((state) => state.session.trickDetail);
  const view = useSelector((state) => state.session.view);
  const dispatch = useDispatch();
  const currentTrickIndex = useSelector(
    (state) => state.session.currentTrickIndex
  );
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    fetchTricks();
  }, []);

  useEffect(() => {
    if (session.length > 0) {
      fetchTrickDetail(currentTrickIndex);
    }
  }, [session]);

  const fetchTricks = () => {
    dispatch({ type: "START_LOADING" });
    dispatch({ type: "FETCH_TRICKS" });
  };

  const fetchTrickDetail = (currentTrickIndex) => {
    currentTrickIndex = session[currentTrickIndex].trick_id;
    dispatch({ type: "FETCH_TRICK_DETAIL", payload: currentTrickIndex });
  };

  if (loading) {
    return <LoadingView />;
  } else {
    return (
      <div>
        {view === SESSION_VIEW.FRONT && <SessionCardFront />}
        {view === SESSION_VIEW.BACK && <SessionCardBack />}
        {view === SESSION_VIEW.SUMMARY && <SessionSummaryView />}
        {view === SESSION_VIEW.RESULT && <SessionResultView />}
      </div>
    );
  }
};

export default SessionMain;
