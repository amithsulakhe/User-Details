import { deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { collref, db } from "./Firebase";
import UserForm from "./UserForm";
import { Link, useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { useDispatch, useSelector } from "react-redux";
import { toggleEditPage } from "./Redux/slice";

const UserTable = () => {
  const [Id, setId] = useState("");
  const dispatch = useDispatch();
  const editPage = useSelector((store) => store.slice.editPage);
  // const [editForm, setEditForm] = useState({
  //   bool: editPage,
  // });
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    console.log("calling..");
    onSnapshot(collref, (snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      console.log(users);

      setUserData(users);
    });
  }, []);

  const handleEdit = (id) => {
    // setEditForm({
    //   // position: "absolute",
    //   // top: 0,
    //   bool: true,
    // });
    dispatch(toggleEditPage({ bool: true }));
    const filterdData = userData.filter((ele) => ele.id === id);
    console.log(filterdData);
    setId({ id, filterdData });
  };

  const handleDelete = (id) => {
    const docRef = doc(db, "User", id);
    deleteDoc(docRef);
  };

  return (
    <div className='p-6 m-2 relative  border-4 border-black rounded-lg bg-blue-50 h-[98vh]'>
      <div className='flex justify-around'>
        <h1 className='font-bold text-xl md:text-2xl'>MY USER DETAILS</h1>
        <Link
          className='py-2 px-3 text-white font-bold rounded-lg bg-red-500'
          to='/'
        >
          Home
        </Link>
      </div>
      <div className='w-full py-2  h-92 overflow-y-auto md:h-[500px]'>
        {userData.length ? (
          <table className='w-full '>
            <thead>
              <tr>
                <th>First-Name</th>
                <th>Last-name</th>
                <th>Email-id</th>
                <th>Mobile No</th>
                <th>Address-1</th>
                <th>Country</th>
                <th>State</th>
                <th>Zip-Code</th>
                <th>Edit/Del</th>
              </tr>
            </thead>

            <tbody>
              {userData?.map((ele) => {
                return (
                  <tr key={ele.id}>
                    <td>{ele.first_name} </td>
                    <td>{ele.last_name}</td>
                    <td>{ele.email_id}</td>
                    <td>{ele.phoneNumber}</td>
                    <td>{ele.address_1}</td>
                    <td>{ele.selectedCountry}</td>
                    <td>{ele.State}</td>
                    <td>{ele.zip_code}</td>
                    <td className='text-center'>
                      <i
                        className='fa-solid fa-pen mr-1 md:mr-3 cursor-pointer'
                        onClick={() => handleEdit(ele?.id)}
                      ></i>
                      <i
                        className='fa-solid fa-trash text-orange-500 cursor-pointer'
                        onClick={() => handleDelete(ele?.id)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <ErrorPage />
        )}
      </div>
      {editPage && (
        <UserForm
          getId={Id}
          handleEdit={handleEdit}
          // setEditForm={setEditForm}
          bool={editPage}
        />
      )}
    </div>
  );
};

export default UserTable;