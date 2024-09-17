import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./MainLayouts/Layout";
import { ManagingUsersPartners } from "./Components/ManagingUsersPartners";
import { MonitoringPaymentsTransactions } from "./Components/MonitoringPaymentsTransactions";
import { FrequentlyAskedQuestion } from "./Components/FrequentlyAskedQuestion";
import { ContactSupport } from "./Components/ContactSupport";
import { ReviewingFeedback } from "./Components/ReviewingFeedback";
import { AllDetails } from "./Components/ManagingUsersPartners/AllDetails";
import { Services } from "./Components/Services";
import Admin from "./adminlogin/Admin";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Dashboard from "./Components/Dashboard";
import { AllService } from "./Components/Services/AllService";
import { useSelector } from "react-redux";
import { Coupon } from "./Components/Coupon";
import AboutUs from "./Components/AboutUs";

function App() {
  const userCheck = useSelector((state) => state?.users?.userCheck);
  const token = localStorage.getItem("token");
  return (
    <div className="App">
      <Layout>
        <ToastContainer />
        <Routes>
          <>
            {!userCheck && !token ? <Route path="/" element={<Admin />} /> : ""}
            <Route path="/login" element={<Admin />} />
            {userCheck && token ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard-overview" element={<Dashboard />} />
                <Route
                  path="/managing_users_partners"
                  element={<ManagingUsersPartners />}
                />
                <Route
                  path="/reviewing_feedback"
                  element={<ReviewingFeedback />}
                />
                <Route
                  path="/monitoring_payments_transactions"
                  element={<MonitoringPaymentsTransactions />}
                />

                <Route
                  path="/frequently_asked_question"
                  element={<FrequentlyAskedQuestion />}
                />

                <Route path="/contact_support" element={<ContactSupport />} />
                <Route path="/service-details/:id" element={<AllService />} />
                <Route path="/service-details" element={<AllService />} />

                <Route path="/all-details/:id" element={<AllDetails />} />

                <Route path="/services" element={<Services />} />
                <Route path="/coupon" element={<Coupon />} />
                <Route path="/about_us" element={<AboutUs />} />

              </>
            ) : (
           ""
            )}
          </>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
