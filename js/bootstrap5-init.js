/**
 * Bootstrap 5 Component Initialization
 * Replaces jQuery-based Bootstrap 4 initializations
 */

// Initialize Bootstrap 5 components when DOM is ready
ready(() => {
    
    // Initialize Tooltips
    const tooltipTriggerList = $$('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => 
        new bootstrap.Tooltip(tooltipTriggerEl)
    );
    
    // Initialize Popovers
    const popoverTriggerList = $$('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => 
        new bootstrap.Popover(popoverTriggerEl)
    );
    
    // Initialize Modals (for programmatic control if needed)
    const modalElements = $$('.modal');
    const modalInstances = [...modalElements].map(modalEl => 
        new bootstrap.Modal(modalEl)
    );
    
    // Initialize Dropdowns (for programmatic control if needed)
    const dropdownElements = $$('[data-bs-toggle="dropdown"]');
    const dropdownInstances = [...dropdownElements].map(dropdownEl => 
        new bootstrap.Dropdown(dropdownEl)
    );
    
    // Initialize Tabs (for programmatic control if needed)
    const tabElements = $$('[data-bs-toggle="tab"]');
    const tabInstances = [...tabElements].map(tabEl => 
        new bootstrap.Tab(tabEl)
    );
    
    // Initialize Collapse (for programmatic control if needed)
    const collapseElements = $$('[data-bs-toggle="collapse"]');
    const collapseInstances = [...collapseElements].map(collapseEl => 
        new bootstrap.Collapse(collapseEl, { toggle: false })
    );
    
    // Initialize Alerts (for programmatic dismissal if needed)
    const alertElements = $$('.alert');
    const alertInstances = [...alertElements].map(alertEl => 
        new bootstrap.Alert(alertEl)
    );
    
    // Initialize Carousels (if any exist)
    const carouselElements = $$('[data-bs-ride="carousel"]');
    const carouselInstances = [...carouselElements].map(carouselEl => 
        new bootstrap.Carousel(carouselEl)
    );
    
    // Store instances globally for programmatic access if needed
    window.bootstrapInstances = {
        tooltips: tooltipList,
        popovers: popoverList,
        modals: modalInstances,
        dropdowns: dropdownInstances,
        tabs: tabInstances,
        collapses: collapseInstances,
        alerts: alertInstances,
        carousels: carouselInstances
    };
    
    console.log('Bootstrap 5 components initialized successfully');
});