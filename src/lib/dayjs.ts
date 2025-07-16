// src/lib/dayjs.ts
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

// Set default timezone (optional, but good for consistency)
dayjs.tz.setDefault('Asia/Kolkata'); // Example: Set to Indian Standard Time

export default dayjs;