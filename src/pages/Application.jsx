import { useMemo, useRef, useState } from "react";
import Breadcrum from "../layouts/Breadcrum";


// Helpers
const formatBytes = (bytes) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const isImage = (file) => file && file.type.startsWith("image/");

const extFromName = (name = "") => {
  const dot = name.lastIndexOf(".");
  return dot !== -1 ? name.slice(dot + 1).toUpperCase() : "FILE";
};

const classNames = (...cls) => cls.filter(Boolean).join(" ");

// Small UI primitives
function StepBadge({ index, active, done }) {
  return (
    <div
      className={classNames(
        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold",
        done ? "bg-green-600 text-white" : active ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700",
      )}
    >
      {done ? "✓" : index + 1}
    </div>
  );
}

function SectionCard({ title, children, actions }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      <div>{children}</div>
      {actions && <div className="mt-6 flex gap-3 justify-end">{actions}</div>}
    </div>
  );
}

function Input({ label, required, hint, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700">
        {label}
        {required && <sup className="text-red-600 ml-0.5">*</sup>}
      </span>
      <input
        className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        {...props}
      />
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </label>
  );
}

function Select({ label, required, options = [], ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700">
        {label}
        {required && <sup className="text-red-600 ml-0.5">*</sup>}
      </span>
      <select
        className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        {...props}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

// Document Upload components
function DocumentPreviewItem({ file, onRemove }) {
  const objectUrl = useMemo(() => URL.createObjectURL(file), [file]);

  const isImg = isImage(file);
  return (
    <div className="border rounded-xl p-2 flex items-center gap-3 bg-gray-50">
      {isImg ? (
        <img src={objectUrl} alt={file.name} className="w-16 h-16 object-cover rounded-lg" />
      ) : (
        <div className="w-16 h-16 rounded-lg bg-white border flex items-center justify-center text-xs font-semibold">
          {extFromName(file.name)}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{file.name}</p>
        <p className="text-xs text-gray-500">{formatBytes(file.size)}</p>
      </div>
      <button type="button" onClick={onRemove} className="px-2.5 py-1.5 text-sm rounded-lg border bg-white hover:bg-gray-100">
        Remove
      </button>
    </div>
  );
}

function DocumentDropzone({ label, hint, accept, files, setFiles, required }) {
  const inputRef = useRef(null);

  const onFiles = (list) => {
    const array = Array.from(list || []);
    if (array.length === 0) return;
    // Optionally filter by accept (basic check)
    const filtered = accept
      ? array.filter((f) =>
        accept.split(",").some((type) => {
          const t = type.trim();
          return t.endsWith("/*") ? f.type.startsWith(t.replace("/*", "/")) : f.type === t;
        }),
      )
      : array;
    setFiles((prev) => [...prev, ...filtered]);
  };

  const onChange = (e) => onFiles(e.target.files);

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onFiles(e.dataTransfer.files);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const removeAt = (idx) => setFiles((prev) => prev.filter((_, i) => i !== idx));

  return (
    <div>
      <p className="text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <sup className="text-red-600 ml-0.5">*</sup>}
      </p>

      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        className="border-2 border-dashed rounded-2xl p-6 text-center bg-white hover:bg-gray-50 cursor-pointer"
        onClick={() => inputRef.current?.click()}
      >
        <input ref={inputRef} type="file" className="hidden" multiple accept={accept} onChange={onChange} />
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full border flex items-center justify-center">📁</div>
          <p className="text-sm text-gray-700">
            Drag & drop files here or <span className="text-indigo-600 underline">browse</span>
          </p>
          {hint && <p className="text-xs text-gray-500">{hint}</p>}
          {accept && <p className="text-xs text-gray-400">Accepted: {accept}</p>}
        </div>
      </div>

      {files?.length > 0 && (
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {files.map((file, idx) => (
            <DocumentPreviewItem key={idx} file={file} onRemove={() => removeAt(idx)} />
          ))}
        </div>
      )}
      {files?.length > 0 && (
        <div className="mt-3 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setFiles([])}
            className="px-3 py-1.5 text-sm rounded-lg border bg-white hover:bg-gray-100"
          >
            Clear {label}
          </button>
        </div>
      )}
    </div>
  );
}

export default function AdmissionMultiStepForm() {
  const steps = ["Personal", "More Info", "Education", "Family", "Documents", "Review"];
  const [current, setCurrent] = useState(0);

  // Form state
  const [personal, setPersonal] = useState({
    majorFirstChoice: "",
    majorSecondChoice: "",
    surName: "",
    firstName: "",
    middleName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    nationality: "",
    chineseName: "",
    nativeLanguage: "",
    passportNumber: "",
    passportExpiryDate: "",
    religion: "",
    maritalStatus: "",
    placeOfBirth: "",
    permanentHomeAddress: "",
    fax: "",
    zipCode: "",
  });

  const [moreinfo, setMoreInfo] = useState({
    rateYourChinese: "",
    rateYourEnglish: "",
    fieldOfStudy: "",
    studyCategory: "",
    durationOfStudyFrom: "",
    durationOfStudyTo: "",
    employer: "",
    location: "",
    position: "",
    dateStarted: "",
    financialSponsorName: "",
    address: "",
    relationshipWithApplicant: "",
    mobileNumber: "",
    agent: "",
    sponsorComment: "",
    signedDate: ""
  });

  const [education, setEducation] = useState([{
    schoolAttended: "",
    location: "",
    major: "",
    dateAttended: "",
    degreeAwarded: "",
  }]);

  const [family, setFamily] = useState([{
    familyMemberName: "",
    nationality: "",
    mobileNumber: "",
    email: "",
    profession: "",
    workPlace: "",
    relationship: ""
  }]);

  // Document arrays per category
  const [passportPhotos, setPassportPhotos] = useState([]); // images
  const [idDocs, setIdDocs] = useState([]); // images or PDFs
  const [certificates, setCertificates] = useState([]); // PDFs/images
  const [transcripts, setTranscripts] = useState([]); // PDFs/images
  const [otherDocs, setOtherDocs] = useState([]);

  const canNextFromPersonal =
    personal.majorFirstChoice &&
    personal.firstName &&
    personal.surName &&
    personal.middleName &&
    personal.email &&
    personal.phone &&
    personal.gender &&
    personal.dob &&
    personal.nationality &&
    personal.nativeLanguage &&
    personal.passportNumber &&
    personal.passportExpiryDate &&
    personal.religion &&
    personal.maritalStatus &&
    personal.placeOfBirth &&
    personal.permanentHomeAddress;

  const canNextFromMoreInfo =
    moreinfo.rateYourChinese &&
    moreinfo.rateYourEnglish &&
    moreinfo.fieldOfStudy &&
    moreinfo.studyCategory &&
    moreinfo.durationOfStudyFrom &&
    moreinfo.durationOfStudyTo &&
    moreinfo.employer &&
    moreinfo.location &&
    moreinfo.position &&
    moreinfo.dateStarted &&
    moreinfo.financialSponsorName &&
    moreinfo.address &&
    moreinfo.relationshipWithApplicant &&
    moreinfo.mobileNumber &&
    moreinfo.agent &&
    moreinfo.sponsorComment &&
    moreinfo.signedDate;

  // const canNextFromEducation = education.schoolAttended && education.location && education.major && education.dateAttended && education.degreeAwarded;

  // const canNextFamilyMembers = "";
  // const canNextFromMoreInfo = program.studyLevel && program.major && program.intake;

  const canNextFromDocuments = passportPhotos.length > 0 && idDocs.length > 0; // Minimal example requirement

  const goNext = () => setCurrent((c) => Math.min(c + 1, steps.length - 1));
  const goBack = () => setCurrent((c) => Math.max(c - 1, 0));

  const handleSubmit = async (e) => {
    e?.preventDefault?.();

    // Build FormData
    const fd = new FormData();
    Object.entries(personal).forEach(([k, v]) => fd.append(`personal[${k}]`, v));
    Object.entries(moreinfo).forEach(([k, v]) => fd.append(`program[${k}]`, v));
    Object.entries(education).forEach(([k, v]) => fd.append(`education[${k}]`, v));
    Object.entries(family).forEach(([k, v]) => fd.append(`family[${k}]`, v));

    const appendFiles = (arr, key) => arr.forEach((f, i) => fd.append(`${key}[${i}]`, f, f.name));

    appendFiles(passportPhotos, "documents[passportPhotos]");
    appendFiles(idDocs, "documents[idDocs]");
    appendFiles(certificates, "documents[certificates]");
    appendFiles(transcripts, "documents[transcripts]");
    appendFiles(otherDocs, "documents[other]");

    // Example: send to API
    // await fetch("/api/applications", { method: "POST", body: fd });

    // For demo, log keys
    console.group("Submitting FormData");
    for (const [k, v] of fd.entries()) {
      if (v instanceof File) {
        console.log(k, "=>", v.name, v.type, v.size);
      } else {
        console.log(k, "=>", v);
      }
    }
    console.groupEnd();
    alert("Submitted! Check console for FormData keys.");
  };

  const handleChange = (index, e) => {
    const newEducations = [...education];
    newEducations[index][e.target.name] = e.target.value;
    setEducation(newEducations);
    // console.log(newEducations);
  };

  const familyChange = (index, e) => {
    const newFamily = [...family];
    newFamily[index][e.target.name] = e.target.value;
    setEducation(newFamily);
    // console.log(newEducations);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      {
        schoolAttended: "",
        location: "",
        major: "",
        dateAttended: "",
        degreeAwarded: "",
      },
    ]);
  };

  const removeEducation = (index) => {
    const newEducations = [...education];
    newEducations.splice(index, 1);
    setEducation(newEducations);
  };

  const addFamily = () => {
    setFamily([
      ...family,
      {
        familyMemberName: "",
        fNationality: "",
        fMobileNumber: "",
        fEmail: "",
        fProfession: "",
        fWorkPlace: "",
        fRelationship: ""
      },
    ]);
  };

  const removeFamily = (index) => {
    const newFamily = [...family];
    newFamily.splice(index, 1);
    setFamily(newFamily);
  };

  return (
    <>
      <Breadcrum heading={`Application Form`} page_title={`Application form`} />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <header className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold">University Admission Application</h1>
            <p className="text-gray-600">
              Complete the steps and upload required documents. Your files stay on your device until you submit.
            </p>
          </header>

          {/* Stepper */}
          <div className="mb-8">
            <ol className="grid grid-cols-6 gap-1">
              {steps.map((s, i) => {
                const active = i === current;
                const done = i < current;
                return (
                  <li key={s} className="flex items-center gap-1">
                    <StepBadge index={i} active={active} done={done} />
                    <span className={classNames("font-medium", active ? "text-indigo-700" : done ? "text-green-700" : "text-gray-500")}>
                      {s}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {current === 0 && (
              <SectionCard
                title="Personal Information"
                actions={[
                  <button
                    key="next"
                    type="button"
                    onClick={goNext}
                    disabled={!canNextFromPersonal}
                    className={classNames(
                      "px-4 py-2 rounded-xl text-white",
                      canNextFromPersonal ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-300 cursor-not-allowed",
                    )}
                  >
                    Next
                  </button>,
                ]}
              >
                <div className="grid md:grid-cols-2 gap-2">
                  <Input
                    label="Major First Choice"
                    required
                    value={personal.majorFirstChoice}
                    onChange={(e) => setPersonal((p) => ({ ...p, majorFirstChoice: e.target.value }))}
                  />
                  <Input
                    label="Major Second Choice"
                    required
                    value={personal.majorSecondChoice}
                    onChange={(e) => setPersonal((p) => ({ ...p, majorSecondChoice: e.target.value }))}
                  />
                  <Input
                    label="Surname"
                    required
                    value={personal.surName}
                    onChange={(e) => setPersonal((p) => ({ ...p, surName: e.target.value }))}
                  />
                  <Input
                    label="First Name"
                    required
                    value={personal.firstName}
                    onChange={(e) => setPersonal((p) => ({ ...p, firstName: e.target.value }))}
                  />
                  <Input
                    label="Middle Name"
                    required
                    value={personal.middleName}
                    onChange={(e) => setPersonal((p) => ({ ...p, middleName: e.target.value }))}
                  />
                  <Input
                    label="Email"
                    required
                    type="email"
                    value={personal.email}
                    onChange={(e) => setPersonal((p) => ({ ...p, email: e.target.value }))}
                  />
                  <Input
                    label="Phone"
                    required
                    type="tel"
                    value={personal.phone}
                    onChange={(e) => setPersonal((p) => ({ ...p, phone: e.target.value }))}
                  />
                  <Select
                    label="Gender"
                    required
                    value={personal.gender}
                    onChange={(e) => setPersonal((p) => ({ ...p, gender: e.target.value }))}
                    options={["Male", "Female", "Other"]}
                  />
                  <Input
                    label="Date of Birth"
                    required
                    type="date"
                    value={personal.dob}
                    onChange={(e) => setPersonal((p) => ({ ...p, dob: e.target.value }))}
                  />
                  <Input
                    label="Nationality"
                    value={personal.nationality}
                    onChange={(e) => setPersonal((p) => ({ ...p, nationality: e.target.value }))}
                  />
                  <Input
                    label="Native Language"
                    value={personal.nativeLanguage}
                    onChange={(e) => setPersonal((p) => ({ ...p, nativeLanguage: e.target.value }))}
                  />
                  <Input
                    label="Passport Number"
                    value={personal.passportNumber}
                    onChange={(e) => setPersonal((P) => ({ ...P, passportNumber: e.target.value }))}
                  />
                  <Input
                    type="date"
                    label="Passport Expiry Date"
                    value={personal.passportExpiryDate}
                    onChange={(e) => setPersonal((P) => ({ ...P, passportExpiryDate: e.target.value }))}
                  />
                  <Input
                    label="Religion"
                    value={personal.religion}
                    onChange={(e) => setPersonal((P) => ({ ...P, religion: e.target.value }))}
                  />

                  <Input
                    label="Marital Status"
                    value={personal.maritalStatus}
                    onChange={(e) => setPersonal((P) => ({ ...P, maritalStatus: e.target.value }))}
                  />

                  <Input
                    label="Place Of Birth"
                    value={personal.placeOfBirth}
                    onChange={(e) => setPersonal((P) => ({ ...P, placeOfBirth: e.target.value }))}
                  />

                  <Input
                    label="Permanent Home Address"
                    value={personal.permanentHomeAddress}
                    onChange={(e) => setPersonal((P) => ({ ...P, permanentHomeAddress: e.target.value }))}
                  />

                  <Input label="Fax" value={personal.fax} onChange={(e) => setPersonal((P) => ({ ...P, fax: e.target.value }))} />

                  <Input
                    label="Zip Code"
                    value={personal.zipCode}
                    onChange={(e) => setPersonal((P) => ({ ...P, zipCode: e.target.value }))}
                  />
                </div>
              </SectionCard>
            )}

            {current === 1 && (
              <SectionCard
                title="More Applicant Info."
                actions={[
                  <button key="back" type="button" onClick={goBack} className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-50">
                    Back
                  </button>,
                  <button
                    key="next"
                    type="button"
                    onClick={goNext}
                    disabled={!canNextFromMoreInfo}
                    className={classNames(
                      "px-4 py-2 rounded-xl text-white",
                      canNextFromMoreInfo ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-300 cursor-not-allowed",
                    )}
                  >
                    Next
                  </button>,
                ]}
              >
                <p className="border border-l-8 py-0.5 w-52 px-2 border-l-indigo-900 mb-4">Language Proficiency</p>

                <div className="grid md:grid-cols-3 gap-2">
                  <Select
                    label="Rate Your Chinese"
                    required
                    value={moreinfo.rateYourChinese}
                    onChange={(e) => setMoreInfo((p) => ({ ...p, rateYourChinese: e.target.value }))}
                    options={["Good", "Average", "Better", "Very Good"]}
                  />

                  <Select
                    label="Rate Your English"
                    required
                    value={moreinfo.rateYourEnglish}
                    onChange={(e) => setMoreInfo((p) => ({ ...p, rateYourEnglish: e.target.value }))}
                    options={["Good", "Average", "Better", "Very Good"]}
                  />

                  <Select
                    label="Study Category"
                    required
                    value={moreinfo.studyCategory}
                    onChange={(e) => setMoreInfo((p) => ({ ...p, studyCategory: e.target.value }))}
                    options={["Undergraduate", "Master", "PHD"]}
                  />

                  <Input
                    label="Field Of Study"
                    required
                    value={moreinfo.fieldOfStudy}
                    onChange={(e) => setMoreInfo((p) => ({ ...p, fieldOfStudy: e.target.value }))}
                  />
                </div>

                <p className="border border-l-8 py-0.5 w-52 px-2 border-l-indigo-900 mt-8 mb-4">Duration of Study</p>
                <div className="grid md:grid-cols-2 gap-2">
                  <Input
                    type="date"
                    label="Duration Of Study From"
                    required
                    value={moreinfo.durationOfStudyFrom}
                    onChange={(e) => setMoreInfo((p) => ({ ...p, durationOfStudyFrom: e.target.value }))}
                  />
                  <Input
                    type="date"
                    label="Duration Of Study To"
                    required
                    value={moreinfo.durationOfStudyTo}
                    onChange={(e) => setMoreInfo((p) => ({ ...p, durationOfStudyTo: e.target.value }))}
                  />
                </div>

                <p className="border border-l-8 py-0.5 w-52 px-2 border-l-indigo-900 mt-8 mb-4">Work Experience</p>
                <div className="grid md:grid-cols-3 gap-2">
                  <Input
                    label="Employee"
                    required
                    value={moreinfo.employer}
                    onChange={(e) => setMoreInfo((p) => ({ ...p, employer: e.target.value }))}
                  />
                  <Input
                    label="Location"
                    required
                    value={moreinfo.location}
                    onChange={(e) => setMoreInfo((p) => ({ ...p, location: e.target.value }))}
                  />
                  <Input
                    label="Position"
                    required
                    value={moreinfo.position}
                    onChange={(e) => setMoreInfo((p) => ({ ...p, position: e.target.value }))}
                  />
                  <Input
                    type="date"
                    label="Date Started"
                    required
                    value={moreinfo.dateStarted}
                    onChange={(e) => setMoreInfo((p) => ({ ...p, dateStarted: e.target.value }))}
                  />
                </div>

                <p className="border border-l-8 py-0.5 w-52 px-2 border-l-indigo-900 mt-8 mb-4">Financial Sponsors</p>
                <div className="grid md:grid-cols-3 gap-2">
                  <Input
                    label="Financial Sponsor Name"
                    required
                    value={moreinfo.financialSponsorName}
                    onChange={(e) => setMoreInfo((p) => ({ ...p, financialSponsorName: e.target.value }))}
                  />
                  <Input
                    label="Address"
                    required
                    value={moreinfo.address}
                    onChange={(e) => setMoreInfo((p) => ({ ...p, address: e.target.value }))}
                  />
                  <Input
                    label="Relationship With Applicant"
                    required
                    value={moreinfo.relationshipWithApplicant}
                    onChange={(e) => setMoreInfo((p) => ({ ...p, relationshipWithApplicant: e.target.value }))}
                  />
                  <Input
                    label="Mobile Number"
                    required
                    value={moreinfo.mobileNumber}
                    onChange={(e) => setMoreInfo((p) => ({ ...p, mobileNumber: e.target.value }))}
                  />
                </div>
                <p className="border border-l-8 py-0.5 w-4/12 px-2 border-l-indigo-900 mt-8 mb-4">Person or Agency to Action on your behalf in China</p>
                <div className="grid md:grid-cols-1 gap-2">
                  <Input
                    label="Enter Agent"
                    required
                    value={moreinfo.agent}
                    onChange={(e) => setMoreInfo((p) => ({ ...p, agent: e.target.value }))}
                  />
                </div>
                <p className="border border-l-8 py-0.5 w-6/12 px-2 border-l-indigo-900 mt-8 mb-4">Comment of Sponsor or Recommended Party</p>
                <div className="grid md:grid-cols-1 gap-2">
                  <textarea className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" value={moreinfo.sponsorComment} cols='5' rows='5' placeholder="Sponsor's comment" onChange={(e) => setMoreInfo((p) => ({ ...p, sponsorComment: e.target.value }))}>
                  </textarea>
                  <Input
                    label="Enter Date"
                    type="date"
                    required
                    value={moreinfo.signedDate}
                    onChange={(e) => setMoreInfo((p) => ({ ...p, signedDate: e.target.value }))}
                  />
                </div>
              </SectionCard>
            )}

            {current === 2 && (
              <SectionCard
                title="Educational Background"
                actions={[
                  <button key="back" type="button" onClick={goBack} className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-50">
                    Back
                  </button>,
                  <button
                    key="next"
                    type="button"
                    onClick={goNext}
                    // disabled={!canNextFromEducation}
                    className={classNames(
                      "px-4 py-2 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700"
                    )}
                  >
                    Next
                  </button>,
                ]}
              >
                <p className="border border-l-8 py-0.5 w-52 px-2 border-l-indigo-900 mb-4">Educational Background</p>
                {education.map((edu, index) => (

                  <div key={index} className="grid md:grid-cols-3 gap-4 mb-16">
                    <Input
                      label="School Attended"
                      name="schoolAttended"
                      required
                      value={edu.schoolAttended}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <Input
                      label="Location"
                      name="location"
                      required
                      value={edu.location}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <Input
                      label="Major"
                      name="major"
                      required
                      value={edu.major}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <Input
                      label="Date Attended"
                      name="dateAttended"
                      type="date"
                      required
                      value={edu.dateAttended}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <Input
                      label="Degree Awarded"
                      name="degreeAwarded"
                      required
                      value={edu.degreeAwarded}
                      onChange={(e) => handleChange(index, e)}
                    />
                    {education.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}

                <div className="text-right">
                  <button
                    type="button"
                    onClick={addEducation}
                    className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    + Add Education
                  </button>
                </div>
              </SectionCard>
            )}

            {current === 3 && (
              <SectionCard
                title="Family Members"
                actions={[
                  <button key="back" type="button" onClick={goBack} className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-50">
                    Back
                  </button>,
                  <button
                    key="next"
                    type="button"
                    onClick={goNext}
                    // disabled={!canNextFromEducation}
                    className={classNames(
                      "px-4 py-2 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700"
                    )}
                  >
                    Next
                  </button>,
                ]}
              >
                <p className="border border-l-8 py-0.5 w-4/12 px-2 border-l-indigo-900 mb-4">Family Members (Minimum of two required)</p>
                {family.map((fam, index) => (

                  <div key={index} className="grid md:grid-cols-3 gap-4 mb-16">
                    <Input
                      label="Family Member Name"
                      name="familyMemberName"
                      required
                      value={fam.familyMemberName}
                      onChange={(e) => familyChange(index, e)}
                    />
                    <Input
                      label="Nationality"
                      name="fNationality"
                      required
                      value={fam.fNationality}
                      onChange={(e) => familyChange(index, e)}
                    />
                    <Input
                      label="Mobile Number"
                      name="fMobileNumber"
                      required
                      value={fam.fMobileNumber}
                      onChange={(e) => familyChange(index, e)}
                    />
                    <Input
                      label="Email"
                      name="fEmail"
                      required
                      value={fam.fEmail}
                      onChange={(e) => familyChange(index, e)}
                    />
                    <Input
                      label="Profession"
                      name="fProfession"
                      required
                      value={fam.fProfession}
                      onChange={(e) => familyChange(index, e)}
                    />
                    <Input
                      label="WorkPlace"
                      name="fWorkPlace"
                      required
                      value={fam.fWorkPlace}
                      onChange={(e) => familyChange(index, e)}
                    />
                    <Input
                      label="Relationship"
                      name="fRelationship"
                      required
                      value={fam.fRelationship}
                      onChange={(e) => familyChange(index, e)}
                    />

                    {family.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFamily(index)}
                        className="text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}

                <div className="text-right">
                  <button
                    type="button"
                    onClick={addFamily}
                    className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    + Add Family Member
                  </button>
                </div>
              </SectionCard>
            )}

            {current === 4 && (
              <SectionCard
                title="Upload Documents"
                actions={[
                  <button key="back" type="button" onClick={goBack} className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-50">
                    Back
                  </button>,
                  <button
                    key="next"
                    type="button"
                    onClick={goNext}
                    disabled={!canNextFromDocuments}
                    className={classNames(
                      "px-4 py-2 rounded-xl text-white",
                      canNextFromDocuments ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-300 cursor-not-allowed",
                    )}
                  >
                    Next
                  </button>,
                ]}
              >
                <div className="space-y-6">
                  <DocumentDropzone
                    label="Passport Photo(s)"
                    required
                    hint="Upload a clear passport-style photo. JPEG/PNG recommended."
                    accept="image/*"
                    files={passportPhotos}
                    setFiles={setPassportPhotos}
                  />

                  <DocumentDropzone
                    label="Identification (National ID / International Passport)"
                    required
                    hint="Image or PDF acceptable."
                    accept="image/*,application/pdf"
                    files={idDocs}
                    setFiles={setIdDocs}
                  />

                  <DocumentDropzone
                    label="Academic Certificates"
                    hint="WAEC/NECO/IELTS/etc."
                    accept="image/*,application/pdf"
                    files={certificates}
                    setFiles={setCertificates}
                  />

                  <DocumentDropzone label="Transcripts" accept="image/*,application/pdf" files={transcripts} setFiles={setTranscripts} />

                  <DocumentDropzone
                    label="Other Supporting Documents"
                    accept="image/*,application/pdf"
                    files={otherDocs}
                    setFiles={setOtherDocs}
                  />
                </div>
              </SectionCard>
            )}

            {current === 5 && (
              <SectionCard
                title="Review & Submit"
                actions={[
                  <button
                    key="back"
                    type="button"
                    onClick={goBack}
                    className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-50"
                  >
                    Back
                  </button>,
                  <button
                    key="submit"
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    Submit Application
                  </button>,
                ]}
              >
                <div className="space-y-6">
                  {/* Personal */}
                  <div>
                    <h3 className="font-semibold mb-2">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                      {Object.entries(personal).map(([k, v]) => (
                        <div key={k} className="bg-gray-100 rounded-xl px-3 py-2">
                          <span className="font-medium capitalize">
                            {k.replace(/([A-Z])/g, " $1")}:
                          </span>{" "}
                          {v || "—"}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* More Info */}
                  <div>
                    <h3 className="font-semibold mb-2">Additional Information</h3>
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                      {Object.entries(moreinfo).map(([k, v]) => (
                        <div key={k} className="bg-gray-100 rounded-xl px-3 py-2">
                          <span className="font-medium capitalize">
                            {k.replace(/([A-Z])/g, " $1")}:
                          </span>{" "}
                          {v || "—"}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h3 className="font-semibold mb-2">Education Background</h3>
                    {education.length === 0 ? (
                      <p className="text-sm text-gray-500">No education records added.</p>
                    ) : (
                      education.map((edu, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-50 border rounded-xl p-3 mb-3 text-sm"
                        >
                          {Object.entries(edu).map(([k, v]) => (
                            <p key={k}>
                              <span className="font-medium capitalize">
                                {k.replace(/([A-Z])/g, " $1")}:
                              </span>{" "}
                              {v || "—"}
                            </p>
                          ))}
                        </div>
                      ))
                    )}
                  </div>

                  {/* Family */}
                  <div>
                    <h3 className="font-semibold mb-2">Family Members</h3>
                    {family.length === 0 ? (
                      <p className="text-sm text-gray-500">No family members added.</p>
                    ) : (
                      family.map((fam, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-50 border rounded-xl p-3 mb-3 text-sm"
                        >
                          {Object.entries(fam).map(([k, v]) => (
                            <p key={k}>
                              <span className="font-medium capitalize">
                                {k.replace(/([A-Z])/g, " $1")}:
                              </span>{" "}
                              {v || "—"}
                            </p>
                          ))}
                        </div>
                      ))
                    )}
                  </div>

                  {/* Documents */}
                  <div>
                    <h3 className="font-semibold mb-2">Uploaded Documents</h3>
                    <div className="space-y-4">
                      {[
                        ["Passport Photo(s)", passportPhotos],
                        ["Identification", idDocs],
                        ["Academic Certificates", certificates],
                        ["Transcripts", transcripts],
                        ["Other", otherDocs],
                      ].map(([label, arr]) => (
                        <div key={label}>
                          <p className="text-sm font-medium mb-2">
                            {label} ({arr.length})
                          </p>
                          {arr.length === 0 ? (
                            <p className="text-sm text-gray-500">No files added.</p>
                          ) : (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                              {arr.map((file, idx) => (
                                <DocumentPreviewItem key={idx} file={file} onRemove={() => { }} />
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-gray-500">
                    By submitting, you confirm all information is accurate and documents are authentic.
                  </p>
                </div>
              </SectionCard>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
