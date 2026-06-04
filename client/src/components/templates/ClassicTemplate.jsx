

import { Mail, Phone, MapPin, AtSign, Globe } from "lucide-react";

const ClassicTemplate = ({
    data = {
        personal_info: {},
        experience: [],
        projects: [],
        education: [],
        skills: []
    },
    accentColor = "#000"
}) => {

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
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed">

            {/* Header */}
            <header
                className="text-center mb-8 pb-6 border-b-2"
                style={{ borderColor: accentColor }}
            >
                <h1
                    className="text-3xl font-bold mb-2"
                    style={{ color: accentColor }}
                >
                    {data.personal_info.full_name || "Your Name"}
                </h1>

                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-700">
                    {data.personal_info.email && (
                        <div className="flex items-center gap-1">
                            <Mail className="size-4" />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}

                    {data.personal_info.phone && (
                        <div className="flex items-center gap-1">
                            <Phone className="size-4" />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}

                    {data.personal_info.location && (
                        <div className="flex items-center gap-1">
                            <MapPin className="size-4" />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}

                    {data.personal_info.linkedin && (
                        <div className="flex items-center gap-1">
                            <AtSign className="size-4" />
                            <span className="break-all">{data.personal_info.linkedin}</span>
                        </div>
                    )}

                    {data.personal_info.website && (
                        <div className="flex items-center gap-1">
                            <Globe className="size-4" />
                            <span className="break-all">{data.personal_info.website}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {(data.professional_summary || data.summary) && (
                <section className="mb-8">
                    <h2
                        className="text-xl font-semibold mb-3"
                        style={{ color: accentColor }}
                    >
                        Professional Summary
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {data.professional_summary || data.summary}
                    </p>
                </section>
            )}

            {/* Experience Section */}
            {data.experience?.length > 0 && (
                <section className="mb-8">
                    <h2
                        className="text-xl font-semibold mb-3"
                        style={{ color: accentColor }}
                    >
                        Experience
                    </h2>

                    <div className="space-y-6">
                        {data.experience.map((exp, idx) => (
                            <div key={idx}>
                                <h3 className="text-lg font-bold">
                                    {exp.role || "Job Title"}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {exp.company || "Company"} •{" "}
                                    {formatDate(exp.start_date)} -{" "}
                                    {exp.current ? "Present" : formatDate(exp.end_date)}
                                </p>
                                {exp.description && (
                                    <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
                                        {exp.description.map((point, i) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects Section */}
            {data.projects?.length > 0 && (
                <section className="mb-8">
                    <h2
                        className="text-xl font-semibold mb-3"
                        style={{ color: accentColor }}
                    >
                        Projects
                    </h2>

                    <div className="space-y-6">
                        {data.projects.map((proj, idx) => (
                            <div key={idx}>
                                <h3 className="text-lg font-bold">
                                    {proj.name || "Project Name"}
                                </h3>
                                <p className="text-sm text-gray-600 mb-1">
                                    {proj.technologies?.join(", ") || "Technologies"}
                                </p>
                                <p className="text-sm">{proj.description || ""}</p>

                                {proj.link && (
                                    <a
                                        href={proj.link}
                                        className="text-sm underline"
                                        style={{ color: accentColor }}
                                    >
                                        View Project
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education Section */}
            {data.education?.length > 0 && (
                <section className="mb-8">
                    <h2
                        className="text-xl font-semibold mb-3"
                        style={{ color: accentColor }}
                    >
                        Education
                    </h2>

                    <div className="space-y-4">
                        {data.education.map((edu, idx) => (
                            <div key={idx}>
                                <h3 className="text-lg font-bold">
                                    {edu.institution || "Institution"}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {edu.degree || "Degree"}
                                    {edu.field ? ` • ${edu.field}` : ""}
                                </p>
                                {edu.graduation_date && (
                                    <p className="text-sm text-gray-600">
                                        Graduated {formatDate(edu.graduation_date)}
                                        {edu.gpa ? ` • GPA: ${edu.gpa}` : ""}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills Section */}
            {data.skills?.length > 0 && (
                <section className="mb-4">
                    <h2
                        className="text-xl font-semibold mb-3"
                        style={{ color: accentColor }}
                    >
                        Skills
                    </h2>
                    <div className="flex flex-wrap gap-2 text-sm">
                        {data.skills.map((skill, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1 border rounded-full"
                                style={{ borderColor: accentColor, color: accentColor }}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ClassicTemplate;


