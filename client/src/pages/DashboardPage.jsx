import { dashboardData } from "../utils/dummyData";
const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">
        Expense Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          {dashboardData.income}
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          {dashboardData.expense}       
          </div>
        <div className="bg-white p-4 rounded-lg shadow">
          {dashboardData.savings}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow h-64">
          Pie Chart (Category)
        </div>
        <div className="bg-white p-6 rounded-lg shadow h-64">
          Bar Chart (Monthly)
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
