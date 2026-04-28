"use client";

import { useState, Suspense } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Upload, Loader2, Check, X } from "lucide-react";
import {
  useApplyToJobMutation,
  useGetJobPostByIdQuery,
  IJobApplication,
  IJobPost,
} from "@/src/lib/redux/features/careers/jobApplicationApi";

function ApplyContent() {
  const router = useRouter();
  const params = useParams();
  const jobId = params?.jobId as string;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    coverLetter: "",
    experience: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeName, setResumeName] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { data: jobData, isLoading: isJobLoading } = useGetJobPostByIdQuery(jobId, {
    skip: !jobId,
  });
  const [applyToJob, { isLoading }] = useApplyToJobMutation();

  const job = (jobData?.data as IJobPost | undefined) || null;

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.experience.trim()) newErrors.experience = "Experience is required";
    if (!resumeFile) newErrors.resume = "Resume is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid =
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.email.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.experience.trim() !== "" &&
    resumeFile !== null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormStatus("sending");

    try {
         const payload: IJobApplication = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phone || undefined,
        linkedInProfile: formData.linkedin || undefined,
        portfolioUrl: formData.portfolio || undefined,
        experience: formData.experience,
        coverLetter: formData.coverLetter || undefined,
      };

      if (resumeFile) {
        payload.resume = resumeFile;
      }

      await applyToJob({
        jobPostId: jobId,
        data: payload,
      }).unwrap();

      setFormStatus("sent");
    } catch (error) {
      console.error("Failed to submit application:", error);
      setFormStatus("error");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, resume: "File size must be under 10MB" }));
        return;
      }
      setResumeFile(file);
      setResumeName(file.name);
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.resume;
        return newErrors;
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  if (isJobLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 px-4">
        <div className="max-w-2xl mx-auto text-center text-gray-500">Loading job...</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-[#1A1A40]">Job not found</h1>
          <button
            onClick={() => router.push("/careers")}
            className="mt-4 inline-flex items-center gap-2 text-[#5D5FEF] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all jobs
          </button>
        </div>
      </div>
    );
  }

  if (formStatus === "sent") {
    return (
      <div className="min-h-screen bg-gray-50 py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-extrabold text-[#1A1A40] mb-4">
              Application Submitted!
            </h1>
            <p className="text-gray-600 mb-8">
              Thank you for applying to the {job.title} position. Our team will review your
              application and get back to you within 5-7 business days.
            </p>
            <button
              onClick={() => router.push("/careers")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#5D5FEF] text-white rounded-xl font-medium hover:bg-[#4a4ec7] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Browse other jobs
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => router.push(`/careers/${job.id}`)}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#5D5FEF] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to job details
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[#1A1A40] mb-2">
            Apply for {job.title}
          </h1>
          <p className="text-gray-500">
            {[job.location, job.jobType, job.salaryRange].filter(Boolean).join(" • ")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-[#1A1A40] mb-2">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.firstName ? "border-red-500" : "border-gray-200"
                } bg-white text-[#1A1A40] focus:outline-none focus:ring-2 focus:ring-[#5D5FEF]`}
                placeholder="John"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1A1A40] mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.lastName ? "border-red-500" : "border-gray-200"
                } bg-white text-[#1A1A40] focus:outline-none focus:ring-2 focus:ring-[#5D5FEF]`}
                placeholder="Doe"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#1A1A40] mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.email ? "border-red-500" : "border-gray-200"
                } bg-white text-[#1A1A40] focus:outline-none focus:ring-2 focus:ring-[#5D5FEF]`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A40] mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1A1A40] focus:outline-none focus:ring-2 focus:ring-[#5D5FEF]"
                placeholder="+880..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A40] mb-2">LinkedIn Profile</label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1A1A40] focus:outline-none focus:ring-2 focus:ring-[#5D5FEF]"
                placeholder="https://linkedin.com/in/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A40] mb-2">Portfolio / Website</label>
              <input
                type="url"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1A1A40] focus:outline-none focus:ring-2 focus:ring-[#5D5FEF]"
                placeholder="https://your-portfolio.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A40] mb-2">Experience *</label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.experience ? "border-red-500" : "border-gray-200"
                } bg-white text-[#1A1A40] focus:outline-none focus:ring-2 focus:ring-[#5D5FEF] resize-none`}
                placeholder="Tell us about your relevant experience..."
              />
              {errors.experience && (
                <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A40] mb-2">Cover Letter</label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1A1A40] focus:outline-none focus:ring-2 focus:ring-[#5D5FEF] resize-none"
                placeholder="Share why you're a good fit for this role..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A40] mb-2">Resume *</label>
              <label className="flex items-center justify-center gap-3 border-2 border-dashed border-gray-200 rounded-2xl p-6 cursor-pointer hover:border-[#5D5FEF] transition-colors">
                <Upload className="w-5 h-5 text-[#5D5FEF]" />
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-[#1A1A40]">Upload your resume</span>
                  <p className="mt-1 text-gray-500">
                    PDF, DOC, or DOCX up to 10MB
                  </p>
                </div>
                <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
              </label>
              {resumeName && (
                <div className="mt-3 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                  <span className="text-sm text-gray-700 truncate">{resumeName}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setResumeFile(null);
                      setResumeName("");
                    }}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              {errors.resume && <p className="text-red-500 text-sm mt-1">{errors.resume}</p>}
            </div>
          </div>

          {formStatus === "error" && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              Something went wrong while submitting your application. Please try again.
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !isFormValid}
            className="w-full mt-8 inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#5D5FEF] text-white rounded-xl font-semibold hover:bg-[#4a4ec7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 py-20 px-4 text-center text-gray-500">Loading...</div>}>
      <ApplyContent />
    </Suspense>
  );
}
