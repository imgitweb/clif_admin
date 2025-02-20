import { useEffect, useState } from "react";
import Topheader from "../../component/Topheader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import API_URL from "../../config";

const optionSkills = [
  { value: "aws", label: "AWS" },
  { value: "react", label: "React" },
  { value: "node", label: "Node" },
  { value: "typescript", label: "TypeScript" },
  { value: "mysql", label: "MySQL" },
  { value: "angular", label: "Angular" },
];

const optionInstitutes = [
  { value: "iit_madras", label: "Indian Institute of Technology Madras" },
  { value: "iit_delhi", label: "Indian Institute of Technology Delhi" },
  { value: "iit_bombay", label: "Indian Institute of Technology Bombay" },
  { value: "iit_kanpur", label: "Indian Institute of Technology Kanpur" },
  { value: "iit_kharagpur", label: "Indian Institute of Technology Kharagpur" },
  { value: "iit_roorkee", label: "Indian Institute of Technology Roorkee" },
  { value: "iit_guwahati", label: "Indian Institute of Technology Guwahati" },
  { value: "iit_hyderabad", label: "Indian Institute of Technology Hyderabad" },
  {
    value: "nit_trichy",
    label: "National Institute of Technology Tiruchirappalli",
  },
  { value: "iit_indore", label: "Indian Institute of Technology Indore" },
  { value: "iit_bhu", label: "Indian Institute of Technology (BHU) Varanasi" },
  {
    value: "iit_dhanbad",
    label: "Indian Institute of Technology (ISM) Dhanbad",
  },
  {
    value: "nit_surathkal",
    label: "National Institute of Technology Karnataka Surathkal",
  },
  { value: "anna_university", label: "Anna University Chennai" },
  { value: "vit", label: "Vellore Institute of Technology" },
  { value: "nit_rourkela", label: "National Institute of Technology Rourkela" },
  { value: "jadavpur_university", label: "Jadavpur University Kolkata" },
  { value: "ict_mumbai", label: "Institute of Chemical Technology Mumbai" },
  { value: "nit_warangal", label: "National Institute of Technology Warangal" },
  { value: "amrita_vishwa_vidyapeetham", label: "Amrita Vishwa Vidyapeetham" },
  {
    value: "iiest_shibpur",
    label: "Indian Institute of Engineering Science and Technology Shibpur",
  },
  {
    value: "iit_bhubaneswar",
    label: "Indian Institute of Technology Bhubaneswar",
  },
  { value: "nit_calicut", label: "National Institute of Technology Calicut" },
  {
    value: "iit_gandhinagar",
    label: "Indian Institute of Technology Gandhinagar",
  },
  { value: "iit_ropar", label: "Indian Institute of Technology Ropar" },
  { value: "iit_patna", label: "Indian Institute of Technology Patna" },
  {
    value: "vnit_nagpur",
    label: "Visvesvaraya National Institute of Technology Nagpur",
  },
  { value: "jmi", label: "Jamia Millia Islamia" },
  {
    value: "thapar_institute",
    label: "Thapar Institute of Engineering & Technology Patiala",
  },
  {
    value: "bits_pilani",
    label: "Birla Institute of Technology & Science Pilani",
  },
  { value: "iit_mandi", label: "Indian Institute of Technology Mandi" },
  { value: "amity_university", label: "Amity University Noida" },
  {
    value: "iiit_thiruvananthapuram",
    label:
      "Indian Institute of Space Science and Technology Thiruvananthapuram",
  },
  { value: "soas_bhubaneswar", label: "Siksha 'O' Anusandhan Bhubaneswar" },
  {
    value: "mnit_jaipur",
    label: "Malaviya National Institute of Technology Jaipur",
  },
  { value: "dtu", label: "Delhi Technological University" },
  {
    value: "shanmugha_academy",
    label: "Shanmugha Arts Science Technology & Research Academy Thanjavur",
  },
  { value: "bit_ranchi", label: "Birla Institute of Technology Ranchi" },
  { value: "amu", label: "Aligarh Muslim University" },
  {
    value: "nit_kurukshetra",
    label: "National Institute of Technology Kurukshetra",
  },
  {
    value: "srmuniversity",
    label: "S. R. M. Institute of Science and Technology Chennai",
  },
  {
    value: "kiit_bhubaneswar",
    label: "Kalinga Institute of Industrial Technology Bhubaneswar",
  },
  {
    value: "iiit_hyderabad",
    label: "International Institute of Information Technology Hyderabad",
  },
  {
    value: "ssn_college",
    label: "Sri Sivasubramaniya Nadar College of Engineering Kancheepuram",
  },
  {
    value: "manipal_institute",
    label: "Manipal Institute of Technology Manipal",
  },
  { value: "nit_silchar", label: "National Institute of Technology Silchar" },
  { value: "nit_durgapur", label: "National Institute of Technology Durgapur" },
  {
    value: "mnnit_allahabad",
    label: "Motilal Nehru National Institute of Technology Allahabad",
  },
  { value: "psg_college", label: "PSG College of Technology Coimbatore" },
  {
    value: "sathyabama_institute",
    label: "Sathyabama Institute of Science and Technology Chennai",
  },
  {
    value: "nit_jalandhar",
    label: "Dr. B. R. Ambedkar National Institute of Technology Jalandhar",
  },
  { value: "iit_jodhpur", label: "Indian Institute of Technology Jodhpur" },
  {
    value: "svnit_surat",
    label: "Sardar Vallabhbhai National Institute of Technology Surat",
  },
  {
    value: "vtu_belgaum",
    label: "Visvesvaraya Technological University Belgaum",
  },
  {
    value: "iiitd_delhi",
    label: "Indraprastha Institute of Information Technology Delhi",
  },
  {
    value: "jntuh",
    label: "Jawaharlal Nehru Technological University Hyderabad",
  },
  {
    value: "kluniversity",
    label: "Koneru Lakshmaiah Education Foundation University Vaddeswaram",
  },
  {
    value: "msrit_bengaluru",
    label: "M. S. Ramaiah Institute of Technology Bengaluru",
  },
  {
    value: "kalasalingam_academy",
    label:
      "Kalasalingam Academy of Research and Higher Education Srivilliputtur",
  },
  {
    value: "nit_meghalaya",
    label: "National Institute of Technology Meghalaya Shillong",
  },
  {
    value: "iiitb_bengaluru",
    label:
      "International Institute of Information Technology Bangalore Bengaluru",
  },
  {
    value: "diat_pune",
    label: "Defence Institute of Advanced Technology Pune",
  },
  {
    value: "thiagarajar_college",
    label: "Thiagarajar College of Engineering Madurai",
  },
];
const optionLanguages = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
];
const highestEd = [
  { value: "doctorate", label: "Doctorate" },
  { value: "masters", label: "Masters" },
  { value: "bachelor", label: "Bachelor" },
];
const regEx = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const AddMentor = () => {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    designation: "",
    totalExp: 0,
    aboutUs: "",
    higherEducation: "",
    skills: [],
    languages: [],
    // availableTime: "",
    rating: 0,
    category: "",
    gender: "",
    institute: "",
    email: "",
    mo_number: "",
    country: "IN",
    city: "",
    linkedin: "",
    specializationIn: "",
  });
  //   const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const category = ["Technical", "Non Technical", "Subject Expert"];
  const rating = [1, 2, 3, 4, 5];
  const [stateOrCity, setStateOrCity] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //getting all countries and cities

  const getCountries = () => {
    const countries = Country.getAllCountries(); // You should have a list of countries
    return countries.map((country) => ({
      value: country.isoCode,
      label: country.name,
    }));
  };

  // Fetch states or cities based on the selected country
  useEffect(() => {
    getCountry();
  }, [formData.country]);

  const getCountry = async () => {
    if (formData.country) {
      // Check if the selected country is India (IN)
      if (formData.country === "IN") {
        const states = await State.getStatesOfCountry(formData.country);
        setStateOrCity(
          states.map((state) => ({
            value: state.isoCode,
            label: state.name,
          }))
        );
      } else {
        const cities = await City.getCitiesOfCountry(formData.country);
        setStateOrCity(
          cities.map((city) => ({
            value: city.name,
            label: city.name,
          }))
        );
      }
    }
  };
  // handle multiple select option
  const handleSelectChange = (selectedOption, field) => {
    if (Array.isArray(selectedOption)) {
      // If it's a multi-select, map over the selected options and store the values
      setFormData({
        ...formData,
        [field]: selectedOption.map((option) => option.value),
      });
    } else {
      // If it's a single select, just store the value directly
      setFormData({
        ...formData,
        [field]: selectedOption ? selectedOption.value : "",
      });
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const newError = {};
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        newError.image = "File size too large. Maximum size is 5MB";
        alert("File size too large. Maximum size is 5MB");
        return;
      }
      if (Object.keys(newError).length > 0) {
        setErrors(newError);
        console.log("Error", newError);
      }
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  // handle submit
  const handleSubmit = async (e) => {
    // console.log(formData);
    e.preventDefault();
    setSubmit(true);
    const newError = {};
    if (!formData.image) newError.image = "Image is required.";
    if (!formData.name) newError.name = "Name is required.";
    if (!formData.designation)
      newError.designation = "Designation is required.";
    if (!formData.totalExp) newError.totalExp = "Experience is required.";
    if (!formData.aboutUs) newError.aboutUs = "About us is required.";
    if (!formData.higherEducation)
      newError.higherEducation = "Higher education is required.";
    if (!formData.skills.length) newError.skills = "Skills are required.";
    if (!formData.languages.length)
      newError.languages = "Languages are required.";
    if (!formData.rating) newError.rating = "Rating is required.";
    if (!formData.category) newError.category = "Category is required.";
    if (!formData.gender) newError.gender = "Gender is required.";
    if (!formData.institute) newError.institute = "Institute is required.";
    if (!formData.country) newError.country = "Country is required.";
    if (!formData.city) newError.city = "City is required.";
    if (!formData.email) newError.email = "Email is required.";
    if (formData.email) {
      if (regEx.test(formData.email) === false) {
        newError.email = "Please enter a valid email address.";
        alert("Invalid Email");
      }
    }
    if (!formData.mo_number) newError.mo_number = "Mobile number is required.";
    if (formData.mo_number.length !== 10) {
      newError.mo_number = "Please enter a valid mobile number.";
      alert("Invalid Mobile Number");
    }
    if (!formData.linkedin) newError.linkedin = "Linkedin is required.";
    if (!formData.specializationIn)
      newError.specializationIn = "specialization is required.";

    // trigger error if any
    if (Object.keys(newError).length > 0) {
      setErrors(newError);
      setSubmit(false);
      return;
    }
    setErrors({}); //if no error then set error to null
    setSubmit(true); //set submit to true
    const submitFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item) => {
          submitFormData.append(key, item);
        });
      } else {
        submitFormData.append(key, formData[key]);
      }
    });

    try {
      // calling the insert api
      const response = await axios.post(
        `${API_URL}/admin/api/mentors/add-mentor`,
        submitFormData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Data submitted successfully!");
      // console.log(formData)
      navigate("/mentor-list");
    } catch (error) {
      if (error.status === 409) {
        alert("Mentor with this email already exists");
        setErrors({ email: "provide a different email" });
        formData.email = "";
      }
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setSubmit(false);
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
    }),
    // menu: (provided) => ({
    //   ...provided,
    //   zIndex: 9999,
    // }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#5A6A85"
        : state.isFocused
        ? "#e9ecef"
        : null,
      color: state.isSelected ? "#5A6A85" : "#5A6A85",
    }),
    // singleValue: (provided) => ({
    //   ...provided,
    //   color: '#5A6A85',
    // }),
  };
  return (
    <>
      <div className="main-wrapper">
        <Topheader />
        <div className="page-wrapper pt-5">
          <div className="">
            <div className="container-fluid">
              <div className="container-fluid pt-5">
                <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
                  <div className="card-body px-4 py-3">
                    <div className="row align-items-center">
                      <div className="col-9">
                        <h4 className="fw-semibold mb-8">Add Mentor</h4>
                        <nav aria-label="breadcrumb">
                          <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                              <a
                                className="text-muted text-decoration-none"
                                href="../dark/index.html"
                              >
                                Home
                              </a>
                            </li>
                            <li className="breadcrumb-item" aria-current="page">
                              Mentor
                            </li>
                            <li className="breadcrumb-item" aria-current="page">
                              Add Mentor
                            </li>
                          </ol>
                        </nav>
                      </div>
                      <div className="col-3">
                        <div className="text-center mb-n5">
                          <img
                            src="../../assets/assets/images/backgrounds/welcome-bg.svg"
                            alt="breadcrumb-img"
                            className="img-fluid mb-n4"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-lg-8 justify-content-center mx-auto">
                    <div className="card shadow-sm">
                      <div className="container py-5">
                        <h1 className="mb-4">Add Mentor</h1>
                        <form onSubmit={handleSubmit} className="mb-4">
                          {/* image and Name */}
                          <div className="row mb-3">
                            <div className="col-md-6">
                              <label htmlFor="image" className="form-label">
                                Mentor's Image*
                              </label>
                              <input
                                type="file"
                                className="form-control"
                                id="image"
                                name="image"
                                onChange={handleFileChange}
                              />
                              <div>
                                {errors.image && (
                                  <span
                                    style={{ color: "red", fontSize: "12px" }}
                                  >
                                    {errors.image}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="name" className="form-label">
                                Name*
                              </label>
                              <input
                                type="text"
                                placeholder="Mentor's Name"
                                className="form-control"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                              />
                              <div>
                                {errors.name && (
                                  <span
                                    style={{ color: "red", fontSize: "12px" }}
                                  >
                                    {errors.name}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-md-6">
                              <label htmlFor="email" className="form-label">
                                Email*
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                              />
                              <div>
                                {errors.email && (
                                  <span
                                    style={{ color: "red", fontSize: "12px" }}
                                  >
                                    {errors.email}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="mo_number" className="form-label">
                                Mobile Number*
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="mo_number"
                                name="mo_number"
                                onChange={handleInputChange}
                              />
                              <div>
                                {errors.mo_number && (
                                  <span
                                    style={{ color: "red", fontSize: "12px" }}
                                  >
                                    {errors.mo_number}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="md-6">
                              <label htmlFor="linkedin" className="form-label">
                                Linkedin*
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Your linkedin account link"
                                id="linkedin"
                                name="linkedin"
                                onChange={handleInputChange}
                              />
                              <div>
                                {errors.linkedin && (
                                  <span
                                    style={{ color: "red", fontSize: "12px" }}
                                  >
                                    {errors.linkedin}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-md-6">
                              <label htmlFor="gender" className="form-label">
                                Gender*
                              </label>
                              <select
                                className="form-select"
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                              >
                                <option value="" hidden>
                                  Select Mentors Gender
                                </option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                              </select>
                              <div>
                                {errors.gender && (
                                  <span
                                    style={{ color: "red", fontSize: "12px" }}
                                  >
                                    {errors.gender}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor="designation"
                                className="form-label"
                              >
                                Designation*
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Mentor's Designation"
                                id="designation"
                                name="designation"
                                onChange={handleInputChange}
                              />
                              <div>
                                {errors.designation && (
                                  <span
                                    style={{ color: "red", fontSize: "12px" }}
                                  >
                                    {errors.designation}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          {/* Designation and Total Exp */}
                          <div className="row mb-3">
                            <div className="col-md-6">
                              <label htmlFor="totalExp" className="form-label">
                                Total Experience*
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Your total experience"
                                min="0"
                                id="totalExp"
                                name="totalExp"
                                value={formData.totalExp}
                                onChange={handleInputChange}
                              />
                              <div>
                                {errors.totalExp && (
                                  <span
                                    style={{ color: "red", fontSize: "12px" }}
                                  >
                                    {errors.totalExp}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="aboutUs" className="form-label">
                                About This Mentor*
                              </label>
                              <input
                                type="textarea"
                                className="form-control"
                                placeholder="About This Mentor"
                                id="aboutUs"
                                name="aboutUs"
                                value={formData.aboutUs}
                                onChange={handleInputChange}
                              />
                              <div>
                                {errors.aboutUs && (
                                  <span
                                    style={{ color: "red", fontSize: "12px" }}
                                  >
                                    {errors.aboutUs}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          {/* About Us and Higher Education */}
                          <div className="row mb-3">
                            <div className="col-md-6">
                              <label
                                htmlFor="higherEducation"
                                className="form-label"
                              >
                                Highest Education*
                              </label>
                              <Select
                                name="higherEducation"
                                id="higherEducation"
                                options={highestEd} // List of available skills
                                value={highestEd.find(
                                  (ed) => ed.value === formData.higherEducation
                                )}
                                onChange={(selectedOption) =>
                                  handleSelectChange(
                                    selectedOption,
                                    "higherEducation"
                                  )
                                }
                                closeMenuOnSelect={true} // Keep the menu open when a selection is made
                                placeholder="Select Higher Education"
                                className="form-control"
                              />
                              <div>
                                {errors.higherEducation && (
                                  <span
                                    style={{ color: "red", fontSize: "12px" }}
                                  >
                                    {errors.higherEducation}
                                  </span>
                                )}
                              </div>
                            </div>
                            {/* condition for specialization text box */}
                            {formData.higherEducation && (
                              <div className="col-md-6">
                                <label
                                  htmlFor="specializationIn"
                                  className="form-label"
                                >
                                  Specialization In*
                                </label>
                                <input
                                  type="text"
                                  placeholder="ex : MBA or BA or M.Tech etc"
                                  className="form-control"
                                  id="specializationIn"
                                  name="specializationIn"
                                  value={formData.specializationIn}
                                  onChange={handleInputChange}
                                />
                                <div>
                                  {errors.specializationIn && (
                                    <span
                                      style={{ color: "red", fontSize: "12px" }}
                                    >
                                      {errors.specializationIn}
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                            <div className="col-md-6">
                              <label htmlFor="institute" className="form-label">
                                Institute*
                              </label>
                              <select
                                className="form-select"
                                id="institute"
                                name="institute"
                                value={formData.institute}
                                onChange={handleInputChange}
                              >
                                <option value="" hidden>
                                  Seletct Institute
                                </option>
                                {optionInstitutes.map((inst) => (
                                  <option key={inst.value} value={inst.value}>
                                    {inst.label}
                                  </option>
                                ))}
                              </select>
                              <div>
                                {errors.institute && (
                                  <span
                                    style={{ color: "red", fontSize: "12px" }}
                                  >
                                    {errors.institute}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          {/* Country and city */}
                          <div className="row mb-3">
                            {/* Country Dropdown */}
                            <div className="col-md-6">
                              <label htmlFor="country" className="form-label">
                                Country*
                              </label>
                              <Select
                                id="country"
                                name="country"
                                options={getCountries()}
                                value={
                                  formData.country
                                    ? {
                                        value: formData.country,
                                        label: getCountries().find(
                                          (country) =>
                                            country.value === formData.country
                                        )?.label,
                                      }
                                    : null
                                }
                                onChange={(selectedOption) =>
                                  handleSelectChange(selectedOption, "country")
                                }
                                placeholder="Select Country"
                                className="form-select"
                                // closeMenuOnSelect={true}
                              />
                              {errors.country && (
                                <span
                                  style={{ color: "red", fontSize: "12px" }}
                                >
                                  {errors.country}
                                </span>
                              )}
                            </div>

                            {/* City/State Dropdown */}
                            <div className="col-md-6">
                              <label htmlFor="city" className="form-label">
                                City/State*
                              </label>
                              <Select
                                id="city"
                                name="city"
                                options={stateOrCity}
                                value={
                                  formData.city
                                    ? {
                                        value: formData.city,
                                        label: stateOrCity.find(
                                          (item) => item.value === formData.city
                                        )?.label,
                                      }
                                    : null
                                }
                                onChange={(selectedOption) =>
                                  handleSelectChange(selectedOption, "city")
                                }
                                placeholder="Select City/State"
                                className="form-select"
                              />
                              {errors.city && (
                                <span
                                  style={{ color: "red", fontSize: "12px" }}
                                >
                                  {errors.city}
                                </span>
                              )}
                            </div>
                          </div>
                          {/* Category And Rating Selection */}
                          <div className="row mb-3 ">
                            <div className="col-md-6">
                              <label htmlFor="category" className="form-label">
                                Category*
                              </label>
                              <select
                                className="form-select"
                                name="category"
                                id="category"
                                value={formData.category}
                                onChange={handleInputChange}
                              >
                                <option value="" hidden>
                                  Select Category
                                </option>
                                {category.map((cat) => (
                                  <option key={cat} value={cat.toLowerCase()}>
                                    {cat}
                                  </option>
                                ))}
                              </select>
                              <div>
                                {errors.category && (
                                  <span
                                    style={{ color: "red", fontSize: "12px" }}
                                  >
                                    {errors.category}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="rating" className="form-label">
                                Rating*
                              </label>
                              <select
                                className="form-select filter-dropdown secondary"
                                name="rating"
                                id="rating"
                                value={formData.rating}
                                onChange={handleInputChange}
                              >
                                <option value="" hidden>
                                  Select Rating
                                </option>
                                {rating.map((rating) => (
                                  <option key={rating} value={rating}>
                                    {rating}
                                  </option>
                                ))}
                              </select>
                              <div>
                                {errors.rating && (
                                  <span
                                    style={{ color: "red", fontSize: "12px" }}
                                  >
                                    {errors.rating}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          {/*Skills and languages */}
                          <div className="row mb-3">
                            <div className="col-md-6">
                              <label htmlFor="skills" className="form-label">
                                Skills*
                              </label>
                              <Select
                                isMulti
                                name="skills"
                                id="skills"
                                options={optionSkills} // List of available skills
                                value={optionSkills.filter((option) =>
                                  formData.skills.includes(option.value)
                                )}
                                onChange={(selectedOptions) =>
                                  handleSelectChange(selectedOptions, "skills")
                                } // Handle changes using onChange
                                closeMenuOnSelect={true} // close menu when a selection is made
                                placeholder="Select Skills"
                                className="form-select"
                                styles={customStyles}
                              />
                              <div>
                                {errors.skills && (
                                  <span
                                    style={{ color: "red", fontSize: "12px" }}
                                  >
                                    {errors.skills}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="languages" className="form-label">
                                Languages*
                              </label>
                              <Select
                                isMulti
                                name="languages"
                                id="languages"
                                options={optionLanguages} // List of available skills
                                value={optionLanguages.filter((option) =>
                                  formData.languages.includes(option.value)
                                )}
                                onChange={(selectedOptions) =>
                                  handleSelectChange(
                                    selectedOptions,
                                    "languages"
                                  )
                                } // Handle changes using onChange
                                closeMenuOnSelect={true} // close menu when a selection is made
                                placeholder="Select languages"
                                className="form-select"
                                styles={customStyles}
                              />
                              <div>
                                {errors.languages && (
                                  <span
                                    style={{ color: "red", fontSize: "12px" }}
                                  >
                                    {errors.languages}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          {/* Submit Button */}
                          <div className="form-group">
                            <button
                              type="submit"
                              className="btn btn-primary w-100"
                              disabled={submit}
                            >
                              Add Mentor
                            </button>
                          </div>
                        </form>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMentor;
