// src/components/schedule/ServiceNotes.tsx
import React from "react";

interface ServiceNotesProps {
  notes: string | null;
}

const ServiceNotes: React.FC<ServiceNotesProps> = ({ notes }) => {
  return (
    <div className="mt-[24px]">
      <h3 className="font-roboto font-semibold text-task-title leading-task-title text-task-text mb-2">
        Service Notes
      </h3>
      <div className="">
        {notes ? (
          <p className="font-roboto font-normal text-description leading-description text-task-text whitespace-pre-wrap">
            {notes}
          </p>
        ) : (
          <p className="font-roboto font-normal text-description leading-description text-gray-500 italic">
            No notes were added.
          </p>
        )}
      </div>
    </div>
  );
};

export default ServiceNotes;
