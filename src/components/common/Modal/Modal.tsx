import type React from 'react';

const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`transition-all ease-out duration-300 overflow-y-auto overflow-x-hidden fixed top-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-gray-600/20`}
    >
      <div
        className={`max-w-2xl absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 p-4 w-full max-h-full`}
      >
        <div
          className={`relative bg-white rounded-lg shadow`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
