const PrivacyNote = () => {
  const isLoggedIn = false; // later auth se aayega

  return (
    <div
      className={`mt-4 p-3 rounded-md text-sm ${
        isLoggedIn
          ? "bg-green-50 text-green-700"
          : "bg-yellow-50 text-yellow-700"
      }`}
    >
      {isLoggedIn
        ? "Your data will be saved and available for 3 months."
        : "Guest mode: Files are auto-deleted. Data stored for 2–3 weeks only."}
    </div>
  );
};

export default PrivacyNote;
