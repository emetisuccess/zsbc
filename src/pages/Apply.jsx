import { DatabaseIcon } from "lucide-react";
import Breadcrum from "../layouts/Breadcrum";
import { useMemo, useState, useEffect } from "react";

const STEPS = ["Personal", "More User Info", "Education", "Family Members", "Documents", "Review & Submit"];

const initialData = {
    // Personal Info
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

    //More Info
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
    signedDate: "",

    //Education
    educationHistory: [{
        schoolAttended: "",
        location: "",
        major: "",
        dateAttended: "",
        degreeAwarded: "",
    }],
    // Family
    familyMembers: [{
        familyMemberName: "",
        nationality: "",
        mobileNumber: "",
        email: "",
        profession: "",
        workPlace: "",
        relationship: ""
    }],
    passportphoto: [],
    applicantSignature: "",
    sponsorSignature: "",
    transcripts: [],
    recommendationLetters: [],
    medicalReport: [],
    certificates: [],
    bankStatement: "",
    nonCriminalRecord: "",
    englishCertificate: "",
    researchProposal: "",
};

const requiredFieldsByStep = {
    0: ["majorFirstChoice",
        "surName",
        "firstName",
        "middleName",
        "email",
        "phone",
        "gender",
        "dob",
        "nationality",
        "nativeLanguage",
        "passportNumber",
        "passportExpiryDate",
        "religion",
        "maritalStatus",
        "placeOfBirth",
        "permanentHomeAddress",
    ],
    1: ["rateYourChinese",
        "rateYourEnglish",
        "fieldOfStudy",
        "studyCategory",
        "durationOfStudyFrom",
        "durationOfStudyTo",
        "employer",
        "location",
        "position",
        "dateStarted",
        "financialSponsorName",
        "address",
        "relationshipWithApplicant",
        "mobileNumber",
        "agent",
        "sponsorComment",
        "signedDate"],
    2: ["educationHistory"],
    3: ["familyMembers"],
    4: [
        "passportphoto",
        "applicantSignature",
        "sponsorSignature",
        "transcripts",
        "recommendationLetters",
        "medicalReport",
        "certificates",
        "bankStatement",
        "nonCriminalRecord",
        "englishCertificate",
        "researchProposal"
    ]
};

function classNames(...c) { return c.filter(Boolean).join(" "); }

const validators = {
    email: (v) => /[^@\s]+@[^@\s]+\.[^@\s]+/.test(v),
    phone: (v) => /[0-9+\-()\s]{7,}/.test(v)
};

function useSavedForm(key, initial) {
    const fileKeys = ["photo", "passportScan", "transcripts", "recommendationLetters", "personalStatement"];
    const [state, setState] = useState(() => {
        try {
            const raw = localStorage.getItem(key);
            if (!raw) return initial;
            const parsed = JSON.parse(raw);
            return { ...initial, ...parsed };
        } catch {
            return initial;
        }
    });
    useEffect(() => {
        try {
            const toSave = { ...state };
            for (const fk of fileKeys) delete toSave[fk];
            localStorage.setItem(key, JSON.stringify(toSave));
        } catch {
            console.log("erro");
        }
    }, [key, state]);
    return [state, setState];
}

function StepIndicator({ currentStep }) {
    const progress = ((currentStep + 1) / STEPS.length) * 100;
    return (
        <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
                {STEPS.map((label, idx) => (
                    <div key={label} className="flex-1 text-center">
                        <div className={classNames("text-xs sm:text-sm font-medium truncate", idx === currentStep ? "text-blue-600" : "text-gray-500")} title={label}>
                            {label}
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
        </div>
    );
}

function TextField({ label, name, value = "", onChange, type = "text", required, placeholder }) {
    return (
        <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">{label}{required && <span className="text-red-500"> *</span>}</span>
            <input className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" type={type} name={name} value={value} onChange={(e) => onChange(name, e.target.value)} placeholder={placeholder} />
        </label>
    );
}

function TextArea({ label, name, value = "", onChange, required, placeholder }) {
    return (
        <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">{label}{required && <span className="text-red-500"> *</span>}</span>
            <textarea className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" value={value} name="sponsorComment" cols='5' rows='5' placeholder={placeholder} onChange={(e) => onChange(name, e.target.value)}>
            </textarea>
        </label>
    )
};

function SelectField({ label, name, value = "", onChange, options = [], required }) {
    return (
        <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">{label}{required && <span className="text-red-500"> *</span>}</span>
            <select className="w-full rounded-xl border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" name={name} value={value} onChange={(e) => onChange(name, e.target.value)}>
                <option value="">Select...</option>
                {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        </label>
    );
}

function RadioGroup({ label, name, value = "", onChange, options = [], required }) {
    return (
        <fieldset className="block">
            <legend className="block text-sm font-medium text-gray-700 mb-1">{label}{required && <span className="text-red-500"> *</span>}</legend>
            <div className="flex flex-wrap gap-3">
                {options.map((opt) => (
                    <label key={opt} className={classNames("flex items-center gap-2 rounded-xl border px-3 py-2 cursor-pointer", value === opt ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300")}>
                        <input type="radio" name={name} className="accent-blue-600" value={opt} checked={value === opt} onChange={(e) => onChange(name, e.target.value)} />
                        <span className="text-sm">{opt}</span>
                    </label>
                ))}
            </div>
        </fieldset>
    );
}

function FileField({ label, name, files = [], onFilesChange, accept, multiple = true, required }) {
    const previews = useMemo(() => (Array.isArray(files) ? files.map((file) => ({ file, url: file && file.type && file.type.startsWith("image/") ? URL.createObjectURL(file) : null })) : []), [files]);
    useEffect(() => () => { previews.forEach((p) => p.url && URL.revokeObjectURL(p.url)); }, [previews]);
    const removeAt = (idx) => {
        const next = Array.from(files || []);
        next.splice(idx, 1);
        onFilesChange(name, next, false);
    };
    return (
        <div>
            <div className="flex items-center justify-between">
                <span className="block text-sm font-medium text-gray-700 mb-1">{label}{required && <span className="text-red-500"> *</span>}</span>
                <label className="text-xs text-blue-600 underline cursor-pointer">
                    <input type="file" accept={accept} multiple={multiple} className="hidden" onChange={(e) => onFilesChange(name, Array.from(e.target.files || []), multiple)} />
                    Add files
                </label>
            </div>
            <div className="rounded-2xl border-2 border-dashed border-gray-300 p-4 text-center">
                <p className="text-sm text-gray-600">Drag & drop files here or click <span className="font-medium">Add files</span>.</p>
                <p className="text-xs text-gray-500 mt-1">Accepted: {accept || "any"}{multiple ? " • Multiple allowed" : ""}</p>
            </div>
            {previews.length > 0 && (
                <ul className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {previews.map((p, idx) => (
                        <li key={idx} className="relative group">
                            <div className="rounded-xl border p-2 flex flex-col items-center justify-center h-32 overflow-hidden">
                                {p.url ? <img src={p.url} alt={p.file.name} className="object-cover w-full h-full rounded-lg" /> : <div className="text-center text-xs"><span className="block font-medium truncate">{p.file.name}</span><span className="text-gray-500">{(p.file.size / 1024).toFixed(0)} KB</span></div>}
                            </div>
                            <button type="button" onClick={() => removeAt(idx)} className="absolute -top-2 -right-2 bg-white border shadow rounded-full w-7 h-7 grid place-items-center opacity-0 group-hover:opacity-100 transition" aria-label="Remove file">×</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function ErrorBanner({ errors = [] }) {
    if (!errors || errors.length === 0) return null; return (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"><strong className="block mb-1">Please fix the following:</strong><ul className="list-disc pl-5 space-y-1">{errors.map((e, i) => <li key={i}>{e}</li>)}</ul></div>
    );
}

export default function ChinaAdmissionForm() {

    const [step, setStep] = useState(0);
    const [data, setData] = useSavedForm("china-admission-form", initialData);
    const [errors, setErrors] = useState([]);
    const [educationErrors, setEducationErrors] = useState({});
    const [familyMembers, setFamilyMemberErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const update = (name, value) => setData((p) => ({ ...p, [name]: value }));
    const updateFiles = (name, newFiles, append = false) => setData((prev) => ({ ...prev, [name]: append ? [...(prev[name] || []), ...newFiles] : newFiles }));

    const updateEducation = (index, field, value) => {
        setData((prev) => {
            const next = Array.isArray(prev.educationHistory) ? [...prev.educationHistory] : [];
            next[index] = { ...next[index], [field]: value };
            return { ...prev, educationHistory: next };
        });
    };

    const updateFamily = (index, field, value) => {
        setData((prev) => {
            const next = Array.isArray(prev.familyMembers) ? [...prev.familyMembers] : [];
            next[index] = { ...next[index], [field]: value };
            return { ...prev, familyMembers: next };
        });
    };

    const addEducation = () => {
        setData((prev) => ({ ...prev, educationHistory: [...(prev.educationHistory || []), { schoolAttended: "", location: "", major: "", startDate: "", dateAttended: "", degreeAwarded: "" }] }));
    };

    const addFamilyMember = () => {
        setData((prev) => ({ ...prev, familyMembers: [...(prev.familyMembers || []), { familMemberName: "", nationality: "", mobileNumber: "", email: "", profession: "", workPlace: "", relationship: "" }] }));
    };


    const removeEducation = (index) => {
        setData((prev) => {
            const next = [...(prev.educationHistory || [])];
            next.splice(index, 1);
            return { ...prev, educationHistory: next };
        });

        setEducationErrors((prev) => {
            const copy = { ...prev };
            delete copy[index];
            const shifted = {};
            Object.keys(copy)
                .map(Number)
                .sort((a, b) => a - b)
                .forEach((k, i) => {
                    shifted[i] = copy[k];
                });
            return shifted;
        });
    };

    const removeFamilyMember = (index) => {
        setData((prev) => {
            const next = [...(prev.familyMembers || [])];
            next.splice(index, 1);
            return { ...prev, familyMembers: next };
        });
        setFamilyMemberErrors((prev) => {
            const copy = { ...prev };
            delete copy[index];
            const shifted = {};
            Object.keys(copy)
                .map(Number)
                .sort((a, b) => a - b)
                .forEach((k, i) => {
                    shifted[i] = copy[k];
                });
            return shifted;
        });
    };


    const validateEducationEntry = (edu) => {
        const errs = [];
        if (!edu || typeof edu !== "object") {
            errs.push("Invalid education entry");
            return errs;
        }
        if (!edu.schoolAttended || !edu.schoolAttended.trim()) errs.push("School Attended is required");
        if (!edu.location || !edu.location.trim()) errs.push("Location is required");
        if (!edu.major || !edu.major.trim()) errs.push("Major of study is required");
        if (!edu.dateAttended) errs.push("Start date is required");
        if (!edu.degreeAwarded) errs.push("Degree Awarded  is required");
        return errs;
    };

    const validateFamilyMemberEntry = (fam) => {
        const errs = [];
        if (!fam || typeof fam !== "object") {
            errs.push("Invalid Family Member entry");
            return errs;
        }
        if (!fam.familyMemberName || !fam.familyMemberName.trim()) errs.push("Name is required");
        if (!fam.nationality || !fam.nationality.trim()) errs.push("Nationality is required");
        if (!fam.mobileNumber || !fam.mobileNumber.trim()) errs.push("Mobile Number is required");
        if (!fam.email || !fam.email.trim()) errs.push("Email is required");
        if (!fam.profession || !fam.profession.trim()) errs.push("Profession is required");
        if (!fam.workPlace || !fam.workPlace.trim()) errs.push("Work Place is required");
        if (!fam.relationship || !fam.relationship.trim()) errs.push("Relationship is required");
        return errs;
    };

    const validateStep = (s = step) => {
        const req = requiredFieldsByStep[s] || [];
        const errs = [];
        const eduErrs = {};
        const famErrs = {};


        for (const field of req) {
            const v = data[field];

            if (field === "educationHistory") {
                if (!Array.isArray(v) || v.length === 0) {
                    errs.push("At least one education history entry is required");
                } else {
                    v.forEach((edu, idx) => {
                        const e = validateEducationEntry(edu);
                        if (e.length) {
                            eduErrs[idx] = e;
                            e.forEach((m) => errs.push(`Education entry ${idx + 1}: ${m}`));
                        }
                    });
                }
            } else if (Array.isArray(v) && typeof v[0] !== "object") {
                if (!v || v.length === 0) errs.push(labelFor(field) + " is required");
            } else if (!v) {
                errs.push(labelFor(field) + " is required");
            }

            if (field === "familyMembers") {
                if (!Array.isArray(v) || v.length <= 1) {
                    errs.push("At least two family members entry is required");
                } else {
                    v.forEach((fam, idx) => {
                        const e = validateFamilyMemberEntry(fam);
                        if (e.length) {
                            famErrs[idx] = e;
                            e.forEach((m) => errs.push(`Family Member entry ${idx + 1}: ${m}`));
                        }
                    });
                }
            } else if (Array.isArray(v) && typeof v[0] !== "object") {
                if (!v || v.length === 0) errs.push(labelFor(field) + " is required");
            } else if (!v) {
                errs.push(labelFor(field) + " is required");
            }
        }


        const today = new Date();
        const expiryDate = new Date(data.passportExpiryDate);
        if (s === 0) {
            if (data.email && !validators.email(data.email)) errs.push("Email format looks invalid!");
            if (data.phone && !validators.phone(data.phone)) errs.push("Phone number looks invalid!");
            if (expiryDate <= today) errs.push("Your Passport has expired!");
            if (data.passportNumber.length > 9 || data.passportNumber.length < 9) errs.push("Invalid Passport Number!");
        }
        if (s === 1) {
            if (data.hasChinaVisa === "yes") {
                if (!data.visaType) errs.push("Visa Type is required when you have a China visa");
                if (!data.visaExpiry) errs.push("Visa Expiry is required when you have a China visa");
            }
        }

        setEducationErrors(eduErrs);
        setFamilyMemberErrors(famErrs);
        setErrors(errs);
        return errs.length === 0;
    };



    const next = () => { if (!validateStep(step)) return; setStep((s) => Math.min(s + 1, STEPS.length - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); };
    const back = () => setStep((s) => Math.max(s - 1, 0));
    const reset = () => { setData(initialData); setStep(0); setErrors([]); setSubmitted(false); };
    const onSubmit = (e) => {
        e.preventDefault();
        for (let i = 0; i < STEPS.length - 1; i++) {
            if (!validateStep(i)) {
                setStep(i);
                return;
            }
        }
        setSubmitted(true);
    };



    return (
        <div>
            <Breadcrum heading={`Application Form`} page_title={`Application form`} />
            <div className="min-h-screen bg-gray-50 py-10">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="mb-8 text-center"><h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Admission Application – Study in China</h1><p className="text-gray-600 mt-2">Complete the steps below. Your progress is saved locally in your browser.</p></div>
                    <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
                        <StepIndicator currentStep={step} />
                        <ErrorBanner errors={errors} />
                        <form onSubmit={onSubmit} className="space-y-6">
                            {step === 0 && (
                                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <TextField required label="Major First Choice" name="majorFirstChoice" value={data.majorFirstChoice} onChange={update} />
                                    <TextField label="Major Second Choice" name="majorSecondChoice" value={data.majorSecondChoice} onChange={update} />
                                    <TextField required label="Surname" name="surName" value={data.surName} onChange={update} />
                                    <TextField required label="First Name" name="firstName" value={data.firstName} onChange={update} />
                                    <TextField required label="Middle Name" name="middleName" value={data.middleName} onChange={update} />
                                    <TextField required label="Email" name="email" type="email" value={data.email} onChange={update} />
                                    <TextField required label="Phone" name="phone" value={data.phone} onChange={update} placeholder="+234 800 000 0000" />
                                    <TextField required label="Nationality" name="nationality" value={data.nationality} onChange={update} />
                                    <TextField required label="Date of Birth" name="dob" type="date" value={data.dob} onChange={update} />
                                    <TextField required label="Nationality" name="nationality" value={data.nationality} onChange={update} />
                                    <TextField label="Chinese Name" name="chineseName" value={data.chineseName} onChange={update} />
                                    <TextField required label="Native Language" name="nativeLanguage" value={data.nativeLanguage} onChange={update} />
                                    <TextField required label="Passport Number" name="passportNumber" value={data.passportNumber} onChange={update} />
                                    <TextField required label="Passport Expiry Date" name="passportExpiryDate" type="date" value={data.passportExpiryDate} onChange={update} />
                                    <TextField required label="Marital Status" name="maritalStatus" value={data.maritalStatus} onChange={update} />
                                    <TextField required label="Religion" name="religion" value={data.religion} onChange={update} />
                                    <TextField required label="Place Of Birth" name="placeOfBirth" value={data.placeOfBirth} onChange={update} />
                                    <TextField required label="Permanent Home Address" name="permanentHomeAddress" value={data.permanentHomeAddress} onChange={update} />
                                    <TextField label="Fax" name="fax" value={data.fax} onChange={update} />
                                    <TextField label="Zip Code" name="zipCode" value={data.zipCode} onChange={update} />
                                    <RadioGroup required label="Gender" name="gender" value={data.gender} onChange={update} options={["Male", "Female", "Other"]} />
                                </section>
                            )}
                            {step === 1 && (
                                <div>
                                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <SelectField required label="Rate Your Chinese" name="rateYourChinese" value={data.rateYourChinese} onChange={update} options={["Good", "Average", "Better", "Very Good", "None"]} />

                                        <SelectField required label="Rate Your English" name="rateYourEnglish" value={data.rateYourEnglish} onChange={update} options={["Good", "Average", "Better", "Very Good", "None"]} />

                                        <SelectField required label="Study Category" name="studyCategory" value={data.studyCategory} onChange={update} options={["Undergraduate", "Master", "PHD"]} />

                                        <TextField required label="Field of Study" name="fieldOfStudy" value={data.fieldOfStudy} onChange={update} placeholder="e.g. Medicine" />
                                    </section>
                                    <p className="border border-l-8 py-0.5 w-6/12 px-2 border-l-indigo-900 mt-16 mb-2">Duration of Study</p>
                                    <div className="grid md:grid-cols-2 gap-2">
                                        <TextField
                                            type="date"
                                            label="Duration Of Study From"
                                            required
                                            name="durationOfStudyFrom"
                                            value={data.durationOfStudyFrom}
                                            onChange={update}
                                        />
                                        <TextField
                                            type="date"
                                            label="Duration Of Study To"
                                            required
                                            name="durationOfStudyTo"
                                            value={data.durationOfStudyTo}
                                            onChange={update}
                                        />
                                    </div>
                                    <p className="border border-l-8 py-0.5 w-6/12 px-2 border-l-indigo-900 mt-16 mb-2">Work Experience</p>
                                    <div className="grid md:grid-cols-2 gap-2">
                                        <TextField
                                            label="Employee"
                                            required
                                            name="employer"
                                            value={data.employer}
                                            onChange={update}
                                        />
                                        <TextField
                                            label="Location"
                                            required
                                            name="location"
                                            value={data.location}
                                            onChange={update}
                                        />
                                        <TextField
                                            label="Position"
                                            required
                                            name="position"
                                            value={data.position}
                                            onChange={update}
                                        />
                                        <TextField
                                            type="date"
                                            label="Date Started"
                                            required
                                            name="dateStarted"
                                            value={data.dateStarted}
                                            onChange={update}
                                        />
                                    </div>

                                    <p className="border border-l-8 py-0.5 w-6/12 px-2 border-l-indigo-900 mt-16 mb-2">Financial Sponsors</p>
                                    <div className="grid md:grid-cols-2 gap-2">
                                        <TextField
                                            label="Financial Sponsor Name"
                                            required
                                            name="financialSponsorName"
                                            value={data.financialSponsorName}
                                            onChange={update}
                                        />
                                        <TextField
                                            label="Address"
                                            required
                                            name="address"
                                            value={data.address}
                                            onChange={update}
                                        />
                                        <TextField
                                            label="Relationship With Applicant"
                                            required
                                            name="relationshipWithApplicant"
                                            value={data.relationshipWithApplicant}
                                            onChange={update}
                                        />
                                        <TextField
                                            label="Mobile Number"
                                            required
                                            name="mobileNumber"
                                            value={data.mobileNumber}
                                            onChange={update}
                                        />
                                    </div>
                                    <p className="border border-l-8 py-0.5 w-6/12 px-2 border-l-indigo-900 mt-16 mb-2">Person or Agency to Action on your behalf in China</p>
                                    <div className="grid md:grid-cols-1 gap-2">
                                        <TextField
                                            label="Enter Agent"
                                            required
                                            name="agent"
                                            value={data.agent}
                                            onChange={update}
                                        />
                                    </div>
                                    <p className="border border-l-8 py-0.5 w-6/12 px-2 border-l-indigo-900 mt-16 mb-2">Comment of Sponsor or Recommended Party</p>
                                    <div className="grid md:grid-cols-1 gap-2">

                                        <TextArea label="Enter Comment"
                                            required
                                            name="sponsorComment"
                                            value={data.sponsorComment}
                                            placeholder={`Enter Comment Here`}
                                            onChange={update}
                                        />
                                        <TextField
                                            label="Enter Date"
                                            type="date"
                                            required
                                            name="signedDate"
                                            value={data.signedDate}
                                            onChange={update}
                                        />

                                    </div>
                                </div>
                            )}
                            {step === 2 && (
                                <section className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-md font-semibold">Education Background</h3>
                                        {Array.isArray(data.educationHistory) && data.educationHistory.map((edu, idx) => (
                                            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-xl p-3">

                                                <TextField label="School Attended" name={`schoolAttended-${idx}`} value={edu.schoolAttended} onChange={(n, v) => updateEducation(idx, "schoolAttended", v)} />

                                                <TextField label="Location" name={`location-${idx}`} value={edu.location} onChange={(n, v) => updateEducation(idx, "location", v)} />

                                                <TextField label="Major" name={`major-${idx}`} value={edu.major} onChange={(n, v) => updateEducation(idx, "major", v)} />

                                                <TextField label="email" name={`attended-${idx}`} type="date" value={edu.dateAttended} onChange={(n, v) => updateEducation(idx, "dateAttended", v)} />

                                                <TextField label="Degree Awarded" name={`degreeAwarded-${idx}`} type="text" value={edu.degreeAwarded} onChange={(n, v) => updateEducation(idx, "degreeAwarded", v)} />

                                                <div className="md:col-span-2 flex items-center gap-3">
                                                    {data.educationHistory.length > 1 && (
                                                        <button type="button" onClick={() => removeEducation(idx)} className="rounded-2xl border px-3 py-2 text-sm">Remove</button>
                                                    )}
                                                    {idx === data.educationHistory.length - 1 && (
                                                        <button type="button" onClick={addEducation} className="rounded-2xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white">Add another</button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                            {step === 3 && (
                                <section className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-md font-semibold">Family Members</h3>
                                        {Array.isArray(data.familyMembers) && data.familyMembers.map((fam, idx) => (
                                            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-xl p-3">

                                                <TextField label="Family Member Name" name={`familyMemberName-${idx}`} value={fam.familyMemberName} onChange={(n, v) => updateFamily(idx, "familyMemberName", v)} />

                                                <TextField label="Nationality" name={`nationality-${idx}`} value={fam.nationality} onChange={(n, v) => updateFamily(idx, "nationality", v)} />

                                                <TextField label="Mobile Number" name={`mobileNumber-${idx}`} value={fam.mobileNumber} onChange={(n, v) => updateFamily(idx, "mobileNumber", v)} />

                                                <TextField label="Email" name={`email-${idx}`} type="email" value={fam.email} onChange={(n, v) => updateFamily(idx, "email", v)} />

                                                <TextField label="Profession" name={`profession-${idx}`} type="text" value={fam.profession} onChange={(n, v) => updateFamily(idx, "profession", v)} />

                                                <TextField label="Work Place" name={`workPlace-${idx}`} type="text" value={fam.workPlace} onChange={(n, v) => updateFamily(idx, "workPlace", v)} />

                                                <TextField label="Relationship" name={`relationship-${idx}`} type="text" value={fam.relationship} onChange={(n, v) => updateFamily(idx, "relationship", v)} />

                                                <div className="md:col-span-2 flex items-center gap-3">
                                                    {data.familyMembers.length > 1 && (
                                                        <button type="button" onClick={() => removeFamilyMember(idx)} className="rounded-2xl border px-3 py-2 text-sm">Remove</button>
                                                    )}
                                                    {idx === data.familyMembers.length - 1 && (
                                                        <button type="button" onClick={addFamilyMember} className="rounded-2xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white">Add another</button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                            {step === 4 && (
                                <section className="space-y-6">
                                    <FileField required label="International Passport Photo (recent)" name="passportphoto" files={data.passportphoto} onFilesChange={updateFiles} accept="image/*" multiple={false} />

                                    <FileField required label="Applicant Signature (Sign on paper and snap)" name="applicantSignature" files={data.applicantSignature} onFilesChange={updateFiles} accept="image/*" multiple={false} />

                                    <FileField required label="Sponsor's Signature (Sign on paper and snap)" name="sponsorSignature" files={data.sponsorSignature} onFilesChange={updateFiles} accept="image/*" multiple={false} />

                                    <FileField label="Academic Transcripts" required name="transcripts" files={data.transcripts} onFilesChange={updateFiles} accept="image/*,application/pdf" multiple />

                                    <FileField required label="Recommendation Letters" name="recommendationLetters" files={data.recommendationLetters} onFilesChange={updateFiles} accept="image/*,application/pdf" multiple />

                                    <FileField required label="Medical Report (pdf format)" name="medicalReport" files={data.medicalReport} onFilesChange={updateFiles} accept="application/pdf" multiple />

                                    <FileField required label="Bachelor/Masters Certificate (pdf format)" name="certificates" files={data.certificates} onFilesChange={updateFiles} accept="application/pdf" multiple />

                                    <FileField required label="Bank Statement (pdf format)" name="bankStatement" files={data.bankStatement} onFilesChange={updateFiles} accept="application/pdf" multiple />

                                    <FileField required label="Non-Criminal Record (pdf format)" name="nonCriminalRecord" files={data.nonCriminalRecord} onFilesChange={updateFiles} accept="application/pdf" multiple />

                                    <FileField required label="English Language Proficiency Certificate (Non-English Speaking Countries)" name="englishCertificate" files={data.englishCertificate} onFilesChange={updateFiles} accept="application/pdf" multiple />

                                    <FileField label="Research Proposal (doc format)"
                                        accept=".pdf, .doc, .docx" name="researchProposal" files={data.researchProposal} onFilesChange={updateFiles} multiple />
                                </section>
                            )}
                            {step === 5 && (
                                <section className="space-y-4">
                                    <h2 className="text-lg font-semibold">Review your details</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <ReviewItem label="Major First Choice" value={`${data.majorFirstChoice}`} />
                                        <ReviewItem label="Major Second Choice" value={data.majorSecondChoice} />
                                        <ReviewItem label="Surname" value={data.surName} />
                                        <ReviewItem label="Firstname" value={data.firstName} />
                                        <ReviewItem label="Middlename" value={data.middleName} />
                                        <ReviewItem label="Email" value={data.email} />
                                        <ReviewItem label="Phone" value={data.phone} />
                                        <ReviewItem label="Gender" value={data.gender} />
                                        <ReviewItem label="Date of Birth" value={data.dob} />
                                        <ReviewItem label="Nationality" value={data.nationality} />
                                        <ReviewItem label="Chinese Name" value={data.chineseName} />
                                        <ReviewItem label="Native Language" value={data.nativeLanguage} />
                                        <ReviewItem label="Passport Number" value={data.passportNumber} />
                                        <ReviewItem label="Passport Expiry Date" value={data.passportExpiryDate} />
                                        <ReviewItem label="Religion" value={data.religion} />
                                        <ReviewItem label="MaritalStatus" value={data.maritalStatus} />
                                        <ReviewItem label="Place Of Birth" value={data.placeOfBirth} />
                                        <ReviewItem label="Permanent Home Address" value={data.permanentHomeAddress} />
                                        <ReviewItem label="Fax" value={data.fax} />
                                        <ReviewItem label="Zip Code" value={data.zipCode} />
                                    </div>
                                    <h3 className="text-md font-semibold mt-8 mb-2">More Applicant Info</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <ReviewItem label="Rate Your Chinese" value={data.rateYourChinese} />
                                        <ReviewItem label="Rate Your English" value={data.rateYourEnglish} />
                                        <ReviewItem label="Field Of Study" value={data.fieldOfStudy} />
                                        <ReviewItem label="Study Category" value={data.studyCategory} />
                                        <ReviewItem label="Duration Of Study From" value={data.durationOfStudyFrom} />
                                        <ReviewItem label="Duration Of Study To" value={data.durationOfStudyTo} />
                                        <ReviewItem label="Employer" value={data.employer} />
                                        <ReviewItem label="Location" value={data.location} />
                                        <ReviewItem label="Position" value={data.position} />
                                        <ReviewItem label="Date Started" value={data.dateStarted} />
                                        <ReviewItem label="Financial Sponsor Name" value={data.financialSponsorName} />
                                        <ReviewItem label="Address" value={data.address} />
                                        <ReviewItem label="Relationship With Applicant" value={data.relationshipWithApplicant} />
                                        <ReviewItem label="MobileNumber" value={data.mobileNumber} />
                                        <ReviewItem label="Agent" value={data.agent} />
                                        <ReviewItem label="Sponsor's Comment" value={data.sponsorComment} />
                                        <ReviewItem label="Signed Date" value={data.signedDate} />
                                    </div>

                                    <div className="space-y-3 mt-3">
                                        <h3 className="text-md font-semibold">Education Background</h3>
                                        {Array.isArray(data.educationHistory) && data.educationHistory.length > 0 ? (
                                            <div className="grid grid-cols-1 gap-3">
                                                {data.educationHistory.map((edu, i) => (
                                                    <div key={i} className="rounded-xl border p-3">
                                                        <div className="text-sm font-medium">{edu.schoolAttended || "—"}</div>
                                                        <div className="text-xs text-gray-500">{edu.location ? `${edu.location} • ${edu.field || ""}` : "—"}</div>
                                                        <div className="text-xs text-gray-500">{edu.major ? `${edu.major} • ${edu.field || ""}` : "—"}</div>
                                                        <div className="text-xs text-gray-500">{edu.dateAttended ? `${edu.dateAttended} • ${edu.field || ""}` : "—"}</div>
                                                        <div className="text-xs text-gray-500">{edu.degreeAwarded ? `${edu.degreeAwarded} • ${edu.field || ""}` : "—"}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-sm text-gray-500">No education history provided.</div>
                                        )}
                                    </div>
                                    <div className="space-y-3 mt-3">
                                        <h3 className="text-md font-semibold">Family Members</h3>
                                        {Array.isArray(data.familyMembers) && data.familyMembers.length > 0 ? (
                                            <div className="grid grid-cols-1 gap-3">
                                                {data.familyMembers.map((fam, i) => (
                                                    <div key={i} className="rounded-xl border p-3">
                                                        <div className="text-sm font-medium">{fam.familyMemberName || "—"}</div>
                                                        <div className="text-xs text-gray-500">{fam.nationality ? `${fam.nationality} • ${fam.field || ""}` : "—"}</div>
                                                        <div className="text-xs text-gray-500">{fam.mobileNumber ? `${fam.mobileNumber} • ${fam.field || ""}` : "—"}</div>
                                                        <div className="text-xs text-gray-500">{fam.email ? `${fam.email} • ${fam.field || ""}` : "—"}</div>
                                                        <div className="text-xs text-gray-500">{fam.profession ? `${fam.profession} • ${fam.field || ""}` : "—"}</div>
                                                        <div className="text-xs text-gray-500">{fam.workPlace ? `${fam.workPlace} • ${fam.field || ""}` : "—"}</div>
                                                        <div className="text-xs text-gray-500">{fam.relationship ? `${fam.relationship} • ${fam.field || ""}` : "—"}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-sm text-gray-500">No Family Members Provided!.</div>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                        <ReviewFiles label="Photo" files={data.photo} />
                                        <ReviewFiles label="Passport Scan" files={data.passportScan} />
                                        <ReviewFiles label="Transcripts" files={data.transcripts} />
                                        <ReviewFiles label="Recommendation Letters" files={data.recommendationLetters} />
                                        <ReviewFiles label="Personal Statement / CV" files={data.personalStatement} />
                                    </div>
                                    {submitted && (<div className="rounded-xl border border-green-200 bg-gray-50 p-4 text-black">
                                        <h4>申请人保证/I hereby affirm: </h4>
                                        <p>
                                            1． 申请表中所填写的内容和提供的材料真实无误；
                                            All information and materials given in this form are true and correct.
                                        </p>
                                        <p>
                                            2． 在华其间，遵守中国的法律、法规，不从事任何危害中国秩序的、与本人来华学习身份不相符的活动；
                                            During my stay in China, I shall abide by the laws and decrees of the Chinese government, and will not participate in any activities, which are deemed to be adverse to the social order in China and inappropriate to the capacity as a scholar or
                                            a
                                            student.
                                        </p>
                                        <p>
                                            3． 在学期间，遵守学校的校纪、校规，全力投入学习和研究工作。尊重学校的教学安排；
                                            During my study in China, I shall observe the rules and regulations of the university, and will concentrate on my studies and researches, and will follow the teaching programs made by the university.
                                        </p>
                                        <p>
                                            4． 按规定修完学业，按期回国，不无故在华滞留；
                                            I shall return to my home country as soon as I complete my scheduled program in China, and will not extend my stay without valid reasons.
                                        </p>
                                        <p>
                                            5． 我一到学校就想办理所有登记手续。我将在抵达后30天内向公安局申请居住证，否则我必须支付延误的罚款。
                                            I’d like to go through all the procedures of registration to the university as soon as I arrive. I will apply within thirty days of arrival for the residency permit to the Public Security Bureau otherwise I have to pay the forfeit for the
                                            delay.
                                            <p>
                                                申请人签名/Signature of the applicant:____________<br />
                                                日期/Date:_____________
                                                无此签名，申请无效/The application is invalid without the applicant’s signature
                                            </p>

                                        </p>

                                        <h4>申请人在递送本申请表的同时，请提交/Please send with this form</h4>
                                        <p>
                                            学历生所需材料Relative documents required for Degree and Scholar applicants:
                                            <p>
                                                （1） 护照复印件/One photocopy of your passport(photo page)
                                            </p>
                                            <p>
                                                （2） 最后学历证明/An official certificate of your highest education (or notarized photocopy)

                                            </p>
                                            <p>
                                                （3） 学习成绩单/Official academic transcripts (or notarized photocopy)

                                            </p>
                                            <p>
                                                （4） 推荐信/Two letters of recommendation (original)

                                            </p>
                                            <p>
                                                （5） 家庭收入证明/ An official Certificate of your sponsor’s true family financial situation;

                                            </p>
                                            <p>
                                                （6） 健康证明/ Certificate of your health examination records
                                                无论申请人是否被录取，上述申请材料恕不退还
                                                Whether the candidate is accepted or not, all the application materials will not be returned

                                            </p>

                                            <b className="font-semibold text-lg">
                                                Notice: Please fill in this form in capital letter. Duplication of this form is available.
                                            </b>
                                            <p>
                                                注意事项/Note:
                                                申请人须用中文填写或用英文印刷体填写，其它文字或缺项填写的申请表无效。
                                                This form is to be completed in Chinese or English (print) only. An incomplete application or complete in language other than Chinese or English is invalid.
                                            </p>
                                        </p>
                                    </div>)}
                                </section>
                            )}
                            <div className="flex items-center justify-between pt-4">
                                <button type="button" onClick={reset} className="text-sm text-gray-600 underline">Reset form</button>
                                <div className="flex gap-3">
                                    {step > 0 && (<button type="button" onClick={back} className="rounded-2xl border px-4 py-2 text-sm font-medium hover:bg-gray-50">Back</button>)}
                                    {step < STEPS.length - 1 ? (
                                        <button type="button" onClick={next} className="rounded-2xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700">Continue</button>
                                    ) : (
                                        <button type="submit" className="rounded-2xl bg-green-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-green-700">Submit</button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ReviewItem({ label, value }) {
    return (
        <div className="rounded-xl border p-3"><div className="text-xs text-gray-500">{label}</div><div className="text-sm font-medium break-words">{value || "—"}</div></div>
    );
}

function ReviewFiles({ label, files = [] }) {
    if (!files || files.length === 0) return (<div className="rounded-xl border p-3 text-sm text-gray-500">{label}: —</div>);
    return (
        <div className="rounded-xl border p-3"><div className="text-xs text-gray-500 mb-2">{label}</div><ul className="space-y-1 text-sm">{files.map((f, idx) => (<li key={idx} className="flex items-center justify-between gap-2"><span className="truncate">{f.name}</span><span className="text-gray-500">{(f.size / 1024).toFixed(0)} KB</span></li>))}</ul></div>
    );
}

function labelFor(field) {
    const labels = { firstName: "First Name", surName: " Surname", email: "Email", phone: "Phone", nationality: "Nationality", dob: "Date of Birth", gender: "Gender", passportNumber: "Passport Number", passportExpiryDate: "Passport Expiry Date", hasChinaVisa: "China Visa", visaType: "Visa Type", visaExpiry: "Visa Expiry", highestQualification: "Highest Qualification", gpaOrScore: "GPA / Score", englishProficiency: "English Proficiency", hskLevel: "HSK Level", intendedIntake: "Intended Intake", intendedCity: "Preferred City", universityPreference: "University Preference", programType: "Program Type", major: "Intended Major", photo: "Passport Photo", passportScan: "Passport Scan", transcripts: "Transcripts", recommendationLetters: "Recommendation Letters", personalStatement: "Personal Statement / CV" };
    return labels[field] || field;
}
