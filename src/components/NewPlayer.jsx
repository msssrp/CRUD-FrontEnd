import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NewPlayer() {
  const [newPlayer, setNewPlayer] = useState({
    firstName: "",
    lastName: "",
    team: "",
    position: "",
  });

  const [playerImage, setPlayerImage] = useState([]);
  const [preViewPlayer, setPreViewPlayer] = useState(null);

  console.log(newPlayer, playerImage);

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setNewPlayer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnFile = (e) => {
    if (e.target.files[0]) {
      setPlayerImage(e.target.files[0]);
      const render = new FileReader();
      render.onload = () => {
        setPreViewPlayer(render.result);
      };
      render.readAsDataURL(e.target.files[0]);
    }
  };

  const handleOnsubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", newPlayer.firstName);
    formData.append("lastName", newPlayer.lastName);
    formData.append("team", newPlayer.team);
    formData.append("position", newPlayer.position);
    formData.append("file", playerImage);

    axios
      .post("http://localhost:5000/player/controll", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status == 201) {
            toast.success(`${res.data.msg}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                
              });
        } else {
            toast.error(`${res.data.msg}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      <Navbar />
      <div className="flex flex-col justify-center items-center h-full bg-white pt-[50px] pb-[50px]">
        <div class="w-full max-w-[550px] h-full bg-white">
          <form class="py-6 px-9" action="post" onSubmit={handleOnsubmit}>
            <div class="mb-5">
              <label
                for="firstName"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                First name & Last name
              </label>
              <input
                type="text"
                name="firstName"
                onChange={handleOnchange}
                class="w-[47%] mr-[10px] rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              <input
                type="text"
                name="lastName"
                onChange={handleOnchange}
                class="w-[50%] rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div class="mb-5">
              <label
                for="text"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Team
              </label>
              <input
                type="text"
                name="team"
                onChange={handleOnchange}
                id="team"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div class="mb-5">
              <label
                for="position"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Position
              </label>
              <input
                type="text"
                onChange={handleOnchange}
                name="position"
                id="position"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div class="mb-6 pt-4">
              <label class="mb-5 block text-xl font-semibold text-[#07074D]">
                {!preViewPlayer && <>Upload Room image</>}
                {preViewPlayer && <>Change picture</>}
              </label>

              <div className={`mb-8 ${!playerImage ? "hidden" : null}`}>
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="sr-only"
                  onChange={handleOnFile}
                />
                <label
                  htmlFor="file"
                  className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                >
                  <div>
                    <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                      Drop files here
                    </span>
                    <span className="mb-2 block text-base font-medium text-[#6B7280]">
                      Or
                    </span>
                    <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                      Browse
                    </span>
                  </div>
                </label>
              </div>

              {preViewPlayer && (
                <div className="mb-8">
                  <label
                    htmlFor=""
                    className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                  >
                    <img
                      src={preViewPlayer}
                      alt="Selected file preview"
                      className="w-full"
                    />
                  </label>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                class="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none mt-[25px]"
              >
                Create New Player
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewPlayer;
