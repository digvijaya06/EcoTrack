import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 🛠 Fix Leaflet marker icon paths (ES module compatible way)
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
        // Refresh the page after 3 seconds
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start pt-28 md:pt-32 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/2990647/pexels-photo-2990647.jpeg')",
      }}
    >
      <div className="absolute inset-0 bg-green-900 bg-opacity-70 backdrop-blur-sm" />

      <div className="relative z-15 flex flex-col md:flex-row max-w-5xl w-full bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-lg p-3 mx-4 my-6 gap-10">
        {/* Form Card */}
        <div className="flex-[0_0_50%] max-w-md w-full sticky top-20 max-h-[calc(100vh-5rem)] overflow-auto">
          <h2 className="text-4xl font-extrabold mb-4 text-transparent bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text">
            Contact Us
          </h2>
          <p className="mb-8 text-gray-700 font-medium">
            Have questions or suggestions? We'd love to hear from you.
          </p>

          {submitted && (
            <p className="text-green-700 mb-6 font-semibold">
              Thank you! Your message has been sent.
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {["name", "email", "message"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-semibold text-teal-700 mb-1 capitalize"
                >
                  {field}
                </label>
                {field === "message" ? (
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-teal-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
                    placeholder="Write your message here..."
                  />
                ) : (
                  <input
                    type={field === "email" ? "email" : "text"}
                    id={field}
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-teal-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
                    placeholder={
                      field === "name" ? "Your full name" : "you@example.com"
                    }
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg shadow-lg hover:from-green-700 hover:to-teal-700 transition font-semibold"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Map Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4 text-center md:text-left text-green-800">
            Our Location
          </h2>
          <div className="h-96 w-full rounded-xl overflow-hidden shadow-xl">
            <MapContainer
              center={[24.5854, 73.7125]} // Udaipur Coordinates
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[24.5854, 73.7125]}>
                <Popup>
                  Our Office <br />
                  Udaipur, Rajasthan <br />
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=24.5854,73.7125"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Get Directions
                  </a>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
          {/* Contact Details moved below map */}
          <div className="mt-6 text-teal-800 font-medium space-y-2">
            <p>
              <strong>Email:</strong> Ecolog@gmail.com
            </p>
            <p>
              <strong>Phone:</strong> +91 98765 43210
            </p>
            <p>
              <strong>Address:</strong> 123, Udaipur, Rajasthan, India
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
