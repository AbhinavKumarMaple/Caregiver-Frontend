# Implementation Plan

- [x] 1. Create custom React Query hooks for schedule actions

  - Create hooks for check-in, check-out, and cancel operations
  - Implement proper query invalidation for data refresh
  - Handle success and error states
  - _Requirements: 1.2, 2.2, 3.2_

- [x] 2. Modify ScheduleCard component to handle button actions

  - [x] 2.1 Update ScheduleCard props interface

    - Add props for action handlers and loading states
    - _Requirements: 1.1, 2.1, 3.1_

  - [x] 2.2 Implement event handling for buttons

    - Add onClick handlers that prevent event propagation
    - Connect handlers to the appropriate API calls
    - _Requirements: 1.3, 2.3, 3.3, 4.2_

  - [x] 2.3 Add loading states to buttons
    - Display loading indicators during API calls
    - Disable buttons during loading
    - _Requirements: 1.4, 2.4, 3.4_

- [x] 3. Create a wrapper component for ScheduleCard with API integration

  - [x] 3.1 Create ConnectedScheduleCard component

    - Integrate custom hooks with ScheduleCard
    - Handle geolocation for check-in and check-out
    - _Requirements: 1.1, 2.1, 3.1_

  - [x] 3.2 Implement error handling
    - Display toast notifications for errors
    - Handle API failures gracefully
    - _Requirements: 1.5, 2.5, 3.5_

- [x] 4. Update existing components that use ScheduleCard

  - Replace direct ScheduleCard usage with ConnectedScheduleCard where appropriate
  - Ensure navigation behavior is preserved for non-button areas
  - _Requirements: 4.1_

- [x] 5. Write tests for the enhanced functionality

  - [x] 5.1 Write unit tests for ScheduleCard

    - Test button click handlers
    - Test loading states
    - Test event propagation prevention
    - _Requirements: 1.3, 2.3, 3.3, 4.2_

  - [x] 5.2 Write tests for custom hooks
    - Test API call integration
    - Test query invalidation
    - Test error handling
    - _Requirements: 1.2, 2.2, 3.2_
