/**
 * API Error Handler
 * Centralized error handling for API calls
 */

import { MESSAGES } from '../config/constants';

/**
 * API Error class
 */
export class APIError extends Error {
    constructor(message, statusCode = null, response = null) {
        super(message);
        this.name = 'APIError';
        this.statusCode = statusCode;
        this.response = response;
        this.timestamp = new Date().toISOString();
    }
}

/**
 * Handle API errors
 * @param {Error} error - Error object
 * @param {string} context - Context where error occurred
 * @returns {Object} - Formatted error object
 */
export const handleAPIError = (error, context = 'API Call') => {
    console.error(`[${context}] Error:`, error);

    // Network errors
    if (!navigator.onLine) {
        return {
            message: MESSAGES.ERROR.NETWORK,
            type: 'network',
            recoverable: true,
        };
    }

    // API specific errors
    if (error.statusCode) {
        switch (error.statusCode) {
            case 400:
                return {
                    message: 'Invalid request. Please check your input.',
                    type: 'validation',
                    recoverable: true,
                };
            case 401:
                return {
                    message: MESSAGES.ERROR.API_KEY_MISSING,
                    type: 'authentication',
                    recoverable: false,
                };
            case 403:
                return {
                    message: 'Access forbidden. Please check your API permissions.',
                    type: 'authorization',
                    recoverable: false,
                };
            case 429:
                return {
                    message: 'Too many requests. Please try again later.',
                    type: 'rate_limit',
                    recoverable: true,
                };
            case 500:
            case 502:
            case 503:
                return {
                    message: 'Server error. Please try again later.',
                    type: 'server',
                    recoverable: true,
                };
            default:
                return {
                    message: error.message || 'An unexpected error occurred.',
                    type: 'unknown',
                    recoverable: true,
                };
        }
    }

    // Generic errors
    return {
        message: error.message || MESSAGES.ERROR.GENERATE,
        type: 'unknown',
        recoverable: true,
    };
};

/**
 * Retry logic with exponential backoff
 * @param {Function} fn - Async function to retry
 * @param {number} maxRetries - Maximum retry attempts
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise} - Result of function call
 */
export const retryWithBackoff = async (fn, maxRetries = 3, baseDelay = 1000) => {
    let lastError;

    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;

            const errorInfo = handleAPIError(error, `Retry attempt ${i + 1}`);

            // Don't retry if not recoverable
            if (!errorInfo.recoverable) {
                throw error;
            }

            // Don't retry on last attempt
            if (i === maxRetries - 1) {
                break;
            }

            // Exponential backoff
            const delay = baseDelay * Math.pow(2, i);
            console.log(`Retrying in ${delay}ms...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }

    throw lastError;
};

/**
 * Check API health/availability
 * @param {string} apiUrl - API URL to check
 * @returns {Promise<boolean>} - True if API is available
 */
export const checkAPIHealth = async (apiUrl) => {
    try {
        const response = await fetch(apiUrl, {
            method: 'HEAD',
            cache: 'no-cache',
        });
        return response.ok;
    } catch (error) {
        console.error('API health check failed:', error);
        return false;
    }
};

/**
 * Log API call for debugging
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Request options
 * @param {number} duration - Request duration in ms
 * @param {boolean} success - Whether request was successful
 */
export const logAPICall = (endpoint, options = {}, duration = 0, success = true) => {
    if (import.meta.env.DEV) {
        console.group(`[API] ${options.method || 'GET'} ${endpoint}`);
        console.log('Duration:', `${duration}ms`);
        console.log('Status:', success ? '✅ Success' : '❌ Failed');
        if (options.body) {
            console.log('Body:', options.body);
        }
        console.groupEnd();
    }
};

export default {
    APIError,
    handleAPIError,
    retryWithBackoff,
    checkAPIHealth,
    logAPICall,
};
