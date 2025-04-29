type LoadingButtonProps = {
  isLoading: boolean;
  onClick: () => void;
};

const LoadingButton = ({ isLoading, onClick }: LoadingButtonProps) => {
  return (
    <button
      className={`w-full sm:w-auto px-6 py-4 rounded-lg font-medium text-sm transition-all duration-200 
        bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
        ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Verifying...</span>
        </div>
      ) : (
        "Verify Code"
      )}
    </button>
  );
};

export default LoadingButton;
