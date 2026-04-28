import { baseApi } from './../../api/baseApi';

// Types for Job Application
export interface IJobPost {
  id: string;
  slug?: string;
  title: string;
  description: string;
  requirements?: string;
  location?: string;
  jobType?: string;
  salaryRange?: string;
  status: 'PUBLISHED' | 'DRAFT' | 'CLOSED';
  createdAt?: string;
  updatedAt?: string;
}

export interface IJobApplication {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  linkedInProfile?: string;
  portfolioUrl?: string;
  experience: string;
  coverLetter?: string;
  resume?: File;
}

export interface IJobApplicationResponse {
  id: string;
  jobPostId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  linkedInProfile?: string;
  portfolioUrl?: string;
  experience: string;
  coverLetter?: string;
  resumeUrl: string;
  status: string;
  createdAt: string;
}

export const jobApplicationApi = baseApi.injectEndpoints({
   overrideExisting: true,
   endpoints: (build) => ({
      getAllJobPosts: build.query({
         query: () => ({
            url: `/posts`,
            method: 'GET',
         }),
         providesTags: ["jobs"],
      }),
      
      getJobPostById: build.query({
         query: (id) => ({
            url: `/posts/${id}`,
            method: 'GET',
         }),
         providesTags: ["jobs"],
      }),
      
      applyToJob: build.mutation({
      query: ({ jobPostId, data }) => {
        const formData = new FormData();

        formData.append("firstName", data.firstName || "");
        formData.append("lastName", data.lastName || "");
        formData.append("email", data.email || "");
        formData.append("experience", data.experience || "");

        if (data.phoneNumber) formData.append("phoneNumber", data.phoneNumber);
        if (data.linkedInProfile) formData.append("linkedInProfile", data.linkedInProfile);
        if (data.portfolioUrl) formData.append("portfolioUrl", data.portfolioUrl);
        if (data.coverLetter) formData.append("coverLetter", data.coverLetter);
        if (data.resume) formData.append("resume", data.resume);

        return {
          url: `/apply/${jobPostId}`,
          method: "POST",
          body: formData,
          formData: true,
        };
      },
    }),
      
      createJobPost: build.mutation({
         query: (jobData) => ({
            url: `/posts`,
            method: 'POST',
            data: jobData,
         }),
         invalidatesTags: ["jobs"],
      }),
      
      updateJobPost: build.mutation({
         query: ({ id, data }) => ({
            url: `/posts/${id}`,
            method: 'PUT',
            data,
         }),
         invalidatesTags: ["jobs"],
      }),
      
      deleteJobPost: build.mutation({
         query: (id) => ({
            url: `/posts/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: ["jobs"],
      }),
   }),
});

export const {
   useGetAllJobPostsQuery,
   useGetJobPostByIdQuery,
   useApplyToJobMutation,
   useCreateJobPostMutation,
   useUpdateJobPostMutation,
   useDeleteJobPostMutation,
} = jobApplicationApi;
