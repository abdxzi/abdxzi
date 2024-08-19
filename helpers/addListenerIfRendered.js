/**
 * Wait for an element to render and adds an event listener
 * @param {function} callback 
 * @param {string} elementId 
 * @param {string} eventType 
 */
function addListenerIfRendered(elementId, eventType, callback) {
    const targetNode = document.body;

    const observer = new MutationObserver(() => {
        const element = document.getElementById(elementId);
        if (element) {
            element.addEventListener(eventType, callback);
            observer.disconnect(); // Stop observing once the element is found
        }
    });

    const config = { childList: true, subtree: true };
    observer.observe(targetNode, config);
}

// document.addEventListener("DOMContentLoaded", () => {
//     addListenerIfRendered("checkcheck", "click", () => {
//         // ...
//     });
// });