const u = navigator.userAgent;
const isMYK = !!u.match('MYKEY');
const isIphone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(u);
export { isMYK, isIphone };
