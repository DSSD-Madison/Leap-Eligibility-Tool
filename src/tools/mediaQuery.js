// mediaQuery.js

/**
 * Utility class to handle responsive design checks
 */
class MediaQuery {
  constructor() {
    // Initialize breakpoints (can be customized based on needs)
    this.breakpoints = {
      mobile: 768,
      tablet: 1024,
      desktop: 1280
    };
    
    // Bind methods to instance
    this.isMobile = this.isMobile.bind(this);
    this.isTablet = this.isTablet.bind(this);
    this.isDesktop = this.isDesktop.bind(this);
    this.getCurrentBreakpoint = this.getCurrentBreakpoint.bind(this);
    
    // Add window resize listener
    this.setupResizeListener();
  }

  /**
   * Check if current viewport is mobile size
   * @returns {boolean}
   */
  isMobile() {
    return window.innerWidth < this.breakpoints.mobile;
  }

  /**
   * Check if current viewport is tablet size
   * @returns {boolean}
   */
  isTablet() {
    return window.innerWidth >= this.breakpoints.mobile && 
           window.innerWidth < this.breakpoints.tablet;
  }

  /**
   * Check if current viewport is desktop size
   * @returns {boolean}
   */
  isDesktop() {
    return window.innerWidth >= this.breakpoints.desktop;
  }

  /**
   * Get current breakpoint name
   * @returns {string} - 'mobile', 'tablet', or 'desktop'
   */
  getCurrentBreakpoint() {
    if (this.isMobile()) return 'mobile';
    if (this.isTablet()) return 'tablet';
    return 'desktop';
  }

  /**
   * Set up resize event listener
   * @param {function} callback - Optional callback to run on resize
   */
  setupResizeListener(callback) {
    let timeout;
    window.addEventListener('resize', () => {
      // Debounce resize events
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (callback && typeof callback === 'function') {
          callback(this.getCurrentBreakpoint());
        }
      }, 250);
    });
  }

  isNotDesktop() {
    return !this.isDesktop();
  }

  /**
   * Add custom breakpoint
   * @param {string} name - Breakpoint name
   * @param {number} width - Breakpoint width in pixels
   */
  addBreakpoint(name, width) {
    if (typeof width === 'number' && width > 0) {
      this.breakpoints[name] = width;
    }
  }
}

// Export as singleton to ensure only one instance exists
export default new MediaQuery();