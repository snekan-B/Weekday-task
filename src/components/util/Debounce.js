
/**
 * Debounce function for delay state update.
 */

export function debounce(func, delay) {
    let timeoutId;

    console.log("func",func)
    
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }