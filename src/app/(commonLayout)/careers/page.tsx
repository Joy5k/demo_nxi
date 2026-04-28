"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Clock, ArrowRight, Briefcase, Search } from "lucide-react";
import {
  IJobPost,
  useGetAllJobPostsQuery,
} from "@/src/lib/redux/features/careers/jobApplicationApi";
import DOMPurify from "isomorphic-dompurify";

const getJobHref = (job: IJobPost) => `/careers/${job.slug || job.id}`;

function getExcerpt(html: string, maxLength = 200): string {
  const clean = DOMPurify.sanitize(html);
  const text = clean.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export default function CareersPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading } = useGetAllJobPostsQuery({});
  const jobs = useMemo(
    () =>
      ((data?.data as IJobPost[]) || []).filter(
        (job) => job.status === "PUBLISHED"
      ),
    [data]
  );

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const excerpt = getExcerpt(job.description);
      const searchValue = searchQuery.toLowerCase();

      return (
        job.title.toLowerCase().includes(searchValue) ||
        excerpt.toLowerCase().includes(searchValue) ||
        (job.location || "").toLowerCase().includes(searchValue) ||
        (job.jobType || "").toLowerCase().includes(searchValue)
      );
    });
  }, [jobs, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-[#1A1A40]">
            Join Our <span className="text-[#5D5FEF]">Careers</span> Team
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">
            Explore open roles and find the team, mission, and offer that fits
            you best.
          </p>
        </div>

        <div className="mb-12">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1A1A40] focus:outline-none focus:ring-2 focus:ring-[#5D5FEF]"
            />
          </div>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center text-gray-500">
              Loading jobs...
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center text-gray-500">
              No published jobs found right now.
            </div>
          ) : (
            filteredJobs.map((job) => {
              const excerpt = getExcerpt(job.description);

              return (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <span className="inline-flex text-xs font-semibold text-[#5D5FEF] bg-[#5D5FEF]/10 px-2 py-1 rounded-full mb-3">
                          {job.status}
                        </span>
                        <h3 className="text-xl font-bold text-[#1A1A40] mb-3">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                          {job.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </div>
                          )}
                          {job.jobType && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {job.jobType}
                            </div>
                          )}
                          {job.salaryRange && (
                            <div className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              {job.salaryRange}
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600 line-clamp-3">
                          {excerpt || "Open the job post to read more details."}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => router.push(getJobHref(job))}
                          className="flex items-center gap-2 px-4 py-2 bg-[#5D5FEF] text-white rounded-lg font-medium hover:bg-[#4a4ec7] transition-colors"
                        >
                          View Details
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

  
      </div>
    </div>
  );
}