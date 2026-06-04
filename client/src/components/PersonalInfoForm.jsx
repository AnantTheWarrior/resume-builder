
// import {
//   User,
//   Mail,
//   MapPin,
//   BriefcaseBusiness,
//   AtSign,
//   Globe,
// } from "lucide-react";

// const PersonalInfoForm = ({
//   data,
//   onChange,
//   removeBackground,
//   setRemoveBackground,
// }) => {
//   const handleChange = (field, value) => {
//     onChange({
//       ...data,
//       [field]: value,
//     });
//   };

//   const fields = [
//     {
//       key: "full_name",
//       label: "Full Name",
//       icon: User,
//       type: "text",
//       required: true,
//     },
//     {
//       key: "email",
//       label: "Email Address",
//       icon: Mail,
//       type: "email",
//       required: true,
//     },
//     {
//       key: "phone",
//       label: "Phone Number",
//       icon: MapPin,
//       type: "text",
//       required: true,
//     },
//     {
//       key: "profession",
//       label: "Profession",
//       icon: BriefcaseBusiness,
//       type: "text",
//       required: true,
//     },
//     {
//       key: "linkedin",
//       label: "LinkedIn Profile",
//       icon: AtSign,
//       type: "url",
//     },
//     {
//       key: "website",
//       label: "Personal Website",
//       icon: Globe,
//       type: "url",
//     },
//   ];

//   return (
//     <div>
//       {/* HEADER */}
//       <h3 className="text-lg font-semibold text-gray-900">
//         Personal Information
//       </h3>
//       <p className="text-sm text-gray-500">
//         Get started with your personal information
//       </p>

//       {/* IMAGE UPLOAD */}
//       <div className="flex items-center gap-4 mt-5">
//         <label className="cursor-pointer">
//           {data.image ? (
//             <img
//               src={
//                 typeof data.image === "string"
//                   ? data.image
//                   : URL.createObjectURL(data.image)
//               }
//               alt="user-image"
//               className="w-16 h-16 rounded-full object-cover ring ring-slate-300 hover:opacity-80"
//             />
//           ) : (
//             <div className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-700">
//               <User className="size-10 p-2.5 border border-slate-300 rounded-full" />
//               <span className="text-sm">Upload Image</span>
//             </div>
//           )}

//         <input
//   type="file"
//   accept="image/*"
//   onChange={handleImageUpload}
//   className="hidden"
// />
//         </label>

//         {/* REMOVE BACKGROUND TOGGLE */}
//         {data.image && (
//           <label className="flex items-center gap-2 text-sm">
//             <input
//               type="checkbox"
//               checked={removeBackground}
//               onChange={() => setRemoveBackground(!removeBackground)}
//               className="rounded"
//             />
//             Remove background
//           </label>
//         )}
//       </div>

//       {/* INPUT FIELDS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
//         {fields.map(({ key, label, icon: Icon, type, required }) => (
//           <div key={key}>
//             <label className="text-sm font-medium text-gray-700">
//               {label}
//             </label>

//             <div className="relative mt-1">
//               <Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />

//               <input
//                 type={type}
//                 value={data[key] || ""}
//                 onChange={(e) => handleChange(key, e.target.value)}
//                 placeholder={label}
//                 required={required}
//                 className="w-full pl-10 pr-3 py-2 border border-gray-300 text-sm rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none"
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PersonalInfoForm;




import axios from "axios";
import {
  User,
  Mail,
  MapPin,
  BriefcaseBusiness,
  AtSign,
  Globe,
} from "lucide-react";

const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("image", file);

      const token = localStorage.getItem("token");

      const { data: response } = await axios.post(
        "http://localhost:3000/api/resumes/upload-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // if (response.success) {
      //   handleChange("image", response.imageUrl );
      // }
      if (response.success) {
      // 👉 Choose ONE based on your UI
      const finalImage = response.bgRemovedUrl || response.originalUrl;

      handleChange("image", finalImage);
    }
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const fields = [
    {
      key: "full_name",
      label: "Full Name",
      icon: User,
      type: "text",
      required: true,
    },
    {
      key: "email",
      label: "Email Address",
      icon: Mail,
      type: "email",
      required: true,
    },
    {
      key: "phone",
      label: "Phone Number",
      icon: MapPin,
      type: "text",
      required: true,
    },
    {
      key: "profession",
      label: "Profession",
      icon: BriefcaseBusiness,
      type: "text",
      required: true,
    },
    {
      key: "linkedin",
      label: "LinkedIn Profile",
      icon: AtSign,
      type: "url",
    },
    {
      key: "website",
      label: "Personal Website",
      icon: Globe,
      type: "url",
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">
        Personal Information
      </h3>

      <p className="text-sm text-gray-500">
        Get started with your personal information
      </p>

      {/* IMAGE UPLOAD */}
      <div className="flex items-center gap-4 mt-5">
        <label className="cursor-pointer">
          {data.image ? (
            <img
              src={data.image}
              alt="user-image"
              className="w-16 h-16 rounded-full object-cover ring ring-slate-300 hover:opacity-80"
            />
          ) : (
            <div className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-700">
              <User className="size-10 p-2.5 border border-slate-300 rounded-full" />
              <span className="text-sm">Upload Image</span>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        {data.image && (
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={removeBackground}
              onChange={() => setRemoveBackground(!removeBackground)}
              className="rounded"
            />
            Remove background
          </label>
        )}
      </div>

      {/* INPUT FIELDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {fields.map(({ key, label, icon: Icon, type, required }) => (
          <div key={key}>
            <label className="text-sm font-medium text-gray-700">
              {label}
            </label>

            <div className="relative mt-1">
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />

              <input
                type={type}
                value={data[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
                placeholder={label}
                required={required}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 text-sm rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalInfoForm;


