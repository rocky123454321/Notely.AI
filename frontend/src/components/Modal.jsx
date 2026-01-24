import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Modal = () => {

  const navigate = useNavigate();

 const [showModal] = useState(() => {
  const storedUser = localStorage.getItem("user");
  return !storedUser; // true if no user, false if logged in
});


  return (
    <>
      {showModal && (
        <dialog className="modal modal-bottom sm:modal-middle" open>
          <div className="modal-box">
            <h3 className="font-bold text-lg">You are not logged in!</h3>
            <p className="py-4">
              Please log in or create an account to use this feature.
            </p>
            <div className="modal-action flex gap-2">
              <button
                className="btn "
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
         
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default Modal;
