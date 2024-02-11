import React, { useEffect, useState } from "react";
import UserMenu from "../../Components/UserMenu";
import { useAuth } from "../../Context/authContext";
import axios from "axios";

function Profile() {
  const { auth, setAuth } = useAuth();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const { email, name, phone, address, password } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/auth/profile`,
        { name, email, password, phone }
        // answer was removed in thee video
      );

      if (data?.error) {
        console.log(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        console.log("Profile Updated Successfully");
      }
      // if (res && res.data && res.data.success) {
      //   notyf.success(res.data && res.data.message);
      //   navigate("/login");
      // } else {
      //   notyf.error(res.data.message);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="d-flex " style={{ gap: "2rem" }}>
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-8">
          <div
            className="form-container"
            style={{ marginTop: "-40px", minHeight: "100vh" }}
          >
            <form onSubmit={handleSubmit}>
              <h4 className="title">USER PROFILE</h4>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter Your Name"
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter Your Email "
                  disabled
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter Your Password"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter Your Phone"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
