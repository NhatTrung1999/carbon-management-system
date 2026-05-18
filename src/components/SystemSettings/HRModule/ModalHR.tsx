import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useAppDispatch } from '../../../app/hooks';
import { Toast } from '../../../utils/Toast';
import Button from '../../common/Button';
import { importExcelHRModule } from '../../../features/hrmoduleSlice';
type Props = {
  setIsOpen: (isOpen: boolean) => void;
};

const ModalHR = ({ setIsOpen }: Props) => {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    setFileName(selected?.name ?? '');
  };

  const handleImport = async () => {
    if (!file) {
      Toast.fire({
        icon: 'error',
        title: 'Please choose a file before importing!',
      });
      return;
    }

    Toast.fire({
      title: 'Importing...',
      timer: undefined,
      timerProgressBar: false,
      didOpen: () => {
        Toast.showLoading();
        setIsOpen(false);
      },
    });

    const res = await dispatch(importExcelHRModule(file));
    Toast.close();
    Toast.fire({
      icon: importExcelHRModule.fulfilled.match(res) ? 'success' : 'error',
      title: importExcelHRModule.fulfilled.match(res)
        ? (res.payload as { message: string }).message
        : (res.payload as string),
    });
  };

  return (
    // <div className="fixed inset-0 z-20 flex justify-center items-center">
    //   <div className="bg-white max-w-md w-full shadow-xl flex flex-col">
    //     <div className="h-[70px] flex items-center justify-between px-2 border-b border-gray-200">
    //       <h1 className="font-semibold text-xl">Import Excel File</h1>
    //       <div className="cursor-pointer" onClick={() => setIsOpen(false)}>
    //         <IoClose size={25} />
    //       </div>
    //     </div>
    //     <div className="py-5 px-2">
    //       <div className="text-end mb-3 text-lg font-medium hover:underline hover:opacity-80">
    //         <a href="/excel/Template_HR_Module.xlsx" download>
    //           Example File
    //         </a>
    //       </div>
    //       <div>
    //         <label
    //           htmlFor="portcode"
    //           className="border border-gray-300 flex items-center rounded-lg bg-gray-500"
    //         >
    //           <span className="px-2 text-white font-bold">Choose file</span>
    //           <div className=" px-2 flex-1 py-1.5 bg-white rounded-r-md font-medium truncate">
    //             {fileName}
    //           </div>
    //         </label>
    //         <input
    //           type="file"
    //           hidden
    //           id="portcode"
    //           onChange={handleFileChange}
    //           accept=".xlsx,.xls"
    //         />
    //       </div>
    //     </div>
    //     <div className="flex items-center justify-end px-2 py-3 border-t border-gray-200 gap-2">
    //       <Button
    //         label={'Close'}
    //         type="button"
    //         className="bg-gray-500 hover:bg-gray-500/80 cursor-pointer flex items-center gap-2"
    //         onClick={() => setIsOpen(false)}
    //       />

    //       <Button
    //         label={'Import'}
    //         type="button"
    //         className="bg-blue-500 hover:bg-blue-500/80 cursor-pointer flex items-center gap-2"
    //         onClick={handleImport}
    //       />
    //     </div>
    //   </div>
    // </div>
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4
        bg-black/40 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
    >
      {/* Panel */}
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl
        border border-white/[0.14] bg-[#0a1f18]/90
        shadow-[0_32px_80px_rgba(0,0,0,0.55)] backdrop-blur-[48px]"
      >
        {/* Top shimmer */}
        <div
          className="absolute inset-x-0 top-0 h-px
          bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />

        {/* ── Header ── */}
        <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
          <h2 className="text-base font-semibold text-white">
            Import Excel File
          </h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-lg
              text-white/40 transition-colors duration-150
              hover:bg-white/[0.08] hover:text-white"
          >
            <IoClose size={18} />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-col gap-4 px-5 py-5">
          {/* Example file link */}
          <a
            href="/excel/Template_HR_Module.xlsx"
            download
            className="flex items-center gap-1.5 self-end text-xs font-medium
              text-emerald-400 transition-colors duration-150 hover:text-emerald-300"
          >
            <svg
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
              aria-hidden="true"
            >
              <path d="M7 1v8M4 6l3 3 3-3" />
              <path d="M1 10v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1" />
            </svg>
            Download example file
          </a>

          {/* File picker */}
          <label
            htmlFor="portcode"
            className="group flex cursor-pointer items-center gap-0 overflow-hidden
              rounded-xl border border-white/[0.10] transition-all duration-200
              hover:border-emerald-400/40"
          >
            {/* Button side */}
            <span
              className="shrink-0 bg-emerald-400/15 px-4 py-2.5
              text-sm font-semibold text-emerald-300
              transition-colors duration-200 group-hover:bg-emerald-400/25"
            >
              Choose file
            </span>

            {/* File name side */}
            <span
              className="flex-1 truncate bg-white/[0.04] px-3 py-2.5
              text-sm text-white/50"
            >
              {fileName || 'No file chosen'}
            </span>

            {/* Clear icon when file selected */}
            {file && (
              <span
                role="button"
                aria-label="Clear file"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setFile(null);
                  setFileName('');
                }}
                className="shrink-0 px-3 py-2.5 text-white/30
                  hover:text-white/70 transition-colors duration-150"
              >
                <IoClose size={15} />
              </span>
            )}
          </label>
          <input
            type="file"
            id="portcode"
            hidden
            accept=".xlsx,.xls"
            onChange={handleFileChange}
          />

          {/* File info pill */}
          {file && (
            <div
              className="flex items-center gap-2 rounded-lg border border-emerald-400/20
              bg-emerald-400/[0.07] px-3 py-2"
            >
              <svg
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5 shrink-0 text-emerald-400"
                aria-hidden="true"
              >
                <rect x="2" y="1" width="10" height="12" rx="1.5" />
                <path d="M4 4h6M4 7h6M4 10h4" />
              </svg>
              <span className="truncate text-xs text-emerald-300">
                {fileName}
              </span>
              <span className="ml-auto shrink-0 text-xs text-white/30">
                {(file.size / 1024).toFixed(1)} KB
              </span>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div
          className="flex items-center justify-end gap-2
          border-t border-white/[0.08] px-5 py-4"
        >
          <Button
            label="Cancel"
            type="button"
            variant="secondary"
            onClick={() => setIsOpen(false)}
          />
          <Button
            label="Import"
            type="button"
            variant="primary"
            onClick={handleImport}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalHR;
