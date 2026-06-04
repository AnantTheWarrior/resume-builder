


const MiniTemplate = ({
  data = {
    personal_info: {},
    experience: [],
    projects: [],
    education: [],
    skills: [],
  },
  accentColor = "#000",
}) => {
  const name = data.personal_info?.full_name || data.personal_info?.name || "Your Name";
  const email = data.personal_info?.email || "example@email.com";
  const city = data.personal_info?.location || data.personal_info?.city || "Your City";
  const phone = data.personal_info?.phone || "Your Phone";

  return (
    <div className="font-sans p-12 text-gray-900">
      {/* Header */}
      <header>
        <h1
          className="text-5xl font-bold mb-2 tracking-tight"
          style={{ color: accentColor }}
        >
          {name}
        </h1>
        <p className="text-lg mb-6">
          <span className="mr-4">{email}</span>
          <span className="mr-4">{city}</span>
          {phone}
        </p>
        <hr
          style={{ borderColor: accentColor }}
          className="border-t-2 mb-8"
        />
      </header>

      {/* Experience Section */}
      {data.experience?.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: accentColor }}
          >
            Experience
          </h2>
          <ul className="list-disc ml-5 space-y-4">
            {data.experience.map((exp, index) => (
              <li key={index}>
                <h3 className="text-lg font-medium">
                  {exp.role || "Job Role"}
                </h3>
                <p className="text-sm">
                  {exp.company || "Company Name"} | {exp.duration || "Duration"}
                </p>
                <p>{exp.description || "Description not provided."}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Projects Section */}
      {data.project?.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: accentColor }}
          >
            Projects
          </h2>
          <ul className="list-disc ml-5 space-y-4">
            {data.project.map((proj, index) => (
              <li key={index}>
                <h3 className="text-lg font-medium">
                  {proj.name || "Untitled Project"}
                </h3>
                <p>
                  {proj.description || "No project description provided."}
                </p>
                {proj.url && (
                  <a
                    href={proj.url}
                    className="text-blue-600 underline text-sm"
                  >
                    {proj.url}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Education Section */}
      {(data.education?.length > 0 || data.professional_summary) && (
        <section className="mb-10">
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: accentColor }}
          >
            Education
          </h2>
          <ul className="list-disc ml-5 space-y-4">
            {data.education.map((edu, index) => (
              <li key={index}>
                <h3 className="text-lg font-medium">
                  {edu.degree || "Degree"}
                </h3>
                <p className="text-sm">
                  {edu.institution || "Institution"}
                  {edu.field ? ` | ${edu.field}` : ""}
                </p>
                {edu.graduation_date && (
                  <p className="text-sm text-gray-500">
                    Graduated {edu.graduation_date}
                    {edu.gpa ? ` • GPA: ${edu.gpa}` : ""}
                  </p>
                )}
                {edu.description && <p>{edu.description}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Professional Summary */}
      {(data.professional_summary || data.summary) && (
        <section className="mb-10">
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: accentColor }}
          >
            Summary
          </h2>
          <p>{data.professional_summary || data.summary}</p>
        </section>
      )}

      {/* Skills Section */}
      {data.skills?.length > 0 && (
        <section>
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: accentColor }}
          >
            Skills
          </h2>
          <p>{data.skills.join(", ") || "No skills listed."}</p>
        </section>
      )}
    </div>
  );
};

export default MiniTemplate;