import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const roomTypes = ["Double", "Triple", "Quad"];

const initialState = {
  fullName: "",
  fatherName: "",
  cnic: "",
  passportNumber: "",
  passportExpiry: "",
  dateOfBirth: "",
  bloodGroup: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  country: "",
  roomType: "",
  nomineeName: "",
  nomineeCnic: "",
  nomineeRelationship: "",
  nomineePhone: "",
};

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-stone-300 mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full bg-[#13201b] border border-emerald-900/40 rounded-lg px-3.5 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all";

export default function HajjRegistrationForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!photo) {
      setError("Please upload a photograph of the applicant.");
      return;
    }

    setSubmitting(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      data.append("photo", photo);

      await API.post("/hajj-registrations", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again or contact us via WhatsApp.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-[#0a0e0d] flex items-center justify-center px-6 py-20">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6 text-3xl text-emerald-400">
            ✓
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">
            Registration Submitted
          </h1>
          <p className="text-stone-400 text-sm mb-8">
            Thank you for registering for Hajj 2027. Our team will review
            your details and contact you shortly to confirm your seat.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("/")}
              className="bg-[#d4af37] hover:bg-[#c9a449] text-[#0a0e0d] font-bold px-6 py-3 rounded-xl transition-all"
            >
              Back to Home
            </button>
            <a
              href="https://wa.me/923218485159"
              target="_blank"
              rel="noreferrer"
              className="bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl transition-all"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0e0d] py-14 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[#d4af37] text-xs font-bold uppercase tracking-widest mb-2">
            Seats Limited
          </p>
          <h1 className="text-3xl font-bold text-white mb-2">
            Hajj 2027 Registration
          </h1>
          <p className="text-stone-400 text-sm">
            Please fill in your details accurately as per your passport and
            CNIC.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#0e1512] border border-emerald-900/30 rounded-2xl p-7 space-y-8"
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Applicant Details */}
          <section className="space-y-4">
            <h2 className="text-[#d4af37] text-sm font-bold uppercase tracking-widest border-b border-emerald-900/30 pb-2">
              Applicant Details
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name">
                <input
                  name="fullName"
                  required
                  value={form.fullName}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="As per passport"
                />
              </Field>
              <Field label="Father's Name">
                <input
                  name="fatherName"
                  required
                  value={form.fatherName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Field>
              <Field label="CNIC Number">
                <input
                  name="cnic"
                  required
                  value={form.cnic}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="XXXXX-XXXXXXX-X"
                />
              </Field>
              <Field label="Date of Birth">
                <input
                  type="date"
                  name="dateOfBirth"
                  required
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Field>
              <Field label="Passport Number">
                <input
                  name="passportNumber"
                  required
                  value={form.passportNumber}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Field>
              <Field label="Passport Expiry">
                <input
                  type="date"
                  name="passportExpiry"
                  required
                  value={form.passportExpiry}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Field>
              <Field label="Blood Group">
                <select
                  name="bloodGroup"
                  required
                  value={form.bloodGroup}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select</option>
                  {bloodGroups.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Room Type">
                <select
                  name="roomType"
                  required
                  value={form.roomType}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select</option>
                  {roomTypes.map((rt) => (
                    <option key={rt} value={rt}>
                      {rt}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Phone Number">
                <input
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="03XX-XXXXXXX"
                />
              </Field>
              <Field label="Email (optional)">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Field>
              <Field label="City">
                <input
                  name="city"
                  required
                  value={form.city}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Field>
              <Field label="Country">
                <input
                  name="country"
                  required
                  value={form.country}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. Pakistan"
                />
              </Field>
            </div>
            <Field label="Address">
              <textarea
                name="address"
                required
                rows={2}
                value={form.address}
                onChange={handleChange}
                className={inputClass}
              />
            </Field>
          </section>

          {/* Nominee Details */}
          <section className="space-y-4">
            <h2 className="text-[#d4af37] text-sm font-bold uppercase tracking-widest border-b border-emerald-900/30 pb-2">
              Nominee Details
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Nominee Name">
                <input
                  name="nomineeName"
                  required
                  value={form.nomineeName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Field>
              <Field label="Nominee CNIC">
                <input
                  name="nomineeCnic"
                  required
                  value={form.nomineeCnic}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Field>
              <Field label="Relationship">
                <input
                  name="nomineeRelationship"
                  required
                  value={form.nomineeRelationship}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. Son, Spouse"
                />
              </Field>
              <Field label="Nominee Phone">
                <input
                  name="nomineePhone"
                  required
                  value={form.nomineePhone}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Field>
            </div>
          </section>

          {/* Photo Upload */}
          <section className="space-y-4">
            <h2 className="text-[#d4af37] text-sm font-bold uppercase tracking-widest border-b border-emerald-900/30 pb-2">
              Applicant Photograph
            </h2>
            <div className="flex items-center gap-5">
              <div className="w-24 h-24 rounded-xl bg-[#13201b] border border-emerald-900/40 flex items-center justify-center overflow-hidden flex-shrink-0">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-stone-600 text-xs text-center px-2">
                    No photo
                  </span>
                )}
              </div>
              <label className="cursor-pointer bg-[#13201b] hover:bg-emerald-500/10 border border-emerald-900/40 text-stone-200 text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
                Choose Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-xs text-stone-500">
              3x4 cm passport-style photo with light blue background
              preferred.
            </p>
          </section>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#d4af37] hover:bg-[#c9a449] disabled:opacity-60 disabled:cursor-not-allowed text-[#0a0e0d] font-bold py-3.5 rounded-xl transition-all hover:scale-[1.01]"
          >
            {submitting ? "Submitting..." : "Submit Registration"}
          </button>
        </form>
      </div>
    </main>
  );
}