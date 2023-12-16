import React, { useEffect, useState } from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { collref, db } from './Firebase';
import { addDoc, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { checkValidateform } from './Validate';
import ErrorForm from './ErrorForm';

const UserForm = ({ bool, setEditForm, getId }) => {
  const data = getId?.filterdData[0]
  const [errorPage, setErrorPage] = useState(false)
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [location, setlocation] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [State, setState] = useState("");
  const [countriesData, setCountriesData] = useState([]);
  const [filterdData, setFilterdData] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    address_1: "",
    address_2: "",
    pinCode: "",
    phoneNumber: "",
    State: "",
    selectedCountry: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    data && setFormData(data)

  }, [data])
  const handleOnChange = (value) => {
    setPhoneNumber(value);
  };

  useEffect(() => {
    getCountriesData();
  }, [inputValue]);
useEffect(()=>{
  const timer=setTimeout(() => {
    setErrorPage(false)
  }, 2000);
  return ()=>clearTimeout(timer)
},[errorPage])
  useEffect(() => {
    const timer = setTimeout(() => {
      getPincode();
    }, 250);

    return () => clearTimeout(timer);
  }, [formData.pinCode]);

  const getPincode = async () => {
    if (formData.pinCode) {
      const data = await fetch(`https://api.postalpincode.in/pincode/${formData.pinCode}`);
      const json = await data.json();
      console.log(json[0].PostOffice[0].Block);
      setlocation(json[0].PostOffice[0].Block);
    }
  };

  const handleSelectCountry = (e) => {
    const value = e.target.value;
    setSelectedCountry(value);
    const filterStates = countriesData.filter((country) => country.name.toLowerCase() === value.toLowerCase());
    setStates(filterStates[0]?.states || []);
    console.log(filterStates);
  };

  const getCountriesData = async () => {
    const data = await fetch("https://countriesnow.space/api/v0.1/countries/states");
    const json = await data.json();
    setCountriesData(json.data);
    if (inputValue) {
      const filter = countriesData.filter((ele) => ele.name.toLowerCase().includes(inputValue.toLowerCase()));
      setFilterdData(filter);
      console.log(filter);
    } else {
      setFilterdData(json.data);
      const initialState = json.data.filter((ele) => ele.name.toLowerCase() === selectedCountry.toLowerCase());
      setStates(initialState[0]?.states || []);
    }
  };

  const handleSubmit = () => {
    const message = checkValidateform(formData.email_id);
    console.log(message);
    if (
      formData.first_name.length >= 5 &&
      formData.last_name.length >= 5 &&
      formData.address_1.length >= 10 &&
      formData.email_id &&
      formData.pinCode &&
      phoneNumber &&
      State &&
      selectedCountry && !message
    ) {
   
      addDoc(collref, {
        first_name: formData.first_name,
        last_name: formData.last_name,
        address_1: formData.address_1,
        email_id: formData.email_id,
        zip_code: formData.pinCode,
        phoneNumber: phoneNumber,
        selectedCountry: selectedCountry,
        State: State,
      });
      console.log(formData);
      navigate("/details");
    } else {
      setErrorPage(true)    
    }
  };

  const handleSave = () => {
console.log(formData);
    const docRef = doc(db, "User", getId.id);
if(formData.first_name&&formData.last_name&&formData.email_id&&formData.email_id&&formData.pinCode&&(phoneNumber || (data && data.phoneNumber))&&(selectedCountry||(selectedCountry&&data.selectedCountry)&&(State || (data && data.State))))
{
    
    updateDoc(docRef, {
      first_name: formData.first_name,
      last_name: formData.last_name,
      address_1: formData.address_1,
      email_id: formData.email_id,
      zip_code: formData.pinCode,
      phoneNumber: phoneNumber || (data && data.phoneNumber) || '',
      selectedCountry: (selectedCountry||(selectedCountry&&data.selectedCountry)||"Select Country"),
      State: (State || (data && data.State)) || 'Select State',
    });
    setEditForm({
      bool: false,
    });
  }
  else{
setErrorPage(true)    
  }

  };

  const handleCancel = () => {
    setEditForm({
      bool: false,
    });
  };

  return (
    <div style={bool && { position: "absolute", top: 0, left: 0 }} className='w-full h-[98vh] flex flex-col relative items-center justify-center'>
      {
        errorPage&&<ErrorForm setErrorPage={setErrorPage}/>

      }
      <div style={bool && { background: "#fff" }} className="form-element w-96 bg-slate-100 p-5 rounded-lg">
        <h1 className='text-center font-bold text-2xl'>{!bool?"Login Page":"Edit Page"}</h1>
        <form className='w-full py-2 h-92 overflow-y-auto form-data flex flex-col gap-1' onSubmit={(e) => e.preventDefault()}>
          <div className='first-name flex flex-col font-bold'>
            <label htmlFor="f-name">First Name: <span className='text-red-600 text-[18px]'>*</span> </label>
            <input
              type="text"
              name='first_name'
              onChange={handleChange}
              value={formData.first_name}
              placeholder='First Name:'
              className='px-4 py-1 shadow-lg border-2 border-black rounded-lg bg-gray-300 outline-none placeholder:text-black placeholder:font-normal focus:border-purple-600'
              id='f-name'
            />
            {formData.first_name.length >= 1 && formData.first_name.length < 5 && (
              <p className='text-[12px] text-red-600 text-center'>Enter First-name character should be greater than 5</p>
            )}
          </div>

          <div className='last-name flex flex-col font-bold'>
            <label htmlFor="l-name">Last Name: <span className='text-red-600 text-[18px]'>*</span></label>
            <input
              type="text"
              name='last_name'
              onChange={handleChange}
              value={formData.last_name}
              placeholder='Last Name:'
              className='px-4 py-1 shadow-lg border-2 border-black rounded-lg bg-gray-300 outline-none placeholder:text-black placeholder:font-normal focus:border-purple-600'
              id='l-name'
            />
            {formData.last_name.length >= 1 && formData.last_name.length < 5 && (
              <p className='text-[12px] text-red-600 text-center'>Enter last-name character should be greater than 5</p>
            )}
          </div>

          <div className='email-id flex flex-col font-bold'>
            <label htmlFor="e-id">Email Id: <span className='text-red-600 text-[18px]'>*</span></label>
            <input
              type="text"
              name='email_id'
              value={formData.email_id}
              onChange={handleChange}
              placeholder='Email-id'
              className='px-4 py-1 shadow-lg border-2 border-black rounded-lg bg-gray-300 outline-none placeholder:text-black placeholder:font-normal focus:border-purple-600'
              id='e-id'
            />
            <p className='text-[12px] text-red-600 text-center'>{(!formData.email_id.includes(".com")&&formData.email_id.length>0&&"Enter a Valid Mail")}</p>
          </div>

          <div>
          <PhoneInput
  placeholder="Enter phone number"
  className='focus:border-2 border-purple-500'
  value={phoneNumber || (data && data.phoneNumber) || ''}
  onChange={handleOnChange}
/>

            {phoneNumber && !isValidPhoneNumber(phoneNumber) && (
              <div style={{ color: 'red' }}>Invalid phone number</div>
            )}
          </div>

          <div className='address-1 flex flex-col font-bold'>
            <label htmlFor="add1-id">Address 1: <span className='text-red-600 text-[18px]'>*</span></label>
            <textarea
              name="address_1"
              style={{ maxHeight: "100px" }}
              value={formData.address_1}
              onChange={handleChange}
              className='px-4 py-1 shadow-lg border-2 border-black rounded-lg bg-gray-300 outline-none placeholder:text-black placeholder:font-normal focus:border-purple-600'
              id="add1-id"
              cols="10"
              rows="2"
            ></textarea>
            {formData.address_1.length >= 1 && formData.address_1.length < 10 && (
              <p className='text-[12px] text-red-600 text-center'>Please fill More information about the address</p>
            )}
          </div>

          <div className='address-2 flex flex-col font-bold'>
            <label htmlFor="add2-id">Address 2:</label>
            <textarea
              name="address_2"
              style={{ maxHeight: "100px" }}
              value={formData.address_2}
              onChange={handleChange}
              className='px-4 py-1 shadow-lg bg-gray-300 outline-none border-2 border-black rounded-lg placeholder:text-black placeholder:font-normal focus:border-purple-600'
              id="add2-id"
              cols="10"
              rows="2"
            ></textarea>
          </div>

          <div className='flex justify-between'>
            <div className='countries-data w-24'>
              <div className='flex relative '>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder='countries'
                  className='w-[100%] bg-transparent px-1 shadow-xl border-2 border-black rounded-full outline-none placeholder:text-black placeholder:font-normal'
                />
                <span className='w-6 absolute right-[1.5px] top-[1.5px] h-6 text-sm flex items-center justify-center font-bold text-white bg-blue-500 rounded-full'>
                  {filterdData.length}
                </span>
              </div>
              <select
                name=""
                className='w-[100%] mt-2 shadow-lg bg-gray-300 outline-none'
                value={selectedCountry}
                onChange={handleSelectCountry}
                id=""
              >
                {filterdData.length ? (
                  filterdData.map((country, i) => (
                    <option key={country.iso2} value={country.name.common}>
                      {country.name}
                    </option>
                  ))
                ) : (
                  <option>No Results found</option>
                )}
              </select>
              <p className='text-orange-500 font-bold font-mono'>{selectedCountry}</p>
            </div>

            <div className='states-data w-24'>
              <div className='flex relative'>
                <input
                  type="text"
                  placeholder='states'
                  className='w-[100%] bg-transparent px-1 shadow-xl border-2 border-black rounded-full outline-none placeholder:text-black placeholder:font-normal'
                />
                <span className='w-6 absolute right-[1.5px] top-[1.5px] h-6 text-sm flex items-center justify-center font-bold text-white bg-blue-500 rounded-full'>
                  {states.length}
                </span>
              </div>

              <select
                name=""
                className='w-[100%] mt-2 shadow-lg bg-gray-300 outline-none'
                id=""
                value={State}
                onChange={(e) => setState(e.target.value)}
              >
                {states.length ? (
                  states.map((state) => (
                    <option key={state.name} value={state.name}>
                      {state.name}
                    </option>
                  ))
                ) : (
                  <option>No States Found</option>
                )}
              </select>
              <p className='text-green-600 font-bold font-mono'>{(State || (data && data.State)) || 'No State'}</p>

            </div>

            <div className="postal-code ">
              <input type="text"
               value={(formData.pinCode || (data && data.zip_code)) || ''}
               name='pinCode'
                onChange={handleChange}
                placeholder='Zip-code'
                className='w-24 bg-transparent px-2 shadow-xl border-2 border-black rounded-full outline-none placeholder:text-black placeholder:font-normal'
              />
              <span className='text-red-600 text-[18px]'>*</span>
              {formData.pinCode ? (
                <p>{location}</p>
              ) : (
                <p className='text-red-500 text-xs font-bold mt-2'>Enter Valid Zip-Code</p>
              )}
            </div>
          </div>
          {bool ? (
            <div className='flex justify-between '>
              <button
                className='px-4 w-28 py-2 font-bold rounded-lg bg-red-500 hover:bg-red-600 transition-all duration-300'
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className='px-4 w-28 font-bold py-2 rounded-lg bg-green-500 hover:bg-green-600 transition-all duration-300'
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          ) : (
            <div className='submit-btn w-full mt-4'>
              <button
                type='submit'
                onClick={handleSubmit}
                className='bg-green-500 w-full py-2 font-bold shadow-lg rounded-lg hover:bg-green-600 transition-all duration-300'
              >
                Submit
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserForm;


