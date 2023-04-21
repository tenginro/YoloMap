import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkUpdatePlace } from "../../store/place";

const defaultProfilePic =
  "https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg";

export default function UpdatePlaceForm({ place }) {
  const placeId = place.id;

  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [name, setName] = useState(place.name);
  const [description, setDescription] = useState(place.description || "");
  const [address, setAddress] = useState(place.address);
  const [city, setCity] = useState(place.city);
  const [state, setState] = useState(place.state);
  const [website, setWebsite] = useState(place.website || "");
  const [phone, setPhone] = useState(place.phone || "");
  const [hours, setHours] = useState(place.hours || "");
  const [category, setCategory] = useState(place.category);
  const [cover_pic, setCover_Pic] = useState(place.cover_pic);
  const [lat, setLat] = useState(place.lat || 0);
  const [lng, setLng] = useState(place.lng || 0);

  const [errorMessage, setErrorMessage] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage({});

    const formData = new FormData();
    formData.append("id", placeId);
    formData.append("creatorId", user.id);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("website", website);
    formData.append("phone", phone);
    formData.append("hours", hours);
    formData.append("category", category);
    formData.append("cover_pic", cover_pic || defaultProfilePic);
    formData.append("lat", lat);
    formData.append("lng", lng);

    let response = await dispatch(thunkUpdatePlace(formData, placeId));

    if (response.errors) {
      setErrorMessage(response.errors);
    } else {
      setErrorMessage({});
      return history.push(`/places/${response.id}`);
    }
  };

  return (
    <div className="placeForm">
      <form onSubmit={handleSubmit} id="PlaceForm">
        <h2>Update the place</h2>
        <label>
          <div className="inputLabel">
            Name: *{"  "}
            {errorMessage?.name && (
              <div className="errors">{errorMessage.name}</div>
            )}
          </div>
          <input
            type="text"
            value={name}
            placeholder="name is required"
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
          <input
            type="text"
            value={description}
            placeholder="please provide a short description"
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </label>

        <label>
          <div className="inputLabel">
            Address: *{"  "}
            {errorMessage?.address && (
              <div className="errors">{errorMessage.address}</div>
            )}
          </div>
          <input
            type="text"
            value={address}
            placeholder="address is required"
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </label>

        <label>
          <div className="inputLabel">
            City: *{"  "}
            {errorMessage?.city && (
              <div className="errors">{errorMessage.city}</div>
            )}
          </div>
          <input
            type="text"
            value={city}
            placeholder="city is required"
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </label>

        <label>
          <div className="inputLabel">
            State: *{"  "}
            {errorMessage?.state && (
              <div className="errors">{errorMessage.state}</div>
            )}
          </div>
          <input
            type="text"
            value={state}
            placeholder="state is required"
            onChange={(e) => setState(e.target.value)}
            required
          ></input>
        </label>

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
            placeholder="website"
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
            placeholder="phone"
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
            placeholder="open hours"
            onChange={(e) => setHours(e.target.value)}
          ></input>
        </label>

        <div className="categoryLabel">
          <div className="inputLabel">
            Choose a category: *{" "}
            {errorMessage?.category && (
              <div className="errors">{errorMessage.category}</div>
            )}
          </div>
          <select
            id="categorySelect"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            name="category"
          >
            <option value="">--Please choose an option--</option>
            <option value="Art">Art</option>
            <option value="Bakery">Bakery</option>
            <option value="Bar">Bar</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Travel">Travel</option>
          </select>
        </div>

        <label>
          <div className="inputLabel">
            Cover Picture: (optional){"  "}
            {errorMessage?.cover_pic && (
              <div className="errors">{errorMessage.cover_pic}</div>
            )}
          </div>
          <input
            type="text"
            value={cover_pic}
            placeholder="picture"
            onChange={(e) => setCover_Pic(e.target.value)}
          ></input>
        </label>

        <label>
          <div className="inputLabel">
            Latitude: (optional){"  "}
            {errorMessage?.lat && (
              <div className="errors">{errorMessage.lat}</div>
            )}
          </div>
          <input
            type="text"
            value={lat}
            placeholder="latitude"
            onChange={(e) => setLat(e.target.value)}
          ></input>
        </label>

        <label>
          <div className="inputLabel">
            Longitude: (optional){"  "}
            {errorMessage?.lng && (
              <div className="errors">{errorMessage.lng}</div>
            )}
          </div>
          <input
            type="text"
            value={lng}
            placeholder="longitude"
            onChange={(e) => setLng(e.target.value)}
          ></input>
        </label>
        <div>* - required field</div>
        <div className="placeFormButtonContainer">
          <button className="placeFormButton">Update Place</button>
        </div>
      </form>
    </div>
  );
}
