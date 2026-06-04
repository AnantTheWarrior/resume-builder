



import { Mail, Phone, MapPin } from "lucide-react";

const MinimalImageTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";

        const trimmed = String(dateStr).trim();
        if (/^\d{4}$/.test(trimmed)) {
            return trimmed;
        }

        const yearMonthMatch = trimmed.match(/^(\d{4})-(\d{1,2})$/);
        if (yearMonthMatch) {
            const year = Number(yearMonthMatch[1]);
            const month = Number(yearMonthMatch[2]);
            if (month >= 1 && month <= 12) {
                return new Date(year, month - 1).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                });
            }
        }

        const parsed = new Date(trimmed);
        if (!Number.isNaN(parsed.getTime())) {
            return parsed.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
            });
        }

        return trimmed;
    };

    return (
        <div className="max-w-5xl mx-auto bg-white text-zinc-800">
            <div className="grid grid-cols-3">

                {/* Image Section */}
                <div className="col-span-1 py-10 flex justify-center">
                    {data.personal_info?.image ? (
                        <img
                            src={
                                typeof data.personal_info.image === "string"
                                    ? data.personal_info.image
                                    : URL.createObjectURL(data.personal_info.image)
                            }
                            alt="Profile"
                            className="w-32 h-32 object-cover rounded-full"
                            style={{ background: accentColor + "40" }}
                        />
                    ) : null}
                </div>

                {/* Name + Title */}
                <div className="col-span-2 flex flex-col justify-center py-10 px-8">
                    <h1 className="text-4xl font-bold text-zinc-700 tracking-widest">
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    <p className="uppercase text-zinc-600 font-medium text-sm tracking-widest">
                        {data.personal_info?.profession || "Profession"}
                    </p>
                </div>

                {/* Left Sidebar */}
                <aside className="col-span-1 border-r border-zinc-400 p-6 pt-0">

                    {/* Contact */}
                    <section className="mb-8">
                        <h2
                            className="text-sm font-semibold tracking-widest mb-3"
                            style={{ color: accentColor }}
                        >
                            CONTACT
                        </h2>

                        <ul className="space-y-2 text-sm">
                            {data.personal_info?.email && (
                                <li className="flex items-center gap-2">
                                    <Mail className="size-4" />
                                    {data.personal_info.email}
                                </li>
                            )}
                            {data.personal_info?.phone && (
                                <li className="flex items-center gap-2">
                                    <Phone className="size-4" />
                                    {data.personal_info.phone}
                                </li>
                            )}
                            {data.personal_info?.location && (
                                <li className="flex items-center gap-2">
                                    <MapPin className="size-4" />
                                    {data.personal_info.location}
                                </li>
                            )}
                        </ul>
                    </section>

                    {/* Skills */}
                    {data.skills?.length > 0 && (
                        <section className="mb-8">
                            <h2
                                className="text-sm font-semibold tracking-widest mb-3"
                                style={{ color: accentColor }}
                            >
                                SKILLS
                            </h2>

                            <ul className="text-sm space-y-1">
                                {data.skills.map((skill, index) => (
                                    <li key={index}>• {skill}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Education */}
                    {data.education?.length > 0 && (
                        <section>
                            <h2
                                className="text-sm font-semibold tracking-widest mb-3"
                                style={{ color: accentColor }}
                            >
                                EDUCATION
                            </h2>

                            <div className="space-y-4 text-sm">
                                {data.education.map((edu, index) => (
                                    <div key={index}>
                                        <p className="font-semibold">{edu.degree || "Degree"}</p>
                                        <p>{edu.institution || "Institution"}</p>
                                        {edu.field && <p className="text-sm text-zinc-600">{edu.field}</p>}
                                        {edu.graduation_date && (
                                            <p className="text-xs text-zinc-500">
                                                Graduated {formatDate(edu.graduation_date)}
                                                {edu.gpa ? ` • GPA: ${edu.gpa}` : ""}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>

                {/* Main Content */}
                <div className="col-span-2 p-10">

                    {/* Summary */}
                    {data.professional_summary && (
                        <section className="mb-10">
                            <h2
                                className="text-sm font-semibold tracking-widest mb-4"
                                style={{ color: accentColor }}
                            >
                                SUMMARY
                            </h2>
                            <p className="text-sm leading-relaxed">
                                {data.professional_summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.experience?.length > 0 && (
                        <section>
                            <h2
                                className="text-sm font-semibold tracking-widest mb-4"
                                style={{ color: accentColor }}
                            >
                                EXPERIENCE
                            </h2>

                            <div className="space-y-8">
                                {data.experience.map((exp, index) => (
                                    <div key={index}>
                                        <p className="font-semibold text-lg">
                                            {exp.title || "Job Title"}
                                        </p>
                                        <p className="text-sm text-zinc-600">
                                            {exp.company || "Company"} —{" "}
                                            {formatDate(exp.start_date)} – {formatDate(exp.end_date)}
                                        </p>

                                        {exp.description && (
                                            <ul className="mt-2 text-sm space-y-1 list-disc pl-5">
                                                {exp.description.split("\n").map((line, i) => (
                                                    <li key={i}>{line}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MinimalImageTemplate;