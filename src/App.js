import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./MainLayouts/Layout";
import { ManagingUsersPartners } from "./Components/ManagingUsersPartners";
import { MonitoringPaymentsTransactions } from "./Components/MonitoringPaymentsTransactions";
import { FrequentlyAskedQuestion } from "./Components/FrequentlyAskedQuestion";
import { ContactSupport } from "./Components/ContactSupport";
 import { ReviewingFeedback } from "./Components/ReviewingFeedback";
import {AllDetails} from "./Components/ManagingUsersPartners/AllDetails";
import { Services } from "./Components/Services";
import Admin from "./adminlogin/Admin";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Dashboard from "./Components/Dashboard";
import { AllService } from "./Components/Services/AllService";

function App() {
  return (
    <div className="App">
      <Layout>
      <ToastContainer/>
        <Routes>
          <>
          <Route path="/" element={<Admin />}   />
            <Route path="/dashboard-overview" element={<Dashboard />}/>
            <Route
              path="/managing_users_partners"
              element={<ManagingUsersPartners />}
            />
            <Route path="/reviewing_feedback" element={<ReviewingFeedback />}/>
            <Route
              path="/monitoring_payments_transactions"
              element={<MonitoringPaymentsTransactions/>}
            />

            <Route
              path="/frequently_asked_question"
              element={<FrequentlyAskedQuestion/>}
            />

            <Route path="/contact_support" element={<ContactSupport />} />
            <Route path="/service-details/:id" element={<AllService />} />

            <Route path="/all-details/:id" element={<AllDetails />} />

            <Route path="/services" element={<Services/>} />

          </>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
