const analyticsTrackingId = window.analyticsTrackingId || null;
const optimizeContainerId = window.optimizeContainerId || null;
const hotjarTrackingId = window.hotjarTrackingId || null;
const logErrorEndpoint = window.logErrorEndpoint || null;

/* Google Analytics 4 */
window.gtag = () => {
    // just an empty wrapper for use if gtag is not loaded
};
// eslint-disable-next-line no-undef
if (analyticsTrackingId) {
    const script = document.createElement('script');
    script.onload = function () {
        window.dataLayer = window.dataLayer || [];
        const dataLayer = window.dataLayer;
        function gtag() {
            dataLayer.push(arguments);
        }

        gtag('js', new Date());
        gtag('config', analyticsTrackingId);
        window.gtag = gtag;
    };
    script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsTrackingId}`;
    document.head.appendChild(script);
}

/* Google Optimize */
if (optimizeContainerId) {
    const script = document.createElement('script');
    script.onload = function () {
        setTimeout(() => {
            window.gtag('event', 'optimize.loaded', {
                optimizeContainerId: optimizeContainerId,
            })
        }, 100);
    };
    script.src = `https://www.googleoptimize.com/optimize.js?id=${optimizeContainerId}`;
    document.head.appendChild(script);
}

/* Hotjar */
if (hotjarTrackingId) {
    (function (h, o, t, j, a, r) {
        h.hj = h.hj || function () {
            (h.hj.q = h.hj.q || []).push(arguments)
        };
        h._hjSettings = {hjid: hotjarTrackingId, hjsv: 6};
        a = o.getElementsByTagName('head')[0];
        r = o.createElement('script');
        r.async = 1;
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        a.appendChild(r);
    })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
}

/* Browser Incompatibility Check */
// we will not be supporting any of the old IE variants
if (navigator.userAgent.includes('MSIE') || navigator.userAgent.includes('Trident')) {
    window.location = '/incompatible.html';
}

/* Dark Mode White Flicker Fix */
// avoid white flicker when navigating while in dark-mode
if (window && window.localStorage) {
    const dark = window.localStorage.getItem('theme.dark');
    if (dark !== null) {
        const css = 'body { background: #121212; }',
            head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        head.appendChild(style);

        style.type = 'text/css';
        if (style.styleSheet) {
            // This is required for IE8 and below.
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
    }
}

/* Global JavaScript Error Handler */
window.addEventListener('error', function(event) {
    window.gtag('event', 'logError', {
        event: event,
    });
    if (logErrorEndpoint) {
        let token = null;
        if (window && window.localStorage) {
            token = window.localStorage.getItem('auth.token');
        }
        try {
            // send errors to server
            fetch(logErrorEndpoint, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    event: event,
                }),
            }).then(() => {
                window.gtag('event', 'logError.success', {
                    event: event,
                })
            }).catch(() => {
                window.gtag('event', 'logError.failed', {
                    event: event,
                })
            });
        } catch (e) {
            console.log('error', e);
        }
    }
});

