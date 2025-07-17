# Requirements Document

## Introduction

This feature enhances the existing ScheduleCard component by adding functional buttons for check-in, check-out, and cancel actions. Currently, clicking anywhere on the card navigates to the schedule page. The enhancement will make the buttons exceptions to this behavior, allowing them to trigger specific API calls using React Query (TanStack Query) and invalidate the schedule API cache to trigger a refetch.

## Requirements

### Requirement 1

**User Story:** As a caregiver, I want to check in to a scheduled appointment directly from the schedule card, so that I can quickly start my shift without navigating to another page.

#### Acceptance Criteria

1. WHEN a user clicks the "Check In" button on a ScheduleCard THEN the system SHALL trigger the check-in API call
2. WHEN the check-in API call is successful THEN the system SHALL invalidate the schedule query cache to refetch updated data
3. WHEN a user clicks the "Check In" button THEN the system SHALL NOT navigate to the schedule detail page
4. WHEN the check-in API call is in progress THEN the system SHALL display a loading state on the button
5. WHEN the check-in API call fails THEN the system SHALL display an error message to the user

### Requirement 2

**User Story:** As a caregiver, I want to check out from a scheduled appointment directly from the schedule card, so that I can quickly end my shift without navigating to another page.

#### Acceptance Criteria

1. WHEN a user clicks the "Check Out" button on a ScheduleCard THEN the system SHALL trigger the check-out API call
2. WHEN the check-out API call is successful THEN the system SHALL invalidate the schedule query cache to refetch updated data
3. WHEN a user clicks the "Check Out" button THEN the system SHALL NOT navigate to the schedule detail page
4. WHEN the check-out API call is in progress THEN the system SHALL display a loading state on the button
5. WHEN the check-out API call fails THEN the system SHALL display an error message to the user

### Requirement 3

**User Story:** As a caregiver, I want to cancel a scheduled appointment directly from the schedule card, so that I can quickly manage my availability without navigating to another page.

#### Acceptance Criteria

1. WHEN a user clicks the "Cancel" button on a ScheduleCard THEN the system SHALL trigger the cancel API call
2. WHEN the cancel API call is successful THEN the system SHALL invalidate the schedule query cache to refetch updated data
3. WHEN a user clicks the "Cancel" button THEN the system SHALL NOT navigate to the schedule detail page
4. WHEN the cancel API call is in progress THEN the system SHALL display a loading state on the button
5. WHEN the cancel API call fails THEN the system SHALL display an error message to the user

### Requirement 4

**User Story:** As a caregiver, I want to navigate to the schedule detail page when clicking on the schedule card (except for action buttons), so that I can view more information about the appointment.

#### Acceptance Criteria

1. WHEN a user clicks on any part of the ScheduleCard EXCEPT the action buttons THEN the system SHALL navigate to the schedule detail page
2. WHEN a user clicks on an action button THEN the system SHALL prevent the default navigation behavior
