import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RecentReviewsClient } from "@/components/RecentReviewsClient";
import type { ReviewSessionSummary } from "@/types/reviews";

const pastedReview: ReviewSessionSummary = {
  completed_at: "2026-09-09T04:01:00Z",
  created_at: "2026-09-09T04:00:00Z",
  input_type: "diff",
  pull_request_number: null,
  pull_request_title: null,
  pull_request_url: null,
  repository_name: null,
  repository_owner: null,
  review_id: "00000000-0000-4000-8000-000000000044",
  risk_level: "low",
  state: null,
  stats: {
    files_reviewed: 1,
    findings: 0,
    high_severity: 0,
    low_severity: 0,
    medium_severity: 0
  },
  status: "completed",
  summary: "Reviewed one pasted diff."
};

describe("RecentReviewsClient", () => {
  it("labels pasted diff review links with their creation time", () => {
    render(
      <RecentReviewsClient
        initialError={null}
        initialHasMore={false}
        initialItems={[pastedReview]}
        initialOffset={1}
      />
    );

    expect(screen.getByRole("link", { name: "Open pasted diff review created at 2026-09-09T04:00:00Z" })).toHaveAttribute(
      "href",
      "/reviews/00000000-0000-4000-8000-000000000044"
    );
  });
});
