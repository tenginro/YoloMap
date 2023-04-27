import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkCreatePlace } from "../../store/place";

import "./CreatePlace.css";

const states_usa = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

export default function CreatePlace() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [hours, setHours] = useState("");
  const [category, setCategory] = useState("");
  const [cover_pic, setCover_Pic] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const [errorMessage, setErrorMessage] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage({});

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("website", website);
    formData.append("phone", phone);
    formData.append("hours", hours);
    formData.append("category", category);
    formData.append("cover_pic", cover_pic);
    if (lat) formData.append("lat", lat);
    if (lng) formData.append("lng", lng);

    let response = await dispatch(thunkCreatePlace(formData));

    if (response.errors) {
      setImageLoading(false);
      setErrorMessage(response.errors);
    } else {
      setImageLoading(false);
      setErrorMessage({});
      return history.push(`/places/${response.id}`);
    }
  };

  return (
    <div className="placeFormContainer">
      <form onSubmit={handleSubmit} id="PlaceForm">
        <h2>Create the place you want to go</h2>
        <label>
          <div className="inputLabel">
            Name*: {"  "}
            {errorMessage?.name && (
              <div className="errors">{errorMessage.name}</div>
            )}
          </div>
          <input
            type="text"
            value={name}
            placeholder="Name is required"
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
        </label>

        <label>
          <div className="inputLabel">
            Description: (optional){"  "}
            {errorMessage?.description && (
              <div className="errors">{errorMessage.description}</div>
            )}
          </div>
          <textarea
            className="descriptionInputArea"
            type="text"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>

        <label>
          <div className="inputLabel">
            Address*: {"  "}
            {errorMessage?.address && (
              <div className="errors">{errorMessage.address}</div>
            )}
          </div>
          <input
            type="text"
            value={address}
            placeholder="Address is required"
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </label>
        <div id="cityAndState">
          <label>
            <div className="inputLabel city">
              City*: {"  "}
              {errorMessage?.city && (
                <div className="errors">{errorMessage.city}</div>
              )}
            </div>
            <input
              type="text"
              value={city}
              placeholder="City is required"
              onChange={(e) => setCity(e.target.value)}
              required
            ></input>
          </label>
          <label>
            <div className="inputLabel">
              State*: {"  "}
              {errorMessage?.state && (
                <div className="errors">{errorMessage.state}</div>
              )}
            </div>
            <select
              id="stateSelect"
              onChange={(e) => setState(e.target.value)}
              value={state}
              name="state"
              required
            >
              <option value="">--Please select a state--</option>
              {states_usa.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label>
          <div className="inputLabel">
            Website: (optional){"  "}
            {errorMessage?.website && (
              <div className="errors">{errorMessage.website}</div>
            )}
          </div>
          <input
            type="text"
            value={website}
            placeholder="Website"
            onChange={(e) => setWebsite(e.target.value)}
          ></input>
        </label>

        <label>
          <div className="inputLabel">
            Phone: (optional){"  "}
            {errorMessage?.phone && (
              <div className="errors">{errorMessage.phone}</div>
            )}
          </div>
          <input
            type="text"
            value={phone}
            placeholder="Phone"
            onChange={(e) => setPhone(e.target.value)}
          ></input>
        </label>

        <label>
          <div className="inputLabel">
            Hours: (optional){"  "}
            {errorMessage?.hours && (
              <div className="errors">{errorMessage.hours}</div>
            )}
          </div>
          <input
            type="text"
            value={hours}
            placeholder="e.g. Mon-Fri: 9AM-11AM; Sat-Sun: All day"
            onChange={(e) => setHours(e.target.value)}
          ></input>
        </label>

        <div className="categoryLabel">
          <div className="inputLabel">
            Choose a category*: {"  "}
            {errorMessage?.category && (
              <div className="errors">{errorMessage.category}</div>
            )}
          </div>
          <select
            id="categorySelect"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            name="category"
            required
          >
            <option value="">--Please select a category--</option>
            <option value="Art">Art</option>
            <option value="Bakery">Bakery</option>
            <option value="Bar">Bar</option>
            <option value="Coffee/Tea">Coffee/Tea</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Travel">Travel</option>
          </select>
        </div>

        <label>
          <div className="inputLabel">
            Cover Picture*: {"  "}
            {errorMessage?.cover_pic && (
              <div className="errors">{errorMessage.cover_pic}</div>
            )}
          </div>
          <input
            id="coverPicPlaceInput"
            type="file"
            accept="image/*"
            onChange={(e) => setCover_Pic(e.target.files[0])}
            required
          ></input>
        </label>

        <label>
          <div className="inputLabel">
            Latitude*: {"  "}
            {errorMessage?.lat && (
              <div className="errors">{errorMessage.lat}</div>
            )}
          </div>
          <input
            type="text"
            value={lat}
            placeholder="Latitude is between -90 and 90"
            onChange={(e) => setLat(e.target.value)}
            required
          ></input>
        </label>

        <label>
          <div className="inputLabel">
            Longitude*: {"  "}
            {errorMessage?.lng && (
              <div className="errors">{errorMessage.lng}</div>
            )}
          </div>
          <input
            type="text"
            value={lng}
            placeholder="Longitude is between -180 and 180"
            onChange={(e) => setLng(e.target.value)}
            required
          ></input>
        </label>
        <div>* - required field</div>
        <div className="placeFormButtonContainer">
          <button className="placeFormButton">Create Place</button>
        </div>
      </form>
    </div>
  );
}
