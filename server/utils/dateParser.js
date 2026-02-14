"use strict";

/**
 * Backend Safe Date Parser Utility
 * Supports:
 *  - 8 AUG'25
 *  - 17 FEB'26
 *  - 8 Aug 2025
 *  - 08-08-2025
 *  - 2025/08/08
 *  - 8/8/25
 *  - 2025-08-08
 *  - 11 Feb
 */

const MONTHS = {
    JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6,
    JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12
};


// ================================
// 🔹 Extract Month Number
// ================================

function getMonthNumber(dateString) {
    if (!dateString || typeof dateString !== "string") return null;

    const parts = dateString.trim().split(" ");
    if (parts.length < 2) return null;

    const monthStr = parts[1].toUpperCase().slice(0, 3);
    return MONTHS[monthStr] || null;
}


function convertToISO(dateStr) {
    if (!dateStr || typeof dateStr !== "string") return null;

    const cleaned = dateStr.trim();
    let day, month, year;
    let match;

    // Case 0: 18 Feb 2024 / 06 Jul 2024
    match = cleaned
        .toUpperCase()
        .match(/^(\d{1,2})\s+([A-Z]{3})\s+(\d{4})$/);

    if (match) {
        day = parseInt(match[1], 10);
        month = MONTHS[match[2]];
        year = parseInt(match[3], 10);

        if (!month) return null;
    }

    // Case 1: 8 AUG'25 / 11 Feb
    else if ((match = cleaned
        .toUpperCase()
        .match(/^(\d{1,2})\s+([A-Z]{3})'?(\d{2}|\d{4})?$/))) {

        day = parseInt(match[1], 10);
        month = MONTHS[match[2]];
        year = match[3];

        if (!month) return null;

        if (!year) {
            year = new Date().getFullYear();
        } else if (year.length === 2) {
            year = 2000 + parseInt(year, 10);
        } else {
            year = parseInt(year, 10);
        }
    }

    // Case 2: DD-MM-YYYY or DD/MM/YYYY
    else if ((match = cleaned.match(/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{2}|\d{4})$/))) {
        day = parseInt(match[1], 10);
        month = parseInt(match[2], 10);
        year = match[3].length === 2
            ? 2000 + parseInt(match[3], 10)
            : parseInt(match[3], 10);
    }

    // Case 3: YYYY-MM-DD or YYYY/MM/DD
    else if ((match = cleaned.match(/^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})$/))) {
        year = parseInt(match[1], 10);
        month = parseInt(match[2], 10);
        day = parseInt(match[3], 10);
    }

    else {
        return null;
    }

    if (!day || !month || !year) return null;

    return new Date(Date.UTC(year, month - 1, day));
}



// ================================
// Parse Date Range
// ================================

function parseDateRange(rangeStr) {
    if (!rangeStr || typeof rangeStr !== "string") return null;

    const normalized = rangeStr.replace(/[–—]/g, "-");
    const parts = normalized.split("-");

    if (parts.length !== 2) return null;

    const startingDate = convertToISO(parts[0].trim());
    const endingDate = convertToISO(parts[1].trim());

    if (!startingDate || !endingDate) return null;

    return { startingDate, endingDate };
}


// ================================
// Optional: Compare Dates
// ================================

function isStartAfterEnd(startISO, endISO) {
    return new Date(startISO) > new Date(endISO);
}


// ================================
// Module Exports
// ================================

module.exports = {
    convertToISO,
    parseDateRange,
    isStartAfterEnd,
    getMonthNumber   // ✅ added here
};
