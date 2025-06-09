const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="mt-1 text-2xl font-bold">{value}</h3>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
