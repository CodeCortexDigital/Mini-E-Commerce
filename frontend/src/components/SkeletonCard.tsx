const SkeletonCard = () => {
  return (
    <div className="bg-white border rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded mb-2"></div>
        <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
