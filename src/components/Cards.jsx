import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Cards() {
  const [playerData, setPlayerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/player/controll");
        setPlayerData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

    return () => {
      setPlayerData([]);
    };
  }, []);

  const deleteRoom = (id) =>{

    axios.delete(`http://localhost:5000/player/controll/${id}`).then(res=>{
      if(res.data.status === 'success'){
        toast.success(`${res.data.msg}`,{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
         
        })
      }else{
        toast.error(`${res.data.msg}`,{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
    }).catch(err=>{
      console.log(err);
    })
  
  }

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
      {playerData.length > 0 ? (
        <>
          <Navbar />
          <div className="md:container md:mx-auto mt-[50px]">
            <div className="grid grid-cols-4 gap-[50px]">


            {playerData.map((val)=>{
                return(
                    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-200">
                <a href="#">
                  <img
                    class="rounded-t-lg"
                    src={`data:image/jpeg;base64,${val.image}`}
                    alt=""
                  />
                </a>
                <div class="p-5">
                  <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
                      {val.firstName} {val.lastName}
                    </h5>
                  </a>
                  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {val.team}
                  </p>
                  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {val.position}
                  </p>
                  <Link
                    to={{pathname:`/edit/${val.id}`,search:`?name=${val.firstName}&lname=${val.lastName}&team=${val.team}&position=${val.position}`}}
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Edit
                    <svg
                      aria-hidden="true"
                      class="w-4 h-4 ml-2 -mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </Link>
                  <a onClick={()=>{deleteRoom(val.id)}} className="ml-[15px] cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                              Delete
                            </a>
                </div>
              </div>
                )
            })}
              



            </div>
          </div>
        </>
      ) : (
        <div className="text-center mt-[150px]">
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
    </>
  );
}

export default Cards;
