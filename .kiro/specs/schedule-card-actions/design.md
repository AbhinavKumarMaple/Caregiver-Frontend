# Design Document

## Overview

This design document outlines the implementation approach for enhancing the ScheduleCard component with functional buttons for check-in, check-out, and cancel actions. Currently, the entire card acts as a link to the schedule detail page. The enhancement will make the action buttons exceptions to this behavior, allowing them to trigger specific API calls using React Query (TanStack Query) and invalidate the schedule API cache to trigger a refetch.

## Architecture

The implementation will follow the existing architecture of the application, which uses React with TypeScript, React Router for navigation, and TanStack Query for API state management. The enhancement will modify the ScheduleCard component to handle button click events separately from the card's navigation behavior.

### Current Architecture

Currently, the ScheduleCard component:

1. Renders as a Link component from React Router when `asLink` prop is true
2. Displays action buttons based on the schedule status
3. Does not have functionality for the action buttons - they navigate to the schedule detail page along with the rest of the card

### Enhanced Architecture

The enhanced ScheduleCard component will:

1. Continue to render as a Link component when `asLink` prop is true
2. Intercept click events on action buttons to prevent navigation
3. Trigger appropriate API calls when action buttons are clicked
4. Show loading states on buttons during API calls
5. Display error messages when API calls fail
6. Invalidate relevant queries to refresh data after successful API calls

## Components and Interfaces

### Modified Components

#### ScheduleCard Component

The ScheduleCard component will be modified to:

1. Accept new props for handling check-in, check-out, and cancel actions
2. Implement click handlers for action buttons that prevent event propagation
3. Display loading states on buttons during API calls
4. Handle success and error states for API calls

```typescript
// New props to be added to ScheduleCardProps interface
interface ScheduleCardProps {
  // ... existing props
  onCheckIn?: (id: string) => Promise<void>;
  onCheckOut?: (id: string) => Promise<void>;
  onCancel?: (id: string) => Promise<void>;
  isCheckingIn?: boolean;
  isCheckingOut?: boolean;
  isCancelling?: boolean;
}
```

### New Components

No new components are required for this enhancement.

## Data Models

No changes to data models are required. The implementation will use the existing data models:

- `Schedule` and `DetailedSchedule` from `src/shared/types/schedule.ts`
- `CheckInRequest`, `CheckInResponse`, `CheckOutRequest`, `CheckOutResponse`, and `CancelCheckInResponse` from `src/shared/types/scheduleOperations.ts`

## API Integration

The implementation will use the existing API functions from `src/features/schedule/api/scheduleMutations.ts`:

- `checkInSchedule(scheduleId: string, data: CheckInRequest): Promise<CheckInResponse>`
- `checkOutSchedule(scheduleId: string, data: CheckOutRequest): Promise<CheckOutResponse>`
- `cancelCheckIn(scheduleId: string): Promise<CancelCheckInResponse>`

### React Query Integration

The implementation will use React Query mutations to handle API calls:

1. Create custom hooks for check-in, check-out, and cancel actions
2. Use the `useMutation` hook from React Query
3. Invalidate relevant queries after successful mutations

```typescript
// Example of a custom hook for check-in
const useCheckInMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      scheduleId,
      location,
    }: {
      scheduleId: string;
      location: LocationData;
    }) => checkInSchedule(scheduleId, { location }),
    onSuccess: (data, variables) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.invalidateQueries({
        queryKey: ["schedule", variables.scheduleId],
      });
    },
  });
};
```

## User Interaction Flow

### Check-In Flow

1. User clicks the "Check-In Now" button on a schedule card
2. Button shows loading state
3. System gets current location (if needed)
4. System calls check-in API
5. On success:
   - System invalidates schedule queries
   - System shows success message
   - Button state updates based on new schedule status
6. On error:
   - System shows error message
   - Button returns to normal state

### Check-Out Flow

1. User clicks the "Check-Out Now" button on a schedule card
2. Button shows loading state
3. System gets current location (if needed)
4. System calls check-out API
5. On success:
   - System invalidates schedule queries
   - System shows success message
   - Button state updates based on new schedule status
6. On error:
   - System shows error message
   - Button returns to normal state

### Cancel Flow

1. User clicks the "Cancel" button on a schedule card
2. Button shows loading state
3. System calls cancel API
4. On success:
   - System invalidates schedule queries
   - System shows success message
   - Button state updates based on new schedule status
5. On error:
   - System shows error message
   - Button returns to normal state

## Error Handling

The implementation will handle errors in the following ways:

1. API call errors will be caught and displayed to the user using the existing toast notification system
2. Loading states will be cleared when errors occur
3. The original schedule state will be preserved when errors occur

## Testing Strategy

The implementation will be tested using the following approaches:

1. Unit tests for the modified ScheduleCard component

   - Test that clicking action buttons prevents navigation
   - Test that action buttons trigger the appropriate callbacks
   - Test that loading states are displayed correctly

2. Integration tests for the custom hooks
   - Test that API calls are made with the correct parameters
   - Test that queries are invalidated after successful API calls
   - Test that error handling works correctly

## Implementation Considerations

1. **Event Propagation**: The implementation must carefully handle event propagation to prevent navigation when action buttons are clicked.

2. **Loading States**: The implementation must manage loading states for each button independently.

3. **Error Handling**: The implementation must handle API errors gracefully and provide clear feedback to the user.

4. **Query Invalidation**: The implementation must invalidate the appropriate queries to ensure data consistency.

5. **Geolocation**: The implementation must handle geolocation for check-in and check-out actions, possibly reusing existing geolocation logic from the application.

## Accessibility Considerations

1. **Keyboard Navigation**: The implementation must ensure that action buttons are keyboard accessible.

2. **Screen Reader Support**: The implementation must provide appropriate ARIA attributes for screen readers.

3. **Loading State Indicators**: The implementation must provide clear visual and programmatic indicators of loading states.

4. **Error Messages**: The implementation must ensure that error messages are accessible to all users.

## Future Enhancements

1. **Confirmation Dialogs**: Add confirmation dialogs for critical actions like cancellation.

2. **Offline Support**: Add support for offline actions with background synchronization.

3. **Animation**: Add subtle animations for state transitions.

4. **Analytics**: Add analytics tracking for button interactions.
