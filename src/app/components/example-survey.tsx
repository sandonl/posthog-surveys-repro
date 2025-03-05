"use client";

import { type Survey, SurveyType } from "posthog-js";
import { usePostHog } from "posthog-js/react";
import { useEffect, useState } from "react";

export const ExampleFeedbackSurvey = () => {
  const posthog = usePostHog();
  const [survey, setSurvey] = useState<Survey | null>(null);

  console.log("current survey", survey);

  useEffect(() => {
    posthog.getActiveMatchingSurveys((surveys) => {
      console.log("get-surveys", surveys);
    });

    posthog.getActiveMatchingSurveys((surveys) => {
      const firstSurvey = surveys.filter(
        (survey) => survey.type === SurveyType.API
      )[0];

      if (firstSurvey) {
        setSurvey(firstSurvey);
        posthog.capture("survey-shown", {
          $survey_id: firstSurvey.id,
          $survey_name: firstSurvey.name,
        });
      }
    });
  }, []);

  return (
    <div>
      <h1>Feedback Survey</h1>
      <p>{survey?.name}</p>
    </div>
  );
};
