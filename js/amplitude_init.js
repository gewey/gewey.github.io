import * as amplitude from '@amplitude/unified';

/**
 * Initializes Amplitude Analytics and Session Replay.
 * This is designed for client-side use in the browser.
 */
function initAmplitude() {
    if (typeof window !== 'undefined') {
        amplitude.initAll('2f25c9d1ef750cca80c9ebc816929011', {
            "analytics": {
                "autocapture": true
            },
            "sessionReplay": {
                "sampleRate": 1
            }
        });
        console.log('Amplitude Analytics and Session Replay initialized.');
    }
}

// Call initialization
initAmplitude();

export { amplitude };
