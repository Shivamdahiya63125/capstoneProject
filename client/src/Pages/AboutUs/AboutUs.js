import React from "react";
import "./AboutUsStyle.css";

const AboutUs = () => {
  return (
    <div>
      <div class="container">
        <div class="grid">
          <div class="card">
            <div class="card_img">
              <img
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"
                alt=""
              />
            </div>
            <div class="card_body">
              <h2 class="card_title">Shivam Dahiya </h2>
              <h6 class="designation">Lead Developer</h6>
              <h4>lorem </h4>
            </div>
          </div>
          <div class="card">
            <div class="card_img">
              <img
                src="https://images.unsplash.com/photo-1577880216142-8549e9488dad?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                alt=""
              />
            </div>
            <div class="card_body">
              <h2 class="card_title">Avleen Kaur</h2>
              <h6 class="designation">UI Designer</h6>
              <h4>lorem </h4>
            </div>
          </div>
          <div class="card">
            <div class="card_img">
              <img
                src="https://images.unsplash.com/photo-1516750084685-66c3b1f181ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
                alt=""
              />
            </div>
            <div class="card_body">
              <h2 class="card_title">Diksha</h2>
              <h6 class="designation">Project Manager</h6>
              <h4>lorem </h4>
            </div>
          </div>
          <div class="card">
            <div class="card_img">
              <img
                src="https://images.unsplash.com/photo-1516750084685-66c3b1f181ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
                alt=""
              />
            </div>
            <div class="card_body">
              <h2 class="card_title">Akhya Vyas</h2>
              <h6 class="designation">Project Manager</h6>
              <h4>lorem </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
