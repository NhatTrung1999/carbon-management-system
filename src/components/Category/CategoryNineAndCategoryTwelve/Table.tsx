const header: string[] = [
  "No.",
  "Date",
  "Invoice number",
  "Article Name\n(Style name)",
  "Qty",
  "Gross weight (Unit：Ton)",
  "Customer ID",
  "Local land transportation \nFactory→Port",
  "Port of Departure",
  "Port of Arrival",
  "Land Transport Distance",
  "Sea Transport Distance",
  "Air Transport Distance",
  "Transport Method",
  "Land Transport Ton-Kilometers",
  "Sea Transport Ton-Kilometers",
  "Air Transport Ton-Kilometers",
];

const Table = () => {
  return (
    <div className="max-h-[600px] overflow-y-auto">
      <table className="w-full text-left min-w-max">
        <thead className="bg-[#636e61] text-sm sticky top-0 text-white">
          <tr>
            {header.map((item, index) => (
              <th className="px-6 py-6 whitespace-break-spaces" key={index}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default Table;
