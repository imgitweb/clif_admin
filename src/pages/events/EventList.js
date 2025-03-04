import { useEffect, useState } from "react";
import Topheader from "../../component/Topheader";
import axios from "axios";
import API_URL from "../../config";

const EventList = () => {
  const [allEvents, setEventList] = useState([]);

  useEffect(() => {
    fetchEventList();
  }, []);

  const fetchEventList = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/event/event-list`);
      if (response.status === 200) {
        console.log(response.data.data);
        setEventList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  return (
    <>
      <div className="main-wrapper">
        <Topheader />
        <div className="">
          <div className="page-wrapper mt-5">
            <div className="container-fluid">
              <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
                <div className="card-body px-4 py-3">
                  <div className="row align-items-center">
                    <div className="col-9">
                      <h4 className="fw-semibold mb-8">Event List</h4>
                      <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                          <li className="breadcrumb-item">
                            <a
                              className="text-muted text-decoration-none"
                              href="../dark/index.html"
                            >
                              Home
                            </a>
                          </li>
                          <li className="breadcrumb-item" aria-current="page">
                            Event
                          </li>
                          <li className="breadcrumb-item" aria-current="page">
                            Event List
                          </li>
                        </ol>
                      </nav>
                    </div>
                    <div className="col-3">
                      <div className="text-center mb-n5">
                        <img
                          src="../../assets/assets/images/backgrounds/welcome-bg.svg"
                          alt="breadcrumb-img"
                          className="img-fluid mb-n4"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-12 justify-content-center mx-auto">
                  <div className="card shadow-sm">
                    <div className="container py-5">
                      <h1 className="mb-4">Events List</h1>
                      <div className="table-responsive">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>Title</th>
                              <th>Event Type</th>
                              <th>Event Date</th>
                              <th>Event Time</th>
                              <th>Event Link</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allEvents.map((event) => {
                              return (
                                <tr key={event._id}>
                                  <td>{event.event_name}</td>
                                  <td>{event.event_type}</td>
                                  <td>{event.event_data}</td>
                                  <td>{event.event_time}</td>
                                  <td>
                                    <a
                                      href={event.event_link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {event.event_link}
                                    </a>
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-danger"
                                      onClick={() => {
                                        console.log("Delete Event");
                                      }}
                                    >
                                      <i className="ti ti-trash">Delete</i>
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventList;
