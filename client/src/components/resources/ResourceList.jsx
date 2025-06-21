import React from "react";
import ResourceCard from "./ResourceCard";

const ResourceList = ({ resources }) => {
  if (!resources || resources.length === 0) {
    return <p className="text-gray-500">No resources found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource) => (
        <ResourceCard key={resource.id || resource._id} resource={resource} />
      ))}
    </div>
  );
};

export default ResourceList;
