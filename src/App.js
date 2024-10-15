import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./MainLayouts/Layout";
import { ListofPartner } from "./Components/ListofPartner";
import { MonitoringPaymentsTransactions } from "./Components/MonitoringPaymentsTransactions";
import { FrequentlyAskedQuestion } from "./Components/FrequentlyAskedQuestion";
import { ContactSupport } from "./Components/ContactSupport";
import { ReviewingFeedback } from "./Components/ReviewingFeedback";
import { PartnerAllDetails } from "./Components/ListofPartner/PartnerAllDetails";
import { Services } from "./Components/Services";
import Admin from "./adminlogin/Admin";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Dashboard from "./Components/Dashboard";
import { AllService } from "./Components/Services/AllService";
import { useSelector } from "react-redux";
import { Coupon } from "./Components/Coupon";
import AboutUs from "./Components/AboutUs";
import ChangeImg from "./Components/Services/ChangeImg";
import { ViewDetail } from "./Components/Services/ViewDetails";
import { ListofUser } from "./Components/ListofUser";
import { UserAllDetails } from "./Components/ListofUser/UserAllDetails";

function App() {
  const userCheck = useSelector((state) => state?.users?.userCheck);
  const token = localStorage.getItem("token");
  return (
    <div className="App">
      {/* <Loader /> */}
      <Layout>
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Admin />} />
          <Route path="/" element={<Admin />} />


          <>
            {!userCheck && !token ? <Route path="/login" element={<Admin />} /> : ""}
            <Route path="/login" element={<Admin />} />
            {userCheck && token ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard-overview" element={<Dashboard />} />
                <Route path="/partner-list" element={<ListofPartner />} />
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
                <Route
                  path="/service-details/Upload-images"
                  element={<ChangeImg />}
                />
                <Route
                  path="/service-details/Upload-images/:id"
                  element={<ChangeImg />}
                />
                <Route
                  path="/partner-all-details/:id"
                  element={<PartnerAllDetails />}
                />
                <Route path="user-all-details" element={<UserAllDetails />} />
                <Route
                  path="/service-details/view-details/:id"
                  element={<ViewDetail />}
                />
                <Route path="/user-list" element={<ListofUser />} />
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
