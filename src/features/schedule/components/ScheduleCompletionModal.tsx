import React from "react";
import Modal from "../../../shared/components/Modal";
import { TimeIcon, calenderIcon, CompletionIcon } from "../../../shared/assets";

interface ScheduleCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoHome: () => void;
  scheduleDate: string;
  scheduleTime: string;
  duration: string;
}

const ScheduleCompletionModal: React.FC<ScheduleCompletionModalProps> = ({
  isOpen,
  onClose,
  onGoHome,
  scheduleDate,
  scheduleTime,
  duration,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-full h-full flex items-center justify-center bg-opacity-0 bg-[#0d5d590]"
    >
      <div className="md:rounded-[20px] md:bg-white md:h-[452px] md:w-[500px] md:shadow-lg md:relative bg-[#0d5d59] fixed inset-0 flex flex-col">
        <button
          onClick={onClose}
          className="!bg-opacity-0 md:!bg-white max-[800px]:!bg-[#0D5D59]	 absolute md:top-4 md:right-4 top-6 right-6 max-[800px]:text-white md:text-black text-gray-500 md:hover:text-gray-500 hover:text-gray-400"
        >
          <svg
            className="md:w-5 md:h-5 w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <div className="flex-1 flex flex-col items-center justify-center text-center md:p-6 px-8 ">
          <img src={CompletionIcon} className="w-[140px] h-[140px] md:mb-4" />

          <h2 className="md:text-[24px] md:font-bold md:text-gray-900 md:mb-4 text-[24px] font-roboto font-bold text-white mt-6">
            Schedule Completed
          </h2>

          <div className="md:w-full md:border-none md:border-gray-100 md:rounded-none md:bg-white md:p-4 md:mb-6 bg-[#FFFFFF20] md:bg-[#0A4A47] rounded-lg p-4 mt-6 w-full">
            <div className="flex items-center space-x-3 mb-3">
              <img
                src={calenderIcon}
                alt="Calendar"
                className=" md:h-[20px] filter grayscale brightness-[1%]"
              />
              <span className="md:text-gray-700 text-white">
                {scheduleDate}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <img
                src={TimeIcon}
                alt="Clock"
                className=" md:h-[20px] filter grayscale brightness-[1%]"
              />
              <div className="text-left">
                <div className="md:text-gray-700 text-white">
                  {scheduleTime}
                  {!scheduleTime.includes("SGT") && scheduleTime.trim() !== ""
                    ? " SGT"
                    : ""}
                </div>
                <div className="text-max-[800px] md:text-gray-500 text-gray-300">
                  ({duration})
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:px-6 md:pb-6 p-8 md:relative md:top-[-85px] ">
          <button
            onClick={onGoHome}
            className="w-full py-3 md:!border md:!border-gray-600   max-[800px]:bg-[#0D5D59] max-[800px]:text-white max-[800px]:border-white  md:bg-white   md:!text-black md:!text-[15px] md:hover:bg-gray-50  text-[#0D5D59] hover:bg-gray-100 rounded-full font-medium transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ScheduleCompletionModal;
