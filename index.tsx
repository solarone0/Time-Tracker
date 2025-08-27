/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Function to update the progress displays
function updateProgress() {
    const now = new Date();

    // --- Daily Progress ---
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const dayTotalMilliseconds = endOfDay.getTime() - startOfDay.getTime();
    const dayElapsedMilliseconds = now.getTime() - startOfDay.getTime();
    const dayPercentage = (dayElapsedMilliseconds / dayTotalMilliseconds) * 100;
    const dayTimeLeft = dayTotalMilliseconds - dayElapsedMilliseconds;
    
    // --- Weekly Progress ---
    const dayOfWeek = now.getDay(); // Sunday = 0, Monday = 1, etc.
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // Adjust to make Monday the start
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);
    const weekTotalMilliseconds = endOfWeek.getTime() - startOfWeek.getTime();
    const weekElapsedMilliseconds = now.getTime() - startOfWeek.getTime();
    const weekPercentage = (weekElapsedMilliseconds / weekTotalMilliseconds) * 100;
    const weekTimeLeft = weekTotalMilliseconds - weekElapsedMilliseconds;

    // --- Monthly Progress ---
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const monthTotalMilliseconds = endOfMonth.getTime() - startOfMonth.getTime();
    const monthElapsedMilliseconds = now.getTime() - startOfMonth.getTime();
    const monthPercentage = (monthElapsedMilliseconds / monthTotalMilliseconds) * 100;
    const monthTimeLeft = monthTotalMilliseconds - monthElapsedMilliseconds;

    // --- Yearly Progress ---
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear() + 1, 0, 1);
    const yearTotalMilliseconds = endOfYear.getTime() - startOfYear.getTime();
    const yearElapsedMilliseconds = now.getTime() - startOfYear.getTime();
    const yearPercentage = (yearElapsedMilliseconds / yearTotalMilliseconds) * 100;
    const yearTimeLeft = yearTotalMilliseconds - yearElapsedMilliseconds;

    // --- Update UI ---
    updateElement('day', dayPercentage, dayTimeLeft);
    updateElement('week', weekPercentage, weekTimeLeft);
    updateElement('month', monthPercentage, monthTimeLeft);
    updateElement('year', yearPercentage, yearTimeLeft);
}

// Helper function to format remaining time
function formatTimeLeft(ms: number, period: string): string {
    if (ms < 0) return '';
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const pad = (num: number) => num.toString().padStart(2, '0');
    const timeString = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

    if (period === 'day') {
        return timeString;
    }
    return `${days}일 ${timeString}`;
}

// Helper function to update a specific progress element
function updateElement(id: string, percentage: number, timeLeftMs: number) {
    const percentageEl = document.getElementById(`${id}-percentage`) as HTMLElement;
    const progressBarEl = document.getElementById(`${id}-progress-bar`) as HTMLElement;
    const timeLeftEl = document.getElementById(`${id}-left`) as HTMLElement;
    
    if (percentageEl && progressBarEl && timeLeftEl) {
        percentageEl.textContent = `${percentage.toFixed(6)}%`;
        progressBarEl.style.width = `${percentage}%`;
        timeLeftEl.textContent = `남음: ${formatTimeLeft(timeLeftMs, id)}`;
    }
}

// Initial call and set interval to update every 100 milliseconds for a smooth feel
updateProgress();
setInterval(updateProgress, 100);