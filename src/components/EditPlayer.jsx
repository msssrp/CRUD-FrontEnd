import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import queryString from "query-string";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function EditPlayer() {
  const { id } = useParams();

  const location = useLocation();

  const { name, lname, team, position } = queryString.parse(location.search);

  const [playerImage, setPlayerImage] = useState([]);

  const [upDatePlayer, setUpDatePlayer] = useState({
    firstName: "",
    lastName: "",
    team: "",
    position: "",
  });

  console.log(upDatePlayer);

  const [newPlayerImage, setNewPlayerImage] = useState([]);
  const [playerPreview, setPlayerPreview] = useState(null);

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setUpDatePlayer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnsubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", upDatePlayer.firstName);
    formData.append("lastName", upDatePlayer.lastName);
    formData.append("team", upDatePlayer.team);
    formData.append("position", upDatePlayer.position);
    formData.append("file", newPlayerImage);

    axios.put(`http://localhost:5000/player/controll/${id}`,formData,{
        headers: {
            "Content-Type": "multipart/form-data",
          },
    }).then((res) => {
      if (res.data.status === 'success') {
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
        toast.error(`Can't Update`, {
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
    });
  };

  const handleFile = (e) => {
   if(e.target.files[0]){
    setNewPlayerImage(e.target.files[0]);
    const render = new FileReader();
    render.onload = () => {
      setPlayerPreview(render.result);
    };
    render.readAsDataURL(e.target.files[0]);
   }
     
    
  };

  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/player/api/playerDataByID/${id}`
        );
        setPlayerImage(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

    return () => {
      setPlayerImage([]);
    };
  }, []);

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
                for="roomNumber"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                First name & Last name
              </label>
              <input
                type="text"
                firstName="roomNumber"
                name="firstName"
                placeholder={name}
                onChange={handleOnchange}
                class="w-[47%] mr-[10px] rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              <input
                type="text"
                name="lastName"
                placeholder={lname}
                onChange={handleOnchange}
                class="w-[50%] rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div class="mb-5">
              <label
                for="team"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Team
              </label>
              <input
                type="text"
                name="team"
                id="team"
                placeholder={team}
                onChange={handleOnchange}
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
                name="position"
                id="position"
                placeholder={position}
                onChange={handleOnchange}
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div class="mb-6 pt-4">
              <label class="mb-5 block text-xl font-semibold text-[#07074D]">
                {!playerPreview && <>Upload image</>}
                {playerPreview && <>Change image</>}
              </label>

              <div class="mb-8">
                <label class="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
                  {playerImage.length > 0 ? (
                    <img
                      src={`data:image/jpeg;base64,${playerImage}`}
                      alt="Player"
                      className={`${playerImage.length <= 0 ? "hidden" : null}`}
                    />
                  ) : (
                    <div className="text-center">
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div class="mb-6 pt-4">
              <label class="mb-5 block text-xl font-semibold text-[#07074D]"></label>

              <div class="mb-8">
                <input
                  type="file"
                  name="file"
                  id="file"
                  class="sr-only"
                  onChange={handleFile}
                />
                <label
                  for="file"
                  class="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                >
                  <div>
                    <span class="mb-2 block text-xl font-semibold text-[#07074D]">
                      Drop files here
                    </span>
                    <span class="mb-2 block text-base font-medium text-[#6B7280]">
                      Or
                    </span>
                    <span class="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                      Browse
                    </span>
                  </div>
                </label>
              </div>

              {playerPreview && (
                <div className="mb-8">
                  <label
                    htmlFor=""
                    className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                  >
                    <img
                      src={playerPreview}
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
                class="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Update Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditPlayer;
