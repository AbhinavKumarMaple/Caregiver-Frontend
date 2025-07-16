// src/utils/toast.ts
import { toast } from 'sonner';

// This file provides a compatibility layer for migrating from custom toast to sonner
// You can use these functions or directly use sonner's toast API

export const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    switch (type) {
        case 'success':
            toast.success(message);
            break;
        case 'error':
            toast.error(message);
            break;
        case 'warning':
            toast.warning(message);
            break;
        case 'info':
            toast.info(message);
            break;
        default:
            toast(message);
    }
};

// Export sonner's toast directly for new code
export { toast };