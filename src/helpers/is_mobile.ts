// base off recommendation from https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent

function isMobile() {
    const userAgent = navigator.userAgent;
    const mobileMatch = userAgent.match(/Mobi/gi);
    // https://stackoverflow.com/a/58064481/7432692
    const iPadOS13Match = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    return !!(mobileMatch && mobileMatch[0]) || iPadOS13Match;
}

export default isMobile;
