'use client';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import OverallGrade from './OverallGrade';
import CategoryBreakdown from './CategoryBreakdown';
import SummaryList from './SummaryList';
import FlaggedClauses from './FlaggedClauses';
import AlternativesSection from './AlternativesSection';
import DeletionRequest from './DeletionRequest';

export default function ResultsView({ engine, tier, userEmail, onUnlockClick }) {
  const { loading, result, error, rawResponse } = engine;

  if (loading && !result && !error) return <LoadingState />;
  if (error) return <ErrorState error={error} raw={rawResponse} />;
  if (!result) return null;

  const flagCount = (result.flags || []).length;
  const altDelay = 0.24 + flagCount * 0.07 + 0.1;

  return (
    <div className="space-y-4">
      <OverallGrade result={result} />
      <CategoryBreakdown categories={result.categories} />
      <SummaryList summary={result.summary} />
      <FlaggedClauses flags={result.flags} />
      <AlternativesSection
        alternatives={result.alternatives}
        tier={tier}
        onUnlockClick={onUnlockClick}
        delay={altDelay}
      />
      <DeletionRequest
        result={result}
        tier={tier}
        userEmail={userEmail}
        onUnlockClick={onUnlockClick}
        delay={altDelay + 0.1}
      />
    </div>
  );
}
