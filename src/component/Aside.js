import React from "react";

export default function Aside() {
  return (
    <div>
      <aside className="left-sidebar with-horizontal">
        {/* Sidebar scroll*/}
        <div>
          {/* Sidebar navigation*/}
          <nav
            id="sidebarnavh"
            className="sidebar-nav scroll-sidebar container-fluid"
          >
            <ul id="sidebarnav">
              {/* ============================= */}
              {/* Home */}
              {/* ============================= */}
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4" />
                <span className="hide-menu">Home</span>
              </li>
              {/* =================== */}
              {/* Dashboard */}
              {/* =================== */}
              <li className="sidebar-item">
                <a
                  className="sidebar-link has-arrow"
                  href="javascript:void(0)"
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-home-2" />
                  </span>
                  <span className="hide-menu">Dashboard</span>
                </a>
                <ul aria-expanded="false" className="collapse first-level">
                  <li className="sidebar-item">
                    <a href="../dark/index.html" className="sidebar-link">
                      <i className="ti ti-aperture" />
                      <span className="hide-menu">Modern</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="../dark/index2.html" className="sidebar-link">
                      <i className="ti ti-shopping-cart" />
                      <span className="hide-menu">eCommerce</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="../dark/index3.html" className="sidebar-link">
                      <i className="ti ti-currency-dollar" />
                      <span className="hide-menu">NFT</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="../dark/index4.html" className="sidebar-link">
                      <i className="ti ti-cpu" />
                      <span className="hide-menu">Crypto</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="../dark/index5.html" className="sidebar-link">
                      <i className="ti ti-activity-heartbeat" />
                      <span className="hide-menu">General</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="../dark/index6.html" className="sidebar-link">
                      <i className="ti ti-playlist" />
                      <span className="hide-menu">Music</span>
                    </a>
                  </li>
                </ul>
              </li>
              {/* ============================= */}
              {/* Apps */}
              {/* ============================= */}
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4" />
                <span className="hide-menu">Apps</span>
              </li>
              <li className="sidebar-item">
                <a
                  className="sidebar-link two-column has-arrow"
                  href="javascript:void(0)"
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-archive" />
                  </span>
                  <span className="hide-menu">Apps</span>
                </a>
                <ul aria-expanded="false" className="collapse first-level">
                  <li className="sidebar-item">
                    <a
                      href="../dark/app-calendar.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-calendar" />
                      <span className="hide-menu">Calendar</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="../dark/app-kanban.html" className="sidebar-link">
                      <i className="ti ti-layout-kanban" />
                      <span className="hide-menu">Kanban</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="../dark/app-chat.html" className="sidebar-link">
                      <i className="ti ti-message-dots" />
                      <span className="hide-menu">Chat</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      className="sidebar-link"
                      href="../dark/app-email.html"
                      aria-expanded="false"
                    >
                      <span>
                        <i className="ti ti-mail" />
                      </span>
                      <span className="hide-menu">Email</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="../dark/app-contact.html" className="sidebar-link">
                      <i className="ti ti-phone" />
                      <span className="hide-menu">Contact Table</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/app-contact2.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-list-details" />
                      <span className="hide-menu">Contact List</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="../dark/app-notes.html" className="sidebar-link">
                      <i className="ti ti-notes" />
                      <span className="hide-menu">Notes</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="../dark/app-invoice.html" className="sidebar-link">
                      <i className="ti ti-file-text" />
                      <span className="hide-menu">Invoice</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/page-user-profile.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-user-circle" />
                      <span className="hide-menu">User Profile</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="../dark/blog-posts.html" className="sidebar-link">
                      <i className="ti ti-article" />
                      <span className="hide-menu">Posts</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="../dark/blog-detail.html" className="sidebar-link">
                      <i className="ti ti-details" />
                      <span className="hide-menu">Detail</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="../dark/eco-shop.html" className="sidebar-link">
                      <i className="ti ti-shopping-cart" />
                      <span className="hide-menu">Shop</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/eco-shop-detail.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-basket" />
                      <span className="hide-menu">Shop Detail</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/eco-product-list.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-list-check" />
                      <span className="hide-menu">List</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/eco-checkout.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-brand-shopee" />
                      <span className="hide-menu">Checkout</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      className="sidebar-link"
                      href="../dark/eco-add-product.html"
                    >
                      <i className="ti ti-file-plus" />
                      <span className="hide-menu">Add Product</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      className="sidebar-link"
                      href="../dark/eco-edit-product.html"
                    >
                      <i className="ti ti-file-pencil" />
                      <span className="hide-menu">Edit Product</span>
                    </a>
                  </li>
                </ul>
              </li>
              {/* ============================= */}
              {/* Frontend pages */}
              {/* ============================= */}
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4" />
                <span className="hide-menu">Frontend pages</span>
              </li>
              {/* =================== */}
              {/* pages */}
              {/* =================== */}
              <li className="sidebar-item">
                <a
                  className="sidebar-link has-arrow"
                  href="javascript:void(0)"
                  aria-expanded="false"
                >
                  <span className="rounded-3">
                    <i className="ti ti-app-window" />
                  </span>
                  <span className="hide-menu">Frontend pages</span>
                </a>
                <ul aria-expanded="false" className="collapse first-level">
                  <li className="sidebar-item">
                    <a
                      href="../dark/frontend-landingpage.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Homepage</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/frontend-aboutpage.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">About Us</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/frontend-contactpage.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Contact Us</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/frontend-blogpage.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Blog</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/frontend-blogdetailpage.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Blog Details</span>
                    </a>
                  </li>
                </ul>
              </li>
              {/* ============================= */}
              {/* PAGES */}
              {/* ============================= */}
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4" />
                <span className="hide-menu">PAGES</span>
              </li>
              <li className="sidebar-item">
                <a
                  className="sidebar-link has-arrow"
                  href="javascript:void(0)"
                  aria-expanded="false"
                >
                  <span>
                    <i className="ti ti-notebook" />
                  </span>
                  <span className="hide-menu">Pages</span>
                </a>
                <ul aria-expanded="false" className="collapse first-level">
                  <li className="sidebar-item">
                    <a href="../dark/page-faq.html" className="sidebar-link">
                      <i className="ti ti-help" />
                      <span className="hide-menu">FAQ</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/page-account-settings.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-user-circle" />
                      <span className="hide-menu">Account Setting</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/page-pricing.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-currency-dollar" />
                      <span className="hide-menu">Pricing</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/widgets-cards.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-cards" />
                      <span className="hide-menu">Card</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/widgets-banners.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-ad" />
                      <span className="hide-menu">Banner</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/widgets-charts.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-chart-bar" />
                      <span className="hide-menu">Charts</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../landingpage/index.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-app-window" />
                      <span className="hide-menu">Landing Page</span>
                    </a>
                  </li>
                </ul>
              </li>
              {/* ============================= */}
              {/* UI */}
              {/* ============================= */}
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4" />
                <span className="hide-menu">UI</span>
              </li>
              {/* =================== */}
              {/* UI Elements */}
              {/* =================== */}
              <li className="sidebar-item mega-dropdown">
                <a
                  className="sidebar-link has-arrow"
                  href="javascript:void(0)"
                  aria-expanded="false"
                >
                  <span className="rounded-3">
                    <i className="ti ti-layout-grid" />
                  </span>
                  <span className="hide-menu">UI</span>
                </a>
                <ul aria-expanded="false" className="collapse first-level">
                  <li className="sidebar-item">
                    <a
                      href="../dark/ui-accordian.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Accordian</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="../dark/ui-badge.html" className="sidebar-link">
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Badge</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="../dark/ui-buttons.html" className="sidebar-link">
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Buttons</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/ui-dropdowns.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Dropdowns</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="../dark/ui-modals.html" className="sidebar-link">
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Modals</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="../dark/ui-tab.html" className="sidebar-link">
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Tab</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/ui-tooltip-popover.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Tooltip &amp; Popover</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/ui-notification.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Alerts</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/ui-progressbar.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Progressbar</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/ui-pagination.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Pagination</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/ui-typography.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Typography</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/ui-bootstrap-ui.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Bootstrap UI</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/ui-breadcrumb.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Breadcrumb</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/ui-offcanvas.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Offcanvas</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="../dark/ui-lists.html" className="sidebar-link">
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Lists</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="../dark/ui-grid.html" className="sidebar-link">
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Grid</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="../dark/ui-carousel.html" className="sidebar-link">
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Carousel</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/ui-scrollspy.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Scrollspy</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="../dark/ui-spinner.html" className="sidebar-link">
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Spinner</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="../dark/ui-link.html" className="sidebar-link">
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Link</span>
                    </a>
                  </li>
                </ul>
              </li>
              {/* ============================= */}
              {/* Forms */}
              {/* ============================= */}
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4" />
                <span className="hide-menu">Forms</span>
              </li>
              {/* =================== */}
              {/* Forms */}
              {/* =================== */}
              <li className="sidebar-item">
                <a
                  className="sidebar-link two-column has-arrow"
                  href="javascript:void(0)"
                  aria-expanded="false"
                >
                  <span className="rounded-3">
                    <i className="ti ti-file-text" />
                  </span>
                  <span className="hide-menu">Forms</span>
                </a>
                <ul aria-expanded="false" className="collapse first-level">
                  {/* form elements */}
                  <li className="sidebar-item">
                    <a href="../dark/form-inputs.html" className="sidebar-link">
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Forms Input</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/form-input-groups.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Input Groups</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/form-input-grid.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Input Grid</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/form-checkbox-radio.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Checkbox &amp; Radios</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/form-bootstrap-switch.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Bootstrap Switch</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/form-select2.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Select2</span>
                    </a>
                  </li>
                  {/* form inputs */}
                  <li className="sidebar-item">
                    <a href="../dark/form-basic.html" className="sidebar-link">
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Basic Form</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/form-vertical.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Form Vertical</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/form-horizontal.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Form Horizontal</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/form-actions.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Form Actions</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/form-row-separator.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Row Separator</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/form-bordered.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Form Bordered</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="../dark/form-detail.html" className="sidebar-link">
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Form Detail</span>
                    </a>
                  </li>
                  {/* form wizard */}
                  <li className="sidebar-item">
                    <a href="../dark/form-wizard.html" className="sidebar-link">
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Form Wizard</span>
                    </a>
                  </li>
                  {/* Quill Editor */}
                  <li className="sidebar-item">
                    <a
                      href="../dark/form-editor-quill.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Quill Editor</span>
                    </a>
                  </li>
                </ul>
              </li>
              {/* ============================= */}
              {/* Tables */}
              {/* ============================= */}
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4" />
                <span className="hide-menu">Tables</span>
              </li>
              {/* =================== */}
              {/* Bootstrap Table */}
              {/* =================== */}
              <li className="sidebar-item">
                <a
                  className="sidebar-link has-arrow"
                  href="javascript:void(0)"
                  aria-expanded="false"
                >
                  <span className="rounded-3">
                    <i className="ti ti-layout-sidebar" />
                  </span>
                  <span className="hide-menu">Tables</span>
                </a>
                <ul aria-expanded="false" className="collapse first-level">
                  <li className="sidebar-item">
                    <a href="../dark/table-basic.html" className="sidebar-link">
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Basic Table</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/table-dark-basic.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Dark Basic Table</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/table-sizing.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Sizing Table</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/table-layout-coloured.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Coloured Table</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/table-datatable-basic.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Basic Initialisation</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/table-datatable-api.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">API</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/table-datatable-advanced.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Advanced Initialisation</span>
                    </a>
                  </li>
                </ul>
              </li>
              {/* ============================= */}
              {/* Charts */}
              {/* ============================= */}
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4" />
                <span className="hide-menu">Charts</span>
              </li>
              {/* =================== */}
              {/* Apex Chart */}
              {/* =================== */}
              <li className="sidebar-item">
                <a
                  className="sidebar-link has-arrow"
                  href="javascript:void(0)"
                  aria-expanded="false"
                >
                  <span className="rounded-3">
                    <i className="ti ti-chart-pie" />
                  </span>
                  <span className="hide-menu">Charts</span>
                </a>
                <ul aria-expanded="false" className="collapse first-level">
                  <li className="sidebar-item">
                    <a
                      href="../dark/chart-apex-line.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Line Chart</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/chart-apex-area.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Area Chart</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/chart-apex-bar.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Bar Chart</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/chart-apex-pie.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Pie Chart</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/chart-apex-radial.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Radial Chart</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="../dark/chart-apex-radar.html"
                      className="sidebar-link"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Radar Chart</span>
                    </a>
                  </li>
                </ul>
              </li>
              {/* ============================= */}
              {/* Icons */}
              {/* ============================= */}
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4" />
                <span className="hide-menu">Icons</span>
              </li>
              {/* =================== */}
              {/* Tabler Icon */}
              {/* =================== */}
              <li className="sidebar-item">
                <a
                  className="sidebar-link has-arrow"
                  href="javascript:void(0)"
                  aria-expanded="false"
                >
                  <span className="rounded-3">
                    <i className="ti ti-archive" />
                  </span>
                  <span className="hide-menu">Icon</span>
                </a>
                <ul aria-expanded="false" className="collapse first-level">
                  <li className="sidebar-item">
                    <a href="../dark/icon-tabler.html" className="sidebar-link">
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Tabler Icon</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="../dark/icon-solar.html" className="sidebar-link">
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Solar Icon</span>
                    </a>
                  </li>
                </ul>
              </li>
              {/* multi level */}
              <li className="sidebar-item">
                <a
                  className="sidebar-link has-arrow"
                  href="javascript:void(0)"
                  aria-expanded="false"
                >
                  <span className="rounded-3">
                    <iconify-icon
                      icon="solar:airbuds-case-minimalistic-line-duotone"
                      className="ti"
                    />
                  </span>
                  <span className="hide-menu">Multi DD</span>
                </a>
                <ul aria-expanded="false" className="collapse first-level">
                  <li className="sidebar-item">
                    <a href="../docs/index.html" className="sidebar-link">
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Documentation</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="javascript:void(0)" className="sidebar-link">
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Page 1</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="javascript:void(0)"
                      className="sidebar-link has-arrow"
                    >
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Page 2</span>
                    </a>
                    <ul aria-expanded="false" className="collapse second-level">
                      <li className="sidebar-item">
                        <a href="javascript:void(0)" className="sidebar-link">
                          <i className="ti ti-circle" />
                          <span className="hide-menu">Page 2.1</span>
                        </a>
                      </li>
                      <li className="sidebar-item">
                        <a href="javascript:void(0)" className="sidebar-link">
                          <i className="ti ti-circle" />
                          <span className="hide-menu">Page 2.2</span>
                        </a>
                      </li>
                      <li className="sidebar-item">
                        <a href="javascript:void(0)" className="sidebar-link">
                          <i className="ti ti-circle" />
                          <span className="hide-menu">Page 2.3</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="sidebar-item">
                    <a href="javascript:void(0)" className="sidebar-link">
                      <i className="ti ti-circle" />
                      <span className="hide-menu">Page 3</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          {/* End Sidebar navigation */}
        </div>
        {/* End Sidebar scroll*/}
      </aside>
    </div>
  );
}
