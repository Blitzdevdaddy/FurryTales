import React from "react";
import Header from "./Header";

function ContactUs() {
  return (
    <div className="bg-light">
      <Header />
      <section className="contact mt-5">
        <div className="container">
          <h2 className="text-center mb-4">Contact Us</h2>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card border-primary">
                <div className="card-body">
                  <h3 className="card-title">Address</h3>
                  <p className="card-text">
                    House No: 138<br />
                    Street Name: Parkinson<br />
                    London<br />
                    2345678
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card border-success">
                <div className="card-body">
                  <h3 className="card-title">Phone</h3>
                  <p className="card-text">0142-89765323</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border-info">
                <div className="card-body">
                  <h3 className="card-title">Email</h3>
                  <p className="card-text">furrytales@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;
