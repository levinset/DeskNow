//  Desk Component
import React from 'react';
import { DeskProps } from '../../types/DesksProps';



const Desk: React.FC<{ desk: DeskProps }> = ({ desk }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <div className="flex flex-wrap -mx-2">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2 mb-4">
          <p className="font-bold">Desk ID:</p>
          <p>{desk.id}</p>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2 mb-4">
          <p className="font-bold">Label:</p>
          <p>{desk.label}</p>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2 mb-4">
          <p className="font-bold">Type:</p>
          <p>{desk.type}</p>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2 mb-4">
          <p className="font-bold">Created At:</p>
          <p>{new Date(desk.createdAt).toLocaleString()}</p>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2 mb-4">
          <p className="font-bold">Updated At:</p>
          <p>{new Date(desk.updatedAt).toLocaleString()}</p>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2 mb-4">
          <p className="font-bold">Column:</p>
          <p>{desk.column}</p>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2 mb-4">
          <p className="font-bold">Row:</p>
          <p>{desk.row}</p>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2 mb-4">
          <p className="font-bold">Equipment:</p>
          <ul>
            {desk.equipment.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
        <p>Office ID: {desk.office.id}</p> {/* Displaying the office ID */}
        </div>
      </div>
    </div>
  );
};

export default Desk;
