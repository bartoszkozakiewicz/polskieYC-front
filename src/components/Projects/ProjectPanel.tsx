import React from "react";

const ProjectPanel = ({ project }: any) => {
  return (
    <div className="flex-basis-1/3 m-4 max-w-xs rounded-xl bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-xl font-semibold text-gray-800">
        {project.name}
      </h3>
      <p className="mb-4 text-base text-gray-600">
        {project.description.length > 400
          ? project.description.slice(0, 400) + "..."
          : project.description}
      </p>
      <p className="mb-4 text-sm font-medium text-gray-700">
        <strong>Industry:</strong> {project.industry}
      </p>
      {project?.company && (
        <p className="mb-4 text-sm font-medium text-gray-700">
          <strong>Company:</strong>{" "}
          <span className="font-semibold text-[#1DBB3A]">
            {project.company}
          </span>
        </p>
      )}
      <div className="text-sm font-medium text-gray-700">
        <strong>Tags:</strong>
        <ul className="mt-2 flex flex-wrap gap-2">
          {project.tags.map((tag: string) => (
            <li
              key={tag}
              className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-800"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectPanel;
