import React from "react";

export default function Searchbar() {
  return (
    <div>
      <div className="modal-dialog modal-dialog-scrollable modal-lg">
        <div className="modal-content rounded-1">
          <div className="modal-header border-bottom">
            <input
              type="search"
              className="form-control fs-3"
              placeholder="Search here"
              id="search"
            />
            <a
              href="javascript:void(0)"
              data-bs-dismiss="modal"
              className="lh-1"
            >
              <i className="ti ti-x fs-5 ms-3" />
            </a>
          </div>
          <div className="modal-body message-body" data-simplebar>
            <h5 className="mb-0 fs-5 p-1">Quick Page Links</h5>
            <ul className="list mb-0 py-2">
              <li className="p-1 mb-1 bg-hover-light-black">
                <a href="javascript:void(0)">
                  <span className="d-block">Modern</span>
                  <span className="text-muted d-block">
                    /dashboards/dashboard1
                  </span>
                </a>
              </li>
              <li className="p-1 mb-1 bg-hover-light-black">
                <a href="javascript:void(0)">
                  <span className="d-block">Dashboard</span>
                  <span className="text-muted d-block">
                    /dashboards/dashboard2
                  </span>
                </a>
              </li>
              <li className="p-1 mb-1 bg-hover-light-black">
                <a href="javascript:void(0)">
                  <span className="d-block">Contacts</span>
                  <span className="text-muted d-block">/apps/contacts</span>
                </a>
              </li>
              <li className="p-1 mb-1 bg-hover-light-black">
                <a href="javascript:void(0)">
                  <span className="d-block">Posts</span>
                  <span className="text-muted d-block">/apps/blog/posts</span>
                </a>
              </li>
              <li className="p-1 mb-1 bg-hover-light-black">
                <a href="javascript:void(0)">
                  <span className="d-block">Detail</span>
                  <span className="text-muted d-block">
                    /apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow
                  </span>
                </a>
              </li>
              <li className="p-1 mb-1 bg-hover-light-black">
                <a href="javascript:void(0)">
                  <span className="d-block">Shop</span>
                  <span className="text-muted d-block">
                    /apps/ecommerce/shop
                  </span>
                </a>
              </li>
              <li className="p-1 mb-1 bg-hover-light-black">
                <a href="javascript:void(0)">
                  <span className="d-block">Modern</span>
                  <span className="text-muted d-block">
                    /dashboards/dashboard1
                  </span>
                </a>
              </li>
              <li className="p-1 mb-1 bg-hover-light-black">
                <a href="javascript:void(0)">
                  <span className="d-block">Dashboard</span>
                  <span className="text-muted d-block">
                    /dashboards/dashboard2
                  </span>
                </a>
              </li>
              <li className="p-1 mb-1 bg-hover-light-black">
                <a href="javascript:void(0)">
                  <span className="d-block">Contacts</span>
                  <span className="text-muted d-block">/apps/contacts</span>
                </a>
              </li>
              <li className="p-1 mb-1 bg-hover-light-black">
                <a href="javascript:void(0)">
                  <span className="d-block">Posts</span>
                  <span className="text-muted d-block">/apps/blog/posts</span>
                </a>
              </li>
              <li className="p-1 mb-1 bg-hover-light-black">
                <a href="javascript:void(0)">
                  <span className="d-block">Detail</span>
                  <span className="text-muted d-block">
                    /apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow
                  </span>
                </a>
              </li>
              <li className="p-1 mb-1 bg-hover-light-black">
                <a href="javascript:void(0)">
                  <span className="d-block">Shop</span>
                  <span className="text-muted d-block">
                    /apps/ecommerce/shop
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
