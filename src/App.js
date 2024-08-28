import "./App.css";
import { Dashboard } from "./Components/Dashboard/Dashboard";
import Layout from "./Components/MainLayouts/Layout";
import { Route, Routes } from "react-router-dom";
import { ManagingUsersPartners } from "./Components/ManagingUsersPartners/ManagingUsersPartners";
import { ReviewingFeedback } from "./Components/ReviewingFeedback/ReviewingFeedback";
import { MonitoringPaymentsTransactions } from "./Components/MonitoringPaymentsTransactions/MonitoringPaymentsTransactions";
import { FrequentlyAskedQuestion } from "./Components/FrequentlyAskedQuestion/FrequentlyAskedQuestion";
import { ContactSupport } from "./Components/ContactSupport/ContactSupport";

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
              element={<MonitoringPaymentsTransactions/>}
            />

            <Route
              path="/frequently_asked_question"
              element={<FrequentlyAskedQuestion/>}
              
            />

<Route
              path="/contact_support"
              element={<ContactSupport/>}
            />

          </>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
