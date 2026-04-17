import { gql } from "@apollo/client";

export const GET_JOBS = gql`
  query GetJobs(
    $search: String
    $location: String
    $limit: Int!
    $offset: Int!
    $sortBy: JobSort!
    $dateRange: JobDateRange!
    $employmentType: String
    $experienceRange: String
  ) {
    getJobs(
      search: $search
      location: $location
      limit: $limit
      offset: $offset
      sortBy: $sortBy
      dateRange: $dateRange
      employmentType: $employmentType
      experienceRange: $experienceRange
    ) {
      totalCount
      items {
        jobId
        title
        level
        location
        salaryMin
        salaryMax
        currency
        descriptionRaw
        descriptionClean
        roleResponsibilities
        skillsQualifications
        benefits
        employmentType
        experience
        applicationDeadline
        remoteOption
        sourceUrl
        sourceSite
        postedAt
        scrapedAt
        company {
          companyId
          name
          website
        }
        skills {
          skillId
          name
        }
      }
    }
  }
`;
