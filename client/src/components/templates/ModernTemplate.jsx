


import { Mail, Phone, MapPin, AtSign, Globe } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
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
                    month: "short"
                });
            }
        }

        const parsed = new Date(trimmed);
        if (!Number.isNaN(parsed.getTime())) {
            return parsed.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short"
            });
        }

        return trimmed;
    };

    return (
        <div className="max-w-4xl mx-auto bg-white text-gray-800">

            {/* HEADER */}
            <header className="p-8 text-white" style={{ backgroundColor: accentColor }}>
                <h1 className="text-4xl font-light mb-3">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-2">
                            <Mail className="size-4" />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-2">
                            <Phone className="size-4" />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-2">
                            <MapPin className="size-4" />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={data.personal_info.linkedin}
                            className="flex items-center gap-2"
                        >
                            <AtSign className="size-4" />
                            <span className="break-all text-xs">
                                {data.personal_info.linkedin.replace("https://www.", "")}
                            </span>
                        </a>
                    )}
                    {data.personal_info?.website && (
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={data.personal_info.website}
                            className="flex items-center gap-2"
                        >
                            <Globe className="size-4" />
                            <span className="break-all text-xs">
                                {data.personal_info.website.replace("https://www.", "")}
                            </span>
                        </a>
                    )}
                </div>
            </header>

            {/* BODY */}
            <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT COLUMN */}
                <aside className="lg:col-span-1 space-y-8">

                    {/* Summary */}
                    {(data.professional_summary || data.summary) && (
                        <section>
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Summary</h2>
                            <p className="text-sm">{data.professional_summary || data.summary}</p>
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills?.length > 0 && (
                        <section>
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Skills</h2>
                            <ul className="space-y-1 text-sm">
                                {data.skills.map((skill, idx) => (
                                    <li key={idx}>• {skill}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                </aside>

                {/* RIGHT COLUMN */}
                <main className="lg:col-span-2 space-y-8">

                    {/* Experience */}
                    {data.experience?.length > 0 && (
                        <section>
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">Experience</h2>
                            <div className="space-y-4">
                                {data.experience.map((exp, idx) => (
                                    <div key={idx}>
                                        <h3 className="font-semibold">{exp.role || "Role"}</h3>
                                        <p className="text-sm text-gray-600">
                                            {exp.company || "Company"} • {formatDate(exp.start_date)} –{" "}
                                            {exp.current ? "Present" : formatDate(exp.end_date)}
                                        </p>
                                        {exp.description && (
                                            <p className="text-sm mt-1">{exp.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {data.education?.length > 0 && (
                        <section>
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">Education</h2>
                            <div className="space-y-4">
                                {data.education.map((edu, idx) => (
                                    <div key={idx}>
                                        <h3 className="font-semibold">{edu.degree || "Degree"}</h3>
                                        <p className="text-sm text-gray-600">
                                            {edu.institution || "Institution"} •{" "}
                                            {formatDate(edu.start_date)} – {formatDate(edu.end_date)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.project?.length > 0 && (
                        <section>
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">Projects</h2>
                            <div className="space-y-4">
                                {data.project.map((project, idx) => (
                                    <div key={idx}>
                                        <h3 className="font-semibold">{project.title || "Project Title"}</h3>
                                        {project.description && (
                                            <p className="text-sm">{project.description}</p>
                                        )}
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-blue-600 underline"
                                            >
                                                {project.link}
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                </main>
            </div>
        </div>
    );
};

export default ModernTemplate;