import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./MainLayouts/Layout";
import { ManagingUsersPartners } from "./Components/ManagingUsersPartners";
import { MonitoringPaymentsTransactions } from "./Components/MonitoringPaymentsTransactions";
import { FrequentlyAskedQuestion } from "./Components/FrequentlyAskedQuestion";
import { ContactSupport } from "./Components/ContactSupport";
import { Dashboard } from "./Components/Dashboard";
import { ReviewingFeedback } from "./Components/ReviewingFeedback";
import {AllDetails} from "./Components/ManagingUsersPartners/AllDetails";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <>
            <Route path="/dashboard-overview" element={<Dashboard />} />
            <Route
              path="/managing-users_partners"
              element={<ManagingUsersPartners />}
            />
            <Route path="/reviewing_feedback" element={<ReviewingFeedback />} />
            <Route
              path="/monitoring_payments_transactions"
              element={<MonitoringPaymentsTransactions />}
            />

            <Route
              path="/frequently_asked_question"
              element={<FrequentlyAskedQuestion />}
            />

            <Route path="/contact_support" element={<ContactSupport />} />

            <Route path="/all-details" element={<AllDetails/>} />

          </>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
